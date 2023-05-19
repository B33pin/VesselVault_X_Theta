import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { StateContextProvider } from "../context/state";
import { CampaignContextProvider } from "@/context/campaign";
import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import Footer from "@/components/molecules/Footer";
import { Lato } from "next/font/google";
import Navbar from "@/components/molecules/Navbar";
import ScrollToTop from "@/components/atomic/ScrollToTop";
import { UserContextProvider } from "@/context/user";

const LatoDisplay = Lato({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
            <Navbar />
            <main className={`${LatoDisplay.className} mt-[90px]`}>
              <Component {...pageProps} />
              <ScrollToTop />
            </main>
            <Footer />
         
    </div>
  );
}
