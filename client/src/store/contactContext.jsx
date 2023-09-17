import React, { createContext, useContext, useReducer } from 'react';
import { contactReducer } from './contactReducer';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

// Define your initial state
const initialState = {
  contacts: [],
  isLoading: false,
  error: null,
};

// Define your context
const ContactContext = createContext();

// Create a Provider component
export const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  const fetchData = async () => {
    try {
      dispatch({ type: 'SET_LOADING' });

      const response = await axios.get(baseUrl);
      const contacts = response.data.contacts;
      console.log(contacts);
      dispatch({ type: 'FETCH_CONTACTS', payload: contacts });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const createContact = async (newContact) => {
    try {
      dispatch({ type: 'SET_LOADING' });
      const response = await axios.post(baseUrl, newContact);
      const createdContact = response.data;

      dispatch({ type: 'CREATE_CONTACT', payload: createdContact });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      alert(error.message);
    }
  };

  const updateContact = async (id, updatedContact) => {
    try {
      dispatch({ type: 'SET_LOADING' });
      await axios.patch(`${baseUrl}/${id}`, updatedContact);

      dispatch({ type: 'UPDATE_CONTACT', payload: { id, updatedContact } });
      fetchData();
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      alert(error.message);
    }
  };

  // Function to delete a contact
  const deleteContact = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING' });
      await axios.delete(`${baseUrl}/${id}`);

      dispatch({ type: 'DELETE_CONTACT', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      alert(error.message);
    }
  };

  return (
    <ContactContext.Provider
      value={{
        state,
        dispatch,
        fetchData,
        createContact,
        deleteContact,
        updateContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

//  custom hook to use the context
export const useContact = () => {
  const context = useContext(ContactContext);

  if (!context) {
    throw new Error('useContact must be used within a ContactProvider');
  }

  return context;
};
