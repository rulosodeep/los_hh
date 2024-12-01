import bcrypt from 'bcrypt';

async function verifyPassword() {
  // La contraseña en texto plano que quieres probar
  const plainPassword = "oscar123";

  // El hash de la contraseña almacenada en la base de datos (pon aquí el valor real de la base de datos)
  const hashedPassword = "$2b$10$XYEH7REXHKn1SNjYHUXgVu2eDOdPUSYcgqTkIT7HEAEg.sm4cDgba";

  try {
    // Comparación de la contraseña ingresada con el hash
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    if (match) {
      console.log("Las contraseñas coinciden.");
    } else {
      console.log("Las contraseñas NO coinciden.");
    }
  } catch (err) {
    console.error("Error al comparar las contraseñas:", err);
  }
}

// Ejecuta la función de verificación
verifyPassword();
