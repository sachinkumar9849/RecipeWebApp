// lib/api.ts

import axios from "axios";
import { RecipesResponse, RecipeDetailResponse } from "@/types/recipe";

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

export const fetchRecipes = async (query: string): Promise<RecipesResponse> => {
  try {
    const response = await axios.get<RecipesResponse>(
      `${API_URL}search.php?s=${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching recipes");
  }
};

export const fetchRecipeDetail = async (
  id: string
): Promise<RecipeDetailResponse> => {
  try {
    const response = await axios.get<RecipeDetailResponse>(
      `${API_URL}lookup.php?i=${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching recipe detail");
  }
};
