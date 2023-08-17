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
    