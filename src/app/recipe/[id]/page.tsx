import { fetchRecipeDetail } from "@/lib/api";
import { RecipeDetail } from "@/types/recipe";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BannerSum from "../../../../public/image/banner.jpg";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default async function RecipeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await fetchRecipeDetail(params.id);
  const recipe: RecipeDetail = data.meals[0];

  if (!recipe) {
    return <div>Recipe not found</div>;
  }
  const tags = (recipe.strTags ?? "")
    .split(",")
    .filter((tag) => tag.trim() !== "");

  const ingredients = Array.from({ length: 20 }, (_, i) => ({
    ingredient: recipe[`strIngredient${i + 1}`],
    measure: recipe[`strMeasure${i + 1}`],
  })).filter(({ ingredient }) => ingredient);

  // Split instructions by new line or delimiter
  const instructionsRaw = recipe.strInstructions ?? "";
  const instructions = instructionsRaw
    .split(/\n|\r\n|\r/)
    .filter((instruction) => instruction.trim() !== "")
    .reduce((acc, curr) => {
      if (curr.startsWith("STEP")) {
        acc.push({ step: curr, description: "" });
      } else if (acc.length > 0) {
        acc[acc.length - 1].description += `${curr.trim()} `;
      }
      return acc;
    }, [] as { step: string; description: string }[]);

  return (
    <>
      <Navbar />
      <div className="relative w-full h-48">
        <Image
          src={BannerSum}
          alt="Logo"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
      </div>

      <section className="recipeDetail pt-custom pb-custom max-md:pt-11 max-md:pb-11 bg-gray-100">
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-0">
          <p className="uppercase flex themeColor rounded-sm text-white p-3">
            <Link href={"/"}>
              <FontAwesomeIcon icon={faHome} className="mr-1" />
            </Link>{" "}
            /<span className="ml-1">{recipe.strMeal}</span>
          </p>
          <div className="section-title mt-7 mb-10">
            <h1 className="text-3xl semi-bold uppercase relative">
              Meal details
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white mg:p-10 p-4 rounded-md">
            <div className="col-span-1">
              <div className="relative w-full h-[300px] md:h-[400px]">
                <Image
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 rounded-md"
                />
              </div>
            </div>
            <div className="col-span-1">
              <div className="recipe-detail-title mb-5">
                <h2 className="text-2xl font-semibold">{recipe.strMeal}</h2>
              </div>

              <h2 className="text-1xl font-semibold mb-2 uppercase">
                Category:
                <span className="font-light">{recipe.strCategory}</span>
              </h2>
              <h2 className="text-1xl font-semibold mb-2 uppercase">
                Area:
                <span className="font-light">{recipe.strArea}</span>
              </h2>

              <p className="font-semibold mb-2 flex">
                <span className="mr-2"> Tags:</span>
                {tags.length > 0 ? (
                  <span className="flex flex-wrap gap-2 text-orange-500">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 px-2 py-1 rounded text-sm"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </span>
                ) : (
                  <span className="text-gray-500">No tags available</span>
                )}
              </p>

              <div className="ingredientsWrap themeColor rounded-md p-5">
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Ingredients:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ingredients.length > 0 ? (
                    ingredients.map(({ ingredient, measure }, index) => (
                      <div key={index} className="text-gray-200">
                        <div className="flex items-center">
                          <span className="font-semibold">#) </span>
                          <span className="ml-1">
                            {ingredient} - {measure}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>No ingredients available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1">
            <div className="col-span-1">
              <div className="bg-white mt-4 lg:p-10 p-6">
                <div className="recipe-detail-title mb-5">
                  <h2 className="text-2xl font-semibold">Instructions</h2>
                </div>
                <ol className="list-decimal list-inside">
                  {instructions.length > 0 ? (
                    instructions.map((instruction, index) => (
                      <li key={index} className="text-gray-700 mb-4">
                        <div className="font-bold">{instruction.step}</div>
                        <div className="">{instruction.description.trim()}</div>
                      </li>
                    ))
                  ) : (
                    <li>No instructions available</li>
                  )}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
