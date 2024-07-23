import { ethers } from "./ethers-5.6.esm.min.js";
import { abi, contractAddress } from "./constants.js";

const connectButton = document.getElementById("connectButton");
const setNumberButton = document.getElementById("setNumberButton");
const getNumberButton = document.getElementById("getNumberButton");
const numberInput = document.getElementById("numberInput");
const currentNumber = document.getElementById("currentNumber");

connectButton.onclick = connect;
setNumberButton.onclick = setNumber;
getNumberButton.onclick = getNumber;

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      console.log("Solicitando acceso a MetaMask...");
      await window.ethereum.request({ method: "eth_requestAccounts" });
      console.log("Conectado a MetaMask");
      connectButton.innerHTML = "Connected";
    } catch (error) {
      console.error("Error al conectar a MetaMask:", error);
    }
    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts);
    await checkEthBalance(accounts[0]);
  } else {
    connectButton.innerHTML = "Please install MetaMask";
    console.log("MetaMask no está instalado");
  }
}

async function checkEthBalance(account) {
  if (window.ethereum) {
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      });
      console.log("Eth Balance", ethers.utils.formatEther(balance));
    } catch (err) {
      console.error("Error al obtener el balance de ETH:", err);
    }
  }
}

async function setNumber() {
  const number = numberInput.value;
  console.log(`Intentando establecer el número: ${number}`);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      console.log("Enviando transacción a setNumber...");
      const transactionResponse = await contract.setNumber(number);
      console.log("Transacción enviada:", transactionResponse);
      await listenForTransactionMine(transactionResponse, provider);
      console.log("Número establecido correctamente");
    } catch (error) {
      console.error("Error al establecer el número:", error);
    }
  } else {
    console.log("MetaMask no está disponible");
  }
}

async function getNumber() {
  console.log("Intentando obtener el número actual...");
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    try {
      const number = await contract.getNumber();
      console.log("Número obtenido:", number);
      currentNumber.innerHTML = `Current Number: ${number}`;
      console.log(`Número obtenido: ${number}`);
    } catch (error) {
      console.error("Error al obtener el número:", error);
    }
  } else {
    console.log("MetaMask no está disponible");
  }
}

// Función para escuchar la confirmación de la transacción
function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}...`);
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (transactionReceipt) => {
      console.log(
        `Transacción completada con ${transactionReceipt.confirmations} confirmaciones.`
      );
      resolve();
    });
  });
}
