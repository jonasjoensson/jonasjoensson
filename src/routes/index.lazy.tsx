import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

type JsonLdData = Record<string, any>;

async function fetchJsonLd(url: string): Promise<JsonLdData> {
  // TODO: Remove cors proxy, setup own proxy backend instead
  const corsProxy = "https://corsproxy.io/?";
  const response = await fetch(corsProxy + encodeURIComponent(url));
  const html = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const jsonLdScript = doc.querySelector('script[type="application/ld+json"]');
  if (!jsonLdScript) {
    throw new Error("No JSON-LD data found on the page");
  }
  return JSON.parse(jsonLdScript.textContent || "{}");
}

const fetchRecipeData = async (url: string): Promise<JsonLdData | null> => {
  const response = await fetch(url);
  const text = await response.text();

  // Use a DOMParser to parse the HTML and extract the JSON-LD script content
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html");
  const scriptTag = doc.querySelector('script[type="application/ld+json"]');

  if (scriptTag) {
    try {
      const jsonData = JSON.parse(scriptTag.innerHTML);
      // Filter for recipe-related JSON-LD data
      const recipeData =
        jsonData["@type"] === "Recipe" ||
        jsonData["@type"] === "HowTo" ||
        jsonData["@type"] === "ItemList"
          ? jsonData
          : null;

      if (recipeData) {
        // Store in localStorage
        localStorage.setItem("recipeData", JSON.stringify(recipeData));
      }

      return recipeData;
    } catch (error) {
      console.error("Error parsing JSON-LD:", error);
      return null;
    }
  } else {
    console.warn("No JSON-LD script tag found");
    return null;
  }
};

// Function to fetch Google Recipe structured data
async function fetchGoogleRecipeData(url: string): Promise<JsonLdData> {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function Index() {
  const [url, setUrl] = useState("");

  const { data, error, isLoading, refetch } = useQuery<JsonLdData, Error>({
    queryKey: ["jsonLd", url],
    queryFn: () => fetchRecipeData(url),
    enabled: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="url" className="text-right">
              URL
            </label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="col-span-3"
              placeholder="https://example.com"
            />
            <Button type="submit">Fetch Data</Button>
          </div>
        </div>
      </form>
      {error && <div>{error.message}</div>}
      {isLoading && <div>Loading...</div>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
