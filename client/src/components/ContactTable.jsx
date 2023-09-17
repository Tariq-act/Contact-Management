import { useState } from 'react';
import Modal from './Modal';
import ContactItem from './ContactItem';

const ContactTable = ({ filteredContacts }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const openEditModalHandler = (contact) => {
    setSelectedContact(contact);
    setOpenEditModal(true);
  };

  const closeEditModalHandler = () => {
    setSelectedContact(null);
    setOpenEditModal(false);
  };

  return (
    <div className='overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-sm  text-left shadow-md'>
        <thead className='text-xs uppercase bg-gray-50 '>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Email
            </th>
            <th scope='col' className='px-6 py-3'>
              Phone Number
            </th>

            <th scope='col' className='px-6 py-3'>
              CTA
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredContacts.map((contact, idx) => (
            <ContactItem
              contact={contact}
              key={idx}
              openEdit={() => openEditModalHandler(contact)}
            />
          ))}
        </tbody>
      </table>
      {filteredContacts.length == 0 && (
        <p className='text-center text-gray-400 text-lg py-4'>
          No Contacts available
        </p>
      )}
      {openEditModal && (
        <Modal
          close={closeEditModalHandler}
          data={selectedContact}
          mode={'edit'}
        />
      )}
    </div>
  );
};

export default ContactTable;
