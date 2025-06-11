import React from "react";

const SearchBar = ({ search, setSearch }) => (
  <input
    type="text"
    placeholder="Buscar por palabra clave, horario o categoría..."
    value={search}
    onChange={e => setSearch(e.target.value)}
    style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #ccc' }}
  />
);

export default SearchBar; 