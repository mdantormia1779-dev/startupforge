import Image from "next/image";
import HeroSection from "./Components/HomePage/HeroSection/HeroSection";
import Starts from "./Components/HomePage/Starts/Starts";
import RisingStart from "./Components/HomePage/FeaturedStartups/FeaturedStartups";
import Trending from "./Components/HomePage/FeaturedOpportunities/FeaturedOpportunities";
import Experience from "./Components/HomePage/Experience/Experience";

export default function Home() {
  return <div className="bg-white dark:bg-[#0d0f17]">
    <HeroSection></HeroSection>
    <Starts></Starts>
    <RisingStart></RisingStart>
    <Trending></Trending>
    <Experience></Experience>
  </div>;
}
