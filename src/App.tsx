// src/App.tsx

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage/HomePage";
import { Patient } from "./types/Patient";

import AppointmentList from "./pages/Appointments";
import AppointmentForm from "./pages/Appointments/AppointmentForm";
import AppointmentDetails from "./pages/Appointments/Details/DetailsAppointment";
import ConfirmAppointment from "./pages/Appointments/Confirm/ConfirmAppointment";
import CancelAppointment from "./pages/Appointments/Cancel/CancelAppointment";
import CalendarAppointments from "./pages/Appointments/Calendar/CalendarAppointments";
import CreateAppointment from "./pages/Appointments/Create/CreateAppointment";
import DeleteAppointment from "./pages/Appointments/Delete/DeleteAppointment";
import EditAppointment from "./pages/Appointments/Edit/EditAppointment";

import DoctorList from "./pages/Doctors";
import CreateDoctor from "./pages/Doctors/Create/CreateDoctor";
import DeleteDoctor from "./pages/Doctors/Delete/DeleteDoctor";
import DoctorDetails from "./pages/Doctors/Details/DoctorDetails";
import DoctorEdit from "./pages/Doctors/Edit/DoctorEdit";

import PatientIndex from "./pages/Patient";
import CreatePatient from "./pages/Patient/Create/CreatePatient";
import DeletePatient from "./pages/Patient/Delete/DeletePatient";
import DetailsPatient from "./pages/Patient/Details/DetailsPatient";
import EditPatient from "./pages/Patient/Edit/EditPatient";
import HistoryPatient from "./pages/Patient/History/HistoryPatient";
import UploadProfilePicture from "./pages/Patient/UploadProfilePicture/UploadProfilePicture";

import SpecialtyList from "./pages/Specialty";
import CreateSpecialty from "./pages/Specialty/Create/CreateSpecialty";
import DeleteSpecialty from "./pages/Specialty/Delete/DeleteSpecialty";
import DetailsSpecialty from "./pages/Specialty/Details/SpecialtyDetails";
import EditSpecialty from "./pages/Specialty/Edit/EditSpecialty";

import { appointmentsMock } from "./mocks/appointments";
import { doctorsMock } from "./mocks/doctors";
import { patientsMock } from "./mocks/patients";
import { specialtiesMock } from "./mocks/specialties";

const App: React.FC = () => {
  const noop = () => {};
  const onSavePatient = (data: Patient) => {
    console.log("Salvo paciente:", data);
    window.location.href = "/patient";
  };
  const onDeletePatient = (id: number) => {
    console.log("Paciente excluído com id:", id);
    window.location.href = "/patient";
  };
  const onUploadProfilePicture = (file: File) => {
    console.log("Arquivo enviado:", file);
    window.location.href = "/patient";
  };

  const onSubmitSpecialty = (name: string) => {
    console.log("Especialidade criada:", name);
    window.location.href = "/specialty";
  };

  const onEditSpecialty = (id: number, name: string) => {
    console.log(`Especialidade ${id} atualizada para:`, name);
    window.location.href = "/specialty";
  };

  const onDeleteSpecialty = (id: number) => {
    console.log("Especialidade excluída com id:", id);
    window.location.href = "/specialty";
  };

  const mockAppointment = appointmentsMock[0];
  const mockDoctor = doctorsMock[0];
  const mockPatient = patientsMock[0];
  const mockSpecialty = specialtiesMock[0];

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Appointments */}
        <Route path="/appointments" element={<AppointmentList />} />
        <Route path="/appointments/create" element={<AppointmentForm mode="create" />} />
        <Route
          path="/appointments/create-alt"
          element={
            <CreateAppointment
              patients={patientsMock.map((p) => ({ value: String(p.id), label: p.name }))}
              doctors={doctorsMock.map((d) => ({ value: String(d.id), label: d.name }))}
              statusOptions={[
                { value: "Confirmada", label: "Confirmada" },
                { value: "Cancelada", label: "Cancelada" },
                { value: "Pendente", label: "Pendente" },
              ]}
              onSubmit={noop}
              onCancel={noop}
            />
          }
        />
        <Route path="/appointments/edit/:id" element={<AppointmentForm mode="edit" />} />
        <Route path="/appointments/edit-alt/:id" element={<EditAppointment />} />
        <Route path="/appointments/:id" element={<AppointmentDetails />} />
        <Route
          path="/appointments/:id/confirm"
          element={<ConfirmAppointment appointment={mockAppointment} onConfirm={noop} />}
        />
        <Route
          path="/appointments/:id/cancel"
          element={<CancelAppointment appointment={mockAppointment} onCancel={noop} onBack={noop} />}
        />
        <Route
          path="/appointments/:id/delete"
          element={<DeleteAppointment appointment={mockAppointment} onDelete={noop} />}
        />
        <Route
          path="/appointments/calendar"
          element={<CalendarAppointments appointments={[mockAppointment]} onBack={noop} />}
        />

        {/* Doctors */}
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/doctors/create" element={<CreateDoctor />} />
        <Route path="/doctors/delete/:id" element={<DeleteDoctor />} />
        <Route
          path="/doctors/details/:id"
          element={
            <DoctorDetails
              doctor={mockDoctor}
              onEdit={(id) => {
                window.location.href = `/doctors/edit/${id}`;
              }}
              onBack={() => {
                window.location.href = "/doctors";
              }}
            />
          }
        />
        <Route
          path="/doctors/edit/:id"
          element={
            <DoctorEdit
              doctor={mockDoctor}
              onSave={(updated) => {
                console.log("Salvo médico atualizado:", updated);
                window.location.href = "/doctors";
              }}
              onCancel={() => {
                window.location.href = "/doctors";
              }}
            />
          }
        />

        {/* Patients */}
        <Route path="/patient" element={<PatientIndex />} />
        <Route path="/patient/create" element={<CreatePatient />} />
        <Route
          path="/patient/delete/:id"
          element={
            <DeletePatient
              id={mockPatient.id}
              name={mockPatient.name}
              onDelete={onDeletePatient}
              onCancel={() => (window.location.href = "/patient")}
            />
          }
        />
        <Route path="/patient/details/:id" element={<DetailsPatient patient={mockPatient} />} />
        <Route
          path="/patient/edit/:id"
          element={
            <EditPatient
              initialData={{
                id: mockPatient.id,
                name: mockPatient.name,
                cpf: mockPatient.cpf,
                dateOfBirth: mockPatient.dateOfBirth,
                email: mockPatient.email,
                phone: mockPatient.phone,
                address: "",
              }}
              onSave={onSavePatient}
            />
          }
        />
        <Route path="/patient/history/:id" element={<HistoryPatient history={[]} />} />
        <Route
          path="/patient/upload-profile-picture/:id"
          element={
            <UploadProfilePicture
              patientId={mockPatient.id}
              patientName={mockPatient.name}
              onUpload={onUploadProfilePicture}
            />
          }
        />

        {/* Specialties */}
        <Route path="/specialty" element={<SpecialtyList specialties={specialtiesMock} />} />
        <Route path="/specialty/create" element={<CreateSpecialty onSubmit={onSubmitSpecialty} />} />
        <Route
          path="/specialty/details/:id"
          element={<DetailsSpecialty id={mockSpecialty.id} name={mockSpecialty.name} />}
        />
        <Route
          path="/specialty/edit/:id"
          element={<EditSpecialty id={mockSpecialty.id} initialName={mockSpecialty.name} onSubmit={onEditSpecialty} />}
        />
        <Route
          path="/specialty/delete/:id"
          element={<DeleteSpecialty id={mockSpecialty.id} name={mockSpecialty.name} onDelete={onDeleteSpecialty} />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
