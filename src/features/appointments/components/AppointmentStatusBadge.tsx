// src/features/appointments/components/AppointmentStatusBadge.tsx

import { Tag } from '../../../shared/ui/Tag/Tag';
import type { AppointmentStatus } from '../../../domain/Appointment';

type AppointmentStatusBadgeProps = {
  status: AppointmentStatus;
};

function getStatusTone(
  status: AppointmentStatus,
): 'neutral' | 'success' | 'warning' | 'danger' {
  switch (status) {
    case 'CONFIRMED':
    case 'COMPLETED':
      return 'success';
    case 'SCHEDULED':
      return 'neutral';
    case 'NO_SHOW':
      return 'warning';
    case 'CANCELLED':
    default:
      return 'danger';
  }
}

function getStatusLabel(status: AppointmentStatus): string {
  switch (status) {
    case 'SCHEDULED':
      return 'Agendada';
    case 'CONFIRMED':
      return 'Confirmada';
    case 'COMPLETED':
      return 'Realizada';
    case 'CANCELLED':
      return 'Cancelada';
    case 'NO_SHOW':
      return 'Não compareceu';
    default:
      return status;
  }
}

export default function AppointmentStatusBadge({
  status,
}: AppointmentStatusBadgeProps) {
  return (
    <Tag tone={getStatusTone(status)} size="sm">
      {getStatusLabel(status)}
    </Tag>
  );
}
