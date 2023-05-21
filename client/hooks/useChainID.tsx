import { useNetwork } from "wagmi";

export function useChainId(): number | undefined {
  return (useNetwork() as any)["0"].data.chain?.id;
}
