import { ethers } from 'ethers';
import { getAbstractAccount } from './getAbstractAccount';
import { printOp } from './printOp';

export const transfer = async (target: string, ethValue: string) => {
  const value = ethers.utils.parseEther(ethValue);
  const aa = await getAbstractAccount();
  const address = await aa.getAccountAddress();

  const result = await wallet.request({
    method: 'snap_confirm',
    params: [
      {
        prompt: 'Transfer',
        description: 'Transfer from your Abstraction Account',
        textAreaContent: `from: ${address}\ntarget: ${target}\nvalue: ${ethValue}`,
      },
    ],
  });

  if (!result) {
    return;
  }

  const op = await aa.createSignedUserOp({
    target,
    value,
    data: '0x',
    maxFeePerGas: 0x6507a5d0,
    maxPriorityFeePerGas: 0x6507a5c0,
  });
  const printedOp = await printOp(op);
  console.log(`Signed UserOperation: ${printedOp}`);
  const body = JSON.stringify({
    op: printedOp,
  });
  const response = await fetch('https://aa-sl6bqje65q-uw.a.run.app/aa', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  const { uoHash } = await response.json();
  console.log(uoHash);
};
