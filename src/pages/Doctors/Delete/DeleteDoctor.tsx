// src/pages/Doctors/Delete/DeleteDoctor.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DeleteDoctor.module.css";
import { Doctor, doctorsMock } from "../../../mocks/doctors";

export default function DeleteDoctor() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    if (id) {
      const foundDoctor = doctorsMock.find((d) => d.id === Number(id)) || null;
      setDoctor(foundDoctor);
    }
  }, [id]);

  function handleDelete() {
    if (doctor) {
      const index = doctorsMock.findIndex((d) => d.id === doctor.id);
      if (index !== -1) {
        doctorsMock.splice(index, 1);
      }
      console.log("Médico excluído:", doctor);
      console.log("Lista atualizada:", doctorsMock);
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
