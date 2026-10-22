# Comunidade: a planta do servidor

**Status:** proposta do Diretor · 2026-10-22 · pronta para o dono montar. O site já está ligado (`src/data/community.ts`); enquanto os links estiverem vazios, ele mostra "em breve".

## Plataforma

**Discord**, um servidor só, com uma área por raça. Motivos: cargos por raça (a cor e o emblema aparecem no nome de cada pessoa), onboarding que pergunta a raça na entrada, canais de memes, moderação automática, eventos e, no futuro, os personagens de IA como bots identificados. Grupos de WhatsApp expõem o telefone de todo mundo e não têm cargos nem moderação; se o dono quiser um canal de avisos no WhatsApp, use o **Canal** (só leitura), nunca grupo.

Nome do servidor: **THE FOUR EXILES · O Censo**. Ícone: o logo do site. Banner: wallpaper de computador de qualquer raça (kit grátis).

## Estrutura

```
📜 O CENSO (todos veem)
  #boas-vindas          (só leitura) apresentação e link do site
  #regras               (só leitura) regras abaixo
  #avisos               (só leitura) temporadas, missões, lore novo
  #escolha-sua-raça     (só leitura) explica o onboarding e o teste do site

🌍 PRAÇA DA TERRA (todos)
  #geral
  #propaganda-galáctica  memes de uma raça contra a outra (o canal-vitrine)
  #teorias               lore, roteiros, mistérios (Q1–Q6 sem spoiler oficial)
  #carteirinhas          compartilhe sua carteirinha do Censo e o kit
  #missões               missões da temporada e entregas

👽 GRAYS · Arquivo Central (cargo Gray)
  #cartório-de-hevra     conversa da raça
  #protocolo-de-memes    memes da raça

✨ NÓRDICOS · Assembleia (cargo Nórdico)
  #salão-da-assembleia
  #coro-de-memes

🐍 REPTILIANOS · Dinastia de Sazhath (cargo Reptiliano)
  #corte-das-cisternas
  #memes-da-dinastia

🦗 MANTIS · Comando (cargo Mantis)
  #sala-de-guerra
  #memes-em-formação

🛡️ RESISTÊNCIA (todos)
  #transmissões-da-dora  (só leitura) a narradora conta os votos e a história

🔧 EQUIPE (só moderação)
  #moderação  #registro-de-pontos
```

Todo mundo vê a área das outras raças, mas **só escreve na própria** (permissão "ver" para @everyone, "enviar" só para o cargo). Espionar o rival faz parte da graça.

## Cargos

| Cargo | Cor | Como se ganha |
| --- | --- | --- |
| Gray | `#9aa3ad` | onboarding: "Quem fica com a Terra?" → Grays |
| Nórdico | `#7fb2ff` | onboarding → Nórdicos |
| Reptiliano | `#c8463c` | onboarding → Reptilianos |
| Mantis | `#7fbf5a` | onboarding → Mantis |
| Moderação | branco | dono escolhe |
| Personagem de IA | cinza | só bots identificados (futuro); nunca contam pontos de pessoas |

Uma raça por pessoa. Trocar de raça é permitido uma vez por temporada (avisar em #avisos).

## Onboarding (Configurações do servidor → Onboarding)

Pergunta obrigatória, escolha única: **"Quem fica com a Terra?"**
- Grays: "Nada se perde. Ninguém se esquece. Tudo arquivado." → cargo Gray
- Nórdicos: "Venha como está. Fique de vez." → cargo Nórdico
- Reptilianos: "Os rios lembram de quem cuidou deles." → cargo Reptiliano
- Mantis: "Cumprimos a palavra. Por escrito." → cargo Mantis
- "Não sei ainda" → mostra #escolha-sua-raça com o link do teste do site

## Regras (para colar em #regras)

1. Isto é ficção e sátira. Zoe as raças, nunca as pessoas.
2. Nada de ódio, assédio, conteúdo sexual ou violência real. Nada sobre política, religião ou grupos reais usado para atacar alguém.
3. **Nada de dinheiro:** não existe token, moeda, NFT, pré-venda nem investimento do projeto. Quem oferecer qualquer coisa assim é golpe: denuncie.
4. Não peça nem publique dados pessoais (telefone, endereço, documentos). Menores de 13 anos não podem usar o Discord.
5. Conteúdo próprio: memes e artes enviados aqui podem ser repostados pelo projeto com crédito. Não envie o que não é seu.
6. Personagens de IA sempre aparecem identificados e nunca contam como pessoas.
7. Moderação decide. Advertência, depois silêncio, depois saída.

## Mensagens de boas-vindas por raça

Fixe no canal principal de cada raça.

**Grays · #cartório-de-hevra**
> Bem-vindo(a) ao Arquivo Central. Seu cadastro foi recebido, carimbado e arquivado em três vias. Aqui a pausa é de sete segundos, a fila anda e nada se perde. Favor protocolar seus memes em #protocolo-de-memes. Reclamações sobre o caos: são 40.001 e contando.

**Nórdicos · #salão-da-assembleia**
> Que alegria ter você aqui! Pegue uma sobremesa, escolha uma música e sinta-se em casa. Por aqui ninguém fica sozinho, e ninguém é obrigado a nada. Só ninguém consegue sair. Um mundo melhor é possível, e ele começa em #coro-de-memes.

**Reptilianos · #corte-das-cisternas**
> Por selo e por herdeiro, a Dinastia de Sazhath reconhece sua chegada. Aqui se pensa em séculos e se fala baixo. Confira a água antes de beber, confira o sobrinho antes de confiar. Memes da casa em #memes-da-dinastia.

**Mantis · #sala-de-guerra**
> Ordem recebida: você entrou para o Comando. Regras curtas, janela de tempo, canal de reporte. Aqui se cumpre o que se assina e ninguém fica para trás na formação. Folga fora da agenda é motim. Memes em formação em #memes-em-formação.

**Resistência · #transmissões-da-dora**
> Aqui é a Dora. Quatro raças querem a Terra, e cada uma jura que é para o nosso bem. Eu conto os votos e conto a história. Escolham um lado, façam barulho e leiam o contrato. Só não esqueçam: todas querem o planeta.

## Ligar no site

1. Crie o servidor e o convite: Configurações do servidor → Convites → **convite que nunca expira**, sem limite de usos.
2. Abra `src/data/community.ts` e cole o link em `inviteUrl` (ex.: `https://discord.gg/xxxx`).
3. Opcional: links diretos para o canal de cada raça (clique direito no canal → Copiar link) em `raceUrl`.
4. Rode o build e publique a prévia (passos no `CLAUDE.md`). Os botões trocam "em breve" por "Entrar".

Sem servidor ainda, nada quebra: o site mostra os nomes dos canais com o selo "em breve".

## Antes de abrir ao público

- [x] Política de privacidade e termos reais, citando o Discord como serviço de terceiros (falta preencher `src/data/legal.ts`).
- [ ] Pelo menos duas pessoas na moderação.
- [ ] AutoMod do Discord ligado: bloquear links de "token", "airdrop", "presale", "seed phrase" e menções em massa.
- [ ] Um primeiro evento marcado (ex.: "Noite da Propaganda Galáctica") para ninguém chegar numa sala vazia.
