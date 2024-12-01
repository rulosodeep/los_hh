import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./signin.module.css";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Realiza una solicitud al endpoint de autenticación
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true"); // Guarda el estado de sesión
        router.push("/adminpage"); // Redirige al panel de administración
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (err) {
      console.error("Error al iniciar sesión", err);
      setError("Error al iniciar sesión. Intenta nuevamente.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Iniciar Sesión</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Iniciar Sesión
        </button>
        <a href="/" className={styles.backButton}>
          Volver a la Página de Inicio
        </a>
      </form>
        
    </div>
  );
}
