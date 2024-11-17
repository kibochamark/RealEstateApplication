import Aboutus from "@/components/aboutus";
import Component from "@/components/cards";
import HeroSection from "@/components/herosection";
import Process from "@/components/Process";


export default function Home() {
  return (
    <>
      <HeroSection />
      <Component />
      <div className="">
        <Aboutus />
      </div>
      <div className="bg-primary300/10">
        <Process />
      </div>
    </>

  );
}
