import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Error from "next/error";

// Components
import BootcampDetail from "../../components/BootcampDetail";

export default function BootcampOne() {
  const { id } = useRouter().query;
  const [bootcamp, setBootcamp] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBootcamp = async () => {
    try {
      const { data } = await axios.get(`/api/bootcamps/${id}`);
      setBootcamp(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchBootcamp();
  }, [id]);

  if (loading) return <h1>Loading...</h1>;

  if (!bootcamp) return <Error statusCode={404} />;

  return <BootcampDetail bootcamp={bootcamp} />;
}
