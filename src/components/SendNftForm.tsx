import React, { useState } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';
import useProvider from '../hooks/useProvider';
import Button from './Button';

const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const StyledLabel = styled.label`
  font-size: 0.65rem;
  text-transform: uppercase;
  font-weight: 700;
  color: ${(props) => props.theme.colors.neutral['500']};
  flex-shrink: 0;
  margin-bottom: 4px;
`;

const StyledInput = styled.input`
  border: 2px solid ${(props) => props.theme.colors.neutral['400']};
  font-size: 1rem;
  padding: 0 0.5rem;
  width: 150px;
  border-right: none;
`;

const InputGroup = styled.div`
  display: flex;
`;

const ABI = ['function safeTransferFrom(address _from, address _to, uint256 _tokenId) external'];

function SendNftForm({
  contractAddress,
  tokenId,
  onSubmit,
}: {
  contractAddress: string;
  tokenId: string;
  onSubmit: () => void;
}) {
  const { provider } = useProvider();
  const [receiver, setReceiver] = useState<string>('');
  const inputId = `send-input-${contractAddress + tokenId}`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let receiverAddress;

    // Check that address is valid
    try {
      receiverAddress = ethers.utils.getAddress(receiver);
    } catch {
      throw new Error('Invalid address!');
    }

    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();
    const contract = new ethers.Contract(contractAddress, ABI, signer);

    // Estimate gas price
    const gasPrice = await provider.getGasPrice();

    await contract
      .safeTransferFrom(userAddress, receiverAddress, tokenId, { gasPrice })
      .catch((e: Error) => {
        throw new Error(e.message);
      });
    onSubmit();
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setReceiver(e.target.value);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLabel htmlFor={inputId}>Send to address</StyledLabel>
      <InputGroup>
        <StyledInput required onInput={handleInput} type="text" id={inputId} />
        <Button type="submit">Send</Button>
      </InputGroup>
    </StyledForm>
  );
}

export default SendNftForm;
