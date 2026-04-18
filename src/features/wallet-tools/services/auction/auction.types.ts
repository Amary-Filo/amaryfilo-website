// src/features/wallet-tools/services/auction/auction.types.ts

export type AuctionPoolStatus = 'upcoming' | 'active' | 'withdraw' | 'ended';
export type BidPoolStatus = 'empty' | 'bid' | 'winner';

export interface AuctionPoolUI {
  id: number;
  status: AuctionPoolStatus;
  bidStatus: BidPoolStatus;
  isUserHighest: boolean;

  amountAPT: string;
  endTime: number;
  startTime?: number;
  highestAddress: string;
  highestAST: string;
  settled: boolean;
  minBid: string;
}

export interface IPoolResponse {
  amountAPT: bigint;
  endTime: bigint;
  startTime: bigint;
  highestBidder: string;
  highestBidAST: bigint;
  settled: boolean;
  minBid: bigint;
}
