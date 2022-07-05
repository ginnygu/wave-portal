import "./App.css";
import { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import abi from "./utils/WavePortal.json";
import WaveBox from "./components/WaveBox";
import AllWaves from "./components/AllWaves";

function App() {
	const [currentAccount, setCurrentAccount] = useState("");
	const [alertMessage, setAlertMessage] = useState("");
	const [allWaves, setAllWaves] = useState([]);
	const [message, setMessage] = useState("");
	const [totalWaves, setTotalWaves] = useState(0);

	const contractAddress = "0xa660b07eBfe3445fFFf56dD35AEd2b495fE3D40a";
	const contractABI = abi.abi;

	const connectWallet = async () => {
		try {
			const { ethereum } = window;
			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			});
			if (accounts) {
				setAlertMessage("");
				setCurrentAccount(accounts[0]);
			} else {
				console.log("something went wrong");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const getAllWaves = useCallback(async () => {
		try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const wavePortalContract = new ethers.Contract(
					contractAddress,
					contractABI,
					signer
				);
				const waves = await wavePortalContract.getAllWaves();

				const cleanedWaves = [];
				waves.forEach((wave) => {
					cleanedWaves.push({
						address: wave.waver,
						timestamp: new Date(wave.timestamp * 1000),
						message: wave.message,
					});
				});
				setAllWaves(cleanedWaves);
				setTotalWaves(waves.length);
			} else {
				setAlertMessage("Please connect to the wallet!");
			}
		} catch (error) {
			console.log(error);
		}
	}, [contractABI]);

	const wave = async () => {
		try {
			const { ethereum } = window;
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const wavePortalContract = new ethers.Contract(
					contractAddress,
					contractABI,
					signer
				);

				const waveTxn = await wavePortalContract.wave(message);
				console.log(waveTxn);

				await waveTxn.wait();

				setMessage("");
				getAllWaves();
			} else {
				console.log("Ethereum object doesn't exist!");
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		const checkIfWalletIsConnected = async () => {
			try {
				const { ethereum } = window;
				if (!ethereum) {
					setAlertMessage("Please get Metamask!");
					return;
				}
				const accounts = await ethereum.request({ method: "eth_accounts" });
				if (accounts.length !== 0) {
					const account = await accounts[0];
					setCurrentAccount(account);
				} else {
					setAlertMessage("Please connect to the wallet!");
				}
			} catch (error) {
				console.log(error);
			}
		};
		checkIfWalletIsConnected();
		getAllWaves();
	}, [contractABI, getAllWaves, currentAccount]);

	return (
		<div className="App">
			<div className="heading">
				<h1>
					Hello <EmojiPeopleIcon />
				</h1>
				<p>
					I'm Ginny and new to the Web3 world. Connect your Ethereum wallet and
					wave!
				</p>
			</div>
			<div>
				{!currentAccount ? (
					<>
						<p>{alertMessage}</p>
						<br />
						<button onClick={connectWallet}>Connect to the wallet</button>
					</>
				) : (
					<WaveBox message={message} setMessage={setMessage} wave={wave} />
				)}
			</div>
			{!currentAccount ? (
				<p>Loading...</p>
			) : (
				<>
					<p>We have a total of {totalWaves} waves</p>
					<div className="wave-wrap">
						{allWaves.map((wave) => (
							<div className="wave" key={wave.timestamp.toString()}>
								<AllWaves wave={wave} />
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
}

export default App;
