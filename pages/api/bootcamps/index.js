import { getBootcamps } from "../../../data/bootcamps";

export default (req, res) => {
  // const file = path.join(process.cwd(), "..", "..", "..", "data.json");
  // console.log(file);
  const bootcamps = getBootcamps();
  res.status(200).json(bootcamps);
};
