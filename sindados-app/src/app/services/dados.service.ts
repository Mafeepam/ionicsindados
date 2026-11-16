import { Injectable } from '@angular/core';
import { Noticia } from '../models/noticia.model';
import { Acordo } from '../models/acordo.model';

/**
 * Etapa 2 — Dados Simulados / Mock.
 *
 * Service único que concentra:
 *  - a credencial fixa simulada e a flag booleana `isAutenticado` (RF01 / RF05);
 *  - as notícias sindicais (RF03);
 *  - os ACTs e CCTs (RF04).
 *
 * Não há back-end, banco de dados nem API: tudo vive em arrays em memória.
 */
@Injectable({ providedIn: 'root' })
export class DadosService {
  /** Credencial fixa simulada exigida pelo enunciado. */
  private readonly CREDENCIAL = {
    usuario: 'associado@sindados.org.br',
    senha: '123456',
  };

  /** RF05 — estado de autenticação simulado. */
  private autenticado = false;

  /** Nome exibido na mensagem de boas-vindas da Home. */
  private nomeAssociado = 'Associado(a)';

  // ---------------------------------------------------------------- RF01/RF05

  /**
   * Valida a credencial simulada. Retorna true quando o login é aceito.
   */
  login(usuario: string, senha: string): boolean {
    const u = (usuario ?? '').trim().toLowerCase();
    const s = (senha ?? '').trim();

    const ok = u === this.CREDENCIAL.usuario && s === this.CREDENCIAL.senha;
    if (ok) {
      this.autenticado = true;
      this.nomeAssociado = 'Associado(a) SINDADOS-BA';
    }
    return ok;
  }

  /** Limpa o estado de autenticação (botão "Sair"). */
  logout(): void {
    this.autenticado = false;
  }

  /** Usado pelo guard de rota para bloquear acesso direto às telas internas. */
  get isAutenticado(): boolean {
    return this.autenticado;
  }

  get associado(): string {
    return this.nomeAssociado;
  }

  // -------------------------------------------------------------------- RF03

  private readonly noticias: Noticia[] = [
    {
      id: 1,
      titulo: 'Campanha Salarial 2026 aberta com assembleia dos trabalhadores de TI',
      data: '10/11/2026',
      resumo:
        'Assembleia geral aprovou a pauta de reivindicações da categoria para a Campanha Salarial 2026.',
      conteudo:
        'A assembleia realizada na sede do SINDADOS-BA aprovou a pauta de reivindicações da ' +
        'categoria: reajuste salarial acima da inflação, ampliação do vale-alimentação, ' +
        'regulamentação do trabalho remoto e piso salarial para estagiários da área de TI. ' +
        'A pauta já foi protocolada junto ao sindicato patronal.',
    },
    {
      id: 2,
      titulo: 'SINDADOS-BA conquista reajuste de 6,5% em negociação com empresa de tecnologia',
      data: '28/10/2026',
      resumo:
        'Acordo assinado garante reajuste retroativo e manutenção de todos os benefícios da CCT.',
      conteudo:
        'Após três rodadas de negociação, o SINDADOS-BA fechou acordo coletivo garantindo ' +
        'reajuste de 6,5% sobre os salários, retroativo a setembro, além da manutenção integral ' +
        'dos benefícios previstos na CCT da categoria. O instrumento tem vigência de 12 meses.',
    },
    {
      id: 3,
      titulo: 'Novo plano de saúde do sindicato começa a valer em dezembro',
      data: '15/10/2026',
      resumo:
        'Associados e dependentes passam a contar com rede ampliada e carência reduzida.',
      conteudo:
        'O novo convênio firmado pelo sindicato amplia a rede credenciada em Salvador e Região ' +
        'Metropolitana e reduz os prazos de carência para associados em dia com a contribuição. ' +
        'A adesão pode ser feita na secretaria do SINDADOS-BA até 30/11.',
    },
    {
      id: 4,
      titulo: 'Curso gratuito de qualificação em Cloud e DevOps para associados',
      data: '02/10/2026',
      resumo:
        'Turmas noturnas com certificação, exclusivas para trabalhadores associados da área de TI.',
      conteudo:
        'O SINDADOS-BA abre inscrições para o curso gratuito de Cloud e DevOps, com 40 horas, ' +
        'turmas noturnas e certificado. As vagas são exclusivas para associados em dia. ' +
        'Inscrições pelo site do sindicato.',
    },
  ];

  getNoticias(): Noticia[] {
    return this.noticias;
  }

  // -------------------------------------------------------------------- RF04

  private readonly acordos: Acordo[] = [
    {
      id: 1,
      tipo: 'CCT',
      titulo: 'CCT SINDADOS-BA / SINEPD 2025-2026',
      vigencia: '2025/2026',
      status: 'Vigente',
      clausulas: [
        'Reajuste salarial de 5,8% sobre o salário de janeiro/2025',
        'Vale-alimentação de R$ 700,00 mensais',
        'Piso salarial da categoria: R$ 2.450,00',
        'Auxílio home office de R$ 150,00 para trabalho remoto',
      ],
    },
    {
      id: 2,
      tipo: 'ACT',
      titulo: 'ACT Empresa X Tecnologia S/A',
      vigencia: '2025/2026',
      status: 'Vigente',
      clausulas: [
        'Reajuste salarial de 6,5% retroativo a setembro/2025',
        'Vale-alimentação de R$ 820,00 mensais',
        'Participação nos lucros e resultados (PLR) de até 1,5 salário',
        'Estabilidade de 60 dias para o trabalhador pré-aposentadoria',
      ],
    },
    {
      id: 3,
      tipo: 'ACT',
      titulo: 'ACT Empresa Y Sistemas Ltda.',
      vigencia: '2026/2027',
      status: 'Em negociação',
      clausulas: [
        'Proposta de reajuste salarial de 4,2% (em discussão)',
        'Proposta de vale-alimentação de R$ 650,00 mensais',
        'Regulamentação da jornada em regime híbrido',
        'Banco de horas com compensação em até 6 meses',
      ],
    },
    {
      id: 4,
      tipo: 'CCT',
      titulo: 'CCT Processamento de Dados — Bahia 2026-2027',
      vigencia: '2026/2027',
      status: 'Em negociação',
      clausulas: [
        'Pauta: reajuste salarial acima do INPC acumulado',
        'Pauta: vale-alimentação unificado para toda a categoria',
        'Pauta: piso salarial para estagiários e jovens aprendizes de TI',
      ],
    },
  ];

  getAcordos(): Acordo[] {
    return this.acordos;
  }
}
