import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Portal() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Portal de Clientes</h1>
        </div>
      </main>
      <Footer />
    </>
  );
}
