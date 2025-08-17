// src/pages/Doctors/Delete/DeleteDoctor.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DeleteDoctor.module.css";
import type { Doctor } from "../../../types/Doctor";
import { useDoctor } from "../../../hooks/useDoctor";

export default function DeleteDoctor() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { doctors, removeDoctor } = useDoctor();
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    if (id) {
      const foundDoctor = doctors.find(d => d.id === Number(id)) || null;
      setDoctor(foundDoctor);
    }
  }, [id, doctors]);

  function handleDelete() {
    if (doctor) {
      removeDoctor(doctor.id);
      console.log("Médico excluído:", doctor);
      navigate("/doctors");
    }
  }

  if (!doctor) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Excluir Médico</h1>
      <h3>Tem certeza que deseja excluir o médico abaixo?</h3>

      <dl>
        <dt>Nome</dt>
        <dd>{doctor.name}</dd>

        <dt>CRM</dt>
        <dd>{doctor.crm}</dd>

        <dt>Especialidade</dt>
        <dd>{doctor.specialty}</dd>

        <dt>Email</dt>
        <dd>{doctor.email}</dd>

        <dt>Telefone</dt>
        <dd>{doctor.phone}</dd>

        <dt>Ativo</dt>
        <dd>{doctor.isActive ? "Sim" : "Não"}</dd>
      </dl>

      <button onClick={handleDelete} className={styles.deleteButton}>
        Excluir
      </button>
      <button onClick={() => navigate("/doctors")} className={styles.cancelButton}>
        Cancelar
      </button>
    </div>
  );
}
