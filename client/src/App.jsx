import { useEffect, useState } from 'react';
import ContactTable from './components/ContactTable';
import Modal from './components/Modal';
import Navbar from './components/Navbar';
import { useContact } from './store/contactContext';
// import useContact from './hooks/useContact';

function App() {
  const { fetchData, state } = useContact();
  const [isModal, setIsModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  // const [sortedContacts, setSortedContacts] = useState([]);

  const toggleModal = () => {
    setIsModal(!isModal);
  };
  const closeModal = () => {
    setIsModal(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Search when type in search bar

  const handleSearch = (text) => {
    setSearchText(text);
  };

  useEffect(() => {
    const filtered = state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [state.contacts, searchText]);

  // Sorting Function
  const toggleSortOrder = () => {
    // Toggle between 'asc' and 'desc'
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    // Sort the contacts based on the chosen property
    const sorted = state.contacts.sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setFilteredContacts(sorted);
  };

  // Download Data function
  const downloadData = () => {
    const dataToDownload = JSON.stringify(filteredContacts, null, 2);
    const blob = new Blob([dataToDownload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contacts.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className='px-10'>
      <Navbar
        modelBtn={toggleModal}
        onSearch={handleSearch}
        sort={toggleSortOrder}
        downloadData={downloadData}
      />
      <ContactTable filteredContacts={filteredContacts} />
      {isModal && <Modal close={closeModal} />}
    </div>
  );
}

export default App;
