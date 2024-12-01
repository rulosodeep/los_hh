import bcrypt from "bcrypt";

(async () => {
  const password = "oscar123"; // Cambia esto por la contraseña que quieras encriptar
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Contraseña encriptada:", hashedPassword);
})();
