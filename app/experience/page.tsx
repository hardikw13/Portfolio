"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Experience from "../components/Experience";
import Leadership from "../components/Leadership";

function Divider() {
  return <div className="hr container" />;
}

export default function ExperiencePage() {
  return (
    <>
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Experience />
        <Divider />
        <Leadership />
      </motion.main>
    </>
  );
}
