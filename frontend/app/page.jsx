import Hero from "../components/Landing/Hero/Hero";
import Navbar from "../components/Landing/Nav/Navbar";
import BestSellers from "../components/Landing/BestSellers/BestSellers";
import Trending from "../components/Landing/Trending/Trending";
import Features from "../components/Landing/Features/Feature"

const FurnitureStore = () => {
  return (
    <div>
      <Hero />
      <Navbar />
      <BestSellers />
      <Trending />
      <Features />
    </div>
  );
};

export default FurnitureStore;
