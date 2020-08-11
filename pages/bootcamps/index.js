import Link from "next/link";

// Data
import bootcamps from "../../data";

export default function Bootcamps() {
  const bootcampCards = bootcamps.map((bootcamp) => (
    <div key={bootcamp.name} className="col-3">
      <Link href={`/bootcamps/${bootcamp.id}`}>
        <div type="button" className="card m-5">
          <img
            src={bootcamp.image}
            style={{ backgroundColor: "black" }}
            alt=""
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title">{bootcamp.name}</h5>
          </div>
        </div>
      </Link>
    </div>
  ));
  return (
    <div>
      <h1>All the bootcamps</h1>
      <div className="row">{bootcampCards}</div>
    </div>
  );
}
