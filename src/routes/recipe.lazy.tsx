import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Head from "next/head";
import { useState } from "react";

type RecipeData = {
  name: string;
  description: string;
  image: string;
  recipeIngredient: string[];
  recipeInstructions: { text: string }[];
  keywords: string;
  recipeCategory: string;
  recipeCuisine: string;
  cookTime: string;
  prepTime: string;
  totalTime: string;
};

import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/recipe")({
  component: RecipePage,
});

const queryClient = new QueryClient();

async function fetchJsonLd(url: string): Promise<RecipeData> {
  const corsProxy = "https://corsproxy.io/?";
  const response = await fetch(corsProxy + encodeURIComponent(url));
  if (!response.ok) {
    throw new Error("Failed to fetch JSON-LD data");
  }
  const data = await response.json();
  return (
    data["@graph"]?.find((item: any) => item["@type"] === "Recipe") || data
  );
}

const fetchRecipeData = async (url: string): Promise<RecipeData> => {
  const corsProxy = "https://corsproxy.io/?";
  const response = await fetch(corsProxy + encodeURIComponent(url));
  const text = await response.text();

  // Use a DOMParser to parse the HTML and extract the JSON-LD script content
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html");
  const scriptTag = doc.querySelector('script[type="application/ld+json"]');

  console.log(scriptTag);

  const jsonData = JSON.parse(scriptTag?.innerHTML || "");
  // Filter for recipe-related JSON-LD data
  const recipeData =
    jsonData["@type"] === "Recipe" ||
    jsonData["@type"] === "HowTo" ||
    jsonData["@type"] === "ItemList"
      ? jsonData
      : null;

  // Store in localStorage
  localStorage.setItem("recipeData", JSON.stringify(recipeData));

  return recipeData;
};

function RecipePage() {
  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data, error, isLoading, refetch } = useQuery<RecipeData, Error>({
    queryKey: ["recipe", url],
    queryFn: () => fetchRecipeData(url),
    enabled: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Head>
        {data && (
          <>
            <title>{data.name}</title>
            <meta name="description" content={data.description} />
            <meta property="og:title" content={data.name} />
            <meta property="og:description" content={data.description} />
            <meta property="og:image" content={data.image} />
            <script type="application/ld+json">{JSON.stringify(data)}</script>
          </>
        )}
      </Head>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Fetch Recipe Data</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Fetch Recipe Data</DialogTitle>
            <DialogDescription>
              Enter a URL to fetch its recipe data.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="url" className="text-right">
                  URL
                </Label>
                <Input
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="col-span-3"
                  placeholder="https://example.com/recipe"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsOpen(false)}>
                Fetch Recipe
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {data && (
        <div className="mt-8">
          <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
          <img
            src={data.image}
            alt={data.name}
            className="w-full max-w-2xl mb-4 rounded-lg"
          />
          <p className="mb-4">{data.description}</p>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
              <ul className="list-disc pl-5">
                {data.recipeIngredient.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Directions</h2>
              <ol className="list-decimal pl-5">
                {data.recipeInstructions.toString()}
                {/* {data.recipeInstructions.map((instruction, index) => (
                  <li key={index}>{instruction.text}</li>
                ))} */}
              </ol>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-2">
              Additional Information
            </h2>
            <p>
              <strong>Category:</strong> {data.recipeCategory}
            </p>
            <p>
              <strong>Cuisine:</strong> {data.recipeCuisine}
            </p>
            <p>
              <strong>Keywords:</strong> {data.keywords}
            </p>
            <p>
              <strong>Prep Time:</strong> {data.prepTime}
            </p>
            <p>
              <strong>Cook Time:</strong> {data.cookTime}
            </p>
            <p>
              <strong>Total Time:</strong> {data.totalTime}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Component() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecipePage />
    </QueryClientProvider>
  );
}
