import { Carousel } from "./components/Carousel";
import { MainPageContent } from "./components/MainPageContent";
import { Contact } from "./components/Contact";
import { TopItem } from "./components/TopItem";

export const HomePage = () => {
  return (
    <>
      <TopItem />
      <Carousel />
      <MainPageContent />
      <Contact />
    </>
  );
};
