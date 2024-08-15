"use client";

import { fetchRecipes } from "@/lib/api";
import { useState, useEffect, useCallback } from "react";
import RecipeCard from "@/components/RecipeCard";
import { Recipe, RecipesResponse } from "@/types/recipe";
import debounce from "lodash/debounce";
import Banner from "../components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const getRecipes = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const data: RecipesResponse = await fetchRecipes(query);
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedGetRecipes = useCallback(
    debounce((query: string) => getRecipes(query), 1000),
    [getRecipes]
  );

  useEffect(() => {
    debouncedGetRecipes(searchQuery);
    return () => debouncedGetRecipes.cancel();
  }, [searchQuery, debouncedGetRecipes]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Navbar />
      <Banner
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        loading={loading}
      />
      <section className="pt-custom pb-custom max-md:pt-11 max-md:pb-11">
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-0">
          <div className="grid md:grid-cols-1">
            <div className="col-span-1">
              <div className="section-title">
                <h1 className="text-3xl semi-bold mb-8 text-uppercase relative">
                  Recipe Search
                </h1>
              </div>
              {loading ? (
                <p className="text-center text-xl">Loading...</p>
              ) : recipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {recipes.map((recipe) => (
                    <RecipeCard key={recipe.idMeal} {...recipe} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-xl">No recipes found.</p>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
