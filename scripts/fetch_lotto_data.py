"""
happylie/lotto_data GitHub SQLite DB에서 1117~1216회차 데이터를 가져와
public/data/lotto_history.json 에 병합합니다.
"""

import urllib.request
import sqlite3
import os
import json
import time

SCRIPT_DIR   = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
JSON_PATH    = os.path.join(PROJECT_ROOT, "public", "data", "lotto_history.json")
DB_PATH      = os.path.join(SCRIPT_DIR, "_lotto_tmp.db")

DB_URL    = "https://raw.githubusercontent.com/happylie/lotto_data/main/lotto_data.db"
START_DRW = 1117
END_DRW   = 1216


def main():
    # 1. DB 다운로드
    print("📥 GitHub에서 로또 DB 다운로드 중...")
    urllib.request.urlretrieve(DB_URL, DB_PATH)
    print(f"   완료! ({os.path.getsize(DB_PATH)//1024} KB)")

    # 2. 데이터 추출 (컬럼명 그대로 사용)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row   # 딕셔너리처럼 접근 가능
    cur  = conn.cursor()

    cur.execute(
        "SELECT round, date, [1st], [2nd], [3rd], [4th], [5th], [6th], bonus "
        "FROM tb_lotto_list "
        f"WHERE round BETWEEN {START_DRW} AND {END_DRW} "
        "ORDER BY round"
    )
    rows = cur.fetchall()
    conn.close()
    os.remove(DB_PATH)

    print(f"   {START_DRW}~{END_DRW}회차 중 {len(rows)}개 발견")

    new_rows = []
    for r in rows:
        nums = sorted([r["1st"], r["2nd"], r["3rd"], r["4th"], r["5th"], r["6th"]])
        # date 형식: '2025.11.29 ' → '2025-11-29'
        raw_date = str(r["date"]).strip().replace(".", "-")
        new_rows.append({
            "round":   int(r["round"]),
            "date":    raw_date,
            "numbers": nums,
            "bonus":   int(r["bonus"]),
        })

    # 3. 기존 JSON과 병합
    with open(JSON_PATH, "r", encoding="utf-8") as f:
        existing = json.load(f)

    # numbers가 비어있는 잘못 저장된 항목 제거
    clean_existing = [
        item for item in existing["data"]
        if len(item.get("numbers", [])) > 0
    ]

    # 정리된 기존 회차 세트로 신규 항목 필터
    existing_rounds = {item["round"] for item in clean_existing}
    to_add = [r for r in new_rows if r["round"] not in existing_rounds]

    all_data = clean_existing + to_add
    all_data.sort(key=lambda x: x["round"])

    output = {
        "lastUpdated": time.strftime("%Y-%m-%d"),
        "totalRounds": len(all_data),
        "data":        all_data,
    }

    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\n✅ 저장 완료!")
    print(f"   총 {len(all_data)}회차  (신규 추가: {len(to_add)}개)")
    print(f"   파일: {JSON_PATH}")
    print(f"\n--- 최근 5개 샘플 ---")
    for item in all_data[-5:]:
        print(f"  {item['round']}회 ({item['date']}): {item['numbers']}  보너스:{item['bonus']}")


if __name__ == "__main__":
    main()
