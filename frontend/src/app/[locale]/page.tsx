import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";

export const instant = false;
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
}
