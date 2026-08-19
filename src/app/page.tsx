import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { Numbers } from "@/components/home/numbers";
import { MissionVision } from "@/components/home/mission-vision";
import { ProductsPreview } from "@/components/home/products-preview";
import { NewsPreview } from "@/components/home/news-preview";
import { Testimonials } from "@/components/home/testimonials";
import { NetworkPreview } from "@/components/home/network-preview";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Numbers />
      <MissionVision />
      <ProductsPreview />
      <NewsPreview />
      <Testimonials />
      <NetworkPreview />
    </>
  );
}
