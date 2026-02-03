import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import AlbumDetailContent from "./AlbumDetailContent";

export default async function AlbumDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  console.log("Album slug:", slug);
  // Spotify playlist IDs are base62 (usually 22 chars); bail early on obviously bad values
  if (!slug || slug.length < 5) {
    console.error("Missing or invalid slug", slug);
    return notFound();
  }
  const token = (await cookies()).get("IPM_AT")?.value;

  if (!token) throw new Error("No access token");

  //Try fetching an album with params.slug
  let res = await fetch(`https://api.spotify.com/v1/albums/${slug}/tracks?offset=0&limit=50&locale=*`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("Album API error:", { status: res.status, statusText: res.statusText, body: errorData, slug });
    if (res.status === 400 || res.status === 404) {
      return notFound();
    }
    throw new Error(`Failed to load album: ${errorData?.error?.message || res.statusText || slug}`);
  }

  const albumData = await res.json();
  const album = albumData.items;
  console.log("Album detail data:", album);

  return (
      <section className="">
        <AlbumDetailContent album={album} />
      </section>
    );
}