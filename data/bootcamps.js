import fs from "fs";
import path from "path";
const bootcampsFile = path.join(process.cwd(), "data", "bootcamps.json");

export function getBootcamps() {
  return JSON.parse(fs.readFileSync(bootcampsFile, "utf8"));
}

export function getBootcampIds() {
  return getBootcamps().map(({ id }) => ({ params: { id } }));
}

export function getBootcampById(id) {
  return getBootcamps().find((bootcamp) => bootcamp.id == id);
}
