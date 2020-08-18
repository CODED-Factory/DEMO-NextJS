import axios from "axios";
import Error from "next/error";

// Components
import BootcampDetail from "../../components/BootcampDetail";

export default function Bootcamp({ bootcamp }) {
  if (!bootcamp) return <Error statusCode={404} />;
  return <BootcampDetail bootcamp={bootcamp} />;
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  let bootcamp;

  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/bootcamps/${id}`
    );
    bootcamp = data;
  } catch (error) {
    console.error(error.message);
  }

  return { props: { bootcamp } };
}
