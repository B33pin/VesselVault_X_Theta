import { useAccount } from "wagmi";

export function useAddress(): string | undefined {
  const [account]: any = useAccount();
  return account.data?.address;
}
