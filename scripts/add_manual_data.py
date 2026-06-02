"""
사용자 제공 수동 데이터를 lotto_history.json에 추가합니다. (1217회 ~ 1226회)
"""
import json, os, time

SCRIPT_DIR   = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
JSON_PATH    = os.path.join(PROJECT_ROOT, "public", "data", "lotto_history.json")

# 1216회=2026-03-21 기준 매주 토요일 +7일씩
MANUAL_DATA = [
    (1217, "2026-03-28", [8, 10, 15, 20, 29, 31], 41),
    (1218, "2026-04-04", [3, 28, 31, 32, 42, 45], 25),
    (1219, "2026-04-11", [1, 2, 15, 28, 39, 45], 31),
    (1220, "2026-04-18", [2, 22, 25, 28, 34, 43], 16),
    (1221, "2026-04-25", [6, 13, 18, 28, 30, 36], 9),
    (1222, "2026-05-02", [4, 11, 17, 22, 32, 41], 34),
    (1223, "2026-05-09", [16, 18, 20, 32, 33, 39], 26),
    (1224, "2026-05-16", [9, 18, 21, 27, 44, 45], 28),
    (1225, "2026-05-23", [8, 9, 19, 25, 41, 42], 33),
    (1226, "2026-05-30", [4, 6, 13, 17, 26, 28], 41),
]

def main():
    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    existing_rounds = {item["round"] for item in data["data"]}
    added = 0

    for round_no, date, numbers, bonus in MANUAL_DATA:
        if round_no in existing_rounds:
            print(f"  {round_no}회차 — 이미 존재, 업데이트")
            # Remove existing to replace
            data["data"] = [r for r in data["data"] if r["round"] != round_no]
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

    print(f"\n✅ 완료! 추가/갱신: {added}개  →  총 {data['totalRounds']}회차")

if __name__ == "__main__":
    main()
