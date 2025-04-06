import bcrypt from "bcrypt";
export const hashPassword = (password, saltRounds = 10) =>
  bcrypt.hash(password, saltRounds);
