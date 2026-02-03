// import { cookies } from "next/headers";
import Image from "next/image";

export default async function Home() {
  // const cookieStore = await cookies();
  
  // const accessTokenCookie = cookieStore.get("IPM_AT")?.value;

  // const response = await fetch("https://api.spotify.com/v1/me", {
  //   headers: {
  //     Authorization: `Bearer ${accessTokenCookie}`
  //   }
  // });

  // console.log(await response.json());

  return (
    <main className="flex flex-col justify-center items-center min-h-full">
      <Image
        src="/iPlayMusic.jpg"
        alt="iPlayMusic Logo"
        width={100}
        height={100}
        className="rounded-lg"
      />
    </main>
  );
}

// import { cookies } from "next/headers";

// export default async function HomePage() {
//   const cookieStore = await cookies(); 

//   const accessTokenCookie = cookieStore.get("IPM_AT");

//   if (!accessTokenCookie) {
//     throw new Error("No Spotify access token found");
//   }

//   const response = await fetch("https://api.spotify.com/v1/me", {
//     headers: {
//       Authorization: `Bearer ${accessTokenCookie.value}`,
//     },
//     cache: "no-store",
//   });

//   if (!response.ok) {
//   const errorText = await response.text();
//   return (
//     <pre>
//       {response.status}
//       {"\n"}
//       {errorText}
//     </pre>
//   );
// }

//   const data = await response.json();
//   console.log("from home", data);

//   return null;
// }

