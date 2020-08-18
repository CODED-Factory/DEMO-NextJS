import axios from "axios";

// Components
import BootcampList from "../../components/BootcampList";

export default function Bootcamps({ bootcamps }) {
  return <BootcampList bootcamps={bootcamps} />;
}

export async function getServerSideProps() {
  const { data } = await axios.get("http://localhost:3001/bootcamps");

  return {
    props: {
      bootcamps: data,
    },
  };
}
