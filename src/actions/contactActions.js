// Crea este archivo: src/actions/contactActions.js

const API_BASE_URL = "https://playground.4geeks.com/contact";
const AGENDA_SLUG = "Guillermo-Cruz"; // Tu nombre de agenda

// Función para obtener todos los contactos
export const getContacts = async (dispatch) => {
  dispatch({ type: "set_loading", payload: { loading: true } });
  
  try {
    const response = await fetch(`${API_BASE_URL}/agendas/${AGENDA_SLUG}/contacts`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    dispatch({ 
      type: "set_contacts", 
      payload: { contacts: data.contacts || [] } 
    });
    
  } catch (error) {
    console.error("Error fetching contacts:", error);
    dispatch({ 
      type: "set_error", 
      payload: { error: error.message } 
    });
  }
};

// Función para crear un nuevo contacto
export const createContact = async (dispatch, contactData) => {
  dispatch({ type: "set_loading", payload: { loading: true } });
  
  try {
    const response = await fetch(`${API_BASE_URL}/agendas/${AGENDA_SLUG}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const newContact = await response.json();
    dispatch({ 
      type: "add_contact", 
      payload: { contact: newContact } 
    });
    
    return newContact;
    
  } catch (error) {
    console.error("Error creating contact:", error);
    dispatch({ 
      type: "set_error", 
      payload: { error: error.message } 
    });
    throw error;
  }
};

// Función para actualizar un contacto existente
export const updateContact = async (dispatch, contactId, contactData) => {
  dispatch({ type: "set_loading", payload: { loading: true } });
  
  try {
    const response = await fetch(`${API_BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${contactId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const updatedContact = await response.json();
    dispatch({ 
      type: "update_contact", 
      payload: { contact: updatedContact } 
    });
    
    return updatedContact;
    
  } catch (error) {
    console.error("Error updating contact:", error);
    dispatch({ 
      type: "set_error", 
      payload: { error: error.message } 
    });
    throw error;
  }
};

// Función para eliminar un contacto
export const deleteContact = async (dispatch, contactId) => {
  dispatch({ type: "set_loading", payload: { loading: true } });
  
  try {
    const response = await fetch(`${API_BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${contactId}`, {
      method: "DELETE",
    });
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    dispatch({ 
      type: "delete_contact", 
      payload: { contactId: contactId } 
    });
    
    return true;
    
  } catch (error) {
    console.error("Error deleting contact:", error);
    dispatch({ 
      type: "set_error", 
      payload: { error: error.message } 
    });
    throw error;
  }
};

// Función para crear la agenda si no existe
export const createAgenda = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/agendas/${AGENDA_SLUG}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (response.ok) {
      console.log("Agenda created successfully");
      return true;
    } else if (response.status === 400) {
      // La agenda ya existe
      console.log("Agenda already exists");
      return true;
    } else {
      throw new Error(`Error creating agenda: ${response.status}`);
    }
    
  } catch (error) {
    console.error("Error creating agenda:", error);
    return false;
  }
};