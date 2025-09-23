import { Injectable, signal } from '@angular/core';
import { ErrorsService, NormalizedError } from './errors.service';

export type TxStatus = 'idle' | 'pending' | 'mined' | 'error';

export type TxState = {
  status: TxStatus;
  hash?: string;
  receipt?: any;
  error?: NormalizedError;
};

export type TxHooks = {
  onStart?: (s: TxState) => void;
  onSuccess?: (s: TxState) => void;
  onError?: (s: TxState) => void;
};

@Injectable()
export class TxService {
  readonly state = signal<TxState>({ status: 'idle' });

  constructor(private errors: ErrorsService) {}

  async send(txFn: () => Promise<any>, hooks?: TxHooks): Promise<TxState> {
    this.state.set({ status: 'idle' });

    try {
      const tx = await txFn();
      const next: TxState = { status: 'pending', hash: tx?.hash };

      this.state.set(next);
      hooks?.onStart?.(next);

      const receipt = await tx.wait?.();
      const mined: TxState = { status: 'mined', hash: tx?.hash, receipt };

      this.state.set(mined);
      hooks?.onSuccess?.(mined);

      return mined;
    } catch (e: any) {
      const err = this.errors.normalize(e);
      const bad: TxState = { status: 'error', error: err };

      this.state.set(bad);
      hooks?.onError?.(bad);

      return bad;
    }
  }

  reset() {
    this.state.set({ status: 'idle' });
  }
}
