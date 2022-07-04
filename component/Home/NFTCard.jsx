import React from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Draggable } from "react-beautiful-dnd";

const NFTCard = ({ item, saved, toggleLike, flexDirection, index }) => {
	const styles = useStyles({ flexDirection });
	return (
		<Draggable key={item.id} draggableId={item.id} index={index}>
			{(provided) => (
				<div
					className={styles.container}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					<a
						href={`https://solscan.io/token/${item.mintTokenAddress}?cluster=devnet`}
						target="_blank"
					>
						<img src={item?.data?.image} className={styles.image} />
					</a>
					<div className="flex flex-wrap items-start justify-between gap-4 p-2 w-full">
						<div>
							<p>{item?.data?.name}</p>
							<p className="truncate text-xs">
								<span className="font-bold ">Creator:</span>{" "}
								{item?.data?.properties?.creators[0]?.address.substr(0, 10)}
							</p>
						</div>
						<div>
							{saved && saved.length > 0 && saved.includes(item?.id) ? (
								<IconButton onClick={() => toggleLike(item?.id)}>
									<AiFillStar color="black" size={18} />
								</IconButton>
							) : (
								<IconButton onClick={() => toggleLike(item?.id)}>
									<AiOutlineStar color="black" size={18} />
								</IconButton>
							)}
						</div>
					</div>
				</div>
			)}
		</Draggable>
	);
};
export default NFTCard;

const useStyles = makeStyles(() => ({
	image: {
		height: (props) => (props.flexDirection === "row" ? "10rem" : "6rem"),
		width: (props) => (props.flexDirection === "row" ? "100%" : "6rem"),
		objectFit: "fit",
		borderRadius: "0.75rem",
	},
	container: {
		display: "flex",
		flexDirection: (props) =>
			props.flexDirection === "row" ? "column" : "row",
		width: (props) => (props.flexDirection === "row" ? "auto" : "80%"),
		height: "auto",
		backgroundColor: "#f4f4f5",
		borderRadius: "0.75rem",
	},
}));
