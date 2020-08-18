// Components
import InstructorRow from "./InstructorRow";

const CohortCard = ({ cohort }) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">{cohort.name}</h5>
      <p className="card-text">{cohort.startDate}</p>
    </div>
    <ul className="list-group list-group-flush">
      {cohort.instructors.map((instructor) => (
        <InstructorRow key={instructor.name} instructor={instructor} />
      ))}
    </ul>
  </div>
);

export default CohortCard;
