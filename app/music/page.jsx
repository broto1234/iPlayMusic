import { cookies } from "next/headers";
import MusicContent from "./MusicContent";


const MusicPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("IPM_AT")?.value;

  if (!token) throw new Error("No access token found");

  const res = await fetch("https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n/tracks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Music API error:", errorText);
    if (res.status === 429) {
      throw new Error("Rate limit exceeded. Please wait and try again.");
    }
    throw new Error(`Failed to load music: ${res.statusText}`);
  }

  const data = await res.json();
  console.log("Categories data:", data);

  return  (
    <section className="p-4">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-orange-200 via-red-500 to-pink-500 mb-2">All Songs</h2>
      <MusicContent data={data} />  
    </section>
  );
};

export default MusicPage;
