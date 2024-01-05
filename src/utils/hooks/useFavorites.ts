import { useEffect, useState } from "react";

const useFavorites = () => {
  const [favorites, setFavorites] = useState<Array<any>>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Add an entity to favorites
  const addToFavorites = (entity: any) => {
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites, entity];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // Remove an entity from favorites
  const removeFromFavorites = (entity: any) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.filter(
        (favorite) => favorite.name !== entity.name
      );
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // Check if an entity is in favorites based on name
  const isFavorite = (entity: any) => {
    return favorites.some((favorite) => favorite.name === entity.name);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
};

export default useFavorites;
