import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import withAuth from "../utils/withAuth";
import styles from "./adminpage.module.css";

type Episode = {
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  videoUrl: string;
};

function AdminPage() {
  const [form, setForm] = useState<{
    id: number | null;
    title: string;
    description: string;
    imageUrl: string;
    videoUrl: string;
  }>({
    id: null,
    title: "",
    description: "",
    imageUrl: "",
    videoUrl: "",
  });

  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Cargar episodios al inicio
    const fetchEpisodes = async () => {
      try {
        const response = await axios.get("/api/episodes");
        setEpisodes(response.data);
      } catch (error) {
        console.error("Error al cargar episodios:", error);
      }
    };
    fetchEpisodes();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.id !== null) {
      // Actualizar episodio existente
      try {
        const response = await axios.put(`/api/episodes/${form.id}`, form);
        setEpisodes(episodes.map((episode) => episode.id === form.id ? response.data : episode));
        setForm({ id: null, title: "", description: "", imageUrl: "", videoUrl: "" });
      } catch (error) {
        console.error("Error al actualizar episodio:", error);
      }
    } else {
      // Agregar nuevo episodio
      try {
        const response = await axios.post("/api/episodes", form);
        setEpisodes([...episodes, response.data]);
        setForm({ id: null, title: "", description: "", imageUrl: "", videoUrl: "" });
      } catch (error) {
        console.error("Error al agregar episodio:", error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/episodes/${id}`);
      setEpisodes(episodes.filter((episode) => episode.id !== id));
    } catch (error) {
      console.error("Error al eliminar episodio:", error);
    }
  };

  const handleEdit = (episode: Episode) => {
    setForm({
      id: episode.id,
      title: episode.title,
      description: episode.description || "",
      imageUrl: episode.imageUrl,
      videoUrl: episode.videoUrl,
    });
  };

  const handleLogout = () => {
    // Eliminar la información de autenticación del localStorage
    localStorage.removeItem("isLoggedIn");
    // Redirigir al inicio de sesión
    router.push("/signin");
  };

  return (
    <div className={styles.container}>
      {/* Botón de Cerrar Sesión */}
      <button onClick={handleLogout} className={styles.logoutButton}>
        Cerrar Sesión
      </button>

      {/* Formulario para agregar o editar episodios */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Título"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="URL de la imagen"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="URL del video"
          value={form.videoUrl}
          onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          {form.id ? "Actualizar Episodio" : "Agregar Episodio"}
        </button>
      </form>

      {/* Lista de episodios */}
      <ul className={styles.episodeList}>
        {episodes.map((episode) => (
          <li key={episode.id} className={styles.episodeItem}>
            <p>{episode.title}</p>
            <div>
              <button onClick={() => handleEdit(episode)} className={styles.editButton}>
                Editar
              </button>
              <button onClick={() => handleDelete(episode.id)} className={styles.deleteButton}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default withAuth(AdminPage);
