import { useState, useEffect } from 'react';

/**
 * Hook personalizado para gestionar favoritos usando localStorage
 * Permite agregar, eliminar y recuperar servicios favoritos
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar favoritos del localStorage al montar el componente
  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Error al cargar favoritos:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  // Agregar un servicio a favoritos
  const addFavorite = (serviceId: number) => {
    setFavorites((prev) => {
      if (!prev.includes(serviceId)) {
        return [...prev, serviceId];
      }
      return prev;
    });
  };

  // Eliminar un servicio de favoritos
  const removeFavorite = (serviceId: number) => {
    setFavorites((prev) => prev.filter((id) => id !== serviceId));
  };

  // Verificar si un servicio está en favoritos
  const isFavorite = (serviceId: number) => {
    return favorites.includes(serviceId);
  };

  // Alternar estado de favorito
  const toggleFavorite = (serviceId: number) => {
    if (isFavorite(serviceId)) {
      removeFavorite(serviceId);
    } else {
      addFavorite(serviceId);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    isLoaded,
  };
}
