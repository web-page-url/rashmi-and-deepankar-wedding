import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import LoveStory from "@/components/LoveStory";
import Gallery from "@/components/Gallery";
import EventDetails from "@/components/EventDetails";
import RSVP from "@/components/RSVP";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      {/* <LoveStory /> */}
      {/* <Gallery /> */}
      <EventDetails />
      {/* <RSVP /> */}
      <Footer />
    </div>
  );
};

export default Index;
