import React from 'react';

export default interface ISearchTermProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  inputType: string;
  placeholder: string;

}