"""
사용자 제공 수동 데이터를 lotto_history.json에 추가합니다.
"""
import json, os, time

SCRIPT_DIR   = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
JSON_PATH    = os.path.join(PROJECT_ROOT, "public", "data", "lotto_history.json")

# 회차: (날짜, [번호6개], 보너스)
# 1204회=2025-12-27 기준 매주 토요일 +7일씩
MANUAL_DATA = [
    (1205, "2026-01-03", [1, 4, 16, 23, 31, 41], 2),
    (1206, "2026-01-10", [1, 3, 17, 26, 27, 42], 23),
    (1207, "2026-01-17", [10, 22, 24, 27, 38, 45], 11),
    (1208, "2026-01-24", [6, 27, 30, 36, 38, 42], 25),
    (1209, "2026-01-31", [2, 17, 20, 35, 37, 39], 24),
    (1210, "2026-02-07", [1, 7, 9, 17, 27, 38], 31),
    (1211, "2026-02-14", [23, 26, 27, 35, 38, 40], 10),
    (1212, "2026-02-21", [5, 8, 25, 31, 41, 44], 45),
    (1213, "2026-02-28", [5, 11, 25, 27, 36, 38], 2),
    (1214, "2026-03-07", [10, 15, 19, 27, 30, 33], 14),
    (1215, "2026-03-14", [13, 15, 19, 21, 44, 45], 39),
    (1216, "2026-03-21", [3, 10, 14, 15, 23, 24], 25),
]

def main():
    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    existing_rounds = {item["round"] for item in data["data"]}
    added = 0

    for round_no, date, numbers, bonus in MANUAL_DATA:
        if round_no in existing_rounds:
            print(f"  {round_no}회차 — 이미 존재, 스킵")
            continue
        data["data"].append({
            "round":   round_no,
            "date":    date,
            "numbers": sorted(numbers),
            "bonus":   bonus,
        })
        print(f"  {round_no}회차 ✅  {date}  {sorted(numbers)}  보너스:{bonus}")
        added += 1

    data["data"].sort(key=lambda x: x["round"])
    data["totalRounds"] = len(data["data"])
    data["lastUpdated"] = time.strftime("%Y-%m-%d")

    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"\n✅ 완료! 신규 추가: {added}개  →  총 {data['totalRounds']}회차")

if __name__ == "__main__":
    main()
