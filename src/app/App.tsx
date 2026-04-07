import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Doctors } from './components/Doctors';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <Services />
      <Doctors />
      <Testimonials />
      <Contact />
    </div>
  );
}
