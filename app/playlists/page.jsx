import { cookies } from "next/headers";
import PlayContent from "./PlayContent";

const Play = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("IPM_AT")?.value;

  if (!token) throw new Error("No access token");

  // Fetch albums
  const res = await fetch("https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo%2C2noRn2Aes5aoNVsU6iWThc", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  const albums = await res.json();
  console.log("Albums fetch data:", albums);

  return <PlayContent albums={albums.albums} />;
}

export default Play;