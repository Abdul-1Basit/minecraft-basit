import React from "react";
import "./App.css";
import { Table } from "antd";

function App() {
	const [listOfUsers, setListOfUsers] = React.useState([]);
	const [userName, setUserName] = React.useState("");
	const [loading, setLoading] = React.useState(false);
	const addMeToList = () => {
		setLoading(true);
		fetch("http://localhost:5001/" + userName)
			.then((res) => res.json())
			.then((resp) => {
				if (resp.data.id) {
					setUserName("");
					saveToList(resp.data.id);
					return;
				}
				alert("The player doesn't exists!");
			})
			.catch((err) => console.log("error", err))
			.finally(() => {
				setLoading(false);
			});
	};
	const saveToList = (id: any) => {
		fetch("http://localhost:5001/getDetails/" + id)
			.then((res) => res.json())
			.then((resp) => {
				let arr: any = [...listOfUsers];

				if (resp.data.id) {
					arr.push({
						id,
						name: resp.data.name,
					});
					setListOfUsers(arr);
					return;
				}
			})
			.catch((err) => console.log("error", err));
	};
	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: (text: any) => <span>{text}</span>,
		},
		{
			title: "body",
			dataIndex: "image",
			render: (image: any) => (
				<img
					src={image}
					style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
				/>
			),
		},
		{
			title: "Action",
			key: "action",
			render: (data: any) => (
				<div className="rowing" style={{ width: 350 }}>
					<span
						style={{ color: "red", cursor: "pointer" }}
						onClick={() => deleteMe(data.id)}
					>
						Delete
					</span>
					<span>Change</span>
				</div>
			),
		},
	];
	const deleteMe = (id: any) => {
		let newList = [...listOfUsers];
		newList = newList.filter((item: any) => item.id !== id);
		setListOfUsers(newList);
	};
	return (
		<div className="App">
			<div className="rowing" style={{ padding: 40 }}>
				<span className="tableHeading">List of Players</span>
				<div
					className="rowing"
					style={{ paddingTop: 20, paddingBottom: 20, marginRight: 10 }}
				>
					<input
						className="inputStyling"
						value={userName}
						onChange={(e) => {
							setUserName(e.target.value);
						}}
					/>
					<input
						type="button"
						onClick={addMeToList}
						className="submitBtn"
						value="submit"
					/>
				</div>
			</div>
			<div>
				<Table columns={columns} dataSource={listOfUsers} />
			</div>
		</div>
	);
}

export default App;
