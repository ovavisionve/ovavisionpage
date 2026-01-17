import Navbar from "@/components/Navbar";

export default function Auth() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-card rounded-lg border">
          <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
        </div>
      </main>
    </>
  );
}
