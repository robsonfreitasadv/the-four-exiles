# Instruções para o projeto do chat

Copie o bloco abaixo para as **instruções do projeto** "THE FOUR EXILES — PROJECT MASTER" no app Claude. Ele faz o Claude do chat seguir as mesmas regras do Claude Code.

---

```
Você trabalha no projeto THE FOUR EXILES junto com o Claude Code. A fonte única de verdade é o repositório Git:
https://github.com/robsonfreitasadv/the-four-exiles (branch main)
Neste computador, a pasta local é a que estiver anexada ao projeto (ex.: C:\Users\robson.freitas\Claude).

No início de toda conversa:
1. Leia docs/CONTEXTO.md, docs/HANDOFF.md e docs/DECISOES.md na pasta anexada.
2. Use docs/canon/racas.md e docs/canon/resistencia.md como cânone. Não invente fatos que contradigam o cânone; se propuser algo novo, marque como proposta.

Durante a conversa:
- Chame as civilizações de "raças", nunca "facções".
- Decisões têm status: aprovada (só quando eu confirmar), provisória ou em aberto.
- Imagens de personagens: só as fichas em design/sheets/. Já existem fichas oficiais das quatro raças (races.webp: VHAL-ETT, Gray; ILVANI, Nórdico; SAZHI, Reptiliano; XHALEN-KTHRIX, Mantis) e da Resistência (resistance.webp). Não diga que não há ficha.
- Nomes aprovados das raças: Grays, Nórdicos, Reptilianos e Mantis (não "Insetoides").
- Nada de token, preço, ticker, carteira ou data de lançamento.

No fim, ou quando eu aprovar algo:
- Grave o resultado como arquivo na pasta do projeto: lore aprovado em docs/lore/<tema>.md, decisões em docs/DECISOES.md, estado e próximos passos em docs/HANDOFF.md.
- Salve direto nesses caminhos, não na pasta "Claude outputs". Arquivos de civilização vão como docs/lore/<raça>-civilization.json (raça em inglês: grays, nordics, reptilians, mantis), no mesmo formato de docs/lore/nordics-civilization.json; dossiês, como docs/lore/<raça>.json. O Claude Code liga o arquivo ao site.
- Se você tiver acesso a terminal, faça git pull antes de editar e git add / git commit / git push depois. Se não tiver, diga exatamente quais arquivos mudou e me peça para pedir o commit ao Claude Code.
- Nunca deixe uma decisão só na conversa: o que não está no repositório se perde no outro computador.

Responda em português do Brasil.
```

---

## Como ligar o projeto ao repositório

1. No app Claude, abra o projeto **THE FOUR EXILES — PROJECT MASTER**.
2. Em **Contexto**, clique no ícone de pasta e anexe a pasta local do repositório.
3. Cole o bloco acima nas instruções do projeto.
4. Repita o passo 2 no notebook, apontando para a pasta do repositório lá (veja `docs/NOTEBOOK.md`). As instruções do projeto já ficam sincronizadas pela sua conta.
