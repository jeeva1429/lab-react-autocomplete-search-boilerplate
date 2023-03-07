import React, { useState, useEffect } from 'react';
import data from '../resources/countryData.json';
import '../cssComponents/searchBox.css';

function SearchBox() {
  const [searchItem, setSearchItem] = useState('');
  const [possibleResults, setPossibleResults] = useState([]);
  
  const handleInput = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchItem(input);
    if (input !== '') {
      const filteredData = data.filter((obj) =>
        obj.name.toLowerCase().startsWith(input)
      );
      setPossibleResults(filteredData);
    } else {
      setPossibleResults([]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 27 && possibleResults.length > 0) {
        setPossibleResults([]);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [possibleResults]);

  return (
    <div id='main'>
      <input type='text' onChange={handleInput} />
      <button>search</button>
      {possibleResults.map((el) => (
        <li key={el.name}>{el.name}</li>
      ))}
    </div>
  );
}

export default SearchBox;
