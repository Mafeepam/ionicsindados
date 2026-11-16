# SINDADOS-BA — App do Associado (MVP Front-end)

Protótipo funcional em **Ionic 8 + Angular 18** para a atividade prática de laboratório
*II — Atividade IONIC + Angular* (Universidade Católica do Salvador — Engenharia de Software).

Escopo **sem back-end**: não há banco de dados, servidor, API nem autenticação real.
Todos os dados (credencial, notícias e convenções) são simulados em memória no
`DadosService`.

---

## Como executar

O projeto fica na pasta `sindados-app/`. A partir da raiz do repositório:

```bash
cd sindados-app
npm install
npm start
```

A aplicação sobe em `http://localhost:4200`.

**Credencial de teste:**

| Campo             | Valor                         |
|-------------------|-------------------------------|
| Matrícula/E-mail  | `associado@sindados.org.br`   |
| Senha             | `123456`                      |

Para gerar o build de produção: `npm run build` (saída em `dist/sindados-app`).

---

## Demonstrando em iOS e Android

O app não usa nenhum plugin nativo, então o visual de cada plataforma pode ser
demonstrado direto no navegador. O Ionic detecta a plataforma automaticamente e
aplica o visual nativo correspondente.

**Opção 1 — as duas plataformas lado a lado:**

```bash
npm run lab
```

Abre o Ionic Lab, que mostra iOS e Android simultaneamente. O CLI do Ionic e o
`@ionic/lab` já são dependências do projeto, então não é preciso instalar nada
globalmente.

**Opção 2 — forçar uma plataforma pela URL:**

Com `npm start` rodando, acrescente o parâmetro à URL:

- iOS: `http://localhost:4200/?ionic:mode=ios`
- Android: `http://localhost:4200/?ionic:mode=md`

Útil em ambientes remotos (GitHub Codespaces, Gitpod), onde os iframes do Ionic
Lab podem não carregar por causa do redirecionamento de portas.

> **Simulador de iOS exige macOS.** O simulador do iPhone faz parte do Xcode e não
> roda no Windows. Para um emulador Android real, use o Android Studio com o
> Capacitor (`ionic cap add android` e `ionic cap run android`).

---

## Requisitos atendidos

| RF   | Descrição                               | Onde está implementado |
|------|-----------------------------------------|------------------------|
| RF01 | Tela de Login (autenticação simulada)   | `src/app/pages/login/` + `DadosService.login()` |
| RF02 | Tela Inicial (Home) e navegação         | `src/app/pages/home/` + `src/app/pages/tabs/` (`ion-tabs`) |
| RF03 | Lista de notícias sindicais             | `src/app/pages/noticias/` (`ion-card`, 4 itens) |
| RF04 | Lista de ACTs e CCTs                    | `src/app/pages/acordos/` (`ion-list`, `ion-badge`, `ion-alert`, 4 itens) |
| RF05 | Controle de acesso básico               | `src/app/guards/auth.guard.ts` + botões "Sair" |

### Detalhamento

**RF01 — Login.** Campos de Matrícula/E-mail e Senha (`ion-input`) e botão "Entrar"
(`ion-button`). A validação ocorre em dois níveis: primeiro verifica se os campos estão
vazios, depois confere a credencial fixa simulada. Em ambos os casos a mensagem de erro
aparece na própria tela, em vermelho.

**RF02 — Home e navegação.** Cabeçalho (`ion-header` / `ion-toolbar`) identificando o
SINDADOS-BA e mensagem de boas-vindas ao trabalhador associado. A navegação usa abas
inferiores (`ion-tabs`): Início, Notícias, ACTs/CCTs e Sair. A Home também traz botões de
acesso rápido para as mesmas telas.

**RF03 — Notícias.** Lista renderizada com `@for` (equivalente moderno do `*ngFor`) dentro
de `ion-card`. Cada item mostra **título**, **data de publicação** e **resumo**; ao tocar,
abre um `ion-alert` com o texto completo.

**RF04 — ACTs e CCTs.** Lista em `ion-list` / `ion-item`. Cada item mostra **título/empresa**,
**vigência**, **status** em `ion-badge` (verde = Vigente, laranja = Em negociação) e abre um
`ion-alert` com o resumo das **cláusulas principais** (reajuste salarial, vale-alimentação etc.).

**RF05 — Controle de acesso.** As rotas internas ficam sob `/tabs` e são protegidas pelo
`authGuard`, que consulta a flag booleana `isAutenticado` do `DadosService`. Tentar acessar
`/tabs/acordos` diretamente pela URL sem login redireciona para `/login`. Ao clicar em
"Sair" (aba inferior ou botão da Home), o estado é limpo com `logout()` e o usuário volta
para a tela de login.

---

## Estrutura do projeto

```
src/app/
├── app.component.ts          # ion-app + ion-router-outlet
├── app.config.ts             # provideIonicAngular + provideRouter
├── app.routes.ts             # rotas: /login e /tabs (protegida)
├── guards/
│   └── auth.guard.ts         # RF05 — bloqueia rotas internas
├── models/
│   ├── noticia.model.ts
│   └── acordo.model.ts
├── services/
│   └── dados.service.ts      # Etapa 2 — mocks + isAutenticado
└── pages/
    ├── login/                # RF01
    ├── tabs/                 # RF02 — ion-tabs
    ├── home/                 # RF02
    ├── noticias/             # RF03
    └── acordos/              # RF04
```

## Observações técnicas

- Angular standalone components (sem `NgModule`), padrão do Ionic 8.
- Sintaxe de controle de fluxo do Angular 17+ (`@for`, `@if`, `@empty`) no lugar de
  `*ngFor` / `*ngIf`. Se o professor exigir as diretivas clássicas, basta importar
  `CommonModule` no componente e trocar a sintaxe nos templates.
- Ícones via `addIcons()` do `ionicons`, importados individualmente (tree-shaking).
- Tema institucional em `src/theme/variables.scss`.
- Logo oficial do sindicato em `public/assets/logo-sindados.png`, usada na tela de login,
  no cabeçalho da Home e como favicon (`public/favicon.ico`). Para trocar a logo, basta
  substituir esse arquivo mantendo o mesmo nome.
- O estado de autenticação vive apenas em memória: recarregar a página (F5) derruba a
  sessão e devolve o usuário ao login — comportamento esperado para um MVP sem back-end.
