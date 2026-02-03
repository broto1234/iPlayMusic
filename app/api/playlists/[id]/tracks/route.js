import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams || {};

  if (!id) {
    return NextResponse.json({ error: "Missing playlist id" }, { status: 400 });
  }

  const token = (await cookies()).get("IPM_AT")?.value;

  if (!token) {
    return NextResponse.json({ error: "No access token" }, { status: 401 });
  }

  const res = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks?limit=50`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    console.error(`Playlist tracks API error for ${id}:`, res.status, errorBody);
    return NextResponse.json(
      { error: errorBody?.error?.message || res.statusText },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
