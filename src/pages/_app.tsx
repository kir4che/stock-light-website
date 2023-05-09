import Footer from "@/components/footer";
import Header from "@/components/header";
import type { AppProps } from "next/app";
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}