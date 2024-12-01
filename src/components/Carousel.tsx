import Image from "next/image";
import styles from "./carousel.module.css";
import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

// Definir el tipo de datos para los episodios
type Episode = {
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  videoUrl: string;
  createdAt: string;
  updatedAt: string;
};

const Carousel: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]); // Estado para episodios
  const [currentVideo, setCurrentVideo] = useState(""); // Estado para video actual
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch episodes from la API
    const fetchEpisodes = async () => {
      try {
        const response = await fetch("/api/episodes");
        const data = await response.json();
        setEpisodes(data); // Guardar episodios en el estado
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };

    fetchEpisodes();
  }, []);

  const openVideo = (videoUrl: string) => {
    setCurrentVideo(videoUrl);
  };

  const closeVideo = () => {
    setCurrentVideo("");
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.carouselContainer}>
      {/* Flecha Izquierda */}
      <button
        className={`${styles.arrowButton} ${styles.arrowLeft}`}
        onClick={scrollLeft}
      >
        ◀
      </button>

      {/* Carrusel */}
      <div className={styles.carouselTrack} ref={carouselRef}>
        {episodes.map((episode: Episode) => (
          <div key={episode.id} className={styles.carouselItem}>
            <Image
              src={episode.imageUrl}
              alt={episode.title}
              layout="fill"
              className={styles.carouselImage}
              priority
            />
            <button
              onClick={() => openVideo(episode.videoUrl)}
              className={styles.playButton}
            >
              ▶
            </button>
          </div>
        ))}
      </div>

      {/* Flecha Derecha */}
      <button
        className={`${styles.arrowButton} ${styles.arrowRight}`}
        onClick={scrollRight}
      >
        ▶
      </button>

      {/* Video en pantalla completa */}
      {currentVideo && (
        <div className={styles.videoOverlay}>
          <ReactPlayer
            url={currentVideo}
            playing
            controls
            width="100%"
            height="100%"
            className={styles.fullscreenVideo}
          />
          <button onClick={closeVideo} className={styles.closeButton}>
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default Carousel;
