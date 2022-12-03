import { ethers } from 'ethers';

export const getBalance = async (address: string): Promise<string> => {
  const provider = new ethers.providers.Web3Provider(wallet as any);
  const balance = await provider.getBalance(address);
  return ethers.utils.formatEther(balance);
};
