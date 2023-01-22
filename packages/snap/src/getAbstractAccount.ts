import { ethers } from 'ethers';
import { SimpleAccountAPI } from '@account-abstraction/sdk';

const entryPointAddress = '0x0F46c65C17AA6b4102046935F33301f0510B163A';
const factoryAddress = '0x6C583EE7f3a80cB53dDc4789B0Af1aaFf90e55F3';

export const getAbstractAccount = async (): Promise<SimpleAccountAPI> => {
  const provider = new ethers.providers.Web3Provider(wallet as any);
  await provider.send('eth_requestAccounts', []);
  const owner = provider.getSigner();
  const aa = new SimpleAccountAPI({
    provider,
    entryPointAddress,
    owner,
    factoryAddress,
  });
  return aa;
};
