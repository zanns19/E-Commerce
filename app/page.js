import Image from "next/image";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import HeroCarousel from "@/components/HeroCarousel";
import ProductSection from "@/components/ProductSection";

export default async function Home() {
      await connectDB();
    
      const products = await Product.find({
        category: "Valves",
      })
        .lean()
        .exec();
    
      // Convert ObjectId to string
      const formattedProducts = products.map((product) => ({
        ...product,
        _id: product._id.toString(),
      }));
    
      return (<>
        <HeroCarousel />
        <ProductSection
          products={formattedProducts}
          />
          </>
      );
    
}
