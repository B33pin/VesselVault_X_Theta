import React, { useCallback, useEffect, useState } from "react";
import { useStateContext } from "@/context/state";
import Head from "next/head";
import Loader from "@/components/atomic/Loader";
import Button from "@/components/atomic/Button";
import { useRouter } from "next/router";
import Image from "next/image";
import HeroImage from "@/assets/hero.png";
import HowItWorks from "@/components/molecules/HowItWorks";
import { useCampaignContext } from "@/context/campaign";
import DisplayCampaigns from "@/components/organism/DisplayCampaigns";
import Link from "next/link";
import { ethers } from "ethers";
import { abi } from "@/utils";

const Home = () => {
 

  const contractAddress = process.env.NEXT_PUBLIC_VESSEL_VAULT_ADDRESS;
  
  let provider, signer, bloodDonationContract: any;

  const connect = async () => {
    if(window.ethereum) {
      provider = (new ethers.providers.Web3Provider(window.ethereum));
      await window.ethereum.enable();
      signer = await provider.getSigner();
      bloodDonationContract = new ethers.Contract(contractAddress as string, abi, signer);
      const account = await signer.getAddress();
      const isDeployer = (await bloodDonationContract.deployer()) === account;
      const isGuardian = await bloodDonationContract.isGuardian(account);
      console.log(isDeployer, isGuardian)
    }
  }

  useEffect(() => {
    if(window.ethereum) {
      connect()
    }
  }, [])
  
  const searchForBlood = async () => {
    try {
      const bloodList = await bloodDonationContract.searchBlood();
      console.log("Available blood pouches:", bloodList);

    } catch (error) {
      console.error("Error searching for blood", error);
    }
  }

  async function addGuardian() {
    const guardianAddress = "0x1563915e194D8CfBA1943570603F7606A3115508"
  
    try {
      const tx = await bloodDonationContract.addGuardian(guardianAddress);
      await tx.wait();
      console.log("Guardian added");
     
    } catch (error) {
      console.error("Error adding guardian", error);
    }
  }


  async function submitBloodDetails() {
    const pouchIDElement = document.getElementById("pouch-id");
    const donorIDElement = document.getElementById("donor-id");
    const donorZipCodeElement = document.getElementById("donor-zip");
    const bloodGroupElement = document.getElementById("blood-group");
    const bloodReportStatusElement = document.getElementById(
      "blood-report-status"
    );
  
    const pouchID = pouchIDElement.value;
    const donorID = donorIDElement.value;
    const donorZipCode = donorIDElement.value;
    const bloodGroup = bloodGroupElement.value;
    const bloodReportStatus = bloodReportStatusElement.value;
  
    showSnackbar("Submitting blood details...");
  
    try {
      const tx = await bloodDonationContract.enterBloodDetails(
        pouchID,
        donorID,
        donorZipCode,
        bloodReportStatus,
        bloodGroup
      );
      await tx.wait();
      console.log("Blood details submitted");
  
      showSnackbar("Blood details submitted");
      // Clear the input fields
      pouchIDElement.value = "";
      donorIDElement.value = "";
      donorZipCodeElement.value = "";
      bloodGroupElement.value = "";
      bloodReportStatusElement.value = "";
    } catch (error) {
      console.error("Error submitting blood details", error);
      showSnackbar("Error submitting blood details");
    }
  }
  
  

  return (
    <>
      <Head>
        <title>
          VesselVault | A Trustworthy and Transparent Blood Bank Tracking System
        </title>
        <meta
          name="description"
          content="A Trustworthy and Transparent Blood Bank Tracking System on Theta Metachain"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div>
      
      <button className="search-blood" onClick={searchForBlood}>Search Blood</button>
      <button className="add-guardian" onClick={addGuardian}>Add Guardian</button>
        <HowItWorks />
      </div>
    </>
  );
};

export default Home;
