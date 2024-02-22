
import { ethers } from "ethers";
import { useEffect, useState } from 'react';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import contractABI from './abi.json';

export default function Home() {
  const contractAddress = "0x51d8573a677e2B274D2c7Dbc8c2c03CFDA4e94e1"
  const abi = contractABI;

  const [provider, setProvider] = useState();
  const [orgAddress, setOrgAddress] = useState();
  const [orgName, setOrgName] = useState();
  const [orgSymbol, setOrgSymbol] = useState();
  const [tokenAddress, setTokenAddress] = useState();

  const [stakeholderAddress, setStakeholderAddress] = useState('');
  const [stakeholderType, setStakeholderType] = useState('');

  const [vestingStakeholderAddress, setVestingStakeholderAddress] = useState('');
  const [releaseTimes, setReleaseTimes] = useState([]);
  const [amount, setAmount] = useState([]);

  const [loading, setLoading] = useState(false);

  async function initWallet() {
    try {
      if (typeof window.ethereum === 'undefined') {
        console.log("Please install wallet.")
        alert("Please install wallet.")
        return
      }
      const web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider,
          },
        },
      });
      const instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      setProvider(provider);
      return provider;
    } catch (error) {
      console.log(error)
      return;
    }
  }

  async function registerOrganization() {
    try {
      setLoading(true); 
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      await contract.registerOrganization(orgAddress, orgName, orgSymbol, tokenAddress);
      setLoading(false);
      alert("Organization registered successfully.");
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  }

  async function whitelistStakeholder() {
    try {
      setLoading(true);
      const signer = provider.getSigner(); 
      const contract = new ethers.Contract(contractAddress, abi, signer);
      await contract.whitelistStakeholder(orgAddress, stakeholderAddress, stakeholderType);
      setLoading(false);
      alert("Stakeholder whitelisted successfully.");
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  }

  async function tokenClaim() {
    try {
      setLoading(true); 
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      /* const releaseTimes = [vestingTime]; // Assuming one release time for simplicity
      const tokenAmounts = [vestingAmount]; // Assuming one amount for simplicity */
      await contract.claimTokens(orgAddress);

      setLoading(false);
      alert("Tokens claimed successfully.");
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  }
  async function addSchedule() {
    try {
      setLoading(true); 
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      await contract.addVestingSchedule(orgAddress, vestingStakeholderAddress, releaseTimes, amount);
      setLoading(false);
      alert("Vesting schedule added successfully.");
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    initWallet();
  }, []);

  return (
    <div className='flex-col p-24 m-6 space-y-4 content-center justify-around'>

      <h1 className="text-gray-700 text-3xl font-bold">
        VESTING dApp
      </h1>
      <h1 className="text-gray-700 text-3xl font-bold">
        Organization Registration
      </h1>
      <input onChange={(e)=>{ setOrgAddress(e.target.value);}}
        className="placeholder:italic transition-all placeholder:text-gray-500 w-4/6 border border-gray-500 rounded-md p-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
        placeholder="Organization Address" 
        type="text" 
        name="orgName"
      />
      
      <input 
        onChange={(e) => {setOrgName(e.target.value);}}
        className="placeholder:italic transition-all placeholder:text-gray-500 w-4/6 border border-gray-500 rounded-md p-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
        placeholder="Organization Name" 
        type="text" 
        name="orgName"
      />

      <input 
        onChange={(e) => {setOrgSymbol(e.target.value);}}
        className="placeholder:italic transition-all placeholder:text-gray-500 w-4/6 border border-gray-500 rounded-md p-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
        placeholder="Organization Symbol" 
        type="text" 
        name="orgSymbol"
      />

      <input 
        onChange={(e) => {setTokenAddress(e.target.value);}}
        className="placeholder:italic transition-all placeholder:text-gray-500 w-4/6 border border-gray-500 rounded-md p-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
        placeholder="Organization Token Address" 
        type="text" 
        name="orgToken"
      />

      <button 
        onClick={registerOrganization} 
        className='px-4 py-1 bg-slate-300 flex justify-around hover:bg-slate-500 transition-all w-32'
        disabled={loading}
      > 
        { loading ? "Loading..." : "Register Organization"} 
      </button>

      {/* Stakeholder Whitelisting */}
      <h1 className="text-gray-700 text-3xl font-bold">
        Whitelist Stakeholder
      </h1>
      <div>
        <input onChange={(e) => {setOrgAddress(e.target.value);}} 
        className="w-96 border border-gray-500 rounded-md p-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
        placeholder="Organisation Address" type="text" 
        /> <br/>

        <input onChange={(e) => {setStakeholderAddress(e.target.value);}} 
        className="w-96 border border-gray-500 rounded-md p-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
        placeholder="Stakeholder Address" type="text"
         /> <br/>

        <input onChange={(e) => {setStakeholderType(e.target.value);}} 
        className="w-96 border border-gray-500 rounded-md p-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="founder, community, investor..." type="text" />
        <button onClick={whitelistStakeholder} disabled={loading} className='border px-4 py-1 bg-slate-300 hover:bg-slate-500 flex justify-around transition-all w-32'>Whitelist Stakeholder</button>
      </div>

      {/* Vesting Schedule */}
      <h1 className="text-gray-700 text-3xl font-bold">
        Add Vesting Schedule
      </h1>
      <input onChange={(e) => setOrgAddress(e.target.value)}
        className="placeholder:italic transition-all placeholder:text-gray-500 w-4/6 border border-gray-500 rounded-md p-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder="Enter organisation address"
        type="text"
        name="orgAddress"
      />
      
      <input onChange={(e) => setVestingStakeholderAddress(e.target.value)}
        className="placeholder:italic transition-all placeholder:text-gray-500 w-4/6 border border-gray-500 rounded-md p-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder="Enter staker address"
        type="text"
        name="stakerAddress"
      />
      <input onChange={(e) => setReleaseTimes(e.target.value)}
        className="placeholder:italic transition-all placeholder:text-gray-500 w-4/6 border border-gray-500 rounded-md p-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder="Enter vesting time"
        type="number"
        name="releaseTimes"
      />

      <input onChange={(e) => setAmount(e.target.value)}
        className="placeholder:italic transition-all placeholder:text-gray-500 w-4/6 border border-gray-500 rounded-md p-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder="Enter amount"
        type="number"
        name="tokenAmounts"
      />
      
      <button
        onClick={addSchedule}
        className='px-4 py-1 bg-slate-300 hover:bg-slate-500 flex justify-around transition-all w-32'
        disabled={loading}>
        { loading ? "Loading..." : "Add Vesting Schedule"} 
      </button>
      
       {/* Button to claim tokens */}

       <div>
       <input onChange={(e) => {setOrgAddress(e.target.value);}} 
        className="w-96 border border-gray-500 rounded-md p-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
        placeholder="Organisation Address" type="text" /> <br/>

        <button
               onClick={() => tokenClaim()}
                className='px-4 py-1 bg-slate-300 hover:bg-slate-500 flex justify-around transition-all w-32'
                disabled={loading} 
                >
                {loading ? "Loading..." : "Claim Tokens"}
            </button>
       </div>
            
       
    </div>
  );
}