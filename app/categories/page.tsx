import CategoryItem from "@/app/components/CategoryItems";
import { categories } from "../../categories";

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-white p-6 max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold bg-linear-to-r from-linearFull via-[#F43A4F] to-linearZero bg-clip-text text-transparent">
        Categories
      </h1>

      <div className="space-y-4">
        {categories.map((category) => (
          <CategoryItem
            key={category.title}
            {...category}
          />
        ))}
      </div>
    </main>
  );
}
