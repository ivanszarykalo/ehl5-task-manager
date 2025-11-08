import React from "react";
import Link from "next/link";

// app/not-found.jsx
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Página No Encontrada</h1>
      <p className="text-lg mb-8">La página que buscas no existe.</p>
      <a 
        href="/"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Volver al Inicio
      </a>
    </div>
  );
}