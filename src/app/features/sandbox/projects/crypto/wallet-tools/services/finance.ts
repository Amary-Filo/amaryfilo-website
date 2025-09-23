export const YEAR = 365n * 24n * 60n * 60n;
export const YEAR_SEC = 365 * 24 * 60 * 60;
export const BPS = 10000n;

export function plannedReward(
  amount: bigint,
  aprBps: number,
  termSec: number
): bigint {
  return (amount * BigInt(aprBps) * BigInt(termSec)) / (YEAR * BPS);
}

export function pendingRewardLocal(
  amount: bigint,
  aprBps: number,
  termSec: number,
  unlockAtSec: number,
  nowSec: number
): bigint {
  const start = BigInt(unlockAtSec - termSec);
  const nowClamped = BigInt(nowSec < unlockAtSec ? nowSec : unlockAtSec);
  if (nowClamped <= start) return 0n;
  const elapsed = nowClamped - start;
  return (amount * BigInt(aprBps) * elapsed) / (YEAR * BPS);
}
