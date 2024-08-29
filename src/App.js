
import React, { useState } from "react";
import './App.css';
import Header from './Components/Header';
import SearchBar from './Components/SearchBar';
import NotesBar from './Components/NotesBar';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className='main'>
      <Header />
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <NotesBar searchTerm={searchTerm} />
    </div>
  );
}

export default App;
