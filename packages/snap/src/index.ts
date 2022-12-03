import { OnRpcRequestHandler } from '@metamask/snap-types';
import { getAbstractAccount } from './getAbstractAccount';

export const getMessage = (originString: string): string =>
  `Hello, ${originString}!`;

export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  switch (request.method) {
    case 'hello':
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: getMessage(origin),
            description: 'Your abstract account',
            textAreaContent: await (
              await getAbstractAccount()
            ).getAccountAddress(),
          },
        ],
      });
    case 'connect_aa':
      // eslint-disable-next-line no-case-declarations
      const aa = await getAbstractAccount();
      // eslint-disable-next-line no-case-declarations
      const address = await aa.getAccountAddress();
      console.log(address);
      return address;
    default:
      throw new Error('Method not found.');
  }
};
