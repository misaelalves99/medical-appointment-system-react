// src/app/router/AppRouter.tsx

import type { ReactElement } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { DashboardLayout } from '../layouts/DashboardLayout/DashboardLayout';
import { AuthLayout } from '../layouts/AuthLayout/AuthLayout';
import { PublicLayout } from '../layouts/PublicLayout/PublicLayout';

import RequireAuth from './guards/RequireAuth';
import RequireGuest from './guards/RequireGuest';

import HomePage from '../../pages/HomePage';
import ErrorPage from '../../pages/ErrorPage';

import DashboardHomePage from '../../features/dashboard/pages/DashboardHomePage';

import LoginPage from '../../features/auth/pages/LoginPage';
import RegisterPage from '../../features/auth/pages/RegisterPage';

import AppointmentListPage from '../../features/appointments/pages/AppointmentListPage';
import AppointmentCreatePage from '../../features/appointments/pages/AppointmentCreatePage';
import AppointmentEditPage from '../../features/appointments/pages/AppointmentEditPage';
import AppointmentDetailsPage from '../../features/appointments/pages/AppointmentDetailsPage';
import AppointmentCancelPage from '../../features/appointments/pages/AppointmentCancelPage';
import AppointmentConfirmPage from '../../features/appointments/pages/AppointmentConfirmPage';
import AppointmentDeletePage from '../../features/appointments/pages/AppointmentDeletePage';
import AppointmentCalendarPage from '../../features/appointments/pages/AppointmentCalendarPage';

import PatientListPage from '../../features/patients/pages/PatientListPage';
import PatientCreatePage from '../../features/patients/pages/PatientCreatePage';
import PatientEditPage from '../../features/patients/pages/PatientEditPage';
import PatientDetailsPage from '../../features/patients/pages/PatientDetailsPage';
import PatientDeletePage from '../../features/patients/pages/PatientDeletePage';
import PatientHistoryPage from '../../features/patients/pages/PatientHistoryPage';
import PatientUploadProfilePicturePage from '../../features/patients/pages/PatientUploadProfilePicturePage';

import DoctorListPage from '../../features/doctors/pages/DoctorListPage';
import DoctorCreatePage from '../../features/doctors/pages/DoctorCreatePage';
import DoctorEditPage from '../../features/doctors/pages/DoctorEditPage';
import DoctorDetailsPage from '../../features/doctors/pages/DoctorDetailsPage';
import DoctorDeletePage from '../../features/doctors/pages/DoctorDeletePage';

import SpecialtyListPage from '../../features/specialties/pages/SpecialtyListPage';
import SpecialtyCreatePage from '../../features/specialties/pages/SpecialtyCreatePage';
import SpecialtyEditPage from '../../features/specialties/pages/SpecialtyEditPage';
import SpecialtyDetailsPage from '../../features/specialties/pages/SpecialtyDetailsPage';
import SpecialtyDeletePage from '../../features/specialties/pages/SpecialtyDeletePage';

import DoctorAvailabilityPage from '../../features/doctorAvailability/pages/DoctorAvailabilityPage';

export function AppRouter(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing / páginas públicas simples */}
        <Route element={<PublicLayout />}>
          <Route index element={<Navigate to="/auth/login" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/error" element={<ErrorPage />} />
        </Route>

        {/* AUTH: sem sidebar / logo, só as telas de login/register */}
        <Route
          path="/auth"
          element={
            <RequireGuest>
              <AuthLayout />
            </RequireGuest>
          }
        >
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* DASHBOARD: com Sidebar/Topbar, etc. */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />

          <Route path="dashboard" element={<DashboardHomePage />} />

          {/* Consultas */}
          <Route path="appointments" element={<AppointmentListPage />} />
          <Route path="appointments/create" element={<AppointmentCreatePage />} />
          <Route path="appointments/edit/:id" element={<AppointmentEditPage />} />
          <Route path="appointments/details/:id" element={<AppointmentDetailsPage />} />
          <Route path="appointments/cancel/:id" element={<AppointmentCancelPage />} />
          <Route path="appointments/confirm/:id" element={<AppointmentConfirmPage />} />
          <Route path="appointments/delete/:id" element={<AppointmentDeletePage />} />
          <Route path="appointments/calendar" element={<AppointmentCalendarPage />} />

          {/* Pacientes */}
          <Route path="patients" element={<PatientListPage />} />
          <Route path="patients/create" element={<PatientCreatePage />} />
          <Route path="patients/edit/:id" element={<PatientEditPage />} />
          <Route path="patients/details/:id" element={<PatientDetailsPage />} />
          <Route path="patients/delete/:id" element={<PatientDeletePage />} />
          <Route path="patients/history/:id" element={<PatientHistoryPage />} />
          <Route
            path="patients/upload-profile-picture/:id"
            element={<PatientUploadProfilePicturePage />}
          />

          {/* Médicos */}
          <Route path="doctors" element={<DoctorListPage />} />
          <Route path="doctors/create" element={<DoctorCreatePage />} />
          <Route path="doctors/edit/:id" element={<DoctorEditPage />} />
          <Route path="doctors/details/:id" element={<DoctorDetailsPage />} />
          <Route path="doctors/delete/:id" element={<DoctorDeletePage />} />

          {/* Especialidades */}
          <Route path="specialties" element={<SpecialtyListPage />} />
          <Route path="specialties/create" element={<SpecialtyCreatePage />} />
          <Route path="specialties/edit/:id" element={<SpecialtyEditPage />} />
          <Route path="specialties/details/:id" element={<SpecialtyDetailsPage />} />
          <Route path="specialties/delete/:id" element={<SpecialtyDeletePage />} />

          {/* Disponibilidade médica */}
          <Route path="doctor-availability" element={<DoctorAvailabilityPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
