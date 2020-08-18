import axios from "axios";

// Components
import BootcampList from "../../components/BootcampList";

export default function Bootcamps({ bootcamps }) {
  return <BootcampList bootcamps={bootcamps} />;
}

export async function getServerSideProps() {
  const { data } = await axios.get("http://localhost:3000/api/bootcamps");

  return {
    props: {
      bootcamps: data,
    },
  };
}
