import React from "react";

const SearchBar = ({ search, setSearch }) => (
  <input
    type="text"
    placeholder="Buscar por palabra clave, horario o categoría..."
    value={search}
    onChange={e => setSearch(e.target.value)}
    style={{ width: '100%', maxWidth: 180, padding: '0.35rem 0.7rem', marginBottom: 0, borderRadius: '7px', border: '1px solid #222', fontSize: 13, background: '#232323', color: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}
  />
);

export default SearchBar; 