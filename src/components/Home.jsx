import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Container from "@mui/material/Container";
import Footer from "./footer";
import Header from "./Header";
import hcbgImage from "../img.jpg";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		backgroundImage: `url(${hcbgImage})`,
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover !important"
	},
	table: {
		minWidth: 50
	},
	tableHead: {
		backgroundColor: "#225896"
	},
	TableCell: {
		fontSize: "50px !important"
	}
});

export default function SimpleTable() {
	const [rows, setTags] = useState([]);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const [show, setShow] = useState(false);
	const [values, setValues] = useState({
		category: "",
		year: ""
	});
	const classes = useStyles();

	const handleClose = () => {
		console.log("click1");
		setShow(false);
		filterData(values.category, values.year);
	};
	const handleShow = () => {
		setShow(true);
		console.log("click2");
	};
	const handleChange = event => {
		console.log("click3");
		setValues(values => ({
			...values,
			[event.target.name]: event.target.value
		}));
	};

	const handleChangePage =(event, newPage) => {
		console.log(newPage);
		setPage(newPage);
	};

	const year1 = new Date().getFullYear();
	const years = Array.from(new Array(100), (val, index) => year1 - index);
	console.log(years);
	const filterData = (category, year) => {
		console.log("click5");
		console.log(category, year);
		if (
			year.length == 4 &&
			[
				"chemistry",
				"economics",
				"literature",
				"peace",
				"physics",
				"medicine"
			].includes(category)
		) {
			setTags(
				rows.filter(
					data => data.year === year && data.category === category
				)
			);
		} else if (year.length != 4 && category) {
			setTags(rows.filter(data => data.category === category));
		} else if (year.length == 4) {
			setTags(rows.filter(data => data.year === year));
		}
	};

	useEffect(() => {
		axios
			.get("http://api.nobelprize.org/v1/prize.json")
			.then(res => {
				setTags(res.data.prizes);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);
	const handleChangeRowsPerPage = event => {
		console.log("click6");
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	return (
		<div className={classes.root}>
			<Header />
			<div
				style={{
					display: "flex",
					justifyContent: "right",
					margin: "20px"
				}}
			>
				<Button
					style={{
						margin: "20px"
					}}
					variant="primary"
					onClick={handleShow}
				>
					Filter Data
				</Button>
				<Button
					style={{
						margin: "20px"
					}}
					variant="primary"
					onClick={() => window.location.reload(false)}
				>
					Clear Filter
				</Button>
				<Button
					style={{
						margin: "20px"
					}}
					variant="primary"
					href="#"
				>
					Multiple Noble Price
				</Button>
				<Modal show={show} onHide={handleClose} animation={false}>
					<Modal.Header closeButton>
						<Modal.Title>Modal heading</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group
								className="mb-3"
								controlId="formBasicEmail"
							>
								<Form.Label>Category</Form.Label>
								<Form.Select
									value={values.category}
									onChange={handleChange}
									name="category"
									aria-label="Default select example"
								>
									<option>Select Category</option>
									<option value="chemistry">Chemistry</option>
									<option value="economics">Economics</option>
									<option value="literature">
										literature
									</option>
									<option value="peace">peace</option>
									<option value="physics">physics</option>
									<option value="medicine">medicine</option>
								</Form.Select>
								<Form.Label>Email address</Form.Label>
								<Form.Select
									value={values.year}
									onChange={handleChange}
									name="year"
									aria-label="Default select example"
								>
									<option>Select Year</option>
									<option value="2021">2021</option>
									<option value="2022">2022</option>
									<option value="2023">2023</option>
								</Form.Select>
							</Form.Group>

							<Button
								style={{
									margin: "20px"
								}}
								variant="secondary"
								onClick={handleClose}
							>
								Close
							</Button>
							<Button
								variant="primary"
								type="submit"
								onClick={handleClose}
							>
								Save Changes
							</Button>
						</Form>
					</Modal.Body>
				</Modal>
			</div>
			<Container maxWidth="1000px">
				<TableContainer style={{ backgroundColor: "transparent" }}>
					<Table className={classes.table} aria-label="simple table">
						<TableHead className={classes.tableHead}>
							<TableRow className={classes.tableRow}>
								<TableCell style={{ fontSize: "30px" }}>
									Category
								</TableCell>
								<TableCell
									style={{ fontSize: "30px" }}
									align="left"
								>
									Year
								</TableCell>
								<TableCell
									style={{ fontSize: "30px" }}
									align="left"
								>
									Name
								</TableCell>
								<TableCell
									style={{ fontSize: "30px" }}
									align="left"
								>
									Motivation
								</TableCell>
								<TableCell
									style={{ fontSize: "30px" }}
									align="left"
								>
									Share
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								.map((row, index) => (
									<TableRow key={row.name}>
										<TableCell
											style={{ color: "white" }}
											component="th"
											scope="row"
										>
											{row.category}
										</TableCell>
										<TableCell
											style={{ color: "white" }}
											align="left"
										>
											{row.year}
										</TableCell>

										<TableCell
											style={{ color: "white" }}
											align="left"
										>
											{row.laureates.map(row1 => (
												<div>
													{row1.firstname}
													{` ${
														row1.surname
															? row1.surname
															: " "
													}`}
												</div>
											))}
										</TableCell>

										<TableCell
											style={{ color: "white" }}
											align="left"
										>
											{row.laureates[0].motivation}
										</TableCell>
										<TableCell
											style={{ color: "white" }}
											align="left"
										>
											{row.laureates[0].share}
										</TableCell>
									</TableRow>
								))}
							{emptyRows > 0 && (
								<TableRow style={{ height: 53 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					style={{ color: "red" }}
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Container>
			<Footer />
		</div>
	);
}
