const InstructorRow = ({ instructor }) => (
  <li className="list-group-item d-flex justify-content-between align-items-center">
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
);

export default InstructorRow;
