import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const baseApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export async function refreshToken() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    redirect('/auth/login'); // Redireciona para login se não estiver autenticado
  }

  const response = await fetch(`${baseApiUrl}/refresh`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  if (response.status !== 200) {
    throw new Error('Erro ao atualizar token');
  }

  const { accessToken } = await response.json();

  // Retorna um cabeçalho para salvar o cookie no cliente
  return accessToken;
}
