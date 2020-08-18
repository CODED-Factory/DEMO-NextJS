import { useState, useEffect } from "react";
import axios from "axios";

// Components
import BootcampList from "../../components/BootcampList";

export default function Bootcamps() {
  const [bootcamps, setBootcamps] = useState([]);

  const fetchBootcamps = async () => {
    const { data } = await axios.get("/api/bootcamps");
    setBootcamps(data);
  };

  useEffect(() => {
    fetchBootcamps();
  }, []);

  return <BootcampList bootcamps={bootcamps} />;
}
