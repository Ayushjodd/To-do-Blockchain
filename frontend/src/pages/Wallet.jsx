import React from "react";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import { useNavigate } from "react-router-dom";

export default function Wallet() {
  const navigater = useNavigate();
  const connectWallet = async () => {
    try {
      const provider = await detectEthereumProvider();
      if (provider) {
        await provider.request({ method: "eth_requestAccounts" });

        const web3Provider = new ethers.providers.Web3Provider(provider);
        const signer = web3Provider.getSigner();
        const accounts = await web3Provider.listAccounts();

        const contractAddress = "0x795e47574f11055806e294f1b95090cd46ececdd";
        const contractABI = [
          //your abi
        ];

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log(web3Provider, accounts);
      } else {
        console.log("Please install MetaMask!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <button className="bg-sky-300 rounded-3xl p-2" onClick={connectWallet}>
        Connect
      </button>
    </>
  );
}
