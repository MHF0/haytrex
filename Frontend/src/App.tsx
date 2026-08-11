import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ClickRipple, CursorRing, RouteWipe } from '@/components/motion/interactions';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ServiceDetail from './pages/ServiceDetail';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Consultation from './pages/Consultation';
import BusinessMap from './pages/BusinessMap';
import WorkFeed from './pages/WorkFeed';
import Terms from './pages/Terms';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        {/* Site-wide pointer and navigation flourishes. */}
        <CursorRing />
        <ClickRipple />
        <RouteWipe />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service/:serviceId" element={<ServiceDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/business-map" element={<BusinessMap />} />
          <Route path="/work-feed" element={<WorkFeed />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
