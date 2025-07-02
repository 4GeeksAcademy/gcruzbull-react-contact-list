// import React from 'react'
// import { Link } from 'react-router-dom'

// const Card = ({contact}) => {
//     return (
//         <div className="card m-auto p-2" style={{ maxWidth: "600px" }}>
//             <div className="row align-items-center justify-content-center">
//                 <div className="col-md-3 d-flex justify-content-center">
//                     <img src="https://avatar.iran.liara.run/public" className="img-fluid rounded-start" alt="..." />
//                 </div>
//                 <div className="col-md-6">
//                     <div className="card-body">
//                         <h5 className="d-flex card-title justify-content-start ps-1"> {contact.name} </h5>
//                         <div className="d-flex p-1">
//                             <i className="fa-solid fa-location-dot align-content-center"></i>
//                             <p className="card-text ps-2 align-content-center">{contact.address} </p>
//                         </div>
//                         <div className="d-flex p-1">
//                             <i className="fa-solid fa-phone-flip align-content-center"></i>
//                             <p className="card-text ps-2 align-content-center">{contact.phone} </p>
//                         </div>
//                         <div className="d-flex p-1">
//                             <i className="fa-solid fa-envelope align-content-center"></i>
//                             <p className="card-text ps-2 align-content-center">{contact.email} </p>
//                         </div>

//                     </div>
//                 </div>


//                 <div className="col-md-3 p-2">

//                     <Link to="/demo">
//                         <button className="m-1 btn border-0 bg-transparent">
//                             <i className="fa-solid fa-pencil"></i>
//                         </button>
//                     </Link>
                
//                     <button type="button" class="btn border-0 bg-transparent" data-bs-toggle="modal" data-bs-target="#exampleModal">
//                         <i className="fa-solid fa-trash-can"></i>
//                     </button>

           
//                     <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                         <div class="modal-dialog">
//                             <div class="modal-content">
//                                 <div class="modal-header">
//                                     <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
//                                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                                 </div>
//                                 <div class="modal-body">
//                                     ...
//                                 </div>
//                                 <div class="modal-footer">
//                                     <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                                     <button type="button" class="btn btn-primary">Save changes</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>


//                 </div>

//             </div>
//         </div>
//     )
// }

// export default Card




import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { deleteContact } from '../actions/contactActions';

const Card = ({ contact }) => {
  const { dispatch } = useGlobalReducer();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Función para manejar la eliminación
  const handleDelete = async () => {
    setIsDeleting(true);
    
    try {
      await deleteContact(dispatch, contact.id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting contact:', error);
      // Aquí podrías mostrar una notificación de error
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="card m-auto p-2" style={{ maxWidth: "600px" }}>
        <div className="row">
          {/* Avatar */}
          <div className="col-md-3 d-flex mt-2 mb-2 pt-3 pb-3 align-content-center justify-content-center">
            <img 
              src="https://avatar.iran.liara.run/public" 
              className="img-fluid rounded-start" 
              alt="Avatar"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
          </div>
          
          {/* Información del contacto */}
          <div className="col-md-6">
            <div className="card-body">
              <h5 className="d-flex card-title justify-content-start ps-1">
                {contact.name || 'Without name'}
              </h5>
              
              <div className="d-flex p-1">
                <i className="fa-solid fa-location-dot align-content-center text-muted"></i>
                <p className="card-text ps-2 align-content-center mb-0">
                  {contact.address || 'Without adress'}
                </p>
              </div>
              
              <div className="d-flex p-1">
                <i className="fa-solid fa-phone-flip align-content-center text-muted"></i>
                <p className="card-text ps-2 align-content-center mb-0">
                  {contact.phone || 'Without phone'}
                </p>
              </div>
              
              <div className="d-flex p-1">
                <i className="fa-solid fa-envelope align-content-center text-muted"></i>
                <p className="card-text ps-2 align-content-center mb-0">
                  {contact.email || 'Without email'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Botones de acción */}
          <div className="col-md-3 p-2">
            {/* Botón Editar */}
            <Link to={`/demo/${contact.id}`}>
              <button 
                className="m-1 btn border-0 bg-transparent"
                title="Edit contact"
              >
                <i className="fa-solid fa-pencil text-primary"></i>
              </button>
            </Link>
            
            {/* Botón Eliminar */}
            <button 
              type="button" 
              className="btn border-0 bg-transparent" 
              onClick={() => setShowDeleteModal(true)}
              title="Delete contact"
            >
              <i className="fa-solid fa-trash-can text-danger"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showDeleteModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {/* <i className="fas fa-exclamation-triangle text-warning me-2"></i> */}
                  Are you sure?
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowDeleteModal(false)}
                  disabled={isDeleting}
                ></button>
              </div>
              
              <div className="modal-body">
                <p className="mb-3">
                  Are you sure you want to delete the contact {' '}
                  <strong>{contact.name}</strong>?
                </p>
                <div className="alert alert-warning">
                  <i className="fas fa-info-circle me-2"></i>
                  This action cannot be reversed.
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={() => setShowDeleteModal(false)}
                  disabled={isDeleting}
                >
                  {/* <i className="fas fa-times me-2"></i> */}
                  Oh no!
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Deleting...
                    </>
                  ) : (
                    <>
                      {/* <i className="fas fa-trash me-2"></i> */}
                      Yes baby!
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;