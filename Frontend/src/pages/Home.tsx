import React from "react";
import Hero from "../components/Hero";
import ServiceGrid from "../components/Service";
import FeaturedServices from "../components/FeturedService";
import HowItWorks from "../components/HowItsWork";
import UserReview from "../components/UserReview";
import CallToAction from "../components/CallToAction";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <ServiceGrid />
      <FeaturedServices />
      <HowItWorks />
      <UserReview />
      <CallToAction />
    </>
  );
};

export default Home;
