// src/components/auth/SocialButton/SocialButton.tsx

import type { ButtonHTMLAttributes } from 'react';
import { Button } from '../../../../shared/ui/Button/Button';

type Provider = 'google' | 'facebook';

export interface SocialButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  provider: Provider;
}

const providerLabel: Record<Provider, string> = {
  google: 'Entrar com Google',
  facebook: 'Entrar com Facebook',
};

export function SocialButton({ provider, ...buttonProps }: SocialButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      fullWidth
      {...buttonProps}
    >
      {providerLabel[provider]}
    </Button>
  );
}

export default SocialButton;
