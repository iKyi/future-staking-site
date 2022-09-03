import { Route, Routes, useLocation } from "react-router";
import HomePage from "./pages/HomePage";
import SnackbarProvider from "providers/SnackbarProvider";
import BlockingSnabarsProvider from "providers/BlockingSnabarsProvider";
import PageWithNavWrapper from "components/Reusable/Layout/PageWithNavWrapper";
import { useContext, useEffect } from "react";
import { StrapiContext } from "providers/StrapiPublicProvider";
import SeoComp from "components/Reusable/Seo";
import { useWallet } from "@solana/wallet-adapter-react";
import MintLoginGuard from "components/MintLoginGuard/MintLoginGuard";

const App: React.FC = () => {
  const { publicKey } = useWallet();
  const { seo } = useContext(StrapiContext);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    console.log(publicKey?.toString());
  }, [publicKey]);

  return (
    <>
      <PageWithNavWrapper>
        <SeoComp seo={seo} />
        <MintLoginGuard>
          <Routes>
            <Route element={<HomePage />} index />
          </Routes>
        </MintLoginGuard>
      </PageWithNavWrapper>

      <SnackbarProvider />
      <BlockingSnabarsProvider />
    </>
  );
};

export default App;
