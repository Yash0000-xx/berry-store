import { Route, Switch } from 'wouter';
import LiveTicker from './components/LiveTicker';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import BerryAI from './components/BerryAI';
import EasterEgg from './components/EasterEgg';
import ProductCompareModal from './components/ProductCompareModal';
import GeniusBarModal from './components/GeniusBarModal';
import Footer from './components/Footer';
import PresenceHeatmap from './components/PresenceHeatmap';
import FluidSimulation from './components/FluidSimulation'; // ✨ Imported the high-end particle fluid core engine!
import SupportTerminal from './components/SupportTerminal';
// Page Layout Modules
import HomePage from './pages/HomePage';
import SandboxPage from './pages/SandboxPage';

function App() {
  return (
    <div className="relative min-h-screen bg-[#07040d] text-foreground overflow-x-hidden selection:bg-accent/30 flex flex-col justify-between">
      
      <div>
        <LiveTicker />
        <Navbar />
        <CartDrawer />
        <BerryAI />
        <EasterEgg />
        <ProductCompareModal />
        <GeniusBarModal />
      
        <PresenceHeatmap />
        <SupportTerminal />

        {/* ✨ High-Fidelity Fluid Particle Canvas Loop replacing basic static parameters background layer */}
        <FluidSimulation /> 

        {/* 🧭 Client-Side Matrix Router Switchboard */}
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/sandbox" component={SandboxPage} />

          {/* 404 Matrix Escape Route */}
          <Route>
            <div className="min-h-screen flex flex-col items-center justify-center text-center pt-24 px-4">
              <h1 className="font-heading text-6xl font-black bg-linear-to-r from-primary to-accent bg-clip-text text-transparent tracking-tighter">
                404
              </h1>
              <h2 className="mt-2 text-lg font-bold text-white tracking-tight">Node Location Invalid</h2>
              <p className="mt-1 text-xs text-muted-foreground max-w-xs leading-relaxed">
                The configuration path requested does not match any operational node maps inside our liquid obsidian environment.
              </p>
              <a 
                href="/" 
                className="mt-6 rounded-full bg-white/5 border border-white/5 px-5 py-2 text-xs font-bold text-accent transition-all hover:bg-white/10"
              >
                Return to Core Hub
              </a>
            </div>
          </Route>
        </Switch>
      </div>

      <Footer />
      
    </div>
  );
}

export default App;