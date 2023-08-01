import React from 'react';
import { Input } from 'antd'; // Import Input component from antd

const SearchBar = ({ value, onChange }) => {
  return (
    <Input
      value={value}
      onChange={event => onChange(event.target.value)} 
      placeholder="Search... on id or name"
    />
  );
};

export default SearchBar;