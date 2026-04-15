import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import LanguageGate from "./components/LanguageGate";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import WorkflowIA from "./pages/WorkflowIA";
import ReodGlobePage from "./pages/ReodGlobe";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/workflow-ia"} component={WorkflowIA} />
      <Route path={"/reodglobe"} component={ReodGlobePage} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <LanguageGate />
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
