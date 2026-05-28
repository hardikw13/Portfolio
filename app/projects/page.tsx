"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import LeetCode from "../components/LeetCode";

function Divider() {
  return <div className="hr container" />;
}

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Projects />
        <Divider />
        <LeetCode />
      </motion.main>
    </>
  );
}
