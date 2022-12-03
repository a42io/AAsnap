import { OnRpcRequestHandler } from '@metamask/snap-types';
import { getAbstractAccount } from './getAbstractAccount';
import { getBalance } from './getBalance';

export const getMessage = (originString: string): string =>
  `Hello, ${originString}!`;

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
    case 'connect_aa':
      return await getAddress();
    case 'balance':
      return await getBalance(await getAddress());
    default:
      throw new Error('Method not found.');
  }
};
