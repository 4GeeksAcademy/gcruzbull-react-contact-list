import { Link } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Card from "../components/Card.jsx";
import { useEffect, useState } from "react";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	useEffect(() => {
		fetch("https://playground.4geeks.com/contact/agendas/Guillermo-Cruz/contacts")
		.then((response) => {
			if (!response.ok) {
				throw new Error("Error al obtener los contactos")	
			}
			return response.json()
		})
		.then((data) => {
			console.log(data)
			dispatch({type: "set_contacts", payload: {contacts: data.contacts}})
		})
		.catch((error) => {
			console.error(error)
		})
	}, [])

	return (
		<div className="text-center mt-5">
			<h1>Contact List</h1>
			{/* contenedor de las cards */}
			<div>
				{store.contacts && store.contacts.length > 0 && store.contacts.map(contact => {
					return(
						<Card  contact = {contact}  />
					)
				})}

				
			</div>
		</div>
	);
}; 