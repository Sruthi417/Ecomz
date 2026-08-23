import Hero from "../components/Landing/Hero/Hero";
import Navbar from "../components/Landing/Nav/Navbar";
import BestSellers from "../components/Landing/BestSellers/BestSellers";
import Trending from "../components/Landing/Trending/Trending";
import Features from "../components/Landing/Features/Feature"
import Collection from "../components/Landing/Collection/Collection"
import InstagramFeed from "../components/Landing/insta/Insta"
import Footer from "../components/Landing/Footer/Footer"

const FurnitureStore = () => {
  return (
    <div>
      <Hero />
      <Navbar />
      <BestSellers />
      <Trending />
      <Features />
      <Collection/>
      <InstagramFeed/>
      <Footer/>
    </div>
  );
};

export default FurnitureStore;
