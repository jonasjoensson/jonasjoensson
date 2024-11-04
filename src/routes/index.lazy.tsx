import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

type JsonLdData = Record<string, any>;

async function fetchJsonLd(url: string): Promise<JsonLdData> {
  const response = await fetch(url);
  const html = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const jsonLdScript = doc.querySelector('script[type="application/ld+json"]');
  if (!jsonLdScript) {
    throw new Error("No JSON-LD data found on the page");
  }
  return JSON.parse(jsonLdScript.textContent || "{}");
}

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [url, setUrl] = useState("");

  const { data, error, isLoading, refetch } = useQuery<JsonLdData, Error>({
    queryKey: ["jsonLd", url],
    queryFn: () => fetchJsonLd(url),
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
