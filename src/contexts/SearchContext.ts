/* // src/context/SearchContext.ts
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

// Criar o contexto com valor padrão vazio
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Provedor de contexto
export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

// Hook para usar o contexto em outros componentes
export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
 */