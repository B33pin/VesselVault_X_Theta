const ethers = require("ethers");
const contractAddress = "0x683ba8076b72A271Fb3e4E9D7762D34a7e026936";
const abi = [
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
        "name": "guardian",
        "type": "address"
      }
    ],
    "name": "addGuardian",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
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
      }
    ],
    "name": "assignReceiver",
    "outputs": [],
    "stateMutability": "payable",
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
    "inputs": [],
    "name": "deployer",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
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
        "internalType": "address",
        "name": "donorID",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "donorZipCode",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "bloodReportStatus",
        "type": "string"
      },
      {
        "internalType": "enum BloodDonation.BloodGroup",
        "name": "bloodGroup",
        "type": "uint8"
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
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "isGuardian",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
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
    "inputs": [],
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
            "internalType": "address",
            "name": "donorID",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "donorZipCode",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "bloodReportStatus",
            "type": "string"
          },
          {
            "internalType": "enum BloodDonation.BloodGroup",
            "name": "bloodGroup",
            "type": "uint8"
          },
          {
            "internalType": "address",
            "name": "receiverID",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "gurdainID",
            "type": "address"
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
]; // Replace with your contract's ABI

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

    const account = await signer.getAddress();
    const isDeployer = (await bloodDonationContract.deployer()) === account;
    const isGuardian = await bloodDonationContract.isGuardian(account);

    document.getElementById("add-guardian-section").style.display = isDeployer
      ? "block"
      : "none";
    document.getElementById("enter-blood-details-section").style.display =
      isGuardian ? "block" : "none";
    document.getElementById("search-and-assign-section").style.display =
      "block";
  } else {
    connectButton.innerText = "Connect";
    connectButton.classList.remove("connected");
    connectButton.classList.remove("connecting");
    connectButton.classList.add("connect");
  }
});

document
  .getElementById("add-guardian-button")
  .addEventListener("click", addGuardian);
document
  .getElementById("submit-blood-button")
  .addEventListener("click", submitBloodDetails);
document
  .getElementById("search-blood-button")
  .addEventListener("click", searchForBlood);

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
async function addGuardian() {
  const guardianAddress = document.getElementById("guardian-address").value;

  try {
    const tx = await bloodDonationContract.addGuardian(guardianAddress);
    await tx.wait();
    console.log("Guardian added");
    document.getElementById("guardian-address").value = "";
  } catch (error) {
    console.error("Error adding guardian", error);
  }
}

async function searchForBlood() {
  try {
    const bloodList = await bloodDonationContract.searchBlood();
    console.log("Available blood pouches:", bloodList);

    let resultsDiv = document.getElementById("search-results");
    resultsDiv.innerHTML = ""; // Clear previous results

    let table = document.createElement("table");

    // Add table header
    let header = table.insertRow();
    header.innerHTML =
      "<th>SN</th><th>Pouch ID</th><th>Donor ID</th><th>Blood Group</th><th>Request</th>";

    // Add rows for blood pouches
    for (let i = 0; i < bloodList.length; i++) {
      let row = table.insertRow();
      row.innerHTML = `
        <td>${i + 1}</td>
        <td>${bloodList[i].pouchID}</td>
        <td>${bloodList[i].donorID}</td>
        <td>${bloodList[i].bloodGroup}</td>
        <td><button class="request-button" data-pouch-id="${
          bloodList[i].pouchID
        }" gurdain-id="${bloodList[i].gurdainID}">Request</button></td>
      `;
    }

    resultsDiv.appendChild(table);

    // Add click events for request buttons
    let requestButtons = document.getElementsByClassName("request-button");
    for (let i = 0; i < requestButtons.length; i++) {
      requestButtons[i].addEventListener("click", async function () {
        let pouchID = this.getAttribute("data-pouch-id");
        let gurdainID = this.getAttribute("gurdain-id");
        // You may want to ask for the receiver ID here or set it beforehand.

        assignBloodReceiver(pouchID,gurdainID);
      });
    }
  } catch (error) {
    console.error("Error searching for blood", error);
  }
}

async function assignBloodReceiver(pouchID, gurdainID) {
  try {
    await window.ethereum.enable();
    const signer = provider.getSigner();
    // Set the amount of ether you want to send (in this case, 10 ether)
    const amountToSend = ethers.utils.parseEther("10");
    const tx = await bloodDonationContract.connect(signer).assignReceiver(pouchID, { value: amountToSend });
    await tx.wait();
    console.log("Receiver assigned");
  } catch (error) {
    console.error("Error assigning receiver", error);
  }
}



function showSnackbar(message) {
  const snackbar = document.getElementById("snackbar");
  snackbar.innerText = message;
  snackbar.className = "show";
  setTimeout(function () {
    snackbar.className = snackbar.className.replace("show", "");
  }, 3000);
}

async function fundCampaign() {
  try {
    await window.ethereum.enable();
    const signer = provider.getSigner();
    const amountToSend = ethers.utils.parseEther("10");
    const tx = await bloodDonationContract.connect(signer).donateToCampaign(iD, { value: amountToSend });
    await tx.wait();
    console.log("Donated");
  } catch (error) {
    console.error("Error Donation", error);
  }
}