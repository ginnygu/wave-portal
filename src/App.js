import './App.css';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

function App() {
	const [currentAccount, setCurrentAccount] = useState('');
	const checkIfWalletIsConnected = async () => {
		try {
			const { ethereum } = window;
			if (!ethereum) {
				console.log('Make sure you have metamask!');
				return;
			} else {
				console.log('We have an ethereum', ethereum);
			}
			const accounts = await ethereum.request({ method: 'eth_accounts' });
			console.log(accounts);
			if (accounts.length !== 0) {
				const account = await accounts[0];
				console.log('Found an authorized User', account);
				setCurrentAccount(account);
			} else {
				console.log('no users found');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const connectWallet = async () => {
		try {
			const { ethereum } = window;
			if (!ethereum) alert('Get Metamask!');
			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});
			console.log('connected', accounts[0]);
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	return (
		<div className="App">
			<h1>Hello</h1>
			<p>
				I'm Ginny and new to the Web3 world. Connect your Ethereum wallet and
				wave!
			</p>
			{!currentAccount && (
				<Button variant="outlined" onClick={connectWallet}>
					Wave at me!
				</Button>
			)}
		</div>
	);
}

export default App;
