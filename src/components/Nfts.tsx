import React from 'react';
import styled from 'styled-components';
import Nft from './Nft';

const StyledNfts = styled.section`
  display: grid;
  grid-auto-flow: row;
  gap: 32px;
  grid-template-columns: repeat(auto-fit, 250px);
  justify-content: center;
`;

function Nfts({ nfts }: { nfts: any[] }) {
  return (
    <StyledNfts>
      {nfts.map((nft) => (
        <Nft key={nft.contractAddress + nft.tokenId} nft={nft}></Nft>
      ))}
    </StyledNfts>
  );
}

export default Nfts;
