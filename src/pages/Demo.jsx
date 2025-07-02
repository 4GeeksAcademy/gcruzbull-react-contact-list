import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { createContact, updateContact } from "../actions/contactActions";
import { useState, useEffect } from "react";

export const Demo = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { contactId } = useParams(); // Para editar contactos
  
  // Estados del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Determinar si estamos editando
  // Si hay un contactId en la URL, entonces estamos editando. Si no, estamos creando un nuevo contacto.
  const isEditing = Boolean(contactId);
  
  // Cargar datos del contacto si estamos editando
  useEffect(() => {
    if (isEditing && store.contacts) {
      const contactToEdit = store.contacts.find(
        contact => contact.id === parseInt(contactId)
      );
      
      if (contactToEdit) {
        setFormData({
          name: contactToEdit.name || "",
          email: contactToEdit.email || "",
          phone: contactToEdit.phone || "",
          address: contactToEdit.address || ""
        });
      }
    }
  }, [isEditing, contactId, store.contacts]);
  
  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({    // prev es el estado anterior, es decir, el valor actual de formData antes del cambio.
      ...prev,                // Copia todo lo que ya había en formData
      [name]: value   // Actualiza solo el campo que está cambiando (ej, name o email). Es una forma segura de actualizar solo una parte del estado sin borrar el resto.
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  
  // Validar formulario
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido";
    }
    
    if (!formData.address.trim()) {
      newErrors.address = "La dirección es requerida";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (isEditing) {
        await updateContact(dispatch, parseInt(contactId), formData);
      } else {
        await createContact(dispatch, formData);
      }
      
      // Redirigir a home después de guardar
      navigate("/");
      
    } catch (error) {
      console.error("Error saving contact:", error);
      // Aquí podrías mostrar una notificación de error
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card">
            <div className="d-flex mt-3 align-content-center justify-content-center">
              <h3 className="mb-0">
                {isEditing ? "Editar Contacto" : "Add a new contact"}
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Campo Nombre */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                
                {/* Campo Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                
                {/* Campo Teléfono */}
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone"
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div>
                
                {/* Campo Dirección */}
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Adress
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter adress"
                    disabled={isSubmitting}
                  />
                  {errors.address && (
                    <div className="invalid-feedback">{errors.address}</div>
                  )}
                </div>
                
                {/* Botones */}
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        {isEditing ? "Actualizando..." : "Guardando..."}
                      </>
                    ) : (
                      <>
                        {/* <i className="fas fa-save me-2"></i> */}
                        {isEditing ? "Actualizar Contacto" : "Save"}
                      </>
                    )}
                  </button>
                  
                  <Link to="/">
                    {/* <i className="fas fa-arrow-left me-2"></i> */}
                    <a className="col-md-12">or get back to contacts</a>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


