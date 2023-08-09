import { db } from "../config/db.js";

export const getLocation = () => {
    return db("location")
      .select(
        "location_id",
        "location_name",
      )
      .orderBy("location_name");
};