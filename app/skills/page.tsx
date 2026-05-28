"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Skills from "../components/Skills";

export default function SkillsPage() {
  return (
    <>
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Skills />
      </motion.main>
    </>
  );
}
