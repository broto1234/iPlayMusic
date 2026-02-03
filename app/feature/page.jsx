import { cookies } from "next/headers";
import FeaturedCard from "../components/FeaturedCard";

export default async function FeaturePage() {
  const cookieStore = await cookies();
  
  const accessTokenCookie = cookieStore.get("IPM_AT")?.value;

    if (!accessTokenCookie) {
    throw new Error("No access token found");
  }
  
  return (
    <main className="max-w-md mx-auto">
      {/* Title */}
      <h2 className="px-4 text-3xl font-bold text-pink-500 mb-4">
        Featured
      </h2>

      {/* Cards */}
      <section className="max-w-160 grid grid-cols-1 gap-4">
        <FeaturedCard
          image="/feature.jpg"
          alt="The Greatest Showman"
          title="The Greatest Showman"
          subtitle="Soundtrack"
          width={600}
          height={400}
        />
        <FeaturedCard
          image="/feature2.jpg"
          alt="The Girl"
          title=""
          subtitle=""
          width={600}
          height={200}
        />
      </section>
    </main>
  );
}

