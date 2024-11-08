import Aboutus from "@/components/aboutus";
import Component from "@/components/cards";
import HeroSection from "@/components/herosection";


export default function Home() {
  return (
   <>
      <HeroSection/>
      <Component/>
      <div className="mb-10">
      <Aboutus/>
      </div>
      </>
      
  );
}
