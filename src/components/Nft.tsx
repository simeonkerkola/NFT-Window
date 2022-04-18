import React, { useState } from 'react';
import styled from 'styled-components';
import placeholder from './placeholder.png';
import { NFT } from '../hooks/useCovalent';
import SendNftForm from './SendNftForm';

interface Props {
  nft: NFT;
}

const StyledNft = styled.article`
  background: white;
  border-radius: 10px;
  flex-grow: 1;
  box-shadow: ${(props) => props.theme.elevation['2']};
`;

const StyledContent = styled.div`
  padding: 24px 24px;
  display: flex;
  flex-direction: column;
`;

const StyledHeading = styled.h3`
  font-size: 1.1rem;
  color: ${(props) => props.theme.colors.neutral['700']};
  margin-bottom: 8px;
`;

const StyledSubHeading = styled.h4`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.neutral['500']};
  margin-bottom: 18px;
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.colors.neutral['400']};
  width: fit-content;
  text-decoration: underline;
  font-weight: 700;
  font-size: 0.8rem;
  transition: color 0.2s ease-in-out;
  margin-bottom: 36px;

  &.active {
    color: ${(props) => props.theme.colors.primary['900']};
  }
  &:hover {
    color: ${(props) => props.theme.colors.primary['600']};
  }
`;

const StyledImg = styled.img`
  border-radius: 10px 10px 0 0;
  width: fill-available;
  object-fit: cover;
  background: url(${placeholder}) no-repeat center center,
    ${(props) => props.theme.colors.neutral['100']};
  height: 250px;
`;

function Nft({ nft }: Props) {
  const [hidden, setHidden] = useState(false);
  function handleSubmit() {
    setHidden(true);
  }

  return hidden ? null : (
    <StyledNft>
      <StyledImg src={nft.image} alt="" />
      <StyledContent>
        <StyledHeading>{nft.name}</StyledHeading>
        <StyledSubHeading>#{nft.tokenId}</StyledSubHeading>
        <StyledLink href={`https://etherscan.io/address/${nft.contractAddress}`}>
          Contract
        </StyledLink>
        <SendNftForm
          contractAddress={nft.contractAddress}
          tokenId={nft.tokenId}
          onSubmit={handleSubmit}
        ></SendNftForm>
      </StyledContent>
    </StyledNft>
  );
}

export default Nft;
