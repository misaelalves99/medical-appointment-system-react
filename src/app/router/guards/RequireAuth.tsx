// src/app/router/guards/RequireAuth.tsx

import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../../hooks/useAuth';
import { LoadingSpinner } from '../../../shared/ui/Feedback/LoadingSpinner';

type RequireAuthProps = {
  children: ReactNode;
  redirectTo?: string;
};

export default function RequireAuth({
  children,
  redirectTo = '/auth/login',
}: RequireAuthProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'radial-gradient(circle at top, rgba(59,130,246,0.12), transparent 55%), #020617',
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to={redirectTo}
        replace
        state={{ from: location }}
      />
    );
  }

  return <>{children}</>;
}
