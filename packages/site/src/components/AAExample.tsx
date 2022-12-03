import { useState, useContext } from 'react';
import styled from 'styled-components';
import { MetamaskActions, MetaMaskContext } from '../hooks';
import { connectAA, getAAcountBalance, transferFromAAccount } from '../utils';

const CardWrapper = styled.div<{ fullWidth?: boolean; disabled: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '250px')};
  background-color: ${({ theme }) => theme.colors.card.default};
  margin-top: 12px;
  margin-bottom: 2.4rem;
  padding: 2.4rem;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radii.default};
  box-shadow: ${({ theme }) => theme.shadows.default};
  filter: opacity(${({ disabled }) => (disabled ? '.4' : '1')});
  align-self: stretch;
  ${({ theme }) => theme.mediaQueries.small} {
    width: 100%;
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
    padding: 1.6rem;
  }
`;

const Title = styled.h2`
  margin-top: 0px;
  font-size: ${({ theme }) => theme.fontSizes.large};
`;

const TargetInput = styled.input`
  margin-top: 10px;
  font-size: 18px;
  width: 100%;
`;

const AmountInput = styled.input`
  margin-top: 10px;
  font-size: 18px;
  width: 100%;
`;

const Text = styled.div`
  margin-bottom: 1.2rem;
`;

const Spacer = styled.div`
  margin-bottom: 1.2rem;
`;

const Center = styled.div`
  text-align: center;
`;

const Button = styled.button`
  align-items: center;
  justify-content: center;
  margin-top: auto;
  ${({ theme }) => theme.mediaQueries.small} {
    width: 100%;
  }
`;

export const AAExample = () => {
  const [, dispatch] = useContext(MetaMaskContext);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [target, setTarget] = useState('');
  const [ethAmount, setEthAmount] = useState('');

  const handleConnectAAClick = async () => {
    try {
      setAddress(await connectAA());
      setBalance(await getAAcountBalance());
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const handleLoadAAccountBalanceClick = async () => {
    try {
      setBalance(await getAAcountBalance());
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const handleTargetChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setTarget(event.currentTarget.value);
  };

  const handleEthAmountChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setEthAmount(event.currentTarget.value);
  };

  const handleTransferFromAAccountClick = async () => {
    if (!target || !ethAmount) {
      return;
    }

    try {
      await transferFromAAccount(target, ethAmount);
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  return (
    <>
      {!address && (
        <CardWrapper fullWidth={true} disabled={false}>
          <Center>
            <Button onClick={handleConnectAAClick}>
              Connect Abstract Account
            </Button>
          </Center>
        </CardWrapper>
      )}
      {address && (
        <>
          <CardWrapper fullWidth={true} disabled={false}>
            <Title>Your Abstract Account 🎉</Title>
            <Text>Address: {address}</Text>
            <Text>Balance: {balance}</Text>
          </CardWrapper>
          <CardWrapper fullWidth={true} disabled={false}>
            <Title>Control Abstract Account</Title>
            <div>
              <TargetInput
                type="text"
                placeholder="Target"
                onChange={handleTargetChange}
              />
              <AmountInput
                type="number"
                placeholder="Amount"
                onChange={handleEthAmountChange}
              />
            </div>
            <Center>
              <Spacer />
              <Button onClick={handleTransferFromAAccountClick}>
                Transfer from AA
              </Button>
              <Spacer />
              <Button onClick={handleLoadAAccountBalanceClick}>
                Reload AA Balance
              </Button>
            </Center>
          </CardWrapper>
        </>
      )}
    </>
  );
};
