import React, { useState } from 'react';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { BiEdit } from 'react-icons/bi';
import { useContact } from '../store/contactContext';

const ContactItem = ({ contact, openEdit }) => {
  const { deleteContact } = useContact();

  const handleDelete = (id) => {
    try {
      deleteContact(id);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <tr>
      <th scope='row' className='px-6 py-4 font-medium  whitespace-nowrap '>
        {contact.name}
      </th>
      <td className='px-6 py-4'>{contact.email}</td>
      <td className='px-6 py-4'>{contact.phoneNumber}</td>

      <td className='px-6 py-4'>
        <div className='flex gap-3 text-xl'>
          <button onClick={openEdit}>
            <BiEdit className='text-blue-500' />
          </button>
          <button onClick={() => handleDelete(contact._id)}>
            <RiDeleteBin2Fill className='text-red-500' />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ContactItem;
