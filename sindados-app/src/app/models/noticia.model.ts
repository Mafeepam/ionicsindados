/**
 * RF03 — Modelo de uma notícia sindical.
 */
export interface Noticia {
  id: number;
  titulo: string;
  data: string;      // data de publicação (dd/mm/aaaa)
  resumo: string;
  conteudo: string;  // texto exibido no alerta de detalhes
}
