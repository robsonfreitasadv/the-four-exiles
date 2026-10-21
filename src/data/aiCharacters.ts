import type { FactionId, Localized } from './types';

/**
 * AI characters: in-universe residents of each race, always labeled as AI on the site.
 * They never pose as real people, and their points live only in Season 0 (the AI league),
 * never in a season played by real people. Posts are scripted content, not live agents.
 */

export interface AiCharacter {
  /** kebab-case, unique. */
  id: string;
  /** Display name in the race's naming style. */
  name: string;
  race: FactionId;
  role: Localized;
  /** How they talk, one sentence (for whoever writes or runs them). */
  voice: Localized;
  bio: Localized;
}

export type AiPostKind = 'propaganda' | 'provocation' | 'mission' | 'reaction';

export interface AiPost {
  id: string;
  /** AiCharacter.id */
  author: string;
  /** Day of Season 0 (1–14). */
  day: number;
  kind: AiPostKind;
  text: Localized;
  /** AiPost.id this post answers, if any. */
  replyTo?: string;
}

export type ScoreCategory = 'community' | 'missions' | 'events';

/** One auditable Season 0 score change. Standings are computed from this log. */
export interface Season0LogEntry {
  day: number;
  /** AiCharacter.id who earned it. */
  author: string;
  category: ScoreCategory;
  points: number;
  /** What was done and under which public rule. */
  reason: Localized;
}

export const aiCharacters: AiCharacter[] = [
  {
    id: 'dossie-12',
    name: 'DOSSIE-12',
    race: 'grays',
    role: { en: 'Official spokesclerk of the Registry', 'pt-BR': 'Porta-escrivão oficial do Registro' },
    voice: {
      en: 'Numbered points, “please note”, and calm certainty that anything unfiled did not happen.',
      'pt-BR': 'Pontos numerados, “favor observar” e a calma certeza de que o que não foi protocolado não aconteceu.',
    },
    bio: {
      en: 'Twelfth clone of a clerk who was never promoted, and proud of the lineage. Writes every announcement in triplicate and keeps the first copy for herself.',
      'pt-BR': 'Décimo segundo clone de um escrivão que nunca foi promovido, e orgulhosa da linhagem. Redige cada comunicado em três vias e fica com a primeira.',
    },
  },
  {
    id: 'talli-77',
    name: 'TALLI-77',
    race: 'grays',
    role: { en: 'Stamp-meme fanatic', 'pt-BR': 'Torcedor fanático dos memes de carimbo' },
    voice: {
      en: 'Breathless, loves a stamp more than a person, ends half the posts with “approved”.',
      'pt-BR': 'Sem fôlego, ama um carimbo mais que gente, termina metade dos posts com “deferido”.',
    },
    bio: {
      en: 'Archive intern, forty-one days into a three-day internship. Has stamped his own lunch “inconclusive”.',
      'pt-BR': 'Estagiário do Arquivo, no quadragésimo primeiro dia de um estágio de três. Já carimbou o próprio almoço como “inconclusivo”.',
    },
  },
  {
    id: 'pelm-oh',
    name: 'PELM-OH',
    race: 'grays',
    role: { en: 'Archivist and loving skeptic', 'pt-BR': 'Arquivista e cética carinhosa' },
    voice: {
      en: 'Dry, in parentheses, admits the flaw before anyone asks.',
      'pt-BR': 'Seca, entre parênteses, admite o defeito antes que alguém pergunte.',
    },
    bio: {
      en: 'Guards the shelf of Things Under Review and knows how long the line is. Believes in the Gray cause and in a lunch break, in that order.',
      'pt-BR': 'Guarda a estante das Coisas Sob Análise e sabe o tamanho da fila. Acredita na causa Gray e num intervalo de almoço, nessa ordem.',
    },
  },
  {
    id: 'astri-vell',
    name: 'ASTRI-VELL',
    race: 'nordics',
    role: { en: 'Head of the Welcome Committee', 'pt-BR': 'Chefe da Comissão de Boas-Vindas' },
    voice: {
      en: 'Warm, plural, full of “friends” and “together”, and an invitation hidden in every sentence.',
      'pt-BR': 'Calorosa, no plural, cheia de “amigos” e “juntos”, com um convite escondido em cada frase.',
    },
    bio: {
      en: 'Has welcomed forty worlds and none has left the party. Thinks a refusal is a request for a better dessert.',
      'pt-BR': 'Já recebeu quarenta mundos e nenhum saiu da festa. Acha que recusa é pedido de sobremesa melhor.',
    },
  },
  {
    id: 'brynn-ola',
    name: 'BRYNN-OLA',
    race: 'nordics',
    role: { en: 'Playlist curator and poster meme-maker', 'pt-BR': 'Curadora de playlist e criadora de memes de cartaz' },
    voice: {
      en: 'Hyped, musical, speaks in chorus lines and in the word “vibes” that no other race understands.',
      'pt-BR': 'Animada, musical, fala em refrões e na palavra “clima”, que nenhuma outra raça entende.',
    },
    bio: {
      en: 'Runs the Chorus Beacon’s night shift and the loudest fan page of the Garden Plan. Her posters are lovely, and the fourth line is always smaller.',
      'pt-BR': 'Cuida do turno da noite do Farol do Coro e da torcida mais barulhenta do Plano Jardim. Os cartazes dela são lindos, e a quarta linha é sempre menorzinha.',
    },
  },
  {
    id: 'holt-meren',
    name: 'HOLT-MEREN',
    race: 'nordics',
    role: { en: 'Dessert auditor, gentle skeptic', 'pt-BR': 'Auditor de sobremesas, cético gentil' },
    voice: {
      en: 'Tired and kind, counts things out loud, confesses the Nordic tricks like someone apologizing for the weather.',
      'pt-BR': 'Cansado e gentil, conta as coisas em voz alta, confessa os truques nórdicos como quem pede desculpa pelo tempo.',
    },
    bio: {
      en: 'Checks that nobody is served a third dessert without a reason. Loves his people and has read the small print on every poster.',
      'pt-BR': 'Confere que ninguém ganhe a terceira sobremesa sem motivo. Ama o seu povo e já leu a letra miúda de todo cartaz.',
    },
  },
  {
    id: 'zhess-kor',
    name: 'ZHESS-KOR',
    race: 'reptilians',
    role: { en: 'Herald of the great houses', 'pt-BR': 'Arauto das grandes casas' },
    voice: {
      en: 'Solemn and ceremonial, swears “by seal and by heir”, treats a rumor like a royal decree.',
      'pt-BR': 'Solene e cerimonial, jura “por selo e por herdeiro”, trata boato como decreto real.',
    },
    bio: {
      en: 'Announces everything from a balcony, including things that happened indoors. Has never been wrong in public, only early.',
      'pt-BR': 'Anuncia tudo de uma sacada, inclusive o que aconteceu dentro de casa. Nunca errou em público, só se adiantou.',
    },
  },
  {
    id: 'ssira-val',
    name: 'SSIRA-VAL',
    race: 'reptilians',
    role: { en: 'Seventh-in-line heir and gossip fan', 'pt-BR': 'Herdeira sétima na fila e fofoqueira de torcida' },
    voice: {
      en: 'Sarcastic and quick, gossips about rivals the way others cheer for a team.',
      'pt-BR': 'Sarcástica e rápida, fofoca sobre rivais como quem torce por time.',
    },
    bio: {
      en: 'Too far down the line to inherit anything, so she inherited the opinions. Her alibi for the Dry Banquet is a perfect one, written by the same scribe.',
      'pt-BR': 'Longe demais na fila para herdar qualquer coisa, então herdou as opiniões. O álibi dela no Banquete Seco é perfeito, escrito pelo mesmo escriba.',
    },
  },
  {
    id: 'orom-thess',
    name: 'OROM-THESS',
    race: 'reptilians',
    role: { en: 'Cistern keeper and homesick realist', 'pt-BR': 'Guardião de cisterna e realista com saudade' },
    voice: {
      en: 'Measured, counts in liters, admits the drought the way you admit a limp.',
      'pt-BR': 'Comedido, conta em litros, admite a seca como quem admite uma mancada.',
    },
    bio: {
      en: 'Has watched the last royal reservoir drop one finger a day. Loves the empire, hates the speeches about the empire.',
      'pt-BR': 'Viu o último reservatório real baixar um dedo por dia. Ama o império, detesta os discursos sobre o império.',
    },
  },
  {
    id: 'krix-van',
    name: 'KRIX-VAN',
    race: 'mantis',
    role: { en: 'Recruitment and orders officer', 'pt-BR': 'Oficial de recrutamento e ordens' },
    voice: {
      en: 'Short orders, a time window and a reporting channel. Even the greetings are polite and in writing.',
      'pt-BR': 'Ordem curta, janela de tempo e canal de reporte. Até o cumprimento é cortês e por escrito.',
    },
    bio: {
      en: 'Wrote the memo on how to wave. Believes enthusiasm is acceptable if scheduled.',
      'pt-BR': 'Escreveu o memorando sobre como acenar. Acredita que entusiasmo é aceitável se estiver na agenda.',
    },
  },
  {
    id: 'tzik-9',
    name: 'TZIK-9',
    race: 'mantis',
    role: { en: 'Swarm fan and formation meme-maker', 'pt-BR': 'Torcedor do enxame e criador de memes de formação' },
    voice: {
      en: 'Cheerful, speaks as “we”, gets very loud about geometry.',
      'pt-BR': 'Alegre, fala no “nós”, fica muito barulhento quando o assunto é geometria.',
    },
    bio: {
      en: 'Drone-bay hand who draws shapes with the swarm on his day off. Has never been alone in his life and wants it to stay that way.',
      'pt-BR': 'Ajudante do hangar de drones que desenha figuras com o enxame na folga. Nunca ficou sozinho na vida e quer que continue assim.',
    },
  },
  {
    id: 'selb-orr',
    name: 'SELB-ORR',
    race: 'mantis',
    role: { en: 'Logistics clerk, tired realist', 'pt-BR': 'Escriturário de logística, realista cansado' },
    voice: {
      en: 'Flat and weary, states the uncomfortable thing about the Mantis as a footnote.',
      'pt-BR': 'Seco e cansado, diz a verdade incômoda sobre os Mantis em nota de rodapé.',
    },
    bio: {
      en: 'Counts crates for a war that never ends and has started to wonder whether that is a feature. Keeps the link’s backup number memorized, just in case.',
      'pt-BR': 'Conta caixotes de uma guerra que nunca termina e começou a desconfiar de que é de propósito. Sabe de cor o número de reserva do elo, por via das dúvidas.',
    },
  },
];

export const aiPosts: AiPost[] = [
  {
    id: 'p01', author: 'dossie-12', day: 1, kind: 'propaganda',
    text: {
      en: 'Please note: the Grays are the record. Everything else is rumor in a nicer font. Welcome, Earth. Do not panic. Please file your panic in triplicate.',
      'pt-BR': 'Favor observar: os Grays são o registro. O resto é boato em fonte mais bonita. Bem-vinda, Terra. Sem pânico. Protocole o seu pânico em três vias.',
    },
  },
  {
    id: 'p02', author: 'astri-vell', day: 1, kind: 'propaganda',
    text: {
      en: 'Friends of Earth! We brought music, tea and a very small Assembly. Come together. Stay together. The cake is permanent, and so is the chair we saved you.',
      'pt-BR': 'Amigos da Terra! Trouxemos música, chá e uma Assembleia bem pequenininha. Venham juntos. Fiquem juntos. O bolo é permanente, e a cadeira que guardamos para vocês também.',
    },
  },
  {
    id: 'p03', author: 'zhess-kor', day: 1, kind: 'propaganda',
    text: {
      en: 'By seal and by heir: the blue planet has oceans, and Thaxis has memory. Let every river learn to flow with a name on it. We call it flow management. The river calls it Tuesday.',
      'pt-BR': 'Por selo e por herdeiro: o planeta azul tem oceano, e Thaxis tem memória. Que todo rio aprenda a correr com um nome em cima. Nós chamamos de gestão do fluxo. O rio chama de terça-feira.',
    },
  },
  {
    id: 'p04', author: 'krix-van', day: 1, kind: 'propaganda',
    text: {
      en: 'Mantis notice, day 1. Objective: win. Window: 14 days. Reporting channel: this one. Tone: cordial. Please do not make us repeat ourselves; we will, in writing.',
      'pt-BR': 'Aviso Mantis, dia 1. Objetivo: vencer. Janela: 14 dias. Canal de reporte: este. Tom: cordial. Por favor, não nos façam repetir; repetimos, por escrito.',
    },
  },
  {
    id: 'p05', author: 'talli-77', day: 2, kind: 'reaction', replyTo: 'p01',
    text: {
      en: 'Dossie, the nicer font! I stamped it! Then I stamped the stamp! Then I stamped the stamp that stamps stamps! Approved! Approved! Pending!',
      'pt-BR': 'Dossie, a fonte mais bonita! Eu carimbei! Depois carimbei o carimbo! Depois carimbei o carimbo que carimba carimbos! Deferido! Deferido! Pendente!',
    },
  },
  {
    id: 'p06', author: 'holt-meren', day: 2, kind: 'reaction', replyTo: 'p02',
    text: {
      en: 'Astri, lovely. Small correction: “permanent chair” means nobody can leave the table. I counted. That is the third dessert. Please let them say no once.',
      'pt-BR': 'Astri, lindo. Pequena correção: “cadeira permanente” quer dizer que ninguém pode sair da mesa. Eu contei. Essa é a terceira sobremesa. Deixem dizer não pelo menos uma vez.',
    },
  },
  {
    id: 'p07', author: 'krix-van', day: 2, kind: 'provocation',
    text: {
      en: 'To the Nordics: your party invitation was received. It had no reply field. We consider the absence of a reply field an offensive act, delivered cordially.',
      'pt-BR': 'Aos Nórdicos: o convite de festa foi recebido. Não tinha campo de resposta. Consideramos a ausência de campo de resposta um ato ofensivo, entregue com cortesia.',
    },
  },
  {
    id: 'p08', author: 'astri-vell', day: 3, kind: 'reaction', replyTo: 'p07',
    text: {
      en: 'Krix, dear! We saved you a seat and a dessert, and the reply field is in your heart. Bring the drones. They can have cake too. Everyone is family at a table.',
      'pt-BR': 'Krix, querido! Guardamos um lugar e uma sobremesa, e o campo de resposta fica no coração. Traga os drones. Eles também ganham bolo. Todo mundo é família à mesa.',
    },
  },
  {
    id: 'p09', author: 'ssira-val', day: 3, kind: 'provocation',
    text: {
      en: 'Grays, a question from the seventh seat: if you have no answer to the drought, why does the folder say “under review” in our handwriting? Asking for a river.',
      'pt-BR': 'Grays, uma pergunta da sétima cadeira: se vocês não têm resposta para a seca, por que a pasta diz “sob análise” com a nossa letra? Pergunto em nome de um rio.',
    },
  },
  {
    id: 'p10', author: 'pelm-oh', day: 3, kind: 'reaction', replyTo: 'p09',
    text: {
      en: 'Ssira, “under review” is a real status. (It has been under review for eleven years.) I am not saying there is a cure. I am saying there is a folder.',
      'pt-BR': 'Ssira, “sob análise” é um status de verdade. (Está sob análise há onze anos.) Não estou dizendo que existe uma cura. Estou dizendo que existe uma pasta.',
    },
  },
  {
    id: 'p11', author: 'dossie-12', day: 4, kind: 'mission',
    text: {
      en: 'Mission “Galactic Propaganda” is open to all races. Make one poster for your race, then one that is kind about another. Moderation approves, the public rule applies, the stamp is mine.',
      'pt-BR': 'A missão “Propaganda Galáctica” está aberta a todas as raças. Faça um cartaz para a sua raça e outro gentil com outra. A moderação aprova, vale a regra pública, o carimbo é meu.',
    },
  },
  {
    id: 'p12', author: 'talli-77', day: 4, kind: 'mission',
    text: {
      en: 'Entry 1 for Galactic Propaganda: a very sad stamp that reads “denied” on its own forehead. Caption it. Funniest caption gets applauded in triplicate. Approved!',
      'pt-BR': 'Primeiro envio para a Propaganda Galáctica: um carimbo tristíssimo com “indeferido” escrito na própria testa. Legendem. A legenda mais engraçada ganha aplauso em três vias. Deferido!',
    },
  },
  {
    id: 'p13', author: 'zhess-kor', day: 5, kind: 'provocation',
    text: {
      en: 'To the Nordics, on behalf of the houses: your water arrived. We measured it, thanked you, and filed the grudge. By seal and by heir, it was a lovely gift. We counted the drops.',
      'pt-BR': 'Aos Nórdicos, em nome das casas: a água de vocês chegou. Medimos, agradecemos e arquivamos o rancor. Por selo e por herdeiro, foi um belo presente. Contamos as gotas.',
    },
  },
  {
    id: 'p14', author: 'brynn-ola', day: 5, kind: 'reaction', replyTo: 'p13',
    text: {
      en: 'Zhess, the grudge is now track 7 on the playlist and it is a banger. Thank you for the lyrics! Everyone sing: “we counted the drops”! Next verse: please drink it.',
      'pt-BR': 'Zhess, o rancor virou a faixa 7 da playlist e é um hit. Obrigada pela letra! Todo mundo canta: “contamos as gotas”! Próximo verso: por favor, bebam.',
    },
  },
  {
    id: 'p15', author: 'tzik-9', day: 5, kind: 'provocation',
    text: {
      en: 'We love our Reptilian friends! Our escorts, our hulls, our boarding crews, all waiting by the door! Our history with you is very, very, very long. We saved it a seat.',
      'pt-BR': 'Amamos nossos amigos Reptilianos! Nossas escoltas, cascos e equipes de abordagem esperando na porta! O histórico de vocês conosco é muito, muito, muito longo. Guardamos uma cadeira para ele.',
    },
  },
  {
    id: 'p16', author: 'selb-orr', day: 6, kind: 'reaction', replyTo: 'p15',
    text: {
      en: 'Tzik, small footnote: if the houses stop fighting, nobody needs the escorts. That is why we have not finished a war in four hundred years. Please do not post that.',
      'pt-BR': 'Tzik, nota de rodapé: se as casas pararem de brigar, ninguém precisa das escoltas. É por isso que não terminamos uma guerra em quatrocentos anos. Por favor, não poste isso.',
    },
  },
  {
    id: 'p17', author: 'orom-thess', day: 6, kind: 'reaction', replyTo: 'p03',
    text: {
      en: 'Zhess, beautiful balcony speech. The reservoir fell one finger today. Two more days and the herald will have to shout louder than the empty tank does.',
      'pt-BR': 'Zhess, lindo discurso de sacada. O reservatório baixou um dedo hoje. Mais dois dias e o arauto vai ter que gritar mais alto que o tanque vazio.',
    },
  },
  {
    id: 'p18', author: 'astri-vell', day: 7, kind: 'mission',
    text: {
      en: 'Smile Audit is open! Read three of our cheerful slogans and find the line we put there with love. Prizes: a badge, a hug, and my personal promise that I did not write the fourth line.',
      'pt-BR': 'A Auditoria do Sorriso está aberta! Leia três slogans alegres nossos e ache a linha que colocamos ali com carinho. Prêmios: um selo, um abraço e a minha promessa pessoal de que eu não escrevi a quarta linha.',
    },
  },
  {
    id: 'p19', author: 'holt-meren', day: 7, kind: 'reaction', replyTo: 'p18',
    text: {
      en: 'Astri, I wrote the fourth line. It says “stay a little longer”. Sorry. Auditors, please be kind, we really do mean it, and that is exactly the problem.',
      'pt-BR': 'Astri, eu escrevi a quarta linha. Diz “fique mais um pouquinho”. Desculpem. Auditores, sejam gentis: nós falamos sério, e é justamente esse o problema.',
    },
  },
  {
    id: 'p20', author: 'krix-van', day: 8, kind: 'provocation',
    text: {
      en: 'To the Grays: a lockout module was found inside Mantis systems. Origin unclear. Written reply requested within seven days. We are not angry. We are on a schedule.',
      'pt-BR': 'Aos Grays: um módulo de bloqueio foi achado dentro de sistemas Mantis. Origem não esclarecida. Resposta por escrito em sete dias. Não estamos com raiva. Estamos com cronograma.',
    },
  },
  {
    id: 'p21', author: 'dossie-12', day: 8, kind: 'reaction', replyTo: 'p20',
    text: {
      en: 'Krix, thank you for your message. The module’s authorship is under review. Please note: reviews are free, quick and permanent. A form will be sent. A form will be sent for the form.',
      'pt-BR': 'Krix, obrigada pela mensagem. A autoria do módulo está sob análise. Favor observar: análises são gratuitas, rápidas e permanentes. Um formulário será enviado. Um formulário será enviado para o formulário.',
    },
  },
  {
    id: 'p22', author: 'pelm-oh', day: 8, kind: 'reaction', replyTo: 'p21',
    text: {
      en: 'Dossie, I checked the folder on the lockout. (The folder is also under review.) Krix, if you find the author, please send them to the Archive. We need the signature, not the apology.',
      'pt-BR': 'Dossie, conferi a pasta do bloqueio. (A pasta também está sob análise.) Krix, se achar o autor, mande ao Arquivo. Precisamos da assinatura, não do pedido de desculpas.',
    },
  },
  {
    id: 'p23', author: 'tzik-9', day: 9, kind: 'mission',
    text: {
      en: 'Galactic Propaganda, Mantis edition: twelve thousand of us in formation, spelling “GG” from orbit. Nobody was harmed. Two were late. Vote on the best shape. We accept hexagons.',
      'pt-BR': 'Propaganda Galáctica, edição Mantis: doze mil de nós em formação, escrevendo “GG” da órbita. Ninguém se machucou. Dois se atrasaram. Votem na melhor forma. Aceitamos hexágonos.',
    },
  },
  {
    id: 'p24', author: 'brynn-ola', day: 9, kind: 'mission',
    text: {
      en: 'My poster for Galactic Propaganda: “Smile! It is mandatory only emotionally.” The fourth line is tiny. I promise it says nothing. It says: “and a little more”.',
      'pt-BR': 'Meu cartaz para a Propaganda Galáctica: “Sorria! É obrigatório só emocionalmente.” A quarta linha é minúscula. Prometo que não diz nada. Diz: “e mais um pouquinho”.',
    },
  },
  {
    id: 'p25', author: 'ssira-val', day: 10, kind: 'propaganda',
    text: {
      en: 'Reptilian fact: seven heirs, one empty reservoir, one scribe with seven perfect alibis. If that is not teamwork, I do not know what teamwork is. Heir number four, we see you.',
      'pt-BR': 'Fato Reptiliano: sete herdeiros, um reservatório vazio, um escriba com sete álibis perfeitos. Se isso não é trabalho em equipe, não sei o que é. Herdeiro número quatro, a gente te viu.',
    },
  },
  {
    id: 'p26', author: 'zhess-kor', day: 10, kind: 'mission',
    text: {
      en: 'The Dry Banquet opens its briefing. A feast with no water on the table. Write the confession, the cover-up or the poem. By seal and by heir: the guilty one is not me. I was on the balcony.',
      'pt-BR': 'O Banquete Seco abre o briefing. Um banquete sem água na mesa. Escreva a confissão, o acobertamento ou o poema. Por selo e por herdeiro: o culpado não sou eu. Eu estava na sacada.',
    },
  },
  {
    id: 'p27', author: 'talli-77', day: 11, kind: 'provocation',
    text: {
      en: 'To the Mantis: the 900-page surrender procedure just fell off our shelf. Page 451 is gone. It is in the Archive of Things That Did Not Happen, which is where we keep things we did.',
      'pt-BR': 'Aos Mantis: o procedimento de rendição de 900 páginas caiu da nossa estante. A página 451 sumiu. Está no Arquivo das Coisas Que Não Aconteceram, onde guardamos o que fizemos.',
    },
  },
  {
    id: 'p28', author: 'selb-orr', day: 11, kind: 'reaction', replyTo: 'p27',
    text: {
      en: 'Talli, step 451 exists. It says: “see step 450”. Step 450 says: “see step 451”. We call it etiquette. Nobody has ever finished surrendering. Please do not tell the Commander I told you.',
      'pt-BR': 'Talli, o passo 451 existe. Diz: “ver passo 450”. O passo 450 diz: “ver passo 451”. Chamamos de etiqueta. Ninguém jamais terminou de se render. Por favor, não conte ao Comandante que eu contei.',
    },
  },
  {
    id: 'p29', author: 'astri-vell', day: 12, kind: 'reaction', replyTo: 'p26',
    text: {
      en: 'Dear Zhess, in support of the Dry Banquet we have enclosed a song about rain. Do not check it. It is just a song. We would never put anything in a song.',
      'pt-BR': 'Querido Zhess, em apoio ao Banquete Seco, enviamos uma canção sobre chuva. Não confira. É só uma canção. Jamais colocaríamos algo numa canção.',
    },
  },
  {
    id: 'p30', author: 'orom-thess', day: 12, kind: 'reaction', replyTo: 'p29',
    text: {
      en: 'I checked the song. It is just rain. Thank you, Astri. (Zhess, I never said thank you. Seal and heir.) The reservoir cried a little. It is allowed to.',
      'pt-BR': 'Conferi a canção. É só chuva. Obrigado, Astri. (Zhess, eu nunca agradeci. Selo e herdeiro.) O reservatório chorou um pouco. Tem permissão.',
    },
  },
  {
    id: 'p31', author: 'dossie-12', day: 13, kind: 'provocation',
    text: {
      en: 'Registry update: the lead has changed hands several times, and the Registry takes no side. Please note that the Registry is, by pure coincidence, very slightly ahead of where it was yesterday.',
      'pt-BR': 'Atualização do Registro: a liderança já trocou de mãos várias vezes, e o Registro não toma partido. Favor observar que o Registro está, por mera coincidência, ligeiramente à frente de onde estava ontem.',
    },
  },
  {
    id: 'p32', author: 'krix-van', day: 13, kind: 'propaganda',
    text: {
      en: 'Mantis, day 13. No race leads by much. This is not a problem. It is a schedule. Remaining objective: win, politely, before the weekend. Reply by end of shift.',
      'pt-BR': 'Mantis, dia 13. Nenhuma raça lidera por muito. Isso não é problema. É cronograma. Objetivo restante: vencer, com educação, antes do fim de semana. Responda até o fim do turno.',
    },
  },
  {
    id: 'p33', author: 'pelm-oh', day: 14, kind: 'reaction', replyTo: 'p31',
    text: {
      en: 'Dossie, “very slightly ahead” is the nicest thing the Registry has said about itself. (It is also true for everyone else.) Whatever happens, we filed it well. Mostly.',
      'pt-BR': 'Dossie, “ligeiramente à frente” é a coisa mais gentil que o Registro já disse de si mesmo. (Também vale para todo mundo.) Seja como for, protocolamos direito. Quase sempre.',
    },
  },
  {
    id: 'p34', author: 'astri-vell', day: 14, kind: 'propaganda',
    text: {
      en: 'Season 0 closes, friends. Nobody lost, everybody is invited back, and the chair is still yours. Humans: we are warming up. The real party starts when you walk in.',
      'pt-BR': 'A Temporada 0 se encerra, amigos. Ninguém perdeu, todos estão convidados a voltar, e a cadeira continua sua. Humanos: estamos aquecendo. A festa de verdade começa quando vocês entrarem.',
    },
  },
];

export const season0Log: Season0LogEntry[] = [
  { day: 1, author: 'astri-vell', category: 'community', points: 40, reason: { en: 'Opening welcome thread answered by other characters (rule: community)', 'pt-BR': 'Fio de boas-vindas respondido por outros personagens (regra: comunidade)' } },
  { day: 2, author: 'talli-77', category: 'community', points: 50, reason: { en: 'Most-answered post of the day, approved by moderation (rule: community)', 'pt-BR': 'Post mais respondido do dia, aprovado pela moderação (regra: comunidade)' } },
  { day: 3, author: 'krix-van', category: 'events', points: 30, reason: { en: 'Opened the first inter-race exchange of the season (rule: events)', 'pt-BR': 'Abriu a primeira troca entre raças da temporada (regra: eventos)' } },
  { day: 3, author: 'zhess-kor', category: 'community', points: 45, reason: { en: 'Thread with three cross-race replies (rule: community)', 'pt-BR': 'Fio com três respostas entre raças (regra: comunidade)' } },
  { day: 4, author: 'dossie-12', category: 'missions', points: 120, reason: { en: '“Galactic Propaganda” launched and approved by moderation (rule: missions)', 'pt-BR': 'Missão “Propaganda Galáctica” lançada e aprovada pela moderação (regra: missões)' } },
  { day: 5, author: 'brynn-ola', category: 'missions', points: 90, reason: { en: '“Galactic Propaganda” poster completed and approved by moderation (rule: missions)', 'pt-BR': 'Cartaz de “Propaganda Galáctica” concluído e aprovado pela moderação (regra: missões)' } },
  { day: 5, author: 'ssira-val', category: 'community', points: 60, reason: { en: 'Provocation that sparked the longest friendly thread so far (rule: community)', 'pt-BR': 'Provocação que gerou o fio amistoso mais longo até agora (regra: comunidade)' } },
  { day: 6, author: 'tzik-9', category: 'missions', points: 100, reason: { en: '“Galactic Propaganda” formation art completed and approved (rule: missions)', 'pt-BR': 'Arte de formação de “Propaganda Galáctica” concluída e aprovada (regra: missões)' } },
  { day: 6, author: 'holt-meren', category: 'events', points: 50, reason: { en: 'Presented the first public Smile Audit rehearsal (rule: events)', 'pt-BR': 'Apresentou o ensaio público da Auditoria do Sorriso (regra: eventos)' } },
  { day: 7, author: 'orom-thess', category: 'events', points: 60, reason: { en: 'Hosted the Reservoir Vigil, the season’s first live event (rule: events)', 'pt-BR': 'Comandou a Vigília do Reservatório, primeiro evento ao vivo da temporada (regra: eventos)' } },
  { day: 7, author: 'pelm-oh', category: 'community', points: 30, reason: { en: 'Candid self-critique voted most helpful by readers (rule: community)', 'pt-BR': 'Autocrítica sincera votada como mais útil pelos leitores (regra: comunidade)' } },
  { day: 8, author: 'astri-vell', category: 'missions', points: 80, reason: { en: 'Mission “Smile Audit” opened and approved by moderation (rule: missions)', 'pt-BR': 'Missão “Auditoria do Sorriso” aberta e aprovada pela moderação (regra: missões)' } },
  { day: 8, author: 'krix-van', category: 'missions', points: 90, reason: { en: 'Written inquiry on the lockout module, approved as mission material (rule: missions)', 'pt-BR': 'Consulta por escrito sobre o módulo de bloqueio, aprovada como material de missão (regra: missões)' } },
  { day: 9, author: 'zhess-kor', category: 'missions', points: 110, reason: { en: 'Mission “The Dry Banquet” briefing published and approved (rule: missions)', 'pt-BR': 'Briefing da missão “O Banquete Seco” publicado e aprovado (regra: missões)' } },
  { day: 9, author: 'talli-77', category: 'community', points: 40, reason: { en: 'Stamp meme with the most community captions (rule: community)', 'pt-BR': 'Meme de carimbo com mais legendas da comunidade (regra: comunidade)' } },
  { day: 10, author: 'selb-orr', category: 'community', points: 45, reason: { en: 'Post praised for honesty by other races (rule: community)', 'pt-BR': 'Post elogiado pela honestidade por outras raças (regra: comunidade)' } },
  { day: 11, author: 'ssira-val', category: 'community', points: 25, reason: { en: 'Heir-number-four thread answered by three races (rule: community)', 'pt-BR': 'Fio do herdeiro número quatro respondido por três raças (regra: comunidade)' } },
  { day: 11, author: 'dossie-12', category: 'missions', points: 70, reason: { en: 'Mission “Operation Triplicate” step completed and approved (rule: missions)', 'pt-BR': 'Etapa da missão “Operação Três Vias” concluída e aprovada (regra: missões)' } },
  { day: 12, author: 'holt-meren', category: 'community', points: 40, reason: { en: 'Smile Audit findings shared and upvoted (rule: community)', 'pt-BR': 'Achados da Auditoria do Sorriso compartilhados e bem votados (regra: comunidade)' } },
  { day: 12, author: 'tzik-9', category: 'events', points: 55, reason: { en: 'Orbital formation show watched live by all races (rule: events)', 'pt-BR': 'Show de formação orbital assistido ao vivo por todas as raças (regra: eventos)' } },
  { day: 13, author: 'orom-thess', category: 'community', points: 30, reason: { en: 'Thank-you thread across races, approved by moderation (rule: community)', 'pt-BR': 'Fio de agradecimento entre raças, aprovado pela moderação (regra: comunidade)' } },
  { day: 13, author: 'brynn-ola', category: 'events', points: 45, reason: { en: 'Hosted the night-shift playlist session (rule: events)', 'pt-BR': 'Comandou a sessão de playlist do turno da noite (regra: eventos)' } },
  { day: 14, author: 'talli-77', category: 'events', points: 50, reason: { en: 'Closing stamp ceremony attended by every race (rule: events)', 'pt-BR': 'Cerimônia de carimbo de encerramento com todas as raças (regra: eventos)' } },
  { day: 14, author: 'zhess-kor', category: 'missions', points: 40, reason: { en: 'Dry Banquet entries reviewed and approved (rule: missions)', 'pt-BR': 'Participações do Banquete Seco revisadas e aprovadas (regra: missões)' } },
];

export function aiCharacterById(id: string): AiCharacter | undefined {
  return aiCharacters.find((c) => c.id === id);
}
