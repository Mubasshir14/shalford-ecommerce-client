import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/NavBar";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-amber-50/40 via-orange-50/40 to-yellow-50">{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;
