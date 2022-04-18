import { useState } from 'react';
import { ethers } from 'ethers';

export default function useCovalent() {
  const [provider] = useState<ethers.providers.Web3Provider>(
    new ethers.providers.Web3Provider(window.ethereum, 'any')
  );

  return { provider };
}
