import { ethers } from 'ethers';
import { SimpleAccountAPI } from '@account-abstraction/sdk';

const entryPointAddress = '0x1D9a2CB3638C2FC8bF9C01D088B79E75CD188b17';
const factoryAddress = '0xe19E9755942BB0bD0cCCCe25B1742596b8A8250b';

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
