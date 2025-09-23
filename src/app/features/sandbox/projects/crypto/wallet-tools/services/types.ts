export type TermsSec = 'M15' | 'M30' | 'M60' | 'M120' | 'M180';
export interface TermsData {
  title: string;
  time: number;
  percent: number;
}
export type TermsList = Record<TermsSec, TermsData>;
export type TermsBySec = Record<number, TermsSec>;

export interface StakeView {
  idx: number;
  amount: bigint;
  unlockAt: number;
  termSec: number;
  aprBps: number;
  withdrawn: boolean;
  pendingReward: bigint;
}

export interface StakeViewUI extends StakeView {
  dateStart: number;
  amountHuman: string;
  percentHuman: string;

  rewardPlanned: bigint;
  rewardPlannedHuman: string;
  totalPlanned: bigint;
  totalPlannedHuman: string;

  pendingRewardHuman: string;
  progress: number;
  remainingSec: number;
  eta: number;

  termKey: TermsSec;
  termLabel: string;
}
