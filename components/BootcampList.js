import { useState } from "react";

// Components
import SearchBar from "./SearchBar";
import BootcampCard from "./BootcampCard";

const BootcampList = ({ bootcamps }) => {
  const [query, setQuery] = useState("");

  const bootcampCards = bootcamps
    .filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()))
    .map((bootcamp) => (
      <div key={bootcamp.name} className="col-3">
        <BootcampCard bootcamp={bootcamp} />
      </div>
    ));

  return (
    <>
      <h1>The Bootcamps</h1>
      <SearchBar setQuery={setQuery} />
      <div className="row">{bootcampCards}</div>
    </>
  );
};

export default BootcampList;
