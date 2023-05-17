
const ethers = require("ethers");

const contractAddress = "0x79EaFd0B5eC8D3f945E6BB2817ed90b046c0d0Af"; // Replace with the deployed contract address
const abi =  [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "pouchID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "receiverID",
        "type": "uint256"
      }
    ],
    "name": "assignReceiver",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "donorID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "donorZipCode",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "bloodReportStatus",
        "type": "bool"
      }
    ],
    "name": "enterBloodDetails",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "victimZipCode",
        "type": "uint256"
      }
    ],
    "name": "searchBlood",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "pouchID",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "donorID",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "donorZipCode",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "bloodReportStatus",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "receiverID",
            "type": "uint256"
          }
        ],
        "internalType": "struct BloodDonation.BloodPouch[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
const provider = new ethers.providers.Web3Provider(window.ethereum);

let bloodDonationContract;
const connectButton = document.getElementById("connect-button");

connectButton.addEventListener("click", async () => {
  connectButton.innerText = "Connecting...";
  connectButton.classList.add("connecting");
  await window.ethereum.enable();
  const signer = provider.getSigner();
  bloodDonationContract = new ethers.Contract(contractAddress, abi, signer);
  if (bloodDonationContract) {
    connectButton.innerText = "Connected";
    connectButton.classList.remove("connect");
    connectButton.classList.remove("connecting");
    connectButton.classList.add("connected");
  } else {
    connectButton.innerText = "Connect";
    connectButton.classList.remove("connected");
    connectButton.classList.remove("connecting");
    connectButton.classList.add("connect");
  }
});
// Add event listeners for the submitBloodDetails button
document.getElementById("submit-blood-button").addEventListener("click", submitBloodDetails);

// Add event listeners for the searchForBlood button
document.getElementById("search-blood-button").addEventListener("click", searchForBlood);

// Add event listeners for the assignBloodReceiver button
document.getElementById("assign-receiver-button").addEventListener("click", assignBloodReceiver);



async function submitBloodDetails() {
  const donorID = document.getElementById("donor-id").value;
  const donorZipCode = document.getElementById("donor-zip").value;
  const bloodReportStatus = document.getElementById("blood-report-status").checked;
  console.log('pressed');
  try {
    const tx = await bloodDonationContract.enterBloodDetails(donorID, donorZipCode, bloodReportStatus);
    await tx.wait();
    console.log("Blood details submitted");
  } catch (error) {
    console.error("Error submitting blood details", error);
  }
}

async function searchForBlood() {
  const victimZipCode = document.getElementById("victim-zip").value;

  try {
    const bloodList = await bloodDonationContract.searchBlood(victimZipCode);
    console.log("Available blood pouches:", bloodList);
  } catch (error) {
    console.error("Error searching for blood", error);
  }
}

async function assignBloodReceiver() {
  const pouchID = document.getElementById("pouch-id").value;
  const receiverID = document.getElementById("receiver-id").value;

  try {
    const tx = await bloodDonationContract.assignReceiver(pouchID, receiverID);
    await tx.wait();
    console.log("Receiver assigned");
  } catch (error) {
    console.error("Error assigning receiver", error);
  }
}

