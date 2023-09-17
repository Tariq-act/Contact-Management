import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useContact } from '../store/contactContext';

const Modal = ({ close, data, mode }) => {
  const { createContact, updateContact } = useContact();

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (mode === 'edit') {
      setId(data._id);
      setName(data.name);
      setEmail(data.email);
      setPhoneNumber(data.phoneNumber);
    }
  }, [mode, data]);

  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === 'edit') {
      updateContact(id, { name, email, phoneNumber });
    } else {
      createContact({ name, email, phoneNumber });
    }
    close();
    setName('');
    setEmail('');
    setPhoneNumber('');
    setId('');
  };

  return (
    <div className='absolute top-0 left-0 bg-gray-500 w-full h-full bg-opacity-60'>
      <div className='absolute top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2 w-96 mx-auto'>
        <button
          className='absolute -right-2 -top-2 bg-white rounded-full p-1 shadow'
          onClick={close}
        >
          <RxCross2 />
        </button>
        <form className='bg-white shadow-md rounded px-8 py-8'>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Name
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='name'
              type='text'
              placeholder='Your Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Email
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              type='email'
              placeholder='Your Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Phone Number
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='phone'
              type='tel'
              placeholder='Your Phone Number'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className='text-center'>
            <button
              className='bg-blue-600 hover:bg-blue-700 transition-all text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              onClick={handleSubmit}
            >
              {mode === 'edit' ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
