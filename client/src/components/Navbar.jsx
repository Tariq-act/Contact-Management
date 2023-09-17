import { RiSearch2Line } from 'react-icons/ri';
import { RxPlus } from 'react-icons/rx';
import { HiOutlineArrowUpTray } from 'react-icons/hi2';
import { BsDownload } from 'react-icons/bs';

const Navbar = ({ modelBtn, onSearch, sort, downloadData }) => {
  return (
    <div className='mb-10'>
      <h1 className='text-2xl mb-4 text-center font-medium'>
        Contact Management System
      </h1>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-center border py-1 px-2 rounded-lg'>
          <RiSearch2Line />
          <input
            className='ml-2 outline-none'
            type='search'
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <div className=' flex items-center gap-5'>
          <div className='flex items-center gap-2'>
            <button className='shadow p-2 rounded' onClick={sort}>
              <HiOutlineArrowUpTray />
            </button>
            <button className='shadow p-2 rounded' onClick={downloadData}>
              <BsDownload />
            </button>
          </div>

          <button
            className='flex items-center justify-between gap-2 text-sm font-semibold text-blue-600 shadow p-2 rounded-lg'
            onClick={modelBtn}
          >
            <RxPlus fontSize={'1rem'} />
            Add contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
