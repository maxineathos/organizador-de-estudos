# Mini PRD - Organizador de Estudos

## Problema
Estudantes de pre-vestibular que conciliam escola e estudos extras acumulam conteudo sem saber exatamente o que precisa ser revisado primeiro.

## Por que esse problema vale ser resolvido
Quando a revisao nao e organizada por prioridade e data, o aluno tende a repetir o que gosta e ignorar pontos fracos, reduzindo desempenho nas provas.

## Usuario foco
Pessoa de 16 a 21 anos em fase de preparacao para vestibular/enem, que estuda em blocos curtos no celular ou notebook e precisa manter historico simples de revisoes.

## Solucao proposta
A aplicacao registra sessoes de estudo com materia, prioridade, tempo e data de proxima revisao.

### Funcionalidades essenciais
1. Cadastrar uma sessao de estudo.
   - Sem isso nao existe historico para organizar.
2. Listar os registros com filtros por texto, status e prioridade.
   - Sem isso o usuario nao encontra rapidamente o que precisa revisar.
3. Alterar status entre pendente/revisado.
   - Sem isso nao ha acompanhamento de progresso.
4. Excluir registro irrelevante.
   - Sem isso a lista fica poluida e perde confianca.
5. Exibir resumo (total, revisados, pendentes, minutos).
   - Sem isso o usuario nao enxerga progresso e carga acumulada.

## Decisoes tecnicas
### Entidades da API
- `studyItems`
  - `id: number`
  - `title: string`
  - `subject: string`
  - `notes: string`
  - `minutesSpent: number`
  - `nextReviewDate: string`
  - `priority: 'alta' | 'media' | 'baixa'`
  - `status: 'pendente' | 'revisado'`
  - `createdAt: string`

### Operacoes REST utilizadas
- `GET /studyItems`
  - Carregar lista inicial e atualizar manualmente.
- `POST /studyItems`
  - Criar novo registro pelo formulario.
- `PATCH /studyItems/:id`
  - Atualizar apenas o campo `status` ao marcar revisao.
- `DELETE /studyItems/:id`
  - Remover registro com confirmacao do usuario.

## Limites do escopo
Nao inclui autenticacao, metas semanais automáticas e notificacoes push para manter foco no CRUD principal com boa usabilidade.
