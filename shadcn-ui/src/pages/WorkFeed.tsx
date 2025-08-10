import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { WorkFeedSection } from "@/components/sections/work-feed-section";

export default function WorkFeedPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <WorkFeedSection />
      </main>
      <Footer />
    </div>
  );
}