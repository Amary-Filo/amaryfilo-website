import { Injectable } from '@angular/core';

export type NormalizedError = {
  code?: number | string;
  name?: string;
  message: string;
  data?: unknown;
  original?: unknown;
  isUserRejected?: boolean;
  isNetwork?: boolean;
  isInsufficientFunds?: boolean;
  revertReason?: string;
};

@Injectable()
export class ErrorsService {
  normalize(e: any): NormalizedError {
    if (e && e.__normalized) return e as NormalizedError;

    const err: NormalizedError = {
      code: e?.code ?? e?.error?.code,
      name: e?.name,
      message: this.pickMessage(e),
      data: e?.data ?? e?.error?.data,
      original: e,
      isUserRejected: this.isUserRejected(e),
      isNetwork: this.isNetworkError(e),
      isInsufficientFunds: this.isInsufficientFunds(e),
      revertReason: this.extractRevertReason(e),
    };

    if (err.isUserRejected && !err.message)
      err.message = 'Transaction rejected by user';
    if (err.isInsufficientFunds && !err.message)
      err.message = 'Insufficient funds for gas or value';
    if (err.revertReason && !err.message) err.message = err.revertReason;

    (err as any).__normalized = true;
    return err;
  }

  private pickMessage(e: any): string {
    return (
      e?.shortMessage ||
      e?.error?.message ||
      e?.data?.message ||
      e?.message ||
      ''
    );
  }

  private isUserRejected(e: any): boolean {
    if (e?.code === 4001) return true;

    const m = (this.pickMessage(e) || '').toLowerCase();
    return (
      m.includes('user rejected') ||
      m.includes('user canceled') ||
      m.includes('denied')
    );
  }

  private isNetworkError(e: any): boolean {
    const c = e?.code;
    return c === 'NETWORK_ERROR' || c === -32000 || c === -32603;
  }

  private isInsufficientFunds(e: any): boolean {
    const m = (this.pickMessage(e) || '').toLowerCase();
    return m.includes('insufficient funds');
  }

  private extractRevertReason(e: any): string | undefined {
    const m = this.pickMessage(e) || '';

    const match = m.match(/execution reverted(?:\:|\s)?(.*)$/i);
    if (match?.[1]) return match[1].trim();

    const dmsg = e?.error?.data?.message || e?.data?.message;
    if (typeof dmsg === 'string') return dmsg;

    return undefined;
  }
}
