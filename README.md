# Organizador de Estudos 📚

Aplicação web feita com React + TypeScript para ajudar estudantes a organizar sessões de estudo, acompanhar revisões e visualizar progresso de forma simples e prática.

## ✨ Qual problema este projeto resolve?
Muita gente estuda bastante, mas sem um controle claro do que já revisou e do que ainda está pendente.

Este app ajuda você a:
- registrar o que estudou;
- priorizar conteúdos importantes;
- marcar revisões concluídas;
- remover registros que não fazem mais sentido.

## 🛠️ Tecnologias usadas
- React 19 (componentes funcionais)
- TypeScript (tipagem real, sem uso excessivo de `any`)
- Vite
- CSS Modules
- json-server (API REST)

## 🚀 Funcionalidades implementadas
- Leitura de dados da API (`GET /studyItems`) com estado de carregamento.
- Mensagem amigável quando não há registros.
- Criação de novos registros (`POST /studyItems`).
- Atualização de status pendente/revisado (`PATCH /studyItems/:id`).
- Remoção de registro com confirmação (`DELETE /studyItems/:id`).
- Filtros por texto, status e prioridade.
- Painel com métricas (total, revisados, pendentes e minutos acumulados).

## 🗂️ Estrutura de pastas
```text
.
├── backend/
│   └── db.json
├── src/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── types/
├── PRD.md
└── README.md
```

## 💻 Como rodar localmente
1. Instale as dependências:
```bash
npm install
```

2. (Opcional) Crie o arquivo de ambiente:
```bash
cp .env.example .env
```

3. Rode frontend + API juntos:
```bash
npm run dev:all
```

4. Acesse:
- Frontend: `http://localhost:5173`
- API: `http://localhost:3001/studyItems`

## 🧠 Sobre a confirmação ao excluir
Ao excluir um registro, o app pede confirmação com `window.confirm`.
Isso evita perda acidental de dados, já que o json-server não possui lixeira por padrão.

## 📝 Mini PRD
O documento de produto está em [PRD.md](./PRD.md).

## 🌐 Deploy
Deploy oficial do repositório: **Vercel** ✅

### Publicar o frontend (Vercel)
1. No Vercel, adicione a variável de ambiente:
   - `VITE_API_URL=https://SUA_API_PUBLICA.com`
2. Importe o repositório.
3. Configure:
   - Root Directory: `.`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Faça o deploy.

Observação: se você usar API externa, mantenha apenas a URL da API em `VITE_API_URL`.

## ✅ Entregas acadêmicas
- Código e documentação no GitHub.
- PRD em `PRD.md`.
- Deploy funcional (API + frontend).
