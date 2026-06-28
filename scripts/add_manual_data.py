"""
사용자 제공 수동 데이터를 lotto_history.json에 추가합니다. (1230회)
"""
import json, os, time

SCRIPT_DIR   = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
JSON_PATH    = os.path.join(PROJECT_ROOT, "public", "data", "lotto_history.json")

MANUAL_DATA = [
    (1230, "2026-06-27", [3, 8, 9, 22, 28, 42], 45),
]

def main():
    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    existing_rounds = {item["round"] for item in data["data"]}
    added = 0

    for round_no, date, numbers, bonus in MANUAL_DATA:
        if round_no in existing_rounds:
            print(f"  {round_no}회차 — 이미 존재, 업데이트")
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
