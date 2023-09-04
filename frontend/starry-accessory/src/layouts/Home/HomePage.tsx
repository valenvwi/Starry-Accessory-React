import { Carousel } from "./components/Carousel";
import { MainPageContent } from "./components/MainPageContent";
import { Follow } from "./components/Follow";
import { Banner } from "./components/Banner";

export const HomePage = () => {
  return (
    <>
      <Banner />
      <Carousel />
      <MainPageContent />
      <Follow />
    </>
  );
};
