import React from "react";
import { useEffect, useState } from "react";
import {
  DafeisContract,
  connectWallet,
  loadTotalMintCount,
  getCurrentWalletConnected,
  mintDafeisCount,
  Reserve,
  Pause,
} from "./util/interact.js";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

import './App.css';
import {Button, Container, Row, Col, Navbar,  Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
// import img1_1 from './Assets/1_1.png'
// import img1_2 from './Assets/1_2.png'
// import img1_3 from './Assets/1_3.png'
import gif_animation from './Assets/gif_animation.gif'
import img_page2 from './Assets/new_32.png'
import img_page3 from './Assets/new_22.png'
import img2_1 from './Assets/new_125.png'
import img2_2 from './Assets/new_298.png'
import img2_3 from './Assets/new_48.png'
// import twitter_ico from './Assets/footer-twitter.svg'

const DaFeis = () => {
	const [walletAddress, setWallet] = useState("");
	const [totalMintCount, setTotalMintCount] = useState("0");
	const [mintCount, setMintCount] = useState(1);
	const [timeLeft, setTimeLeft] = useState({days:0,hours:0,minutes:0,seconds:0});
		
	const calculateTimeLeft = () => {
		let difference = new Date(`2021-10-03T18:00:00.000+02:00`) - new Date(); //2021-09-25T20:00:00.000+02:00
		let timeLeft = {};
		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60)
			};
		}
		return timeLeft;
	}

	useEffect(() => {
		async function getInformation() {
			const count = await loadTotalMintCount();
			setTotalMintCount(count);
			setMintCount(1);
			addSmartContractListener();

			const { address,  } = await getCurrentWalletConnected();
			setWallet(address);
			addWalletListener();
		}

		const startTimer = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
			// if(timeLeft.seconds === undefined) clearInterval(startTimer);
		}, 1000);
		getInformation()
	}, [])

	function addSmartContractListener() {
		DafeisContract.events.JoinFace({}, (error, data) => {
			if (error) {
			} else {
			}
		});
	}

	function addWalletListener() {
		if (window.ethereum) {
		window.ethereum.on("accountsChanged", (accounts) => {
			if (accounts.length > 0) {
				setWallet(accounts[0]);
			} else {
				setWallet("");
			}
		});
		} else {
		}
	}

	const connectWalletPressed = async () => {
		const walletResponse = await connectWallet();
		setWallet(walletResponse.address);
	};

	const onMintPressed = async() => {
		console.log(mintCount);
		await mintDafeisCount(walletAddress, mintCount);
	}

	// const onReserve = async() =>{
	// 	await Reserve(walletAddress, mintCount);
	// }

	// const onPause = async() =>{
	// 	await Pause(walletAddress, false);
	// }
	return (
		<>
			<Router>
			<Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' style={{paddingTop:'0px',paddingBottom:'0px', position:'relative'}}>
				<Container>
					<Navbar.Brand href="#"  style={{marginLeft:'0px', height:'110px'}} ></Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav"/>
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto"  style={{fontSize:'25px'}}>
						<Link to="/"><Button style={{background: 'none', border: 'none',fontSize: '19pt',
								fontWeight:'bold',letterSpacing: '2pt'}}>DAFEIS</Button>
						</Link>
						</Nav>
						<Nav className="me-auto">
						</Nav>
						<Nav className="ml-auto">
							<Button href="#Roadmap" variant="primary" style={{marginLeft:'10px',marginRight:'10px',background: 'none', border: 'none',fontSize: '15pt',}}>ROADMAP</Button>
							<Button href="#Faq" variant="primary" style={{marginLeft:'10px',marginRight:'10px',background: 'none', border: 'none',fontSize: '15pt',}}>FAQ</Button>
							<Button href="#Team"  variant="primary" style={{marginLeft:'10px',marginRight:'10px',background: 'none', border: 'none',fontSize: '15pt'}}>TEAM</Button>
							<Link to="/termcondition">
								<Button variant="primary" style={{marginLeft:'10px',marginRight:'10px',background: 'none', border: 'none',fontSize: '15pt'}}>T&C</Button>
							</Link>
							<Button href='https://twitter.com/da_feis' target="_blank" rel="noreferrer" variant="primary" className="navbar-link-block w-inline-block" style={{marginLeft:'10px',marginRight:'10px',background: 'none', border: 'none',fontSize: '15pt',}}>
								<img src="https://assets.website-files.com/61211faffaafcac4231a603c/61211faffaafcac62e1a608d_Twitter%20-%20Negative.svg" loading="lazy" alt=""/>
							</Button>
							<Button href='https://discord.gg/wD2xSWwGgx' target="_blank" rel="noreferrer" variant="primary" className="navbar-link-block w-inline-block" style={{marginLeft:'10px',marginRight:'10px',background: 'none', border: 'none',fontSize: '15pt',}}>
								<img src="https://assets.website-files.com/61211faffaafcac4231a603c/61211faffaafca5d3a1a608b_Discord%20-%20Negative.svg" loading="lazy" alt=""/>
							</Button>
							<Button href='https://opensea.io/collection/dafeisnftcollection' target="_blank" rel="noreferrer" variant="primary" style={{ marginLeft:'10px',marginRight:'10px',background: 'none', fontSize: '15pt', fontWeight:'bold',
							borderWidth: '2px', borderRadius: '0px', borderColor: 'rgb(128 84 20)'}}>OPENSEA</Button>
							<Button variant="primary" style={{ marginLeft:'10px',marginRight:'10px',background: 'none', fontSize: '15pt', fontWeight:'bold',
							borderWidth: '2px', borderRadius: '0px', borderColor: 'white'}} onClick={connectWalletPressed}>
								{walletAddress.length > 0 ? (
								String(walletAddress).substring(0, 6) +
								"..." +
								String(walletAddress).substring(38)
								) : (
								<span>Connect</span>
								)}
							</Button>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
        <Switch>
          <Route path="/termcondition">
            <TermsAndCondition />
          </Route>
          <Route path="/">
			<div className="page-wrapper">				
				{
					timeLeft.seconds !== undefined 
										? (
											<>											
						<div className="main-section new-hero-section wf-section" style={{textAlign:'center', fontSize:'40pt', backgroundColor:'#35260c', paddingTop:'calc(50vh - 200px)'}}>
							<h1 className="timeline-heading" style={{textAlign:'center', fontSize:'40pt'}}>the Sale start 03.10 at 6PM CET</h1><br/>
							<h1 className="timeline-heading" style={{textAlign:'center', fontSize:'60pt'}}>COOMING SOON</h1><br/>
							<h1 className="timeline-heading" style={{textAlign:'center', fontSize:'50pt'}}>{timeLeft.days} days&nbsp;&nbsp;  {timeLeft.hours} : {timeLeft.minutes} : {timeLeft.seconds}&nbsp;&nbsp;Left</h1>
						</div>
				</>
				)
				: (
					<>
					</>
				)
				}
				<div className="main-section new-hero-section wf-section" id="Hero-Section">					
					<div className="main-container hero-container">
						<div className="hero-div-wrapper">
							<div className="hero-grid-left">
								<h1 className="timeline-heading">WELCOME TO<br/></h1>
								<h1 className="main-heading"><i>DaFeis</i><br/></h1>
								<h1 className="yellow-section-paragraph ">A collection of 10,000 unique, cool and diverse country-themed version of DaFеis!<br/></h1>								
								<p className="hero-paragraph"><strong className="bold-text-3"> 😱 10,000 DaFeis minting at 0.033 ETH 😱</strong>
								</p>
								<a href="https://discord.gg/wD2xSWwGgx" target="_blank" rel="noreferrer" className="main-button w-button">Join Our Discord
								</a>
								<div className="settings soldout" style={{display:"flex", justifyContent:'center', marginTop:'20px'}}>
									{
										totalMintCount < 10000 
										? (
											<>
											<select onChange={e => setMintCount(e.target.value)}>
												<option value="1">1</option>
												<option value="2">2</option>
												<option value="3">3</option>
												<option value="4">4</option>
												<option value="5">5</option>
												<option value="6">6</option>
												<option value="7">7</option>
												<option value="8">8</option>
												<option value="9">9</option>
												<option value="10">10</option>
												<option value="11">11</option>
												<option value="12">12</option>
												<option value="13">13</option>
												<option value="14">14</option>
												<option value="15">15</option>
												<option value="16">16</option>
												<option value="17">17</option>
												<option value="18">18</option>
												<option value="19">19</option>
												<option value="20">20</option>
											</select>
											<Button variant="primary" disabled={timeLeft.seconds!==undefined} className="cta soldout" style={{ marginLeft:'20px',background: 'hsla(177, 71.1%, 14.9%, 1)', fontSize: '15pt', fontWeight:'bold',borderWidth: '2px', borderRadius: '0px', borderColor: 'hsla(177, 71.1%, 14.9%, 1)', width:'150px', height:'70px'}} onClick={onMintPressed}>Buy</Button>
											{/* <Button variant="primary" className="cta soldout" style={{ marginLeft:'20px',background: 'hsla(177, 71.1%, 14.9%, 1)', fontSize: '15pt', fontWeight:'bold',borderWidth: '2px', borderRadius: '0px', borderColor: 'hsla(177, 71.1%, 14.9%, 1)', width:'150px', height:'70px'}} onClick={onReserve}>Airdrop</Button> */}
											{/* <Button variant="primary" className="cta soldout" style={{ marginLeft:'20px',background: 'hsla(177, 71.1%, 14.9%, 1)', fontSize: '15pt', fontWeight:'bold',borderWidth: '2px', borderRadius: '0px', borderColor: 'hsla(177, 71.1%, 14.9%, 1)', width:'150px', height:'70px'}} onClick={onPause}>Play</Button> */}
											</>
										) 
										: (
											<a href="https://opensea.io/collection/dafeiscollection" target="_blank" rel="noreferrer" className="cta soldout" style={{textDecoration:"none"}}>
												View on Opensea
											</a>
										)
									}
								</div>
							</div>
							<div className="hero-grid-right">
								<div className="lottie-animation">
									<img src={gif_animation} alt=""/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div id="About" className="main-section blue-section purple-section-override no-margins wf-section">
					<div className="main-container blue-container margin-extra">
						<div className="blue-section-content-wrapper">
							<h2 className="section-heading white">About our DaFeis🚀</h2>
							<p className="section-paragraph white bottom-space">10,000 NFTs randomly generated digital collectibles of various rarity🎉 living on the Ethereum blockchain as ERC-721 tokens and hosted on IPFS  country-themed.<br/><br/>
							Each DaFeis is priced at ETH 0.033.😄 <br/>&zwj;<br/>
							Every DaFeis is generated from 323 possible traits.🤙 <br/>&zwj;<br/>
							Every Dafeis is absolutely unique from others.🤝 <br/>&zwj;<br/>
							So make sure to keep a sharp eye on your favorite DaFeis!✨ <br/>
							<br/></p>
							<a href="https://discord.gg/wD2xSWwGgx" target="_blank" rel="noreferrer" className="main-button w-button">Jam With&nbsp;the Crew</a>
						</div>
					</div>
					{/* <img src="https://assets.website-files.com/61211faffaafcac4231a603c/612e01379e2d126d09b8cc15_eggplant_guy_2_pieces_02.png" loading="lazy" sizes="(max-width: 767px) 100vw, 500px" srcSet="https://assets.website-files.com/61211faffaafcac4231a603c/612e01379e2d126d09b8cc15_eggplant_guy_2_pieces_02-p-500.png 500w, https://assets.website-files.com/61211faffaafcac4231a603c/612e01379e2d126d09b8cc15_eggplant_guy_2_pieces_02.png 603w" alt="" className="image-66"/> */}
					{/* <img src={img_page2} loading="lazy" alt="" className="image-73"/> */}
					{/* <img src={img_page2} loading="lazy" width="133" alt="" className="image-74"/>  */}
					<img src={img_page2} loading="lazy" width="133" alt="" className="image-66"/> 
				</div>
				<div className="main-section yellow-section overflow-hidden blue-section-override wf-section">
					<img src="https://assets.website-files.com/61211faffaafcac4231a603c/612e0136cd46ce3a17e6de0b_fuzzy_guy_1_piece.png" loading="lazy" sizes="100vw" srcSet="https://assets.website-files.com/61211faffaafcac4231a603c/612e0136cd46ce3a17e6de0b_fuzzy_guy_1_piece-p-500.png 500w, https://assets.website-files.com/61211faffaafcac4231a603c/612e0136cd46ce3a17e6de0b_fuzzy_guy_1_piece.png 643w" alt="" className="image-65 hidden"/>
						<div className="main-container">
							<h2 className="white d-d-heading" style={{color:'white', fontSize: '30pt'}}>😎 Anyone can dream about great ideas, but an idea is nothing until it comes true - being a website, a physical product, an app, or an NFT.</h2>
							<div className="yellow-section-grid-wrapper">
								<div className="yellow-section-left-wrapper">
									<div className="yellow-section-content-wrapper">
										<h2 className="yellow-section-heading"><br/>Traits:<br/></h2>
									</div>
									<div className="yellow-section-content-wrapper">
										<h3 className="yellow-section-heading">✨ Cap : 9</h3>
									</div>
									<div className="yellow-section-content-wrapper">
										<h3 className="yellow-section-heading">✍️ Masks : 10</h3>
									</div>
									<div className="yellow-section-content-wrapper">
										<h3 className="yellow-section-heading">😄 Background : 13</h3>
									</div>
									<div className="yellow-section-content-wrapper">
										<h3 className="yellow-section-heading">🤝 Noses : 15</h3>
									</div>
									<div className="yellow-section-content-wrapper">
										<h3 className="yellow-section-heading">😄 Accessories : 18</h3>
									</div>
									<div className="yellow-section-content-wrapper">
										<h3 className="yellow-section-heading">😄 Sunglasses : 35</h3>
									</div>
									<div className="yellow-section-content-wrapper">
										<h3 className="yellow-section-heading">😄 Eyes : 39</h3>
									</div>
									<div className="yellow-section-content-wrapper">
										<h3 className="yellow-section-heading">😄 Mouths : 49</h3>
									</div>
									<div className="yellow-section-content-wrapper">
										<h3 className="yellow-section-heading">😄 Flags : 135<br/><br/></h3>
									</div>
								</div>
								<div className="yellow-section-right-wrapper">
									<div className="yellow-section-content-wrapper">
										<h2 className="yellow-section-heading"><b>👾 Total : 323</b><br/></h2>
									</div>
								</div>
							</div>
						</div>
						<img src={img_page3} loading="lazy" width="431" sizes="(max-width: 479px) 100vw, (max-width: 991px) 300px, (max-width: 1279px) 500px, (max-width: 1439px) 525px, (max-width: 1919px) 650px, 600px" alt="" className="image-63"/>							
					</div>
				<div className="main-section faq-section overflow-hidden wf-section" id="Faq">
					<div className="main-container faqs-container">
						<h2 className="section-heading white center-align faqs-heading">Questions?</h2>
						<div className="faqs-wrapper short-wrapper">
							<div className="faq-content-wrapper">
								<div className="faq-question-wrapper">
									<h2 className="faq-heading">What are DaFeis?</h2>
								</div>
								<div className="faq-answer-wrapper">
									<p className="faq-paragraph">DaFeis consists of 10,000 unique NFTs running on the Ethereum blockchain. Each DaFeis is unique and is generated automatically based on more than 323 traits.</p>
								</div>
							</div>
						</div>
						<div className="faqs-wrapper">
							<div className="faq-content-wrapper">
								<div className="faq-question-wrapper">
									<h2 className="faq-heading">What blockchain will be used?</h2>
									</div>
								<div className="faq-answer-wrapper">
									<p className="faq-paragraph">Ethereum</p>
								</div>
							</div>
						</div>
						<div className="faqs-wrapper">
							<div className="faq-content-wrapper">
								<div className="faq-question-wrapper">
									<h2 className="faq-heading">How many NFTs will be released?</h2>
								</div>
								<div className="faq-answer-wrapper">
									<p className="faq-paragraph">10,000</p>
								</div>
							</div>
						</div>
						<div className="faqs-wrapper">
							<div className="faq-content-wrapper">
								<div className="faq-question-wrapper">
									<h2 className="faq-heading">Will there be a pre-mint?</h2>
								</div>
								<div className="faq-answer-wrapper">
									<p className="faq-paragraph">No.</p>
								</div>
							</div>
						</div>
						<div className="faqs-wrapper">
							<div className="faq-content-wrapper">
								<div className="faq-question-wrapper">
									<h2 className="faq-heading">How many traits do they have?</h2>
								</div>
								<div className="faq-answer-wrapper">
									<p className="faq-paragraph"><b>323</b> different traits & total attributes.</p>
								</div>
							</div>
						</div>
						<div className="faqs-wrapper">
							<div className="faq-content-wrapper">
								<div className="faq-question-wrapper">
									<h2 className="faq-heading">Will there be a whitelist?</h2>
								</div>
								<div className="faq-answer-wrapper">
									<p className="faq-paragraph">No.</p>
								</div>
							</div>
						</div>
						<div className="faqs-wrapper">
							<div className="faq-content-wrapper">
								<div className="faq-question-wrapper">
									<h2 className="faq-heading">Will there be giveaways?</h2>
								</div>
								<div className="faq-answer-wrapper">
									<p className="faq-paragraph">Yes! We will be giving away a lot of our randomly generated NFT’s to promote this project.</p>
								</div>
							</div>
						</div>
						<div className="faqs-wrapper">
							<div className="faq-content-wrapper">
								<div className="faq-question-wrapper">
									<h2 className="faq-heading">Instant reveal?</h2>
								</div>
								<div className="faq-answer-wrapper">
									<p className="faq-paragraph">Yes, instant reveal.</p>
								</div>
							</div>
						</div>
						<div className="faqs-wrapper">
							<div className="faq-content-wrapper">
								<div className="faq-question-wrapper">
									<h2 className="faq-heading">Mint Price?</h2>
								</div>
								<div className="faq-answer-wrapper">
									<p className="faq-paragraph">Each NFT can be minted at a cost of 0.033 ETH + gas.</p>
								</div>
							</div>
						</div>
						<div className="faqs-wrapper">
							<div className="faq-content-wrapper">
								<div className="faq-question-wrapper">
									<h2 className="faq-heading">Will there be a transaction limit?</h2>
								</div>
								<div className="faq-answer-wrapper">
									<p className="faq-paragraph">Yes. Minting is limited to 20 NFT’s per tx.</p>
								</div>
							</div>
						</div>
						<div className="faqs-wrapper">
							<div className="faq-content-wrapper">
								<div className="faq-question-wrapper">
									<h2 className="faq-heading">What is the gas fee?</h2>
								</div>
								<div className="faq-answer-wrapper">
									<p className="faq-paragraph">The gas fee is what you pay to have your transaction confirmed by miners. We have no idea what the gas fee will be upon release.</p>
								</div>
							</div>
						</div>
						<div className="faqs-wrapper">
							<div className="faq-content-wrapper">
								<div className="faq-question-wrapper">
									<h2 className="faq-heading">When and where will I be able to mint?</h2>
								</div>
								<div className="faq-answer-wrapper">
									<p className="faq-paragraph">The launch will be open directly on our website www.dafeis.io on Sunday 3th of October 2021 at 12PM EST // 6PM CET</p>
								</div>
							</div>
						</div>
						<div className="faqs-wrapper">
							<div className="faq-content-wrapper">
								<div className="faq-question-wrapper">
									<h2 className="faq-heading">What devices can I mint on?</h2>
								</div>
								<div className="faq-answer-wrapper">
									<p className="faq-paragraph">Computer or mobile phone, if you are minting on a mobile, remember to use metamask’s browser.</p>
								</div>
							</div>
						</div>
						<div className="faqs-wrapper">
							<div className="faq-content-wrapper">
								<div className="faq-question-wrapper">
									<h2 className="faq-heading"> Anything else I should know?</h2>
								</div>
								<div className="faq-answer-wrapper">
									<p className="faq-paragraph">Yes, you need some ETH. You can buy it on Coinbase or even directly from the Metamask Wallet. How do I use Metamask? It’s easy! <a href="https://metamask.io/" rel="noreferrer" target="_blank">Go here</a>  and find out straight from the source.</p>
								</div>
							</div>
						</div>
						<div className="faqs-wrapper">
							<div className="faq-content-wrapper flex">
								<div className="faq-question-wrapper">
									<h2 className="faq-heading">How to Mint</h2>
								</div>
								<div className="faq-answer-wrapper">
									<p className="faq-paragraph">Minting is on Sunday 3th of October 12PM EST // 6PM CET 1) Go to <a href="https://www.dafeis.io/" rel="noreferrer" target="_blank">https://www.dafeis.io/</a> 2) Connect your MetaMask 3) Click Buy Button 4) Approve ETH + gas fee transaction 5) Go back to 1</p>
								</div>
								{/* <a href="https://discord.gg/wD2xSWwGgx" target="_blank" rel="noreferrer" className="main-button faq-button w-button">Ask Us On Discord</a> */}
							</div>
						</div>
					</div>
				</div>
				<div id="Roadmap" className="main-section timeline-section overflow-hidden wf-section">
					<div className="main-container">
						<h2 className="section-heading white center-align">ROADMAP</h2>
						<div className="timeline-grid-wrapper">
							<div className="timeline-left-wrapper">
								<div className="timeline-left-content-wrapper">
									<h3 className="timeline-heading">25% Sold</h3>
									<p className="timeline-paragraph">As a gesture to our community we decided to distribute our next collection limited to
222 NFTs to the first 200 ETH addresses who buy NFT ( 1 ETH address= 1 NFT)</p>
								</div>
								<div className="timeline-left-content-wrapper">
									<h3 className="timeline-heading">50% Sold</h3>
									<p className="timeline-paragraph">Charity donation will be chosen by community – $10,000</p>
								</div>
								<div className="timeline-left-content-wrapper">
									<h3 className="timeline-heading" style={{color:'red'}}>100% Sold</h3>
									<p className="timeline-paragraph" style={{fontSize:'22px'}}>List on Opensea Marketplace after launch.</p>
									<p className="timeline-paragraph" style={{fontSize:'22px'}}>Rarity Tools ranking activated</p>
									<p className="timeline-paragraph"></p>
									<p className="timeline-paragraph">
									As a gesture to our public we decided to distribute our next collection limited to 222 NFTs to the first 200 ETH addresses who buy NFT ( 1 ETH address= 1 NFT)<br/>
									</p>
									<p className="timeline-paragraph">
										November we will release a limited collection of 100 NFTs<br/>
									</p>
									<p className="timeline-paragraph">
										(you are likely to become addicted)<br/>
									</p>
								</div>
								<div className="timeline-left-content-wrapper no-bottom-margin">
									{/* <img src="https://assets.website-files.com/61211faffaafcac4231a603c/61294d9550d0b77c9e66316e_roadmap-guy.png" loading="lazy" width="100" alt="" className="image-70"/> */}
								</div>
								<div className="timeline-left-content-wrapper no-bottom-margin">
								</div>
							</div>
							<div className="timeline-right-wrapper">
								<img src="https://assets.website-files.com/61211faffaafcac4231a603c/612a75f12765f9c8aa19a9bf_dotted%20lines.png" loading="lazy" width="101" alt="" className="image-59"/>
							</div>
						</div>
						{/* <h1 className="section-heading white no-bottom-margin roadmap-heading">Season 2: <br/>Coming Soon<br/></h1> */}
					</div>
					{/* <img src="https://assets.website-files.com/61211faffaafcac4231a603c/612649e056066d1700309d5e_blue_guy_1_piece.png" loading="lazy" width="118" sizes="(max-width: 479px) 100vw, (max-width: 767px) 34vw, (max-width: 991px) 161.6910400390625px, (max-width: 1279px) 16vw, (max-width: 1439px) 13vw, (max-width: 1919px) 161.69091796875px, 8vw" srcSet="https://assets.website-files.com/61211faffaafcac4231a603c/612649e056066d1700309d5e_blue_guy_1_piece-p-500.png 500w, https://assets.website-files.com/61211faffaafcac4231a603c/612649e056066d1700309d5e_blue_guy_1_piece-p-800.png 800w, https://assets.website-files.com/61211faffaafcac4231a603c/612649e056066d1700309d5e_blue_guy_1_piece-p-1080.png 1080w, https://assets.website-files.com/61211faffaafcac4231a603c/612649e056066d1700309d5e_blue_guy_1_piece.png 1532w" alt="" className="image-60"/>
					<img src="https://assets.website-files.com/61211faffaafcac4231a603c/612649e180842a4e6eb606d6_eggplant_guy_2_pieces.png" loading="lazy" width="144" sizes="(max-width: 479px) 100vw, (max-width: 767px) 196.7076416015625px, (max-width: 991px) 26vw, (max-width: 1279px) 20vw, (max-width: 1919px) 196.707763671875px, 10vw" srcSet="https://assets.website-files.com/61211faffaafcac4231a603c/612649e180842a4e6eb606d6_eggplant_guy_2_pieces-p-500.png 500w, https://assets.website-files.com/61211faffaafcac4231a603c/612649e180842a4e6eb606d6_eggplant_guy_2_pieces-p-800.png 800w, https://assets.website-files.com/61211faffaafcac4231a603c/612649e180842a4e6eb606d6_eggplant_guy_2_pieces-p-1080.png 1080w, https://assets.website-files.com/61211faffaafcac4231a603c/612649e180842a4e6eb606d6_eggplant_guy_2_pieces.png 1532w" alt="" className="image-61"/> */}
				</div>
				<div id="Purpose" className="main-section pink-section overflow-hidden green-section-override wf-section" style={{display:'none'}}>
					<div className="main-container pink-container">
						<h2 className="section-heading center-align">A Community With Purpose 🙏</h2>
						<div className="pink-section-wrapper">
							<div className="pink-section-content-wrapper">
								<h3 className="pink-section-heading">🌎 Helping (The Real) Planet Together</h3>
								<p className="pink-section-paragraph">The DaFeises love the Earth! 5% of royalties will go to charities aligned with the United Nation’s <a href="https://sdgs.un.org/goals" target="_blank" rel="noreferrer" className="text-link">17 Goals</a>.</p>
							</div>
							<div className="pink-section-content-wrapper short">
								<h3 className="pink-section-heading">🌳 Carbon Offset for Gas</h3>
								<p className="pink-section-paragraph">We will offset the carbon for the energy consumed to mint these contracts.</p>
							</div>
							<div className="pink-section-content-wrapper short">
								<h3 className="pink-section-heading">📄 Ownership Rights</h3>
								<p className="pink-section-paragraph">When you buy an NFT from us you get a license to do what you want with your DaFeis (like using them in any metaverse project).</p>
							</div>
							<div className="pink-section-content-wrapper no-bottom-space">
								<h3 className="pink-section-heading">📈 L2 Future Development</h3>
								<p className="pink-section-paragraph">Layer Two is the future of crypto—cheaper, scalable, eco-friendly(er), near-instant transactions—all reasons why we’ll use Arbitrum moving forward.</p>
							</div>
							<a href="https://discord.gg/wD2xSWwGgx" target="_blank" rel="noreferrer" className="main-button w-button">Join the Community</a>
						</div>
					</div>
					{/* <img src="https://assets.website-files.com/61211faffaafcac4231a603c/612e01377af74e2aaf30117f_fuzzy_guy_3_pieces.png" loading="lazy" alt="" className="image-64"/>
					<img src="https://assets.website-files.com/61211faffaafcac4231a603c/612769c36e4e9f496d1d37ac_fuzzy_guy%205.png" loading="lazy" width="140" alt="" className="image-76"/>
					<img src="https://assets.website-files.com/61211faffaafcac4231a603c/612769c36e4e9f496d1d37ac_fuzzy_guy%205.png" loading="lazy" width="140" alt="" className="image-77"/>
					<img src="https://assets.website-files.com/61211faffaafcac4231a603c/612769c36e4e9f496d1d37ac_fuzzy_guy%205.png" loading="lazy" width="186" alt="" className="image-78"/> */}
				</div>
				
				<Container className="mt-5" style={{color:'white', textAlign:'center'}}>
				<Row>
					<Col></Col>
					<Col xs={12}>
					<p style={{marginTop:'60px',marginBottom:'60px', fontSize:'35pt'}} id="Team">OUR TEAM</p>
					</Col>
					<Col></Col>
				</Row>
				</Container>
				<Container className="mt-5 mb-5" style={{color:'white', textAlign:'center'}}>
				<Row>
					<Col xs={12} md={4}>
					<img alt="image_temp" src={img2_1} className="land-img"/>
					<div style={{textAlign:'left'}}>
						<p style={{fontSize:'20pt', marginTop:'20px'}}>Lacky</p>
					</div>
					</Col>
					<Col xs={12} md={4}>
					<img alt="image_temp" src={img2_2} className="land-img"/>
					<div style={{textAlign:'left'}}>
						<p style={{fontSize:'20pt', marginTop:'20px'}}>ZamiK</p>
					</div>
					</Col>
					<Col xs={12} md={4}>
					<img alt="image_temp" src={img2_3} className="land-img"/>
					<div style={{textAlign:'left'}}>
						<p style={{fontSize:'20pt', marginTop:'20px'}}>Bobby</p>
					</div>
					</Col>
				</Row>
				</Container>
				
				{/* <div id="Team" className="main-section green-section purple-section-override wf-section" style={{display:'none'}}>
					<div className="main-container green-container">
						<h2 className="section-heading green-section-heading center-align white">OUR TEAM</h2>
						<div className="designer-grid-wrapper">
							<div className="designer-wrapper">
								<img src="https://assets.website-files.com/61211faffaafcac4231a603c/61256a8c7cab072599db6bc1_Jason%20S.png" loading="lazy" width="85.5" sizes="100vw" srcset="https://assets.website-files.com/61211faffaafcac4231a603c/61256a8c7cab072599db6bc1_Jason%20S-p-500.png 500w, https://assets.website-files.com/61211faffaafcac4231a603c/61256a8c7cab072599db6bc1_Jason%20S-p-800.png 800w, https://assets.website-files.com/61211faffaafcac4231a603c/61256a8c7cab072599db6bc1_Jason%20S-p-1080.png 1080w, https://assets.website-files.com/61211faffaafcac4231a603c/61256a8c7cab072599db6bc1_Jason%20S.png 1620w" alt=""/>
									<div className="desginer-title">Co-Founder</div>
									<h3 className="desginer-name">Jason Struhl</h3>
							</div>
							<div className="designer-wrapper">
								<img src="https://assets.website-files.com/61211faffaafcac4231a603c/61256aa400f1b91ab49db3c4_KC.png" loading="lazy" width="85.5" sizes="100vw" srcset="https://assets.website-files.com/61211faffaafcac4231a603c/61256aa400f1b91ab49db3c4_KC-p-500.png 500w, https://assets.website-files.com/61211faffaafcac4231a603c/61256aa400f1b91ab49db3c4_KC-p-800.png 800w, https://assets.website-files.com/61211faffaafcac4231a603c/61256aa400f1b91ab49db3c4_KC-p-1080.png 1080w, https://assets.website-files.com/61211faffaafcac4231a603c/61256aa400f1b91ab49db3c4_KC.png 1620w" alt=""/>
								<div className="desginer-title">Co-Founder</div>
								<h3 className="desginer-name">Kelsey Cole</h3>
							</div>
							<div className="designer-wrapper">
								<img src="https://assets.website-files.com/61211faffaafcac4231a603c/61256ab8ce9ee0c6b76f6029_Jason%20J.png" loading="lazy" width="85.5" sizes="100vw" srcset="https://assets.website-files.com/61211faffaafcac4231a603c/61256ab8ce9ee0c6b76f6029_Jason%20J-p-500.png 500w, https://assets.website-files.com/61211faffaafcac4231a603c/61256ab8ce9ee0c6b76f6029_Jason%20J-p-800.png 800w, https://assets.website-files.com/61211faffaafcac4231a603c/61256ab8ce9ee0c6b76f6029_Jason%20J-p-1080.png 1080w, https://assets.website-files.com/61211faffaafcac4231a603c/61256ab8ce9ee0c6b76f6029_Jason%20J.png 1620w" alt=""/>
								<div className="desginer-title">Co-Founder</div>
								<h3 className="desginer-name">Jay Jacobs</h3>
							</div>
							<div className="designer-wrapper">
								<img src="https://assets.website-files.com/61211faffaafcac4231a603c/61256b0b24303508fdaf6edf_Lucy.png" loading="lazy" width="85.5" sizes="100vw" srcset="https://assets.website-files.com/61211faffaafcac4231a603c/61256b0b24303508fdaf6edf_Lucy-p-500.png 500w, https://assets.website-files.com/61211faffaafcac4231a603c/61256b0b24303508fdaf6edf_Lucy-p-800.png 800w, https://assets.website-files.com/61211faffaafcac4231a603c/61256b0b24303508fdaf6edf_Lucy-p-1080.png 1080w, https://assets.website-files.com/61211faffaafcac4231a603c/61256b0b24303508fdaf6edf_Lucy.png 1620w" alt=""/>
								<div className="desginer-title">Project Manager</div>
								<h3 className="desginer-name">Lucy Lei</h3>
							</div>
							<div className="designer-wrapper">
								<img src="https://assets.website-files.com/61211faffaafcac4231a603c/61256b382430350341af6eee_Ninah.png" loading="lazy" width="85.5" sizes="100vw" srcset="https://assets.website-files.com/61211faffaafcac4231a603c/61256b382430350341af6eee_Ninah-p-500.png 500w, https://assets.website-files.com/61211faffaafcac4231a603c/61256b382430350341af6eee_Ninah-p-800.png 800w, https://assets.website-files.com/61211faffaafcac4231a603c/61256b382430350341af6eee_Ninah-p-1080.png 1080w, https://assets.website-files.com/61211faffaafcac4231a603c/61256b382430350341af6eee_Ninah.png 1620w" alt=""/>
								<div className="desginer-title">Discord Lead</div>
								<h3 className="desginer-name">Ninah Garcia</h3>
							</div>
							<div className="designer-wrapper">
								<img src="https://assets.website-files.com/61211faffaafcac4231a603c/612571edaaa31c0663df6be7_Yoshi.png" loading="lazy" width="85.5" sizes="100vw" srcset="https://assets.website-files.com/61211faffaafcac4231a603c/612571edaaa31c0663df6be7_Yoshi-p-500.png 500w, https://assets.website-files.com/61211faffaafcac4231a603c/612571edaaa31c0663df6be7_Yoshi-p-800.png 800w, https://assets.website-files.com/61211faffaafcac4231a603c/612571edaaa31c0663df6be7_Yoshi-p-1080.png 1080w, https://assets.website-files.com/61211faffaafcac4231a603c/612571edaaa31c0663df6be7_Yoshi.png 1620w" alt=""/>
								<div className="desginer-title">Character Artist</div>
								<h3 className="desginer-name">Hiroshi Yoshii</h3>
							</div>
							<div className="designer-wrapper">
								<img src="https://assets.website-files.com/61211faffaafcac4231a603c/6126893561dbdf2574e723cc_etherians_team__1_%20(1).png" loading="lazy" width="85.5" sizes="100vw" srcset="https://assets.website-files.com/61211faffaafcac4231a603c/6126893561dbdf2574e723cc_etherians_team__1_%20(1)-p-500.png 500w, https://assets.website-files.com/61211faffaafcac4231a603c/6126893561dbdf2574e723cc_etherians_team__1_%20(1)-p-800.png 800w, https://assets.website-files.com/61211faffaafcac4231a603c/6126893561dbdf2574e723cc_etherians_team__1_%20(1).png 1080w" alt=""/>
								<div className="desginer-title">Artist</div>
								<h3 className="desginer-name">Francisco Hurtado</h3>
							</div>
							<div className="designer-wrapper">
								<img src="https://assets.website-files.com/61211faffaafcac4231a603c/61268e426ca2e2637727e8aa_etherians%20team%20(2).png" loading="lazy" width="85.5" sizes="100vw" srcset="https://assets.website-files.com/61211faffaafcac4231a603c/61268e426ca2e2637727e8aa_etherians%20team%20(2)-p-500.png 500w, https://assets.website-files.com/61211faffaafcac4231a603c/61268e426ca2e2637727e8aa_etherians%20team%20(2)-p-800.png 800w, https://assets.website-files.com/61211faffaafcac4231a603c/61268e426ca2e2637727e8aa_etherians%20team%20(2).png 1080w" alt=""/>
								<div className="desginer-title">Story Lead</div>
								<h3 className="desginer-name">Grant Cohen</h3>
							</div>
							<div className="designer-wrapper">
								<img src="https://assets.website-files.com/61211faffaafcac4231a603c/61256b267cab07691fdb6fb4_Angelo.png" loading="lazy" width="85.5" sizes="100vw" srcset="https://assets.website-files.com/61211faffaafcac4231a603c/61256b267cab07691fdb6fb4_Angelo-p-500.png 500w, https://assets.website-files.com/61211faffaafcac4231a603c/61256b267cab07691fdb6fb4_Angelo-p-800.png 800w, https://assets.website-files.com/61211faffaafcac4231a603c/61256b267cab07691fdb6fb4_Angelo-p-1080.png 1080w, https://assets.website-files.com/61211faffaafcac4231a603c/61256b267cab07691fdb6fb4_Angelo.png 1620w" alt=""/>
								<div className="desginer-title">Advisor</div>
								<h3 className="desginer-name">Angelo Dodaro</h3>
							</div>
							<div id="w-node-d4f538b4-c970-df59-ee56-f0f60e5e1bfc-46658e89" className="designer-wrapper">
								<img src="https://assets.website-files.com/61211faffaafcac4231a603c/61256b556afe7bf3dd11e82f_Gabriel.png" loading="lazy" sizes="100vw" width="85.5" srcset="https://assets.website-files.com/61211faffaafcac4231a603c/61256b556afe7bf3dd11e82f_Gabriel-p-500.png 500w, https://assets.website-files.com/61211faffaafcac4231a603c/61256b556afe7bf3dd11e82f_Gabriel-p-800.png 800w, https://assets.website-files.com/61211faffaafcac4231a603c/61256b556afe7bf3dd11e82f_Gabriel-p-1080.png 1080w, https://assets.website-files.com/61211faffaafcac4231a603c/61256b556afe7bf3dd11e82f_Gabriel.png 1620w" alt=""/>
								<div className="desginer-title">TikTok</div>
								<h3 className="desginer-name">Gabriel Hartmann</h3>
							</div>
						</div>
						<div className="team-collection-list-wrapper w-dyn-list">
							<div role="list" className="team-collection-list w-dyn-items">
								<div role="listitem" className="team-collection-list-item w-dyn-item">
									<div className="designer-wrapper">
										<div style={{backgroundImage:'url("https://assets.website-files.com/6134a058834e8fc8fca26b49/613fe80bbf5de59fa02a0604_Jason%20S.png")'}} className="team-image-div"></div>
										<div className="team-title">Co-founder</div>
										<h3 className="desginer-name">Jason Struhl</h3>
										<p className="team-bio w-dyn-bind-empty"></p>
									</div>
								</div>
								<div role="listitem" className="team-collection-list-item w-dyn-item">
									<div className="designer-wrapper">
										<div style={{backgroundImage:'url("https://assets.website-files.com/6134a058834e8fc8fca26b49/613fe7fd41e8112362933de3_KC.png")'}} className="team-image-div"></div>
										<div className="team-title">Co-founder</div>
										<h3 className="desginer-name">Kelsey Cole</h3>
										<p className="team-bio w-dyn-bind-empty"></p>
									</div>
								</div>
								<div role="listitem" className="team-collection-list-item w-dyn-item">
									<div className="designer-wrapper">
										<div style={{backgroundImage:'url("https://assets.website-files.com/6134a058834e8fc8fca26b49/613fe7f01878cd0293b00812_Jason%20J.png")'}} className="team-image-div"></div>
										<div className="team-title">Co-founder</div>
										<h3 className="desginer-name">Jason Jacobs</h3>
										<p className="team-bio w-dyn-bind-empty"></p>
									</div>
								</div>
								<div role="listitem" className="team-collection-list-item w-dyn-item">
									<div className="designer-wrapper">
										<div style={{backgroundImage:'url("https://assets.website-files.com/6134a058834e8fc8fca26b49/613fe7dfce16c72ebdfd1534_Lucy.png")'}} className="team-image-div"></div>
										<div className="team-title">Project Manager</div>
										<h3 className="desginer-name">Lucy Lei</h3>
										<p className="team-bio w-dyn-bind-empty"></p>
									</div>
								</div>
								<div role="listitem" className="team-collection-list-item w-dyn-item">
									<div className="designer-wrapper">
										<div style={{backgroundImage:'url("https://assets.website-files.com/6134a058834e8fc8fca26b49/61363779c9ac1361477f8c66_61256b382430350341af6eee_Ninah.png")'}} className="team-image-div"></div>
										<div className="team-title">Community Lead</div>
										<h3 className="desginer-name">Ninah Garcia</h3>
										<p className="team-bio w-dyn-bind-empty"></p>
									</div>
								</div>
								<div role="listitem" className="team-collection-list-item w-dyn-item">
									<div className="designer-wrapper">
										<div style={{backgroundImage:'url("https://assets.website-files.com/6134a058834e8fc8fca26b49/613fe67cc562337e6c06f2c9_Yoshi.png")'}} className="team-image-div"></div>
										<div className="team-title">Character Artist</div>
										<h3 className="desginer-name">Hiroshi Yoshii</h3>
										<p className="team-bio w-dyn-bind-empty"></p>
									</div>
								</div>
								<div role="listitem" className="team-collection-list-item w-dyn-item">
									<div className="designer-wrapper">
										<div style={{backgroundImage:'url("https://assets.website-files.com/6134a058834e8fc8fca26b49/613fe66a4147ee075bcc13ee_Artist.png")'}} className="team-image-div"></div>
										<div className="team-title">Artist</div>
										<h3 className="desginer-name">Francisco Hurtado</h3>
										<p className="team-bio w-dyn-bind-empty"></p>
									</div>
								</div>
								<div role="listitem" className="team-collection-list-item w-dyn-item">
									<div className="designer-wrapper">
										<div style={{backgroundImage:'url("https://assets.website-files.com/6134a058834e8fc8fca26b49/613fe688dac76e73dd3fddb1_Artist%20(2).png")'}} className="team-image-div"></div>
										<div className="team-title">Illustrator</div>
										<h3 className="desginer-name">Chris Middleton</h3>
										<p className="team-bio w-dyn-bind-empty"></p>
									</div>
								</div>
								<div role="listitem" className="team-collection-list-item w-dyn-item">
									<div className="designer-wrapper">
										<div style={{backgroundImage:'url("https://assets.website-files.com/6134a058834e8fc8fca26b49/613fe641101a55e18aebe718_Gabriel.png")'}} className="team-image-div"></div>
										<div className="team-title">TikTok</div><h3 className="desginer-name">Gabriel Hartmann</h3><p className="team-bio w-dyn-bind-empty"></p>
									</div>
								</div>
								<div role="listitem" className="team-collection-list-item w-dyn-item">
									<div className="designer-wrapper">
										<div style={{backgroundImage:'url("https://assets.website-files.com/6134a058834e8fc8fca26b49/613fe6090e4b99caabf6c338_Tina.png")'}} className="team-image-div"></div>
										<div className="team-title">Marketing</div>
										<h3 className="desginer-name">Tina Yip</h3>
										<p className="team-bio w-dyn-bind-empty"></p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div> */}
				<div className="main-section footer-section overflow-hidden wf-section">
					<div className="main-container">
						<div className="footer-wrapper">
							<div className="footer-left-wrapper">
								<div className="left-content-wrapper">
									<p className="footer-paragraph">You can find us on 
									<a href="https://twitter.com/da_feis" target="_blank" rel="noreferrer" className="footer-link"><span className="footer-blue-highlight">Twitter</span></a> and 
									<a href="https://discord.gg/wD2xSWwGgx" target="_blank" rel="noreferrer" className="footer-link"><span className="text-span-7">Discord</span>.</a></p>
								</div>
								<div className="left-social-wrapper">
									<a href="https://twitter.com/da_feis" target="_blank" rel="noreferrer" className="social-link-block w-inline-block">
										<img src="https://assets.website-files.com/61211faffaafcac4231a603c/61211faffaafcac62e1a608d_Twitter%20-%20Negative.svg" loading="lazy" alt=""/>
									</a>
									<a href="https://discord.gg/wD2xSWwGgx" target="_blank" rel="noreferrer" className="social-link-block w-inline-block">
										<img src="https://assets.website-files.com/61211faffaafcac4231a603c/61211faffaafca5d3a1a608b_Discord%20-%20Negative.svg" loading="lazy" alt=""/>
									</a>
								</div>
							</div>
						</div>
					</div>
					<a href="#Hero-Section" className="scroll-up-link-block w-inline-block">
						<div className="scroll-up-link-text">Scroll Up</div>
						<img src="https://assets.website-files.com/61211faffaafcac4231a603c/61213e7165485d053772825a_Arrow%201.png" loading="lazy" alt="" className="footer-arrow"/>
					</a>
				</div>
			</div>
			</Route>
        </Switch>
    </Router>
		</>
	);
};

export default DaFeis;

function TermsAndCondition(){
	return <>
	<div style={{'textAlign':'left', margin:'0px', padding:'100px', color:'white'}}>
		<h1 style={{paddingLeft:'50px', paddingBottom:'50px'}}>TERMS & CONDITIONS</h1><br/>
Dafeis is a collection of digital artworks (NFTs) running on the Ethereum network. This website is only an interface allowing participants to exchange digital collectibles. Users are entirely responsible for the safety and management of their own private Ethereum wallets and validating all transactions and contracts generated by this website before approval. Furthermore, as the Dafeis smart contract runs on the Ethereum network, there is no ability to undo, reverse, or restore any transactions. Аny promotion related to ETH prizes will only be paid out upon full 100% sale of the collection
This website and its connected services are provided “as is” and “as available” without warranty of any kind. By using this website you are accepting sole responsibility for any and all transactions involving Dafeis digital collectibles.
<br/>
<br/><br/><h2 style={{fontStyle:'italic', martinTop:'30px'}}>1. Ownership</h2><br/>
<p>A. You Own the NFT. Each Dafeis is an NFT on the Ethereum blockchain. When you purchase an NFT, you own the underlying Dafeis, the Art, completely. Ownership of the NFT is mediated entirely by the Smart Contract and the Ethereum Network: at no point may we seize, freeze, or otherwise modify the ownership of any Dafeis.</p>
<p>B. Personal Use. Subject to your continued compliance with these Terms, Dafeis grants you a worldwide, royalty-free license to use, copy, and display the purchased Art, along with any extensions that you choose to create or use, solely for the following purposes: (i) for your own personal, non-commercial use; (ii) as part of a marketplace that permits the purchase and sale of your Dafeis / NFT, provided that the marketplace cryptographically verifies each Dafeis owner’s rights to display the Art for their Dafeis to ensure that only the actual owner can display the Art; or (iii) as part of a third party website or application that permits the inclusion, involvement, or participation of your Dafeis, provided that the website/application cryptographically verifies each Dafeis owner’s rights to display the Art for their Dafeis to ensure that only the actual owner can display the Art, and provided that the Art is no longer visible once the owner of the Dafeis leaves the website/application.</p>
<p>C. Commercial Use. Subject to your continued compliance with these Terms, Dafeis grants you an unlimited, worldwide license to use, copy, and display the purchased Art for the purpose of creating derivative works based upon the Art (“Commercial Use”). Examples of such Commercial Use would e.g. be the use of the Art to produce and sell merchandise products (T-Shirts etc.) displaying copies of the Art. For the sake of clarity, nothing in this Section will be deemed to restrict you from (i) owning or operating a marketplace that permits the use and sale of Dafeis generally, provided that the marketplace cryptographically verifies each Dafeis owner’s rights to display the Art for their Dafeis to ensure that only the actual owner can display the Art; (ii) owning or operating a third party website or application that permits the inclusion, involvement, or participation of Dafeises generally, provided that the third party website or application cryptographically verifies each Dafeis owner’s rights to display the Art for their Dafeis to ensure that only the actual owner can display the Art, and provided that the Art is no longer visible once the owner of the Purchased Dafeis leaves the website/application; or (iii) earning revenue from any of the foregoing.</p>
<p>D. Dafeis IP.  Other than the rights to the Art, nothing herein gives you any rights to any other trademarks or other intellectual property rights belonging to Dafeis including, without limitation, to   Dafeis, and the associated logos. All of these rights are expressly reserved in the name of Dafeis.</p>
<p>E. Feedback. You may choose to submit comments, bug reports, ideas or other feedback about the Site, including without limitation about how to improve the Site (collectively, “Feedback”). By submitting any Feedback, you agree that we are free to use such Feedback in any way we choose without additional compensation to you and you hereby grant us a perpetual, irrevocable, nonexclusive, worldwide license to incorporate and use the Feedback for any purpose.</p>
<br/><br/><h2 style={{fontStyle:'italic', martinTop:'30px'}}>2. Your Obligations</h2><br/>
<p>You are solely responsible for your own conduct while accessing or using the Site, and for any consequences thereof. You agree to use the Site only for purposes that are legal, proper and in accordance with these Terms and any applicable laws or regulations. By way of example, and not as a limitation, you may not, and may not allow any third party to: (i) send, upload, distribute or disseminate any unlawful, defamatory, harassing, abusive, fraudulent, hateful, violent, obscene, or otherwise objectionable content; (ii) distribute viruses, worms, defects, Trojan horses, corrupted files, hoaxes, or any other items of a destructive or deceptive nature; (iii) impersonate another person; (iv) upload, post, transmit or otherwise make available through the Site any content that infringes the intellectual property or proprietary rights of any party or otherwise violates the legal rights of others; (v) engage in, promote, or encourage illegal activity (including, without limitation, money laundering); (vi) interfere with other users' use of the Site; (vii) use the Site for any unauthorized commercial purpose; (viii) modify, adapt, translate, or reverse engineer any portion of the Site; (ix) remove any copyright, trademark or other proprietary rights notices contained in or on the Site or any part of it; (x) use any technology to collect information about the Site’s for any unauthorized purpose; (xi) access or use the Site for the purpose of creating a product or service that is competitive with any of our products or services. If you engage in any of the activities prohibited by this Section, we may, at our sole and absolute discretion, without notice to you, and without limiting any of our other rights or remedies at law or in equity, immediately suspend or terminate your user account.</p>
<br/><br/><h2 style={{fontStyle:'italic', martinTop:'30px'}}>3. Fees and Payment</h2><br/>
<p>A. If you elect to purchase a Dafeis through the Site, any financial transactions that you engage in will be conducted solely through the Ethereum network. We will have no insight into or control over these payments or transactions, nor do we have the ability to reverse any transactions.  We will have no liability to you or to any third party for any claims or damages that may arise as a result of any transactions that you engage or any other transactions that you conduct via the Ethereum network.</p>
<p>B. Ethereum requires the payment of a transaction fee (a “Gas Fee”) for every transaction that occurs on the Ethereum network. The Gas Fee funds the network of computers that run the decentralized Ethereum network. This means that you will need to pay a Gas Fee for each transaction.</p>
<br/><br/><h2 style={{fontStyle:'italic', martinTop:'30px'}}>4. Disclaimers</h2><br/>
<p>A. YOU EXPRESSLY UNDERSTAND AND AGREE THAT YOUR ACCESS TO AND USE OF THE SITE IS AT YOUR SOLE RISK, AND THAT THE SITE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE PURSUANT TO APPLICABLE LAW, WE MAKE NO EXPRESS WARRANTIES AND HEREBY DISCLAIM ALL IMPLIED WARRANTIES REGARDING THE SITE AND ANY PART OF IT (INCLUDING, WITHOUT LIMITATION, THE SITE, ANY SMART CONTRACT, OR ANY EXTERNAL WEBSITES), INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, CORRECTNESS, ACCURACY, OR RELIABILITY. WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, WE, OUR SUBSIDIARIES, AFFILIATES, AND LICENSORS DO NOT REPRESENT OR WARRANT TO YOU THAT: (I) YOUR ACCESS TO OR USE OF THE SITE WILL MEET YOUR REQUIREMENTS, (II) YOUR ACCESS TO OR USE OF THE SITE WILL BE UNINTERRUPTED, TIMELY, SECURE OR FREE FROM ERROR, (III) USAGE DATA PROVIDED THROUGH THE SITE WILL BE ACCURATE, (III) THE SITE OR ANY CONTENT, SERVICES, OR FEATURES MADE AVAILABLE ON OR THROUGH THE SITE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS, OR (IV) THAT ANY DATA THAT YOU DISCLOSE WHEN YOU USE THE SITE WILL BE SECURE. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES IN CONTRACTS WITH CONSUMERS, SO SOME OR ALL OF THE ABOVE EXCLUSIONS MAY NOT APPLY TO YOU.</p>
<p>B. YOU ACCEPT THE INHERENT SECURITY RISKS OF PROVIDING INFORMATION AND DEALING ONLINE OVER THE INTERNET, AND AGREE THAT WE HAVE NO LIABILITY OR RESPONSIBILITY FOR ANY BREACH OF SECURITY UNLESS IT IS DUE TO OUR WILLFULL MISCONDUCT.</p>
<p>C. WE WILL NOT BE RESPONSIBLE OR LIABLE TO YOU FOR ANY LOSSES YOU INCUR AS THE RESULT OF YOUR USE OF THE ETHEREUM NETWORK NOR DO WE HAVE NO CONTROL OVER AND MAKE NO GUARANTEES REGARDING ANY SMART CONTRACTS.</p>
<br/><br/><h2 style={{fontStyle:'italic', martinTop:'30px'}}>5. Limitation of Liability</h2><br/>
<p>A. YOU UNDERSTAND AND AGREE THAT WE WILL NOT BE LIABLE TO YOU OR TO ANY THIRD PARTY FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES WHICH YOU MAY INCUR, HOWSOEVER CAUSED AND UNDER ANY THEORY OF LIABILITY, INCLUDING, WITHOUT LIMITATION, ANY LOSS OF PROFITS (WHETHER INCURRED DIRECTLY OR INDIRECTLY), LOSS OF GOODWILL OR BUSINESS REPUTATION, LOSS OF DATA, COST OF PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES, OR ANY OTHER INTANGIBLE LOSS, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
<p>B. YOU AGREE THAT OUR TOTAL, AGGREGATE LIABILITY TO YOU FOR ANY AND ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR YOUR ACCESS TO OR USE OF (OR YOUR INABILITY TO ACCESS OR USE) ANY PORTION OF THE SITE, WHETHER IN CONTRACT, TORT, STRICT LIABILITY, OR ANY OTHER LEGAL THEORY, IS LIMITED TO THE GREATER OF (A) THE AMOUNTS YOU ACTUALLY PAID US UNDER THESE TERMS IN THE 12 MONTH PERIOD PRECEDING THE DATE THE CLAIM AROSE, OR (B) $15.</p>
<p>C. YOU ACKNOWLEDGE AND AGREE THAT WE HAVE MADE THE SITE AVAILABLE TO YOU AND ENTERED INTO THESE TERMS IN RELIANCE UPON THE WARRANTY DISCLAIMERS AND LIMITATIONS OF LIABILITY SET FORTH HEREIN. WE WOULD NOT BE ABLE TO PROVIDE THE SITE TO YOU WITHOUT THESE LIMITATIONS.</p>
<br/><br/><h2 style={{fontStyle:'italic', martinTop:'30px'}}>6. Risk Assumption</h2><br/>
<p>You accept and acknowledge each of the following:</p>
<p>A. To the extent that you sell your Dafeis NFT, please be aware that the prices of NFTs are extremely volatile and fluctuations in the prices of other NFTs and impact the price of your Dafeis both positively and negatively.  Given the volatility, NFTs such as Dafeis should not be considered an investment. You assume all risks in that connection.</p>
<p>B. Ownership of a Dafeis confers ownership of digital artwork only. Accordingly, no information on this Site (or any other documents mentioned therein) is or may be considered to be advice or an invitation to enter into an agreement for any investment purpose. Further, nothing on this Site qualifies or is intended to be an offering of securities in any jurisdiction nor does it constitute an offer or an invitation to purchase shares, securities or other financial products.  Due to the artistic nature of the project, Dafeis has not been registered with or approved by any regulator in any jurisdiction. It remains your sole responsibility to assure that the purchase of the Dafeis and the associated art is in compliance with laws and regulations in your jurisdiction.</p>
<p>C. You assume all risks associated with using an Internet-based currency, including, but not limited to, the risk of hardware, software and Internet connections, the risk of malicious software introduction, and the risk that third parties may obtain unauthorized access to information stored within your wallet.</p>
<p>D. NFTs, cryptocurrencies and blockchain technology are relatively new and the regulatory landscape is unsettled.  New regulations could negatively impact such technologies impacting the value for your Dafeis. You understand and accept all risk in that regard.</p>
<p>E. You assume all responsibility for any adverse effects of disruptions or other issues impacting Ethereum or the Ethereum platform.</p>
<br/><br/><h2 style={{fontStyle:'italic', martinTop:'30px'}}>7. Indemnification</h2><br/>
<p>You agree to hold harmless and indemnify Dafeis and its subsidiaries, affiliates, officers, agents, employees, advertisers, licensors, suppliers or partners from and against any claim, liability, loss, damage (actual and consequential) of any kind or nature, suit, judgment, litigation cost, and reasonable attorneys' fees arising out of or in any way related to (i) your breach of these Terms, (ii) your misuse of the Site, or (iii) your violation of applicable laws, rules or regulations in connection with your access to or use of the Site.</p>
<br/><br/><h2 style={{fontStyle:'italic', martinTop:'30px'}}>8. Changes to the Terms and Conditions</h2><br/>
<p>We may make changes to the Terms at our discretion. Please check these Terms periodically for changes. Any changes to the Terms will apply on the date that they are made, and your continued access to or use after the Terms have been updated will constitute your binding acceptance of the updates. If you do not agree to any revised Terms, you may not access or use the Site.</p>
<br/><br/><h2 style={{fontStyle:'italic', martinTop:'30px'}}>9. Children</h2><br/>
<p>Our Site is not intended for children.  You must be at least 18 years old to access this Site or purchase a Dafeis. If you are under 18 years old you are not permitted to use this Site for any reason. By accessing the Site, you represent and warrant that you are at least 18 years of age.</p>
<br/><br/><h2 style={{fontStyle:'italic', martinTop:'30px'}}>10. Dispute Resolution; Arbitration</h2><br/>
<p>All disputes arising out of or in connection with these Terms, including without limitation your access or use of the Site, or to any products sold or distributed through the Site, will be referred to and finally resolved by arbitration under the rules of the American Arbitration Association. The case will be adjudicated by a single arbitrator and will be administered by the American Arbitration Association in accordance with its applicable rules. Each party will cover its own fees and costs associated with the arbitration proceedings. The place of arbitration will be New York, New York. The award of the arbitrator will be final and binding, and any judgment on the award rendered by the arbitrator may be entered in any court of competent jurisdiction. Notwithstanding the foregoing, we may seek and obtain injunctive relief in any jurisdiction in any court of competent jurisdiction.</p>
<p>WITH RESPECT TO ANY DISPUTE ARISING OUT OF OR RELATED TO THESE TERMS, INCLUDING WITHOUT LIMITATION DISPUTES RELATED TO THE SITE OR ANY PRODUCTS SOLD OR DISTRIBUTED THROUGH THE SITE, OR THE SMART CONTRACTS: (I) YOU HEREBY EXPRESSLY GIVE UP YOUR RIGHT TO HAVE A TRIAL BY JURY; AND (II) YOU HEREBY EXPRESSLY GIVE UP YOUR RIGHT TO PARTICIPATE AS A MEMBER OF A CLASS OF CLAIMANTS IN ANY LAWSUIT, INCLUDING BUT NOT LIMITED TO CLASS ACTION LAWSUITS INVOLVING ANY SUCH DISPUTE.</p>
</div>
	</>
}
