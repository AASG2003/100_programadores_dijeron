"use client"
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Redireccionar a la nueva página
    redirect('/game');
  }, []);
  return (
    <></>
  );
}
