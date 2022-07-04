import React, { useEffect, useState } from "react";
import { Button, IconButton, Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addNfts, addSavedToken, addHistory } from "redux/slice/userSlice";
import { ToastContainer, toast } from "react-toastify";
import { getUserNFTFromAddress } from "hooks/getUserNFTFromAddress";
import { getNFTMetadataFromToken } from "hooks/getNFTMetadataFromToken";
import uuid from "react-uuid";
import { PublicKey } from "@solana/web3.js";
import Header from "./Header";
import NFTCard from "./NFTCard";
import axios from "axios";
import LoadingComponent from "modules/LoadingComponent";
import { getLastTransaction } from "hooks/getLastTransaction";
import { AiOutlineArrowUp, AiOutlineInsertRowBelow } from "react-icons/ai";
import _ from "lodash";
import { BsColumnsGap } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Home = () => {
	// redux methods
	const dispatch = useDispatch();
	const { userNfts, userSavedHistory, userSavedTokens } = useSelector(
		(state) => state.user
	);

	// components states
	const [loader, setLoader] = useState(false);
	const [address, setAddress] = useState(
		"E2APdVioPqt8nXFn2Qqu5TKfU2Zp9vB3WP49J7PADWDH"
	);
	const [nfts, setNfts] = useState(userNfts);
	const [saved, setSaved] = useState([]);
	const [history, setHistory] = useState([]);
	const [flexDirection, setFlexDirection] = useState("row");

	// components intializers
	useEffect(() => {
		if (nfts) {
			sortArrayBySaved();
			dispatch(addNfts(nfts));
		}
	}, [saved, history]);

	useEffect(() => {
		setSaved(userSavedTokens);
		setHistory(userSavedHistory);
	}, [userSavedHistory, userSavedTokens]);

	// components methods
	const getDataFromUri = async (url) => {
		const data = await axios.get(url);
		return data.data;
	};
	const validateAddress = () => {
		try {
			let pubkey = new PublicKey(address);
			let isSolana = PublicKey.isOnCurve(pubkey.toBuffer());
			return isSolana;
		} catch (e) {
			return false;
		}
	};

	const getNFTMetadata = async () => {
		try {
			setLoader(true);
			const nftsTokens = await getUserNFTFromAddress(address);
			const tokenAddresses = nftsTokens.value.map((item) => {
				return item.account.data.parsed.info.mint;
			});
			const metadata = tokenAddresses.map(async (item) => {
				const data = await getNFTMetadataFromToken(item);
				const date = await getLastTransaction(item);
				return { data, date };
			});
			Promise.all(metadata).then((data) => {
				const userNftsWithMetadata = data.map(async (item) => {
					const dataFromUri = await getDataFromUri(item.data.data.data.uri);
					return {
						id: uuid(),
						data: dataFromUri,
						latestTransactionTimestamp: item.date.latestTransactionBlockTime,
						mintTokenAddress: item.data.data.mint,
						creationTime: item.date.creatonTime,
					};
				});
				Promise.all(userNftsWithMetadata).then((data) => {
					setNfts(data);
					dispatch(addNfts(data));
				});
				setLoader(false);
			});
		} catch (e) {
			setLoader(false);
			toast.warning("Error in fetching NFT, please check the address");
		}
	};

	const sortArrayBySaved = () => {
		const nftData = [...nfts];
		if (nftData && nftData.length > 0) {
			const sortedArray = nftData.sort((a, b) => {
				if (saved.includes(a.id) > saved.includes(b.id)) return -1;
				else if (saved.includes(a.id) < saved.includes(b.id)) return 1;
				else return 0;
			});
			setNfts(sortedArray);
		}
	};

	const handleAddressChange = (e) => {
		const val = e.target.value;
		setAddress(val);
	};

	const sortByDate = () => {
		const sortedByLatestTimestamp = _.sortBy(
			nfts,
			"latestTransactionTimestamp"
		);
		setNfts(sortedByLatestTimestamp);
		toast(`Sorted by latest transaction time`);
	};

	const sortByCreationTime = () => {
		const sortedByCreationTime = _.sortBy(nfts, "creationTime");
		setNfts(sortedByCreationTime);
		toast(`Sorted by latest creation time`);
	};

	const toggleLike = (id) => {
		const newSaved = [...saved];
		const userSavedHistory = [...history];
		if (newSaved && newSaved.length > 0 && newSaved.includes(id)) {
			toast(
				`Removing the 
        ${nfts?.filter((item) => item?.id === id)[0].data.name}
        from saved list`
			);
			userSavedHistory.unshift(saved);
			dispatch(addHistory(userSavedHistory));
			dispatch(addSavedToken(newSaved.filter((item) => item !== id)));
		} else {
			toast(`${nfts?.filter((item) => item?.id === id)[0].data.name} is saved`);
			userSavedHistory.unshift(saved);
			dispatch(addHistory(userSavedHistory));
			newSaved.push(id);
			dispatch(addSavedToken(newSaved));
		}
		sortArrayBySaved();
	};

	const clearBookmark = () => {
		const userSavedHistory = [...history];
		userSavedHistory.shift(saved);
		dispatch(addHistory(userSavedHistory));
		if (saved.length > 0) {
			dispatch(addSavedToken([]));
			toast("Removing all NFTs from saved list");
		} else {
			toast.error("Please save the NFTs first");
		}
	};

	const handleKeyDown = (e) => {
		const userSavedHistory = [...history];
		if (e.metaKey && e.keyCode === 90 && saved.length > 0) {
			toast("Undoing the activity");
			dispatch(addSavedToken(userSavedHistory[0]));
			userSavedHistory.shift(saved);
			dispatch(addHistory(userSavedHistory));
			sortArrayBySaved();
		}
	};

	const submitInputValue = async () => {
		const isValidAddress = validateAddress();
		if (isValidAddress) {
			getNFTMetadata();
		} else if (!isValidAddress) {
			toast.warning("Not a valid address");
			setNfts([]);
		}
	};

	const handleOnDragEnd = (result) => {
		if (!result.destination) return;
		const items = [...nfts];
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		setNfts(items);
	};

	return (
		<div onKeyDown={handleKeyDown} tabIndex="0" className="relative h-screen">
			<Header
				address={address}
				handleAddressChange={handleAddressChange}
				submitInputValue={submitInputValue}
			/>
			<div className="relative top-24 h-auto overflow-y-scroll bottom-20">
				<div className="px-10 py-4">
					<div className="flex justify-between items-center flex-wrap w-4/5 mx-auto">
						<div className="flex justify-between items-center flex-wrap gap-4">
							<Button
								style={{ textTransform: "none" }}
								size="small"
								color="primary"
								variant="outlined"
								endIcon={<AiOutlineArrowUp size={18} />}
								onClick={sortByDate}
							>
								Last transaction time
							</Button>
							<Button
								style={{ textTransform: "none" }}
								size="small"
								color="secondary"
								variant="outlined"
								endIcon={<BiTimeFive size={18} />}
								onClick={sortByCreationTime}
							>
								Creation time
							</Button>
							<div className="border rounded-md ">
								<IconButton
									color="primary"
									onClick={() => setFlexDirection("row")}
								>
									<AiOutlineInsertRowBelow size={10} />
								</IconButton>
								<IconButton
									color="secondary"
									onClick={() => setFlexDirection("column")}
								>
									<BsColumnsGap size={10} />
								</IconButton>
							</div>
						</div>
						<div>
							<Button
								style={{ textTransform: "none" }}
								color="secondary"
								size="small"
								variant="contained"
								onClick={clearBookmark}
							>
								Clear bookmark
							</Button>
							<p
								className="text-gray-700 my-1 text-center w-full mx-auto"
								style={{ fontSize: "0.5rem" }}
							>
								CTRL/CMD + Z to undo the activity
							</p>
						</div>
					</div>
				</div>
				<Divider />
				<div
					className="p-4 mx-auto w-4/5"
					style={{ flexDirection: flexDirection }}
				>
					{loader ? (
						<LoadingComponent address={address} />
					) : nfts && nfts.length > 0 ? (
						<DragDropContext onDragEnd={handleOnDragEnd}>
							<Droppable
								droppableId="nfts"
								direction={flexDirection === "row" ? "horizontal" : "vertical"}
							>
								{(provided) => (
									<div
										{...provided.droppableProps}
										ref={provided.innerRef}
										className="flex flex-wrap items-center justify-evenly gap-4 "
									>
										{nfts.map((item, index) => (
											<NFTCard
												flexDirection={flexDirection}
												key={item.id}
												index={index}
												toggleLike={toggleLike}
												item={item}
												saved={saved}
											/>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</DragDropContext>
					) : (
						<p>No NFTS found, please check the address</p>
					)}
				</div>
			</div>
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				theme="dark"
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	);
};
export default Home;
