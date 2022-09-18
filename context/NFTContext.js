import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';
import { create as ipfsHttpClient } from 'ipfs-http-client';

import { MarketAddress, MarketAddressABI } from './constants';

const projectId = '2EvbNiWe0ThvC69pVlZvsz9ubec';
const projectSecret = '6fbd6f7776d89844b6bdeb27c0a818c5';
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`;
const options = { host: 'ipfs.infura.io', protocol: 'https', port: 5001, headers: { authorization: auth } };
const client = ipfsHttpClient(options);
const dedicatedEndPoint = 'https://giri-nft-marketplace.infura-ipfs.io';

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const nftCurrency = ' ETH';

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return alert('Please install MetaMask');

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log('No accounts found!');
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) return alert('Please install MetaMask');

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    setCurrentAccount(accounts[0]);

    window.location.reload();
  };

  const uploadToInfura = async (file) => {
    try {
      const added = await client.add({ content: file });

      const url = `${dedicatedEndPoint}/ipfs/${added.path}`;

      return url;
    } catch (error) {
      console.log('Error uploading file to IPFS.');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <NFTContext.Provider value={{ nftCurrency, connectWallet, currentAccount, uploadToInfura }}>
      {children}
    </NFTContext.Provider>
  );
};
