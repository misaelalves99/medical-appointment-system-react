// src/App.tsx

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage/HomePage";

// Appointments
import AppointmentList from "./pages/Appointments";
import AppointmentForm from "./pages/Appointments/AppointmentForm";
import AppointmentDetails from "./pages/Appointments/Details/DetailsAppointment";
import ConfirmAppointment from "./pages/Appointments/Confirm/ConfirmAppointment";
import CancelAppointment from "./pages/Appointments/Cancel/CancelAppointment";
import CalendarAppointments from "./pages/Appointments/Calendar/CalendarAppointments";
import DeleteAppointment from "./pages/Appointments/Delete/DeleteAppointment";
import EditAppointment from "./pages/Appointments/Edit/EditAppointment";

// Doctors
import DoctorList from "./pages/Doctors";
import CreateDoctor from "./pages/Doctors/Create/CreateDoctor";
import DeleteDoctor from "./pages/Doctors/Delete/DeleteDoctor";
import DoctorDetails from "./pages/Doctors/Details/DoctorDetails";
import DoctorEdit from "./pages/Doctors/Edit/DoctorEdit";

// Patients
import PatientIndex from "./pages/Patient";
import CreatePatient from "./pages/Patient/Create/CreatePatient";
import DeletePatient from "./pages/Patient/Delete/DeletePatient";
import DetailsPatient from "./pages/Patient/Details/DetailsPatient";
import EditPatient from "./pages/Patient/Edit/EditPatient";
import HistoryPatient from "./pages/Patient/History/HistoryPatient";
import UploadProfilePicture from "./pages/Patient/UploadProfilePicture/UploadProfilePicture";

// Specialties
import SpecialtyList from "./pages/Specialty";
import CreateSpecialty from "./pages/Specialty/Create/CreateSpecialty";
import DeleteSpecialty from "./pages/Specialty/Delete/DeleteSpecialty";
import DetailsSpecialty from "./pages/Specialty/Details/SpecialtyDetails";
import EditSpecialty from "./pages/Specialty/Edit/EditSpecialty";

// Contexts
import { PatientProvider } from "./contexts/PatientProvider";
import { AppointmentsProvider } from "./contexts/AppointmentsProvider";
import { DoctorsProvider } from "./contexts/DoctorProvider";
import { SpecialtyProvider } from "./contexts/SpecialtyProvider";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppointmentsProvider>
        <DoctorsProvider>
          <SpecialtyProvider>
            <PatientProvider>
              <Navbar />
              <Routes>
                {/* Home */}
                <Route path="/" element={<HomePage />} />

                {/* Appointments */}
                <Route path="/appointments" element={<AppointmentList />} />
                <Route path="/appointments/create" element={<AppointmentForm mode="create" />} />
                <Route path="/appointments/edit/:id" element={<EditAppointment />} />
                <Route path="/appointments/:id" element={<AppointmentDetails />} />
                <Route path="/appointments/:id/confirm" element={<ConfirmAppointment />} />
                <Route path="/appointments/:id/cancel" element={<CancelAppointment />} />
                <Route path="/appointments/:id/delete" element={<DeleteAppointment />} />
                <Route path="/appointments/calendar" element={<CalendarAppointments />} />

                {/* Doctors */}
                <Route path="/doctors" element={<DoctorList />} />
                <Route path="/doctors/create" element={<CreateDoctor />} />
                <Route path="/doctors/delete/:id" element={<DeleteDoctor />} />
                <Route path="/doctors/details/:id" element={<DoctorDetails />} />
                <Route path="/doctors/edit/:id" element={<DoctorEdit />} />

                {/* Patients */}
                <Route path="/patient" element={<PatientIndex />} />
                <Route path="/patient/create" element={<CreatePatient />} />
                <Route path="/patient/delete/:id" element={<DeletePatient />} />
                <Route path="/patient/details/:id" element={<DetailsPatient />} />
                <Route path="/patient/edit/:id" element={<EditPatient />} />
                <Route path="/patient/history/:id" element={<HistoryPatient />} />
                <Route path="/patient/upload-profile/:id" element={<UploadProfilePicture />} />

                {/* Specialties */}
                <Route path="/specialty" element={<SpecialtyList />} />
                <Route path="/specialty/create" element={<CreateSpecialty />} />
                <Route path="/specialty/details/:id" element={<DetailsSpecialty />} />
                <Route path="/specialty/edit/:id" element={<EditSpecialty />} />
                <Route path="/specialty/delete/:id" element={<DeleteSpecialty />} />
              </Routes>
              <Footer />
            </PatientProvider>
          </SpecialtyProvider>
        </DoctorsProvider>
      </AppointmentsProvider>
    </BrowserRouter>
  );
};

export default App;
