import { useRouter } from "next/router";
import Error from "next/error";

// Components
import BootcampDetail from "../../components/BootcampDetail";

// Data
import bootcamps from "../../bootcamps.json";

export default function BootcampOne() {
  const { id } = useRouter().query;

  const bootcamp = bootcamps.find((bootcamp) => bootcamp.id === id);

  if (!bootcamp) return <Error statusCode={404} />;

  return <BootcampDetail bootcamp={bootcamp} />;
}
