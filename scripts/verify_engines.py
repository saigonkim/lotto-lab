import json, random, math
from collections import Counter
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("public/data/lotto_history.json", "r", encoding="utf-8") as f:
    hist = json.load(f)
records = hist["data"]
print(f"Total records: {len(records)}")

# ── 1. Bayesian ──────────────────────────────────────────
print("\n=== [1] BAYESIAN - Frequency Weights ===")
counts = [0] * 46
for r in records:
    for n in r["numbers"]:
        counts[n] += 1

freq = sorted([(i, counts[i]) for i in range(1, 46)], key=lambda x: x[1], reverse=True)
print(f"  TOP 10: {freq[:10]}")
print(f"  BOT 10: {freq[-10:]}")
no_appear = [n for n, c in freq if c == 0]
print(f"  미출현(0회) 번호: {no_appear}")
total_draws = sum(counts[1:])
print(f"  총 추출 횟수: {total_draws}, 평균 출현: {total_draws/45:.1f}회")

# 로직 정상 여부: top-freq 번호가 더 자주 선택되는지 시뮬
min_count = max(1, min(c for c in counts[1:] if c > 0))
weights = [(counts[i] if counts[i] > 0 else min_count * 0.5) for i in range(1, 46)]
sim = Counter()
for _ in range(2000):
    rem = weights[:]
    for _ in range(6):
        total_w = sum(rem)
        rv = random.random() * total_w
        cumul = 0
        for j, w in enumerate(rem):
            cumul += w
            if cumul >= rv:
                sim[j+1] += 1
                rem[j] = 0
                break
top_sim = [n for n, _ in sim.most_common(10)]
top_hist = [n for n, _ in freq[:10]]
overlap = len(set(top_sim) & set(top_hist))
print(f"  시뮬 TOP10: {top_sim}, 실제빈출 TOP10: {top_hist}")
print(f"  겹치는 번호: {overlap}/10  -> {'OK' if overlap >= 5 else 'BUG'}")

# ── 2. Constraint ────────────────────────────────────────
print("\n=== [2] CONSTRAINT - Filter Validation ===")

def count_pairs(nums):
    s = sorted(nums)
    return sum(1 for i in range(len(s)-1) if s[i+1]-s[i] == 1)

def has_triple(nums):
    s = sorted(nums)
    for i in range(len(s)-2):
        if s[i+1]-s[i] == 1 and s[i+2]-s[i+1] == 1:
            return True
    return False

# 합계 범위 검증  
sums = [sum(r["numbers"]) for r in records]
in_range = sum(1 for s in sums if 100 <= s <= 175)
print(f"  [합계] 실제당첨 100~175 해당: {in_range}/{len(sums)} ({in_range/len(sums)*100:.1f}%)")
print(f"  [합계] min={min(sums)}, max={max(sums)}, avg={sum(sums)/len(sums):.1f}")

# 홀짝 검증
odd_dist = Counter(sum(1 for n in r["numbers"] if n%2!=0) for r in records)
print(f"  [홀짝] 분포(홀수 개수): {dict(sorted(odd_dist.items()))}")
valid_odd = sum(odd_dist[k] for k in [2,3,4])
print(f"  [홀짝] 유효범위(2~4개): {valid_odd}/{len(records)} ({valid_odd/len(records)*100:.1f}%)")

# 3연속 버그 검증
print("\n  [연속번호 필터 버그 검증]")
test_cases = [
    ([1,2,3,10,20,30], "3연속 포함"),
    ([1,2,10,11,20,30], "쌍 2개 포함"),
    ([1,2,10,20,30,40], "쌍 1개만"),
    ([1,5,10,20,30,40], "연속 없음"),
]
for nums, label in test_cases:
    pairs = count_pairs(nums)
    triple = has_triple(nums)
    curr_pass = (pairs <= 1)  # 현재 로직
    correct_pass = not triple and pairs <= 1  # 올바른 로직
    bug = "BUG!" if triple and curr_pass else "OK"
    print(f"  {nums} ({label}): pairs={pairs}, triple={triple}, curr={'PASS' if curr_pass else 'FAIL'}, correct={'PASS' if correct_pass else 'FAIL'} {bug}")

# 필터 통과율 시뮬
all_nums = list(range(1,46))
SIMS = 20000
pass_curr, pass_correct, triple_slip = 0, 0, 0
for _ in range(SIMS):
    s = sorted(random.sample(all_nums, 6))
    tot = sum(s)
    odd = sum(1 for n in s if n%2!=0)
    pairs = count_pairs(s)
    triple = has_triple(s)
    if 100 <= tot <= 175 and 2 <= odd <= 4 and pairs <= 1:
        pass_curr += 1
        if triple:
            triple_slip += 1
    if 100 <= tot <= 175 and 2 <= odd <= 4 and pairs <= 1 and not triple:
        pass_correct += 1

print(f"\n  [시뮬 {SIMS}회] 현재로직 통과: {pass_curr} ({pass_curr/SIMS*100:.2f}%)")
print(f"  [시뮬 {SIMS}회] 개선로직 통과: {pass_correct} ({pass_correct/SIMS*100:.2f}%)")
print(f"  [시뮬] 3연속 슬립스루: {triple_slip}건 -> {'BUG EXISTS' if triple_slip > 0 else 'OK'}")

# ── 3. Pattern ───────────────────────────────────────────
print("\n=== [3] PATTERN - Gap Analysis ===")
gap_sums = [0]*5
valid_count = 0
all_gaps = [[] for _ in range(5)]
for r in records:
    nums = sorted(r["numbers"])
    if len(nums) != 6: continue
    for i in range(5):
        g = nums[i+1] - nums[i]
        gap_sums[i] += g
        all_gaps[i].append(g)
    valid_count += 1

avg_gaps = [round(s/valid_count) for s in gap_sums]
real_avg = [s/valid_count for s in gap_sums]
print(f"  유효 회차: {valid_count}")
print(f"  평균 간격(소수): {[round(g,2) for g in real_avg]}")
print(f"  평균 간격(정수, Math.round): {avg_gaps}")
print(f"  간격 합계: {sum(avg_gaps)}")
print(f"  예상 마지막 번호(start=5): 5+{sum(avg_gaps)}={5+sum(avg_gaps)}")

for i in range(5):
    g = all_gaps[i]
    print(f"  gap[{i}]: min={min(g)}, max={max(g)}, avg={sum(g)/len(g):.2f}, std={math.sqrt(sum((x-sum(g)/len(g))**2 for x in g)/len(g)):.2f}")

# 폴백률 시뮬
SIMS2 = 1000
fallback = 0
for _ in range(SIMS2):
    found = False
    for _ in range(500):
        start = random.randint(1,10)
        cand = [start]
        ok = True
        for i in range(5):
            noise = random.randint(-2,2)
            nxt = cand[-1] + avg_gaps[i] + noise
            if nxt > 45 or nxt < 1 or nxt in cand:
                ok = False; break
            cand.append(nxt)
        if ok and len(cand)==6: found=True; break
    if not found: fallback += 1
print(f"  폴백 발생률: {fallback}/{SIMS2} ({fallback/SIMS2*100:.1f}%)")

print("\n=== SUMMARY ===")
print(f"  Bayesian: overlap={overlap}/10 -> {'OK' if overlap>=5 else 'BUG'}")
print(f"  Constraint 3연속 슬립스루: {triple_slip}건")
print(f"  Pattern 폴백률: {fallback/SIMS2*100:.1f}%")
