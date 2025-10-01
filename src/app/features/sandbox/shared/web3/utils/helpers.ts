import { CHAINS } from '../network-registry.service';

export const explorerUrl = (id: number): string | null => {
  if (!id) return null;

  const chain = Object.values(CHAINS).find((c) => c.id === id);
  const base = chain?.explorer?.url || chain?.explorers?.[0]?.url || null;

  return base;
};
