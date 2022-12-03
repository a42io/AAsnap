import { OnRpcRequestHandler } from '@metamask/snap-types';
import { ethers } from 'ethers';
import { getAbstractAccount } from './getAbstractAccount';
import { getBalance } from './getBalance';
import { transfer } from './transfer';

export const getEoaAddress = async (): Promise<string> => {
  const provider = new ethers.providers.Web3Provider(wallet as any);
  const accounts = await provider.send('eth_requestAccounts', []);
  return accounts[0];
};

export const getAddress = async (): Promise<string> => {
  const aa = await getAbstractAccount();
  const address = await aa.getAccountAddress();
  return address;
};

export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  console.log(origin);
  console.log(request);
  switch (request.method) {
    case 'connect_eoa':
      return await getEoaAddress();
    case 'balance_eoa':
      return await getBalance(await getEoaAddress());
    case 'connect_aa':
      return await getAddress();
    case 'balance':
      return await getBalance(await getAddress());
    case 'transfer':
      // eslint-disable-next-line no-case-declarations
      const { target, ethValue } = request?.params as unknown as {
        [key: string]: string;
      };
      return await transfer(target, ethValue);
    default:
      throw new Error('Method not found.');
  }
};
