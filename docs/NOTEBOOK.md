# Trabalhar em mais de um computador

O projeto vive no GitHub. Cada computador tem uma cópia local; o Git mantém as duas iguais. A regra de ouro: **puxe antes de começar, envie antes de sair.**

## Configurar o notebook (uma vez)

1. Instale o **Git** (https://git-scm.com) e o **Node.js 18.17 ou mais novo** (https://nodejs.org).
2. Clone o projeto em `C:/Users/<seu-usuario>/Claude`. Os computadores atuais usam:
   - `C:/Users/robson.freitas/Claude`
   - `C:/Users/Robson/Claude`

```bash
git clone https://github.com/robsonfreitasadv/the-four-exiles.git C:/Users/Robson/Claude
```

   Cada computador tem uma única cópia. Não trabalhe em clones soltos em outras pastas: eles ficam desatualizados e o chat não os enxerga.

3. Entre na pasta e instale as dependências:

```bash
npm install
```

4. Configure seu nome e e-mail no Git, se ainda não estiverem configurados:

```bash
git config --global user.name "Robson Freitas"
```

```bash
git config --global user.email "robsonfreitasadv@gmail.com"
```

5. No app Claude:
   - **Code:** abra uma nova sessão escolhendo a pasta do projeto. O Claude Code lê o `CLAUDE.md` automaticamente.
   - **Chat:** no projeto **THE FOUR EXILES — PROJECT MASTER**, anexe a mesma pasta em **Contexto**.

O primeiro `git push` no notebook abre o navegador para você entrar no GitHub.

## Rotina em qualquer computador

**Ao começar:**

```bash
git pull
```

Peça ao Claude para ler `docs/CONTEXTO.md` e `docs/HANDOFF.md`. O Claude Code já faz isso pelo `CLAUDE.md`.

**Ao terminar:** peça ao Claude Code para atualizar o `docs/HANDOFF.md`, fazer commit e enviar. Ou faça você mesmo:

```bash
git add -A
```

```bash
git commit -m "O que mudou"
```

```bash
git push
```

## Se der conflito

Acontece quando os dois computadores mudam o mesmo arquivo sem sincronizar. Peça ao Claude Code para resolver: ele mostra as duas versões e junta. Para evitar, nunca comece sem `git pull` e nunca saia sem `git push`.

## Se o chat disser que o acesso está bloqueado

O projeto do chat lê a pasta anexada em **Contexto**, que é diferente em cada computador. Se o chat disser que não consegue ver o repositório:

1. Confira se a pasta existe neste computador (`C:\Users\<seu-usuario>\Claude`). Se não existir, clone como no passo 2.
2. No projeto **THE FOUR EXILES — PROJECT MASTER**, em **Contexto**, remova a pasta antiga e anexe a deste computador.
3. Rode `git pull` na pasta antes de abrir a conversa.

A prévia do site (link `claude.ai/artifact/...`) é privada: o chat não consegue abri-la. Para o chat, o site é o código em `src/` e o conteúdo em `docs/`.

## O que não vai pelo Git

- `node_modules/` e `dist/`: recriados com `npm install` e `npm run build`.
- A memória local do Claude: fica só no computador. Por isso tudo que importa vai para `docs/`.
