import Header from "./_features/Header";
import HeroSection from "./_features/home/HeroSection";
import UpcomingMovieList from "./_features/home/UpcomingMovieList";
import PopularMovieList from "./_features/home/PopularMovieList";
import TopRatedMovieList from "./_features/home/TopRatedMoviesList";
import Footer from "./_features/Footer";

function Home() {
  return (
    <div className="w-[1440px] h-screen flex-col">
      <Header />
      <HeroSection />
      <UpcomingMovieList />
      <PopularMovieList />
      <TopRatedMovieList />
      <Footer />
    </div>
  );
}

export default Home;
