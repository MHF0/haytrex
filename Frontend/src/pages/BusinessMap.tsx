import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { USBusinessMap } from "@/components/sections/us-business-map";

export default function BusinessMapPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <USBusinessMap />
      </main>
      <Footer />
    </div>
  );
}