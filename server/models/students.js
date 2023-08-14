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

export const signIn = (email) => {
  return db('students')
  .select('student_id', 'first_name', 'last_name', 'email', 'password')
  .where({email})
};
    