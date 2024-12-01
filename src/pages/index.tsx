"use client";
import Carousel from "../components/Carousel";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [session, setSession] = useState(null);
    // Verificar si hay sesión al cargar la página
    useEffect(() => {
      const savedSession = localStorage.getItem("session");
      if (savedSession) {
        setSession(JSON.parse(savedSession));
      }
    }, []);
  
    // Manejar el cierre de sesión
    const handleSignOut = async () => {
      try {
        await fetch("/api/logout", { method: "POST" });
        localStorage.removeItem("session");
        setSession(null);
        window.location.href = "/";
      } catch (err) {
        console.error("Error al cerrar sesión:", err);
      }
    };
  return (
    <div className="font-poppins text-white bg-customBlack scrollbar-hide">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-black sticky top-0 z-50">
        <button className="btn-ghost">
          Inicio
        </button>

        {session ? (
          <button onClick={handleSignOut}>Cerrar sesión</button>
        ) : (

        <button
        className="btn-ghost w-10 h-10 flex items-center justify-center"
        onClick={() => {
          window.location.href = "/signin"; // Redirige al inicio de sesión
        }}
        >
          <Image
            src="/icons/user.png"
            alt="User Icon"
            width={24}
            height={24}
            className="brightness-100"
          />
        </button>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <Image
          src="/images/hero-bg.jpg"
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
          priority
        />
        <div className="absolute left-10 top-1/3 text-white space-y-4">
          <motion.h1
            className="text-6xl font-bold"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            House Hits
          </motion.h1>
          <motion.p
            className="text-2xl"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            El nuevo Reality
          </motion.p>
        </div>
      </section>

      {/* Sección de Episodios */}
      <section className="px-8 py-6">
        <h2 className="text-4xl font-bold mb-4">Descubre los episodios</h2>
        <Carousel />
      </section>

      {/* Sección Final */}
      <section className="relative py-12">
        <motion.div
          className="text-center py-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl font-bold">LA NUEVA MÚSICA MEXICANA</h2>
        </motion.div>

        <div className="relative h-screen">
          <Image
            src="/images/band-bg.jpg"
            alt="Band Image"
            layout="fill"
            objectFit="cover"
            className="brightness-75"
          />
          <div className="absolute inset-0 flex items-center justify-center group">
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center text-white px-8">
              <p className="text-2xl font-bold">
                Los HH es una banda mexicana de música regional que ha emergido
                recientemente en la escena musical, destacándose por su enfoque
                innovador y la fusión de ritmos tradicionales con elementos
                contemporáneos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-accentOrange text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <Link href="https://www.tiktok.com/@loshhoficial" target="_blank">
            <Image src="/icons/tiktok.png" alt="Tiktok" width={32} height={32} />
          </Link>
          <Link href="https://www.youtube.com/@LosHH_Oficial" target="_blank">
            <Image src="/icons/youtube.png" alt="YouTube" width={32} height={32} />
          </Link>
          <Link href="https://open.spotify.com/intl-es/artist/2W81ZrVzhbOmp0l1I5U43w?si=Kr3ukYArQzmCAHXeG1Du7g" target="_blank">
            <Image src="/icons/spotify.png" alt="Spotify" width={32} height={32} />
          </Link>
          <Link href="https://www.facebook.com/grupoloshh" target="_blank">
            <Image src="/icons/facebook.png" alt="Facebook" width={32} height={32} />
          </Link>
          <Link href="https://www.instagram.com/loshhoficial" target="_blank">
            <Image src="/icons/instagram.png" alt="Instagram" width={32} height={32} />
          </Link>
        </div>
        <p>©2024 Latin Power Music. Todos los Derechos Reservados.</p>
      </footer>
    </div>
  );
}
