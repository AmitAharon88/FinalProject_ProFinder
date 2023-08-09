import { db } from "../config/db.js";

export const getAllTutors = () => {
    return db("tutors")
      .select(
        "tutors.tutor_id",
        "tutors.first_name",
        "tutors.last_name",
        "tutors.email",
        "tutors.password",
        "tutors.about",
        "tutors.education",
        "tutors.image_url",
        "tutors.location_id",
        "location.location_name",
        "subcategories.subcategory_name",
        "categories.category_name"
      )
      .join("location", "tutors.location_id", "=", "location.location_id")
      .join("tutor_categories", "tutors.tutor_id", "=", "tutor_categories.tutor_id")
      .join("subcategories", "tutor_categories.subcategory_id", "=", "subcategories.subcategory_id")
      .join("categories", "tutor_categories.category_id", "=", "categories.category_id")
      .orderBy("tutors.first_name");
};

// tutor by id
export const getTutor = (tutor_id) => {
    return db("tutors")
    .select(
        "tutors.tutor_id",
        "tutors.first_name",
        "tutors.last_name",
        "tutors.email",
        "tutors.password",
        "tutors.about",
        "tutors.education",
        "tutors.image_url",
        "tutors.location_id",
        "location.location_name",
        "subcategories.subcategory_name",
        "categories.category_name"
      )
      .join("location", "tutors.location_id", "=", "location.location_id")
      .join("tutor_categories", "tutors.tutor_id", "=", "tutor_categories.tutor_id")
      .join("subcategories", "tutor_categories.subcategory_id", "=", "subcategories.subcategory_id")
      .join("categories", "tutor_categories.category_id", "=", "categories.category_id")
      .orderBy("tutors.first_name")
      .where({ "tutors.tutor_id": tutor_id })
      .first();
};

// Search by category
export const searchTutorsByCategory = (category) => {
    return db("tutors")
      .select(
        "tutors.tutor_id",
        "tutors.first_name",
        "tutors.last_name",
        "tutors.email",
        "tutors.about",
        "tutors.education",
        "tutors.image_url",
        "tutors.location_id",
        "location.location_name"
      )
      .join("tutor_categories", "tutors.tutor_id", "=", "tutor_categories.tutor_id")
      .join("categories", "tutor_categories.category_id", "=", "categories.category_id")
      .join("location", "tutors.location_id", "=", "location.location_id")
      .where("categories.category_name", category);
};

// Search by subcategory
export const searchTutorsBySubcategory = (subcategory) => {
    return db("tutors")
      .select(
        "tutors.tutor_id",
        "tutors.first_name",
        "tutors.last_name",
        "tutors.email",
        "tutors.about",
        "tutors.education",
        "tutors.image_url",
        "tutors.location_id",
        "location.location_name"
      )
      .join("tutor_categories", "tutors.tutor_id", "=", "tutor_categories.tutor_id")
      .join("subcategories", "tutor_categories.subcategory_id", "=", "subcategories.subcategory_id")
      .join("location", "tutors.location_id", "=", "location.location_id")
      .where("subcategories.subcategory_name", subcategory);
};

export const searchTutorsByLocation = (location) => {
    return db("tutors")
      .select(
        "tutors.tutor_id",
        "tutors.first_name",
        "tutors.last_name",
        "tutors.email",
        "tutors.about",
        "tutors.education",
        "tutors.image_url",
        "tutors.location_id",
        "location.location_name"
      )
      .join("location", "tutors.location_id", "=", "location.location_id")
      .where("location.location_name", location);
};

// Add tutor
// export const insertTutor = ({
//   first_name,
//   last_name,
//   email,
//   password, 
//   birth_date,
//   location_id,
//   about,
//   eduction,
//   image_url }) => {
//   return db('tutors')
//   .insert ({
//     first_name,
//     last_name,
//     email,
//     password, 
//     birth_date,
//     location_id,
//     about,
//     eduction,
//     image_url
//   })
//   .join("location", "tutors.location_id", "=", "location.location_id")
//   .join("tutor_categories", "tutors.tutor_id", "=", "tutor_categories.tutor_id")
//   .join("subcategories", "tutor_categories.subcategory_id", "=", "subcategories.subcategory_id")
//   .returning(['id','name','price'])
// }
// Update tutor

// delete tutor
export const deleteTutor = (tutor_id) => {
    return db ("tutors")
    .where({ tutor_id })
    .del()
    .returning (true); // Success
};