// src/components/Layout/Footer.tsx

import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      MedicalAppointmentSystem &copy; {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;
