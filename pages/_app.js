import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <div className="container pt-5">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
