import React, { useEffect } from "react"; // Importa useEffect desde react
import { useRouter } from "next/router";  // Importa useRouter desde next/router

export default function withAuth(Component: React.ComponentType) {
  return function AuthenticatedComponent(props: JSX.IntrinsicAttributes) {
    const router = useRouter();

    useEffect(() => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");

      if (!isLoggedIn) {
        // Si no está autenticado, redirige al inicio de sesión
        router.push("/signin");
      }
    }, [router]);

    return <Component {...props} />;
  };
}
