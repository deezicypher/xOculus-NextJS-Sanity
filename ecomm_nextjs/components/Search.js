import React from 'react';
import {FaTimes} from 'react-icons/fa';
import {InfinitySpin} from 'react-loader-spinner';
import { useStateContext } from '../context/stateContext';


const Search = () => {
    const {setSearchItem, setShowSearch, searchItem} = useStateContext();
  return (
    < >
    <div className='search-wrapper' >
        <div className='search-container'>
        <div className="search-heading">
        <span className='heading'>Search Oculux Store</span>
        <p><FaTimes fontSize={30} className="cancel-search"/></p>
        </div>
        <div className='search-sec'>
            <input type="text" className='search-input' placeholder='Search for Products' />
        </div>
        <div className='search-content'>
        <InfinitySpin  className="spinner"
  width='200'
  color="#1d66c1"
/>
        </div>
        </div>
        </div>
    </>
  )
}

export default Search