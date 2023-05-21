import { useNetwork as useWagmiNetwork } from "wagmi";

export function useNetwork() {
  return useWagmiNetwork();
}
