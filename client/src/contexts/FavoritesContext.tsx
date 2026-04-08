import React, { createContext, useContext, ReactNode } from 'react';
import { useFavorites } from '@/hooks/useFavorites';

/**
 * Contexto global para gestionar favoritos
 * Permite que cualquier componente acceda a los favoritos sin prop drilling
 */
interface FavoritesContextType {
  favorites: number[];
  addFavorite: (serviceId: number) => void;
  removeFavorite: (serviceId: number) => void;
  isFavorite: (serviceId: number) => boolean;
  toggleFavorite: (serviceId: number) => void;
  isLoaded: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

/**
 * Proveedor de contexto para favoritos
 * Envuelve la aplicación para proporcionar acceso a favoritos en toda la app
 */
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const favorites = useFavorites();

  return (
    <FavoritesContext.Provider value={favorites}>
      {children}
    </FavoritesContext.Provider>
  );
}

/**
 * Hook para usar el contexto de favoritos
 * Debe ser usado dentro de un FavoritesProvider
 */
export function useFavoritesContext() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavoritesContext debe ser usado dentro de FavoritesProvider');
  }
  return context;
}
