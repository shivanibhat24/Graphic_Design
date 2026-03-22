import PortfolioGrid from "@/components/portfolio-grid";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CustomCursor from "@/components/custom-cursor";
import BackgroundBubbles from "@/components/background-bubbles";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  
  // Convert slug to display name: "t-shirt-design" -> "T-shirt Design"
  const displayCategory = category === "t-shirt-design" 
    ? "T-shirt Design"
    : category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

  return (
    <main className="relative min-h-screen">
      <BackgroundBubbles />
      <CustomCursor />
      <Navbar />
      
      <div className="pt-24">
        <PortfolioGrid category={displayCategory} />
      </div>

      <Footer />
    </main>
  );
}

// Generate static params for all known categories
export async function generateStaticParams() {
  return [
    { category: "logos" },
    { category: "vectors" },
    { category: "concept-art" },
    { category: "t-shirt-design" },
    { category: "presentations" },
    { category: "stickers" },
    { category: "visuals" },
  ];
}
