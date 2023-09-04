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
        "tutors.image_id",
        "tutors.location_id",
        "location.location_name",
        "subcategories.subcategory_name",
        "categories.category_name",
        "tutor_categories.tutor_cat_id"
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
        "tutors.birth_date",
        "tutors.password",
        "tutors.about",
        "tutors.education",
        "tutors.image_id",
        "tutors.location_id",
        "location.location_name",
        "subcategories.subcategory_name",
        "subcategories.subcategory_id",
        "categories.category_name",
        "categories.category_id",
        "tutor_categories.tutor_cat_id"
      )
      .join("location", "tutors.location_id", "=", "location.location_id")
      .join("tutor_categories", "tutors.tutor_id", "=", "tutor_categories.tutor_id")
      .join("subcategories", "tutor_categories.subcategory_id", "=", "subcategories.subcategory_id")
      .join("categories", "tutor_categories.category_id", "=", "categories.category_id")
      // .orderBy("tutors.first_name")
      .where({ "tutors.tutor_id": tutor_id })
};

export const registerTutor = async (data) => {
  const newUser = await db("tutors")
    .insert({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      birth_date: data.birth_day,
      location_id: data.location_id,
      // image_url: data.image_url, // Uncomment this line if needed
      education: data.education,
      about: data.about,
      password: data.password,
      last_logged_in: new Date()
    }).returning("tutor_id")
    console.log(newUser)
    data.categories.forEach( async(category) => {
      await db("tutor_categories")
      .insert({
        tutor_id: newUser[0].tutor_id,
        category_id: category.cat_id,
        subcategory_id: category.sub_id,
      })
    })
};

export const signInTutor = (email) => {
  return db('tutors')
  .select('tutor_id', 'first_name', 'last_name', 'email', 'password')
  .where({email})
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

// Write review
export const writeReview = async (data, tutor_id) => {
  const newUser = await db("reviews")
    .insert({
      tutor_id: tutor_id,
      student_id: data.student_id,
      rating: data.rating,
      comment: data.comment,
    })
    return { newUser }
};

// Get contact message
export const getContactMessage = (tutor_id) => {
  return db("message_board")
    .select(
      "message_board.student_id",
      "message_board.tutor_id",
      "message_board.sender",
      "students.first_name",
      "students.last_name",
      "message_board.message",
      "message_board.message_date"
    )
    .join("students", "students.student_id", "=", "message_board.student_id")
    .orderBy("message_date")
    .where({ "tutor_id": tutor_id });
};

// Write contact message
export const writeContactMessage = async (data) => {
  const newMessage = await db("message_board")
    .insert({
      tutor_id: data.tutor_id,
      student_id: data.student_id,
      sender: data.sender,
      message: data.message,
    })
    return { newMessage }
};

export const updateProfileName = (body, id) => {
  return db('tutors')
  .update({first_name: body.first_name, last_name: body.last_name})
  .where({tutor_id: id})
  .returning(['tutor_id','first_name', 'last_name'])
};

export const updateProfileEmail = (body, id) => {
  return db('tutors')
  .update({email: body.email})
  .where({tutor_id: id})
  .returning(['tutor_id','email'])
};

export const updateProfileDate = (body, id) => {
  return db('tutors')
  .update({birth_date: body.birth_date})
  .where({tutor_id: id})
  .returning(['tutor_id', 'birth_date'])
};

export const updateProfileLocation = (body, id) => {
  return db('tutors')
  .update({location_id: body.location_id})
  .where({tutor_id: id})
  .returning(['tutor_id','location_id'])
};

export const updateProfileEducation = (body, id) => {
  return db('tutors')
  .update({education: body.education})
  .where({tutor_id: id})
  .returning(['tutor_id', 'education'])
};

export const updateProfileAbout = (body, id) => {
  return db('tutors')
  .update({about: body.about})
  .where({tutor_id: id})
  .returning(['tutor_id', 'about'])
};

export const updateProfileCategory = (body) => {
  return db('tutor_categories')
  .update({category_id: body.category_id, subcategory_id: body.subcategory_id,})
  .where({tutor_cat_id: body.tutor_cat_id})
  .returning(['tutor_id', 'category_id', 'subcategory_id', 'tutor_cat_id'])
};

export const addProfileCategory = async (body, tutor_id) => {
  const newTutorCategory = await db("tutor_categories")
    .insert({
      tutor_id: tutor_id,
      category_id: body.cat_id,
      subcategory_id: body.sub_id,
    })
    return { newTutorCategory }
};

export const deleteProfileCategory = (id, tutor_cat_id) => {
  return db('tutor_categories')
  .where({tutor_id: id, tutor_cat_id: tutor_cat_id})
  .del()
};


export const updateProfilePassword = (body, id) => {
  return db('tutors')
  .update({password: body.password})
  .where({tutor_id: id})
  .returning(['tutor_id'])
};

export const deleteTutor = (id) => {
  return db('tutors')
  .where({tutor_id: id})
  .del()
}