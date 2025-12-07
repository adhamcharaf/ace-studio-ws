import {
  Hero,
  ValueProposition,
  Stats,
  ServicesPreview,
  PortfolioPreview,
  ProcessPreview,
  CTA,
} from "@/components/sections/home";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProposition />
      <Stats />
      <ServicesPreview />
      <PortfolioPreview />
      <ProcessPreview />
      <CTA />
    </>
  );
}
