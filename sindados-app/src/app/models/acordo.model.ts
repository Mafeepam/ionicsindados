
export type StatusAcordo = 'Vigente' | 'Em negociação';

export interface Acordo {
  id: number;
  tipo: 'ACT' | 'CCT';
  titulo: string;        
  vigencia: string;     
  status: StatusAcordo;
  clausulas: string[];   
}
