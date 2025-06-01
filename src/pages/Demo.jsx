// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.

export const Demo = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

  return (
    
    
    
    
    <div className="container row">
       
      <form>
        <div className="mb-3">
          <label for="inputName" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="inputName" placeholder="Full Name" aria-describedby=""/>
        </div>

        <div className="mb-3">
          <label for="inputEmail" className="form-label">Email</label>
          <input type="email" className="form-control" id="inputEmail" placeholder="Enter Email" aria-describedby="emailHelp"/>
        </div>

        <div className="mb-3">
          <label for="inputPhone" className="form-label">Phone</label>
          <input type="number" className="form-control" id="inputPhone" aria-describedby="" placeholder="Enter Phone"/>
        </div>

        <div className="mb-3">
          <label for="inputPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="inputPassword" placeholder="Enter Password"/>
        </div>

        <div className="mb-3">
          <label for="inputAddress" className="form-label">Address</label>
          <input type="text" className="form-control" id="inputAddress" placeholder="Enter Address" aria-describedby=""/>
        </div>

        <Link to="/">
          <button type="submit" className="btn btn-primary col-md-12">Save</button>
        </Link>
        <Link to="/">
          <a className="col-md-12">or get back to contacts</a>
        </Link>
      </form>
      
      <br />

      <Link to="/">
        <button className="btn btn-primary col-md-12">Save</button>
      </Link>
      <Link to="/">
        <a className="col-md-12">or get back to contacts</a>
      </Link>
    </div>
    
  );
};
