import bcrypt from "bcryptjs";

const hashPassword = (password) => {
  if (password < 8) {
    throw new Error("Password must be at least 8 characters or longer.");
  }

  return (password = await bcrypt.hash(password, 10));
};

export default hashPassword;
