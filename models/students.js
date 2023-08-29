import { db } from "../config/db.js";

export const registerStudent = async (data) => {
    const newUser = await db("students")
      .insert({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email.toLowerCase(),
        birth_date: data.birth_day,
        location_id: data.location_id,
        // image_url: data.image_url, // Uncomment this line if needed
        password: data.password,
        last_logged_in: new Date()
      });
  };

export const signInStudent = (email) => {
  return db('students')
  .select('student_id', 'first_name', 'last_name', 'email', 'password')
  .where({email})
};

// Get contact message
export const getContactMessage = (student_id) => {
  return db("message_board")
    .select(
      "message_board.student_id",
      "message_board.tutor_id",
      "message_board.sender",
      "tutors.first_name",
      "tutors.last_name",
      "message_board.message",
      "message_board.message_date"
    )
    .join("tutors", "tutors.tutor_id", "=", "message_board.tutor_id")
    .orderBy("message_date")
    .where({ "student_id": student_id });
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

// tutor by id
export const getStudent = (student_id) => {
  return db("students")
  .select(
      "students.student_id",
      "students.first_name",
      "students.last_name",
      "students.email",
      "students.birth_date",
      "students.location_id",
      "location.location_name",
      "students.image_id",
    )
    .join("location", "students.location_id", "=", "location.location_id")
    .where({ "students.student_id": student_id })
    // .first();
};

export const updateProfileName = (body, id) => {
  return db('students')
  .update({first_name: body.first_name, last_name: body.last_name})
  .where({student_id: id})
  .returning(['student_id','first_name', 'last_name'])
};

export const updateProfileEmail = (body, id) => {
  return db('students')
  .update({email: body.email})
  .where({student_id: id})
  .returning(['student_id','email'])
};

export const updateProfileDate = (body, id) => {
  return db('students')
  .update({birth_date: body.birth_date})
  .where({student_id: id})
  .returning(['student_id', 'birth_date'])
};


export const updateProfileLocation = (body, id) => {
  return db('students')
  .update({location_id: body.location_id})
  .where({student_id: id})
  .returning(['student_id','location_id'])
};

export const updateProfilePassword = (body, id) => {
  return db('students')
  .update({password: body.password})
  .where({student_id: id})
  .returning(['student_id'])
};

export const deleteStudent = (id) => {
  return db('students')
  .where({student_id: id})
  .del()
}
