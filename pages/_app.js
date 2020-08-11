import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <p>
        <Link href="/">
          <a>pretend</a>
        </Link>{" "}
        I'm a navbar with a{" "}
        <Link href="/bootcamps">
          <a>link to bootcamps</a>
        </Link>
      </p>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
