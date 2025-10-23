import Header from "./_features/Header";
import HeroSection from "./_features/home/HeroSection";
import MovieList from "./_features/home/MovieList";
import Footer from "./_features/Footer";

function Home() {
  return (
    <div className="w-[1440px] h-screen flex-col bg-white dark:bg-[#09090B] ">
      <Header />
      <HeroSection />
      <MovieList />
      <MovieList />
      <MovieList />

      <Footer />
    </div>
  );
}

export default Home;
