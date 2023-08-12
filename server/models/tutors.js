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

// Register tutor


// delete tutor
export const deleteTutor = (tutor_id) => {
    return db ("tutors")
    .where({ tutor_id })
    .del()
    .returning (true); // Success
};

// Get Reviews
export const getReviews = (tutor_id) => {
  return db("reviews")
    .select(
      "reviews.student_id",
      "students.first_name",
      "students.last_name",
      "reviews.tutor_id",
      "reviews.rating",
      "reviews.comment",
      "reviews.review_date"
    )
    .join("students", "students.student_id", "=", "reviews.student_id")
    .orderBy("reviews.review_date")
    .where({ "reviews.tutor_id": tutor_id });
};