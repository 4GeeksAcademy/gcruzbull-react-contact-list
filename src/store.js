// export const initialStore=()=>{
//   return{
//     message: null,
//     todos: [
//       {
//         id: 1,
//         title: "Make the bed",
//         background: null,
//       },
//       {
//         id: 2,
//         title: "Do my homework",
//         background: null,
//       }
//     ],
//     contacts: [],
//   }
// }

// export default function storeReducer(store, action = {}) {
//   switch(action.type){
//     case 'add_task':

//       const { id,  color } = action.payload

//       return {
//         ...store,
//         todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
//       };
//     case "set_contacts":
//       const { contacts } = action.payload

//       return {
//         ...store,
//         contacts: contacts
//       };
//     default:
//       throw Error('Unknown action.');
//   }    
// }




export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    contacts: [],
    loading: false,
    error: null,
    currentContact: null, // Para editar contactos
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_task':
      const { id, color } = action.payload
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    case "set_contacts":
      const { contacts } = action.payload
      return {
        ...store,
        contacts: contacts,
        loading: false,
        error: null
      };

    case "set_loading":
      return {
        ...store,
        loading: action.payload.loading
      };

    case "set_error":
      return {
        ...store,
        error: action.payload.error,
        loading: false
      };

    case "add_contact":
      return {
        ...store,
        contacts: [...store.contacts, action.payload.contact],
        loading: false,
        error: null
      };

    case "update_contact":
      const updatedContact = action.payload.contact;
      return {
        ...store,
        contacts: store.contacts.map(contact => 
          contact.id === updatedContact.id ? updatedContact : contact
        ),
        currentContact: null,
        loading: false,
        error: null
      };

    case "delete_contact":
      const contactIdToDelete = action.payload.contactId;
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id !== contactIdToDelete),
        loading: false,
        error: null
      };

    case "set_current_contact":
      return {
        ...store,
        currentContact: action.payload.contact
      };

    case "clear_current_contact":
      return {
        ...store,
        currentContact: null
      };

    default:
      throw Error('Unknown action: ' + action.type);
  }    
}