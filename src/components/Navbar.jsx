import { Link } from "react-router-dom";
import React from "react";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container d-flex justify-content-end align-content-center me-3">
				<div className="ml-auto ">
					<Link to="/demo">
						<button className="btn btn-success">Add new contact</button>
					</Link>
				</div>
			</div>		
		</nav>
					);
};