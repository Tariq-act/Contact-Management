export const contactReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_CONTACTS':
      return {
        ...state,
        contacts: action.payload,
        isLoading: false,
        error: null,
      };

    case 'SET_LOADING':
      return { ...state, isLoading: true, error: null };
    case 'SET_ERROR':
      return { ...state, isLoading: false, error: action.payload };

    case 'CREATE_CONTACT':
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        isLoading: false,
        error: null,
      };

    case 'UPDATE_CONTACT':
      const updatedContacts = state.contacts.map((contact) =>
        contact._id === action.payload.id
          ? action.payload.updatedContact
          : contact
      );
      return {
        ...state,
        contacts: updatedContacts,
        isLoading: false,
        error: null,
      };

    case 'DELETE_CONTACT':
      const filteredContacts = state.contacts.filter(
        (contact) => contact._id !== action.payload
      );
      return {
        ...state,
        contacts: filteredContacts,
        isLoading: false,
        error: null,
      };
    // Add more cases for other CRUD operations as needed
    default:
      return state;
  }
};
