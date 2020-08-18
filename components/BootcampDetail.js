// Components
import CohortCard from "./CohortCard";

const BootcampDetail = ({ bootcamp }) => {
  const cohortCards = bootcamp.cohorts.map((cohort) => (
    <div key={cohort.name} className="col-3">
      <CohortCard cohort={cohort} />
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
};

export default BootcampDetail;
