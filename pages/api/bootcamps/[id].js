import { getBootcampById } from "../../../data/bootcamps";

export default ({ query: { id } }, res) => {
  const bootcamp = getBootcampById(id);
  if (bootcamp) res.status(200).json(bootcamp);
  else res.status(404).json({ message: `Bootcamp with id: ${id} not found` });
};
