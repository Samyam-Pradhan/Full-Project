import { Navbar } from '../components/Navbar';  
import { Hero } from '../components/Hero';      
import { Feature } from '../components/Feature';
import { Team } from '../components/Team';      
import { Footer } from '../components/Footer';  

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
