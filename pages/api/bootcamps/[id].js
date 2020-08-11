import bootcamps from "../../../data";

export default ({ query: { id } }, res) => {
  const bootcamp = bootcamps.find((bootcamp) => bootcamp.id === id);

  if (bootcamp) res.status(200).json(bootcamp);
  else res.status(404).json({ message: `Bootcamp with id: ${id} not found` });
};
