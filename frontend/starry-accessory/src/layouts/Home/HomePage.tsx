import { Carousel } from "./components/Carousel";
import { MainPageContent } from "./components/MainPageContent";
import { Contact } from "./components/Contact";
import { Banner } from "./components/Banner";

export const HomePage = () => {
  return (
    <>
      <Banner />
      <Carousel />
      <MainPageContent />
      <Contact />
    </>
  );
};
