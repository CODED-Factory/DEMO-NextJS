import axios from "axios";
import Error from "next/error";

// Components
import BootcampDetail from "../../components/BootcampDetail";

export default function Bootcamp({ bootcamp }) {
  if (!bootcamp) return <Error statusCode={404} />;
  return <BootcampDetail bootcamp={bootcamp} />;
}

export async function getStaticPaths() {
  const { data } = await axios.get("http://localhost:3001/bootcamps/ids");
  return {
    paths: data,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await axios.get(
    `http://localhost:3001/bootcamps/${params.id}`
  );

  return { props: { bootcamp: data } };
}
