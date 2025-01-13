import { Navbar } from '../components/Navbar';  // Ensure path is correct
import { Hero } from '../components/Hero';      // Ensure path is correct
import { Feature } from '../components/Feature';// Ensure path is correct
import { Team } from '../components/Team';      // Ensure path is correct
import { Footer } from '../components/Footer';  // Ensure path is correct

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Feature />
      <Team />
      <Footer />
    </>
  );
};

export default HomePage;
