// app/api/search/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 });
  }

  try {
    // 1) Get token
    console.log("Fetching Spotify token...");
    const tokenRes = await fetch(`${request.nextUrl.origin}/api/spotify-token`);
    const tokenData = await tokenRes.json();
    console.log("Token response:", tokenData);
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      console.error("No access token received:", tokenData);
      return NextResponse.json({ error: "Failed to get access token", details: tokenData }, { status: 500 });
    }

    // 2) Call Spotify Search
    const spotifySearchParams = new URLSearchParams({
      q,
      type: "track,artist,album",
      limit: "10",
    });

    const searchUrl = `https://api.spotify.com/v1/search?${spotifySearchParams}`;
    console.log("Searching Spotify with URL:", searchUrl);

    const spotifyRes = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("Spotify response status:", spotifyRes.status);
    const spotifyData = await spotifyRes.json();
    console.log("Spotify data received:", JSON.stringify(spotifyData).substring(0, 200));
    
    if (!spotifyRes.ok) {
      console.error("Spotify API error:", spotifyData);
      return NextResponse.json({ error: "Spotify API error", details: spotifyData }, { status: spotifyRes.status });
    }

    return NextResponse.json(spotifyData);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Failed to search" }, { status: 500 });
  }
}
