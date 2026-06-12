import { useTheme } from '../../hooks/useTheme';
import Navbar from '../../components/landing/Navbar';
import Hero from '../../components/landing/Hero';
import Stats from '../../components/landing/Stats';
import ProblemSolution from '../../components/landing/ProblemSolution';
import Features from '../../components/landing/Features';
import HowItWorks from '../../components/landing/HowItWorks';
import ProductShowcase from '../../components/landing/ProductShowcase';
import UseCases from '../../components/landing/UseCases';
import Security from '../../components/landing/Security';
import FutureVision from '../../components/landing/FutureVision';
import Testimonials from '../../components/landing/Testimonials';
import FAQ from '../../components/landing/FAQ';
import CTA from '../../components/landing/CTA';
import Footer from '../../components/landing/Footer';

export default function LandingPage() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navbar isDark={isDark} toggleTheme={toggleTheme} />
        <main>
          <Hero />
          <Stats />
          <ProblemSolution />
          <Features />
          <HowItWorks />
          <ProductShowcase />
          <UseCases />
          <Security />
          <FutureVision />
          <Testimonials />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}
