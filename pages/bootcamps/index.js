// Components
import BootcampList from "../../components/BootcampList";

// Data
import bootcamps from "../../bootcamps.json";

export default function Bootcamps() {
  return <BootcampList bootcamps={bootcamps} />;
}
