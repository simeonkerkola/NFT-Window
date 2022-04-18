import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Button from './components/Button';
import useCovalent from './hooks/useCovalent';
import useProvider from './hooks/useProvider';
import Nfts from './components/Nfts';
import theme from './theme';

const StyledApp = styled.div`
  background-color: ${(props) => props.theme.colors.neutral['50']};
  color: ${(props) => props.theme.colors.neutral['900']};
  min-height: 100vh;
  padding: 0 20px 50px 20px;
`;

const StyledMain = styled.main`
  max-width: 900px;
  margin: 0 auto;
`;

const StyledSection = styled.section`
  padding: 40px 0;
`;

const StyledInfo = styled.div`
  background-color: ${(props) => props.theme.colors.primary['400']};
  display: flex;
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.elevation['1']};
`;

const StyledTitle = styled.h2`
  font-size: 1.1rem;
  margin-bottom: 32px;
  color: ${(props) => props.theme.colors.neutral['500']};
`;

const StyledArticle = styled.article`
  padding: 20px;

  :not(:last-child) {
    border-right: 1px solid ${(props) => props.theme.colors.primary['500']};
  }
`;

const StyledArticleTitle = styled.h3`
  font-size: 0.7rem;
  color: ${(props) => props.theme.colors.primary['100']};
  text-transform: uppercase;
`;

const StyledArticleValue = styled.span`
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.primary['50']};
  overflow-wrap: anywhere;
`;

const StyledStatus = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledStatusMsg = styled.p`
  text-align: center;
  margin-top: 56px;
  margin-bottom: 32px;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.neutral['200']};
`;

const App = () => {
  const [account, setAccount] = useState<string>('');
  const { provider } = useProvider();
  const { loading, errorMsg, nfts } = useCovalent(account);

  useEffect(() => {
    async function handleAccountsChanged() {
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);
    }

    window.ethereum?.on('accountsChanged', handleAccountsChanged);
    window.ethereum?.on('chainChanged', () => {
      window.location.reload();
    });
    return () => window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
  }, [provider]);

  async function handleClick() {
    const accounts = await provider.send('eth_requestAccounts', []);
    setAccount(accounts[0]);
  }

  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <StyledMain>
          <StyledSection>
            <StyledInfo>
              <StyledArticle>
                <StyledArticleTitle>Collection size</StyledArticleTitle>
                <StyledArticleValue>{nfts.length}</StyledArticleValue>
              </StyledArticle>
              <StyledArticle>
                <StyledArticleTitle>Wallet</StyledArticleTitle>
                <StyledArticleValue>{account ? account : '-'}</StyledArticleValue>
              </StyledArticle>
            </StyledInfo>
          </StyledSection>
          <StyledTitle>NFT Window</StyledTitle>
          <Nfts nfts={nfts}></Nfts>
          <StyledStatus>
            {errorMsg ? (
              <StyledStatusMsg>Error when fetching NFTs: {errorMsg}</StyledStatusMsg>
            ) : loading ? (
              <StyledStatusMsg>Loading...</StyledStatusMsg>
            ) : !nfts.length ? (
              <StyledStatusMsg>No NFTs to show</StyledStatusMsg>
            ) : null}
            {!account ? <Button onClick={handleClick}>Connect account</Button> : null}
          </StyledStatus>
        </StyledMain>
      </StyledApp>
    </ThemeProvider>
  );
};

export default App;
