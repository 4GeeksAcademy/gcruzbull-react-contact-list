import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<div className="text-center mt-5">
			<h1>Contact List</h1>
			{/* contenedor de las cards */}
			<div>
				{/* card */}
				<div className="card mb-3" style={{maxWidth: "540px"}}>
					<div className="row g-0">

						<div className="col-md-3">
							<img src="..." className="img-fluid rounded-start" alt="..."/>
						</div>
						<div className="col-md-6">
							<div className="card-body">
								<h5 className="card-title">Juan Perez</h5>
								<p className="card-text">This is a wider </p>
							</div>
						</div>


						<div className="col-md-3">
							<button>Editar</button>
							<button>Borrar</button>
						</div>

					</div>
				</div>
			</div>
		</div>
	);
}; 