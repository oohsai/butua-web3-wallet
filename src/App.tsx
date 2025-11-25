import { Toaster } from "sonner";
import "./App.css";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { ThemeProvider } from "./components/theme-provider";
import WalletSk from "./components/WalletSk";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="">
        <Navbar></Navbar>
        <Body></Body>
        <Footer></Footer>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
