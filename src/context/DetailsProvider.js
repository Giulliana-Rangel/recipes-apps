import { useMemo, useState } from 'react';
import DetailsContext from './DetailsContext';

export default function DetailsProvider({ children }) {
  const [detailsRecipes, setDetailsRecipe] = useState({
    drinks: [],
    meals: [],
  });
  const [checked, setChecked] = useState({});

  const [ingredientes, setIngredientes] = useState([]);
  const [pound, setPound] = useState([]);

  const handleChecked = (ing) => {
    const obj = {};
    ing.forEach((e, i) => {
      obj[`checked${i}`] = false;
    });
    setChecked(obj);
  };

  const FetchUrl = async (url, type) => {
    const response = await fetch(url);
    const data = await response.json();
    setDetailsRecipe(data);
    const recipes = Object.keys(data[type][0]).filter((e) => e.includes('strIngredient'));
    const newRecipes = recipes
      .map((e) => data[type][0][e])
      .filter((a) => a !== '' && a !== null);
    const ingredientPounds = Object.keys(data[type][0])
      .filter((e) => e.includes('strMeasure'));
    const newPound = ingredientPounds
      .map((e) => data[type][0][e])
      .filter((a) => a !== '' && a !== null);
    setIngredientes(newRecipes);
    setPound(newPound);
    handleChecked(newRecipes);
  };

  const value = useMemo(() => ({
    ingredientes,
    setIngredientes,
    pound,
    setPound,
    detailsRecipes,
    setDetailsRecipe,
    FetchUrl,
    checked,
    setChecked,

  }), [ingredientes, pound, detailsRecipes, checked]);

  return (
    <DetailsContext.Provider
      value={ value }
    >
      {children}
    </DetailsContext.Provider>
  );
}
DetailsProvider.propTypes = {}.isRequired;