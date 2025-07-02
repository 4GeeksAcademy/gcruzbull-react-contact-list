import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Card from "../components/Card.jsx";
import { useEffect } from "react";
import { getContacts, createAgenda } from "../actions/contactActions.js";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const initializeApp = async () => {
      // Primero intentamos crear la agenda (si no existe)
      await createAgenda();
      
      // Luego obtenemos los contactos
      await getContacts(dispatch);
    };

    initializeApp();
  }, [dispatch]);

  // Componente de loading
  if (store.loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading contacts...</p>
      </div>
    );
  }

  // Componente de error
  if (store.error) {
    return (
      <div className="text-center mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">¡Oops! Algo salió mal</h4>
          <p>{store.error}</p>
          <hr />
          <button 
            className="btn btn-outline-danger" 
            onClick={() => getContacts(dispatch)}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center mt-5">
      <h1>Contact List</h1>
      
      {/* Mensaje cuando no hay contactos */}
      {(!store.contacts || store.contacts.length === 0) ? (
        <div className="mt-5">
          <div className="alert alert-info" role="alert">
            <i className="fas fa-info-circle me-2"></i>
            You don't have any contacts yet. ¡Add your first one!
          </div>
          <Link to="/demo" className="btn btn-success btn-lg">
            <i className="fas fa-plus me-2"></i>
            Add your first contact.
          </Link>
        </div>
      ) : (
        // Lista de contactos
        <div className="mt-4">
          <p className="text-muted mb-4">
            Tienes {store.contacts.length} contacto{store.contacts.length !== 1 ? 's' : ''} guardado{store.contacts.length !== 1 ? 's' : ''}
          </p>
          
          {store.contacts.map((contact, index) => (
            <div key={contact.id || index} className="mb-3">
              <Card contact={contact} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};