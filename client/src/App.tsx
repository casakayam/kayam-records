import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import VHSOverlay from "./components/VHSOverlay";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <div style={{ position: 'relative', minHeight: '100vh' }}>
            <VHSOverlay intensity={0.3} flickering={false}>
              <Router />
            </VHSOverlay>
          </div>
        </TooltipProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
