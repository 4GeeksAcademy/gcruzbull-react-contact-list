import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({contact}) => {
    return (
        <div className="card m-auto p-2" style={{ maxWidth: "600px" }}>
            <div className="row align-items-center justify-content-center">
                <div className="col-md-3 d-flex justify-content-center">
                    <img src="https://avatar.iran.liara.run/public" className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="d-flex card-title justify-content-start ps-1"> {contact.name} </h5>
                        <div className="d-flex p-1">
                            <i className="fa-solid fa-location-dot align-content-center"></i>
                            <p className="card-text ps-2 align-content-center">{contact.address} </p>
                        </div>
                        <div className="d-flex p-1">
                            <i className="fa-solid fa-phone-flip align-content-center"></i>
                            <p className="card-text ps-2 align-content-center">{contact.phone} </p>
                        </div>
                        <div className="d-flex p-1">
                            <i className="fa-solid fa-envelope align-content-center"></i>
                            <p className="card-text ps-2 align-content-center">{contact.email} </p>
                        </div>

                    </div>
                </div>


                <div className="col-md-3 p-2">

                    <Link to="/demo">
                        <button className="m-1 btn border-0 bg-transparent">
                            <i className="fa-solid fa-pencil"></i>
                        </button>
                    </Link>
                
                    <button type="button" class="btn border-0 bg-transparent" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i className="fa-solid fa-trash-can"></i>
                    </button>

           
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    ...
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default Card