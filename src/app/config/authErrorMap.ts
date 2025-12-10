// src/app/config/authErrorMap.ts

/**
 * Mapa de códigos de erro do Firebase Auth → mensagens amigáveis em pt-BR.
 * Use essa função nas telas de Login/Register para exibir feedback claro.
 */

const ERROR_MESSAGES: Record<string, string> = {
  // Credenciais
  'auth/invalid-credential':
    'Credenciais inválidas. Verifique e-mail e senha e tente novamente.',
  'auth/user-not-found':
    'Não encontramos uma conta com este e-mail. Verifique se digitou corretamente.',
  'auth/wrong-password':
    'Senha incorreta. Tente novamente ou use "Esqueci minha senha".',
  'auth/invalid-email': 'E-mail em formato inválido. Confira o endereço digitado.',

  // Cadastro
  'auth/email-already-in-use':
    'Já existe uma conta usando este e-mail. Tente fazer login ou recuperar a senha.',
  'auth/weak-password':
    'Senha fraca. Use pelo menos 6 caracteres, combinando letras e números, se possível.',

  // Fluxo com provedores (Google/Facebook)
  'auth/popup-closed-by-user':
    'A janela de login foi fechada antes de concluir. Tente novamente.',
  'auth/cancelled-popup-request':
    'Outra tentativa de login estava em andamento. Aguarde um instante e tente novamente.',
  'auth/account-exists-with-different-credential':
    'Este e-mail já está vinculado a outro método de login. Acesse com o método original.',

  // Limites e segurança
  'auth/too-many-requests':
    'Muitas tentativas em sequência. Aguarde alguns instantes e tente novamente.',
  'auth/network-request-failed':
    'Falha de conexão com o servidor. Verifique sua internet e tente novamente.',

  // Default genérico
  default:
    'Não foi possível concluir a autenticação. Tente novamente em alguns instantes.',
};

/**
 * Recebe um código de erro do Firebase Auth e devolve uma mensagem amigável.
 */
export function mapAuthError(code?: string | null): string {
  if (!code) return ERROR_MESSAGES.default;

  const message = ERROR_MESSAGES[code];
  if (message) return message;

  // Se for algum erro novo/não mapeado, logar opcionalmente e retornar mensagem genérica
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.warn('[authErrorMap] Código de erro não mapeado:', code);
  }

  return ERROR_MESSAGES.default;
}
