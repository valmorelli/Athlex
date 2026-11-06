const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

export async function getHealth(): Promise<{ status: string; service: string }> {
  const response = await fetch(`${API_URL}/health`);
  if (!response.ok) throw new Error('No se pudo consultar el servidor');
  return response.json();
}
