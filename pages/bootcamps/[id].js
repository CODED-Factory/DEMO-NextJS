import { useRouter } from "next/router";

// Data
import bootcamps from "../../data";

export default function BootcampOne() {
  const { id } = useRouter().query;

  const bootcamp = bootcamps.find((bootcamp) => bootcamp.id === id);

  if (!bootcamp && !id) return <h1>Loading...</h1>;

  const cohortCards = bootcamp.cohorts.map((cohort) => (
    <div className="col-3">
      <div key={cohort.id} className="card">
        <div className="card-body">
          <h5 className="card-title">{cohort.name}</h5>
          <p className="card-text">{cohort.startDate}</p>
        </div>
        <ul className="list-group list-group-flush">
          {cohort.instructors.map((instructor) => (
            <li
              key={instructor.name}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {instructor.name}
              <div
                src={instructor.image}
                style={{
                  height: 50,
                  width: 50,
                  backgroundImage: `url(${instructor.image})`,
                  backgroundSize: "cover",
                  borderRadius: "50%",
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  ));

  return (
    <>
      <div
        className="jumbotron jumbotron-fluid"
        style={{ backgroundColor: "black", color: "white" }}
      >
        <div className="container">
          <img src={bootcamp.image} alt="" />
        </div>
      </div>
      <div className="container row pb-5">{cohortCards}</div>
    </>
  );
}
