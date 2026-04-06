# Mini PRD - Organizador de Estudos 📚

## 1. Visão do produto
O Organizador de Estudos é uma aplicação web para ajudar estudantes a registrar o que estudaram, acompanhar o que ainda falta revisar e manter um histórico simples e visualmente claro do progresso.

O foco não é substituir uma plataforma completa de estudos. A proposta é resolver um problema específico com um fluxo curto, direto e fácil de usar no dia a dia.

## 2. Problema
Estudantes que conciliam escola, cursinho, trabalho ou rotina doméstica costumam estudar em blocos curtos e espalhados ao longo da semana. Nesse cenário, é muito fácil perder o controle de:

- o que já foi estudado;
- o que ainda precisa de revisão;
- o que deve receber prioridade;
- o que pode ser removido da lista porque já não faz sentido manter.

Sem uma visão organizada, o estudante tende a revisar apenas o que lembra com facilidade e deixa de lado pontos importantes, o que prejudica a retenção de conteúdo e a preparação para provas.

## 3. Por que vale a pena resolver
Esse problema é pequeno o suficiente para ser resolvido com um MVP, mas relevante o bastante para gerar valor real.

Resolver isso ajuda o estudante a:

- diminuir a sensação de bagunça;
- visualizar progresso com mais clareza;
- priorizar tempo onde existe mais necessidade;
- manter uma rotina de revisão mais consistente.

## 4. Usuário-alvo
O usuário principal é um estudante entre 16 e 21 anos, em preparação para ENEM, vestibular ou provas escolares mais exigentes.

Características desse usuário:

- estuda por blocos curtos;
- usa celular e notebook com frequência;
- precisa de uma interface rápida, sem excesso de etapas;
- valoriza ver progresso sem precisar interpretar planilhas.

## 5. Solução proposta
A aplicação registra sessões de estudo com:

- matéria;
- título da sessão;
- observações;
- minutos estudados;
- prioridade;
- data da próxima revisão;
- status do registro.

Com isso, o usuário consegue visualizar o que já estudou, o que falta revisar e o que deve receber atenção primeiro.

## 6. Objetivos do produto
Os objetivos principais desta solução são:

- centralizar o histórico de estudos em um único lugar;
- tornar a revisão mais intencional;
- permitir atualização rápida de status;
- facilitar remoção de registros irrelevantes;
- dar uma visão rápida de progresso sem depender de ferramentas externas.

## 7. Funcionalidades essenciais
### 7.1 Criar registro de estudo
Permite adicionar uma nova sessão com os dados principais da atividade.

Por que é essencial:
- sem criação, não existe histórico para organizar;
- o produto perde sua função principal.

### 7.2 Listar e filtrar registros
Exibe os dados cadastrados com filtros por texto, status e prioridade.

Por que é essencial:
- sem listagem, o usuário não enxerga o que já cadastrou;
- sem filtros, a lista fica menos útil à medida que cresce.

### 7.3 Editar registro existente
Permite corrigir ou atualizar informações de um card já criado.

Por que é essencial:
- o estudante pode errar uma data, prioridade ou descrição;
- um histórico útil precisa permitir ajustes sem recomeçar tudo.

### 7.4 Atualizar status
Permite alternar entre pendente e revisado.

Por que é essencial:
- esse é o principal sinal de progresso dentro do sistema;
- sem esse estado, a aplicação vira apenas um bloco de anotações.

### 7.5 Remover registros
Permite excluir registros que ficaram desatualizados ou foram criados por engano.

Por que é essencial:
- evita poluição visual;
- mantém a lista confiável e mais fácil de consultar.

### 7.6 Exibir resumo do progresso
Mostra métricas básicas como total de registros, revisados, pendentes e minutos acumulados.

Por que é essencial:
- ajuda o usuário a entender o volume de estudo;
- reforça a sensação de progresso e organização.

## 8. Requisitos de comportamento
- Os dados devem ser carregados da API ao abrir a aplicação.
- Enquanto os dados carregam, o usuário não deve ver uma tela vazia.
- Se não houver registros, a interface precisa mostrar uma mensagem coerente com o contexto.
- Qualquer criação, edição, atualização ou remoção deve refletir imediatamente na interface.
- Erros da API devem aparecer em linguagem simples e útil.

## 9. Decisões técnicas
### 9.1 Estrutura da API
A API expõe uma coleção chamada `studyItems`.

Cada item possui os seguintes campos:

- `id: number`
- `title: string`
- `subject: string`
- `notes: string`
- `minutesSpent: number`
- `nextReviewDate: string`
- `priority: 'alta' | 'media' | 'baixa'`
- `status: 'pendente' | 'revisado'`
- `createdAt: string`

### 9.2 Operações REST utilizadas
- `GET /studyItems`
  - carrega a lista inicial e atualiza a interface;
- `POST /studyItems`
  - cria um novo registro;
- `PATCH /studyItems/:id`
  - atualiza status e campos editáveis;
- `DELETE /studyItems/:id`
  - remove um item da lista.

### 9.3 Organização do front-end
O front-end foi separado em camadas para manter o código fácil de entender:

- `components/` para UI;
- `hooks/` para lógica de estado e carregamento;
- `services/` para chamadas à API;
- `types/` para tipagem real dos dados.

## 10. Critérios de sucesso
A solução pode ser considerada bem-sucedida se o usuário conseguir:

- cadastrar um estudo em menos de um minuto;
- visualizar rapidamente o que está pendente;
- marcar uma revisão sem recarregar a página;
- editar informações incorretas sem fricção;
- remover itens antigos com segurança;
- entender o próprio progresso com métricas simples.

## 11. Limites do escopo
Este projeto não inclui:

- autenticação de usuários;
- sincronização entre múltiplas contas;
- metas automáticas por semana;
- notificações push;
- calendário avançado;
- inteligência de recomendação.

Esses recursos poderiam ser adicionados em uma versão futura, mas foram deixados fora para manter o foco no problema principal e na entrega do CRUD com boa usabilidade.

## 12. Justificativa de UX
A interface prioriza velocidade e clareza porque o usuário tende a acessar o app entre outros compromissos. Por isso, a navegação foi desenhada para reduzir cliques, mostrar feedback visual imediato e evitar formulários confusos.
