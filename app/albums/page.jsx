import { cookies } from "next/headers";
import AlbumContent from "./AlbumContent";

const Albums = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("IPM_AT")?.value;

  if (!token) throw new Error("No access token");

  // Retry function with exponential backoff
  const fetchWithRetry = async (url, options, maxRetries = 3) => {
    for (let i = 0; i < maxRetries; i++) {
      const res = await fetch(url, options);
      
      if (res.ok) return res;
      
      if (res.status === 429) {
        const retryAfter = res.headers.get("retry-after") || Math.pow(2, i);
        const waitTime = parseInt(retryAfter) * 1000;
        console.log(`Rate limited. Waiting ${waitTime}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      
      if (i === maxRetries - 1) {
        throw new Error(`Spotify API error: ${res.status} ${res.statusText}`);
      }
    }
  };

  // Fetch albums
  const res = await fetchWithRetry("https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo%2C2noRn2Aes5aoNVsU6iWThc", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  const albums = await res.json();
  console.log("Albums fetch data:", albums);

  return <AlbumContent albums={albums.albums || []} />;
}

export default Albums;