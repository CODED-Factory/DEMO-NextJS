import Link from "next/link";

const BootcampCard = ({ bootcamp }) => (
  <Link href="/bootcamps/[id]" as={`/bootcamps/${bootcamp.id}`}>
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
);

export default BootcampCard;
