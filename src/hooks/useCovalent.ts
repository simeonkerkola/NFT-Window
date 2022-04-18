import { useState, useEffect } from 'react';

export interface NFT {
  contractAddress: string;
  tokenId: string;
  image: string;
  name: string;
}

interface CovalentResponse {
  error: boolean;
  error_message: string;
  data?: {
    items?: {
      type: string;
      contract_name: string;
      contract_address: string;
      nft_data?: {
        external_data?: { image: string; image_256: string };
        token_id: string;
      }[];
      supports_erc: string[];
    }[];
  };
}

export default function useCovalent(accountId: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [nfts, setNfts] = useState<NFT[]>([]);

  function getIsNft(item: any) {
    return (
      item.type === 'nft' &&
      item.nft_data?.length &&
      (item.supports_erc.includes('erc721') || item.supports_erc.includes('erc1155'))
    );
  }

  useEffect(() => {
    async function fetchNftData() {
      //  1 = Mainnet, 42 = Kavan
      const chainId = window.ethereum?.networkVersion || '1';

      setLoading(true);
      setErrorMsg('');

      const res = await fetch(
        `https://api.covalenthq.com/v1/${chainId}/address/${accountId}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=${
          process.env.REACT_APP_COVALENT_KEY as string
        }`
      ).catch((e: Error) => {
        setErrorMsg(e.message);
        setLoading(false);
        throw new Error("Couldn't fetch NFT data " + e.message);
      });
      if (res) {
        const json: CovalentResponse = await res.json().catch((e: Error) => {
          setErrorMsg(e.message);
          setLoading(false);
        });
        if (json.error) setErrorMsg(json.error_message);
        if (json.data?.items?.length) {
          const nftTokens = json.data.items.filter((item) => getIsNft(item));
          const nfts: NFT[] = nftTokens.reduce((acc: NFT[], token) => {
            const nftData =
              token?.nft_data?.map((nft) => {
                return {
                  name: token.contract_name,
                  contractAddress: token.contract_address,
                  image: nft.external_data?.image_256 || nft.external_data?.image || '',
                  tokenId: nft.token_id,
                };
              }) || [];
            return [...acc, ...nftData];
          }, []);
          setNfts(nfts);
          setLoading(false);
        }
      }
    }
    if (accountId) fetchNftData();
  }, [accountId]);

  return { loading, errorMsg, nfts };
}
