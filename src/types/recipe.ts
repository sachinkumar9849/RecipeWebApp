export type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export type RecipeDetail = Recipe & {
  strInstructions: string;
  strCategory: string;
  strArea: string;
  strSource: string;
  strTags: string;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
};

export type RecipesResponse = {
  meals: Recipe[];
};

export type RecipeDetailResponse = {
  meals: RecipeDetail[];
};
