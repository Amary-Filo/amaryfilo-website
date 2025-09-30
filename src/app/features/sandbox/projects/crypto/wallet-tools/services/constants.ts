import { TermsBySec, TermsList } from './types';

export const STAKING_TERMS: TermsList = {
  M15: {
    title: '15m',
    time: 15,
    percent: 400,
  },
  M30: {
    title: '30m',
    time: 30,
    percent: 800,
  },
  M60: {
    title: '1h',
    time: 60,
    percent: 1600,
  },
  M120: {
    title: '2h',
    time: 120,
    percent: 3200,
  },
  M180: {
    title: '3h',
    time: 180,
    percent: 4800,
  },
};

export const TERM_BY_SEC: TermsBySec = {
  [15 * 60]: 'M15',
  [30 * 60]: 'M30',
  [60 * 60]: 'M60',
  [120 * 60]: 'M120',
  [180 * 60]: 'M180',
};

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
