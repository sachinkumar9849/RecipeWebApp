import React from "react";
import { Recipe } from "@/types/recipe";
import Image from "next/image";
import Link from "next/link";

const RecipeCard: React.FC<Recipe> = ({ idMeal, strMeal, strMealThumb }) => {
  return (
    <Link href={`/recipe/${idMeal}`} className="block">
      <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
        <div className="relative w-full h-60 sm:h-80 md:h-96 lg:h-64">
          <Image
            src={strMealThumb}
            alt={strMeal}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="recipeTitle">
          <h2 className="pt-2">{strMeal}</h2>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
