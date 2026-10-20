import type { Faction, FactionId } from './types';

export const factions: Faction[] = [
  {
    id: 'vhal-ett',
    name: 'VHAL-ETT',
    code: 'VH-07',
    art: [
      {
        src: '/images/characters/vhal-ett.webp',
        focus: '50% 18%',
        alt: { en: 'A grey Vhal-Ett with a large head and black eyes, in a dark suit with an ID badge and a shoulder bag, holding a tablet.', 'pt-BR': 'Um Vhal-Ett cinzento de cabeça grande e olhos pretos, de terno escuro com crachá e bolsa a tiracolo, segurando um tablet.' },
      },
    ],
    sheet: {
      expressions: ['/images/characters/vhal-ett-expr-1.webp', '/images/characters/vhal-ett-expr-2.webp', '/images/characters/vhal-ett-expr-3.webp', '/images/characters/vhal-ett-expr-4.webp'],
      turnaround: ['/images/characters/vhal-ett-turn-1.webp', '/images/characters/vhal-ett-turn-2.webp', '/images/characters/vhal-ett-turn-3.webp', '/images/characters/vhal-ett-turn-4.webp'],
    },
    quote: { en: 'Procedure is protection.', 'pt-BR': 'Procedimento é proteção.' },
    traits: [
      { en: 'Bureaucratic', 'pt-BR': 'Burocráticos' },
      { en: 'Methodical', 'pt-BR': 'Metódicos' },
      { en: 'Intelligent', 'pt-BR': 'Inteligentes' },
      { en: 'Sarcastic', 'pt-BR': 'Sarcásticos' },
      { en: 'Persistent', 'pt-BR': 'Persistentes' },
    ],
    memes: [
      { en: 'Abductions that require a signed form first', 'pt-BR': 'Abduções que exigem formulário assinado' },
      { en: 'Absurd protocols and galactic rubber stamps', 'pt-BR': 'Protocolos absurdos e carimbos galácticos' },
      { en: 'Aliens waiting for authorization to invade Earth', 'pt-BR': 'Alienígenas aguardando autorização para invadir a Terra' },
      { en: 'Your seed phrase? Please submit it in triplicate. (Never do this.)', 'pt-BR': 'Sua seed phrase? Envie em três vias. (Nunca faça isso.)' },
    ],
    title: { en: 'The Grey Scribes', 'pt-BR': 'Os Cinzentos — Os Escrivães' },
    homeworld: 'Hevra',
    height: '1.2–1.5 m',
    palette: { primary: '#A7ADB5', secondary: '#24272D', accent: '#E7E9EC' },
    mood: { en: 'Cold · bureaucratic · clinical', 'pt-BR': 'Frio · burocrático · clínico' },
    tagline: {
      en: 'Need your DNA. Will require it in triplicate.',
      'pt-BR': 'Precisam do seu DNA. Em três vias, por favor.',
    },
    appearance: {
      en: 'Small grey humanoids with oversized heads, enormous black almond eyes, thin bodies, and the facial range of a filing cabinet.',
      'pt-BR': 'Humanoides cinzentos e baixos, cabeças enormes, olhos pretos amendoados gigantes, corpos finos e a expressividade de um arquivo de aço.',
    },
    personality: {
      en: 'Bureaucratic, methodical, pessimistic, and excessively polite. Every decision passes through seven committees and one long silence.',
      'pt-BR': 'Burocráticos, metódicos, pessimistas e excessivamente educados. Toda decisão passa por sete comitês e um longo silêncio.',
    },
    motivation: {
      en: 'Generations of cloning have left their genome dangerously uniform. Without fresh genetic diversity, the Vhal-Ett will archive themselves out of existence.',
      'pt-BR': 'Gerações de clonagem deixaram seu genoma perigosamente uniforme. Sem nova diversidade genética, os Vhal-Ett vão se arquivar até a extinção.',
    },
    comedy: {
      en: 'Forms, stamps, telepathic memoranda, impossible protocols, and the mandatory seven-second archival pause before answering anything.',
      'pt-BR': 'Formulários, carimbos, memorandos telepáticos, protocolos impossíveis e a pausa arquivística obrigatória de sete segundos antes de qualquer resposta.',
    },
    contradiction: {
      en: 'They need chaos to survive — and have filed 40,000 complaints about it.',
      'pt-BR': 'Precisam do caos para sobreviver — e já protocolaram 40.000 reclamações sobre ele.',
    },
    claimBasis: { en: 'Biological claim', 'pt-BR': 'Reivindicação biológica' },
    leader: {
      name: { en: 'Sete', 'pt-BR': 'Sete' },
      role: { en: 'Auditor of the Central Archive', 'pt-BR': 'Auditor do Arquivo Central' },
      description: {
        en: 'The only civil servant in recorded history who actually read the entire contract. Somewhere on page 4,812, there is a clause that changes everything.',
        'pt-BR': 'O único servidor público da história registrada que de fato leu o contrato inteiro. Em algum ponto da página 4.812, há uma cláusula que muda tudo.',
      },
      quote: {
        en: '“…………… Your request has been received. It will now be ignored in the order it was received.”',
        'pt-BR': '“…………… Seu pedido foi recebido. Ele será ignorado na ordem em que chegou.”',
      },
    },
    timeline: [
      { year: '−3,400', text: { en: 'First successful clone of the Hevran Chancellor. Also the last original thought.', 'pt-BR': 'Primeiro clone bem-sucedido do Chanceler de Hevra. Também o último pensamento original.' } },
      { year: '1947', text: { en: 'Survey craft lost over Earth. Incident report still pending approval.', 'pt-BR': 'Nave de pesquisa perdida sobre a Terra. Relatório do incidente ainda aguardando aprovação.' } },
      { year: '2049', text: { en: 'Files Census Claim #1 within 0.4 seconds of the signal. Form was filled out in 1952.', 'pt-BR': 'Protocola a Reivindicação nº 1 do Censo 0,4 segundo após o sinal. O formulário foi preenchido em 1952.' } },
    ],
  },
  {
    id: 'ilvani',
    name: 'ILVANI',
    code: 'IL-01',
    art: [
      {
        src: '/images/characters/ilvani.webp',
        focus: '50% 18%',
        alt: { en: 'A tall Ilvani with long platinum hair and glowing blue eyes, in a white and silver suit and cape, offering an open hand.', 'pt-BR': 'Um Ilvani alto de longos cabelos platinados e olhos azuis brilhantes, em traje branco e prata com capa, estendendo a mão aberta.' },
      },
    ],
    sheet: {
      expressions: ['/images/characters/ilvani-expr-1.webp', '/images/characters/ilvani-expr-2.webp', '/images/characters/ilvani-expr-3.webp', '/images/characters/ilvani-expr-4.webp'],
      turnaround: ['/images/characters/ilvani-turn-1.webp', '/images/characters/ilvani-turn-2.webp', '/images/characters/ilvani-turn-3.webp', '/images/characters/ilvani-turn-4.webp'],
    },
    quote: { en: 'A better world is possible.', 'pt-BR': 'Um mundo melhor é possível.' },
    traits: [
      { en: 'Visionary', 'pt-BR': 'Visionários' },
      { en: 'Empathetic', 'pt-BR': 'Empáticos' },
      { en: 'Persuasive', 'pt-BR': 'Persuasivos' },
      { en: 'Paternalistic', 'pt-BR': 'Paternalistas' },
      { en: 'Idealistic', 'pt-BR': 'Idealistas' },
    ],
    memes: [
      { en: 'Intergalactic toxic positivity', 'pt-BR': 'Positividade tóxica intergaláctica' },
      { en: 'Peace summits where the outcome was decided last week', 'pt-BR': 'Reuniões de paz com o resultado decidido na semana passada' },
      { en: '“Raise your frequency” — and quietly lower your options', 'pt-BR': '“Eleve sua frequência” — e, discretamente, perca suas opções' },
      { en: 'Good vibes only. Bad vibes will be gently relocated.', 'pt-BR': 'Só boas vibrações. As más serão gentilmente realocadas.' },
    ],
    title: { en: 'The Shepherds', 'pt-BR': 'Os Nórdicos — Os Pastores' },
    homeworld: 'Maia-Prime',
    height: '1.8–2.2 m',
    palette: { primary: '#B8D9F2', secondary: '#13325f', accent: '#F4F6F8' },
    mood: { en: 'Serene · beautiful · unsettling', 'pt-BR': 'Serenos · belos · perturbadores' },
    tagline: {
      en: 'Peace on Earth. Mandatory. With a smile.',
      'pt-BR': 'Paz na Terra. Obrigatória. Com um sorriso.',
    },
    appearance: {
      en: 'Tall, elegant humanoids with platinum hair, pale skin, symmetrical faces, and smiles that hold one beat too long.',
      'pt-BR': 'Humanoides altos e elegantes, cabelos platinados, pele pálida, rostos simétricos e sorrisos que duram um segundo a mais.',
    },
    personality: {
      en: 'Warm, persuasive, paternalistic, and obsessed with harmony. They never raise their voice. They never need to.',
      'pt-BR': 'Calorosos, persuasivos, paternalistas e obcecados por harmonia. Nunca levantam a voz. Nunca precisam.',
    },
    motivation: {
      en: 'To govern humanity under the pretext of protecting it. Their Garden Plan promises peace through carefully cultivated consensus. Weeds are, of course, removed.',
      'pt-BR': 'Governar a humanidade sob o pretexto de protegê-la. O Plano Jardim promete paz por meio de um consenso cuidadosamente cultivado. As ervas daninhas, naturalmente, são removidas.',
    },
    comedy: {
      en: 'Toxic positivity, smiling propaganda, wellness retreats you cannot leave, and manipulation presented as a hug.',
      'pt-BR': 'Positividade tóxica, propaganda sorridente, retiros de bem-estar dos quais não se pode sair e manipulação apresentada como abraço.',
    },
    contradiction: {
      en: 'They promise freedom from conflict — by removing the option to disagree.',
      'pt-BR': 'Prometem liberdade do conflito — removendo a opção de discordar.',
    },
    claimBasis: { en: 'Historical claim', 'pt-BR': 'Reivindicação histórica' },
    leader: {
      name: { en: 'Sael', 'pt-BR': 'Sael' },
      role: { en: 'Former Gardener, now Defector', 'pt-BR': 'Ex-Jardineiro, agora Desertor' },
      description: {
        en: 'Sael helped design the Garden Plan, then read the appendix. Now on the run, Sael knows exactly what the Shepherds intend to prune.',
        'pt-BR': 'Sael ajudou a projetar o Plano Jardim e depois leu o apêndice. Agora em fuga, Sael sabe exatamente o que os Pastores pretendem podar.',
      },
      quote: {
        en: '“They will tell you everything is fine. That is the first sign.”',
        'pt-BR': '“Eles vão dizer que está tudo bem. Esse é o primeiro sinal.”',
      },
    },
    timeline: [
      { year: '−12,000', text: { en: 'Claim to have “gently guided” early human agriculture. Humans have no record of agreeing.', 'pt-BR': 'Afirmam ter “guiado gentilmente” a agricultura humana primitiva. Os humanos não têm registro de terem concordado.' } },
      { year: '1950s', text: { en: 'Several visits to remote farms. Every witness described them as “very nice, actually.”', 'pt-BR': 'Várias visitas a fazendas remotas. Todas as testemunhas os descreveram como “muito simpáticos, na verdade.”' } },
      { year: '2049', text: { en: 'Submit the Garden Plan to the Census, printed on recycled sunlight.', 'pt-BR': 'Submetem o Plano Jardim ao Censo, impresso em luz solar reciclada.' } },
    ],
  },
  {
    id: 'sazhi',
    name: 'SAZHI',
    code: 'SZ-99',
    art: [
      {
        src: '/images/characters/sazhi.webp',
        focus: '50% 18%',
        alt: { en: 'A reptilian Sazhi sovereign with green scales and yellow eyes, in red-and-gold armor and a long red cape, tail curled behind.', 'pt-BR': 'Um soberano reptiliano Sazhi de escamas verdes e olhos amarelos, em armadura vermelha e dourada e longa capa vermelha, com a cauda enrolada atrás.' },
      },
    ],
    sheet: {
      expressions: ['/images/characters/sazhi-expr-1.webp', '/images/characters/sazhi-expr-2.webp', '/images/characters/sazhi-expr-3.webp', '/images/characters/sazhi-expr-4.webp'],
      turnaround: ['/images/characters/sazhi-turn-1.webp', '/images/characters/sazhi-turn-2.webp', '/images/characters/sazhi-turn-3.webp'],
    },
    quote: { en: 'Control the flow, control the future.', 'pt-BR': 'Controle o fluxo, controle o futuro.' },
    traits: [
      { en: 'Strategic', 'pt-BR': 'Estratégicos' },
      { en: 'Ambitious', 'pt-BR': 'Ambiciosos' },
      { en: 'Patient', 'pt-BR': 'Pacientes' },
      { en: 'Calculating', 'pt-BR': 'Calculistas' },
      { en: 'Cruel', 'pt-BR': 'Cruéis' },
    ],
    memes: [
      { en: 'Conspiracies so absurd they must be true', 'pt-BR': 'Conspirações tão absurdas que só podem ser verdade' },
      { en: 'Secret agreements signed in invisible ink', 'pt-BR': 'Acordos secretos assinados com tinta invisível' },
      { en: 'Incompetent heirs and their “strategic” mistakes', 'pt-BR': 'Herdeiros incompetentes e seus erros “estratégicos”' },
      { en: 'Human disguises absolutely nobody believes', 'pt-BR': 'Disfarces humanos em que absolutamente ninguém acredita' },
    ],
    title: { en: 'The Sazhath Dynasty', 'pt-BR': 'Os Reptilianos — A Dinastia de Sazhath' },
    homeworld: 'Thaxis',
    height: '2–2.5 m',
    palette: { primary: '#8ea35a', secondary: '#4a140e', accent: '#D7A64B' },
    mood: { en: 'Imperial · ancient · calculating', 'pt-BR': 'Imperial · ancestral · calculista' },
    tagline: {
      en: 'Thaxis is drying up. Your oceans look delicious.',
      'pt-BR': 'Thaxis está secando. Seus oceanos parecem deliciosos.',
    },
    appearance: {
      en: 'Tall reptilian aristocrats with olive scales, vertical pupils, long tails, and robes heavier than most governments.',
      'pt-BR': 'Aristocratas reptilianos altos, escamas verde-oliva, pupilas verticais, caudas longas e mantos mais pesados que a maioria dos governos.',
    },
    personality: {
      en: 'Strategic, cultured, patient, cynical, and suspicious of everyone — especially their own family.',
      'pt-BR': 'Estratégicos, cultos, pacientes, cínicos e desconfiados de todos — especialmente da própria família.',
    },
    motivation: {
      en: 'A planet-wide drought is shrinking the empire. Earth’s oceans could sustain the Dynasty for ten thousand years of comfortable decline.',
      'pt-BR': 'Uma seca planetária está encolhendo o império. Os oceanos da Terra sustentariam a Dinastia por dez mil anos de confortável decadência.',
    },
    comedy: {
      en: 'Secret agreements, incompetent heirs, conspiracies inside conspiracies, and flawless plans ruined by excessive confidence.',
      'pt-BR': 'Acordos secretos, herdeiros incompetentes, conspirações dentro de conspirações e planos perfeitos arruinados por excesso de confiança.',
    },
    contradiction: {
      en: 'Masters of the long game who keep losing to their own nephews.',
      'pt-BR': 'Mestres do jogo de longo prazo que vivem perdendo para os próprios sobrinhos.',
    },
    claimBasis: { en: 'Strategic claim', 'pt-BR': 'Reivindicação estratégica' },
    leader: {
      name: { en: 'The Sovereign', 'pt-BR': 'O Soberano' },
      role: { en: 'Ruler of the Sazhath Dynasty', 'pt-BR': 'Governante da Dinastia de Sazhath' },
      description: {
        en: 'Four hundred years on the Obsidian Throne, eleven assassination attempts survived, and one heir who keeps accidentally declaring war.',
        'pt-BR': 'Quatrocentos anos no Trono de Obsidiana, onze tentativas de assassinato sobrevividas e um herdeiro que vive declarando guerra sem querer.',
      },
      quote: {
        en: '“We do not conquer. We acquire. Conquest is so… loud.”',
        'pt-BR': '“Nós não conquistamos. Adquirimos. Conquista é tão… barulhenta.”',
      },
    },
    timeline: [
      { year: '−8,000', text: { en: 'A Sazhath prince “borrows” a small Earth sea. It has not been returned.', 'pt-BR': 'Um príncipe Sazhath “pega emprestado” um pequeno mar da Terra. Nunca foi devolvido.' } },
      { year: '1776', text: { en: 'Signs a secret treaty with a human empire. The empire does not survive the paperwork.', 'pt-BR': 'Assina um tratado secreto com um império humano. O império não sobrevive à papelada.' } },
      { year: '2049', text: { en: 'Files a Census claim citing “ancestral swimming rights.”', 'pt-BR': 'Protocola reivindicação no Censo citando “direitos ancestrais de natação.”' } },
    ],
  },
  {
    id: 'xhalen-kthrix',
    name: 'XHALEN-KTHRIX',
    code: 'XK-00',
    art: [
      {
        src: '/images/characters/xhalen-kthrix.webp',
        focus: '50% 18%',
        alt: { en: 'A tall mantis-like Xhalen-Kthrix with large green compound eyes and antennae, in segmented black armor and a long coat.', 'pt-BR': 'Um Xhalen-Kthrix alto, semelhante a um louva-a-deus, com grandes olhos compostos verdes e antenas, em armadura preta segmentada e casaco longo.' },
      },
    ],
    sheet: {
      expressions: ['/images/characters/xhalen-kthrix-expr-1.webp', '/images/characters/xhalen-kthrix-expr-2.webp', '/images/characters/xhalen-kthrix-expr-3.webp', '/images/characters/xhalen-kthrix-expr-4.webp'],
      turnaround: ['/images/characters/xhalen-kthrix-turn-1.webp', '/images/characters/xhalen-kthrix-turn-2.webp', '/images/characters/xhalen-kthrix-turn-3.webp', '/images/characters/xhalen-kthrix-turn-4.webp'],
    },
    quote: { en: 'Discipline is freedom.', 'pt-BR': 'Disciplina é liberdade.' },
    traits: [
      { en: 'Discipline', 'pt-BR': 'Disciplina' },
      { en: 'Precision', 'pt-BR': 'Precisão' },
      { en: 'Efficient', 'pt-BR': 'Eficientes' },
      { en: 'Ruthless', 'pt-BR': 'Impiedosos' },
      { en: 'Loyal', 'pt-BR': 'Leais' },
    ],
    memes: [
      { en: 'Military contracts with a very long fine print', 'pt-BR': 'Contratos militares com letras miúdas muito longas' },
      { en: 'Formal threats on official letterhead', 'pt-BR': 'Ameaças formais em papel timbrado' },
      { en: 'War meetings that could have been an email', 'pt-BR': 'Reuniões de guerra que poderiam ter sido um e-mail' },
      { en: 'A performance review is required before exterminating anyone', 'pt-BR': 'Avaliação de desempenho obrigatória antes de exterminar alguém' },
    ],
    title: { en: 'The Commanders', 'pt-BR': 'Os Mantis — Os Comandantes' },
    homeworld: 'Xhalen',
    height: '≈ 2.3 m',
    palette: { primary: '#93b360', secondary: '#16220f', accent: '#cfe0b0' },
    mood: { en: 'Military · disciplined · threatening', 'pt-BR': 'Militares · disciplinados · ameaçadores' },
    tagline: {
      en: 'Selling weapons to all four sides. Including theirs.',
      'pt-BR': 'Vendem armas para os quatro lados. Inclusive o deles.',
    },
    appearance: {
      en: 'Towering insectoids with grey-green exoskeletons, triangular heads, compound eyes, and long arms folded at perfect regulation angles.',
      'pt-BR': 'Insectoides imponentes, exoesqueleto verde-acinzentado, cabeças triangulares, olhos compostos e braços longos dobrados em ângulos regulamentares.',
    },
    personality: {
      en: 'Disciplined, impassive, efficient, and frighteningly polite. They will apologise for the inconvenience of your defeat.',
      'pt-BR': 'Disciplinados, impassíveis, eficientes e assustadoramente educados. Pedirão desculpas pelo incômodo da sua derrota.',
    },
    motivation: {
      en: 'To turn the war for Earth into a weapons test and a profitable business, selling military solutions to every party in the dispute.',
      'pt-BR': 'Transformar a guerra pela Terra em um teste de armamentos e um negócio lucrativo, vendendo soluções militares a todas as partes da disputa.',
    },
    comedy: {
      en: 'Military formalities, courteous threats, perfectly scheduled warfare, and a 900-page procedure for surrendering correctly.',
      'pt-BR': 'Formalidades militares, ameaças corteses, guerras com hora marcada e um procedimento de 900 páginas para se render corretamente.',
    },
    contradiction: {
      en: 'They claim to want victory — but a finished war is terrible for business.',
      'pt-BR': 'Dizem querer a vitória — mas uma guerra encerrada é péssima para os negócios.',
    },
    claimBasis: { en: 'Contractual claim', 'pt-BR': 'Reivindicação contratual' },
    leader: {
      name: { en: 'The Commander', 'pt-BR': 'O Comandante' },
      role: { en: 'Supreme Field Officer, Xhalen Expeditionary Corps', 'pt-BR': 'Oficial Supremo de Campo, Corpo Expedicionário de Xhalen' },
      description: {
        en: 'Undefeated in 312 campaigns. Considers Dora the first worthy opponent in a century — and has sent her a formal letter saying so.',
        'pt-BR': 'Invicto em 312 campanhas. Considera Dora a primeira oponente digna em um século — e enviou a ela uma carta formal dizendo isso.',
      },
      quote: {
        en: '“Please remain calm. Your annihilation has been scheduled for Thursday.”',
        'pt-BR': '“Por favor, mantenha a calma. Sua aniquilação foi agendada para quinta-feira.”',
      },
    },
    timeline: [
      { year: '−500', text: { en: 'Sell identical fleets to both sides of the Thaxis Civil War. Both lose. Xhalen wins.', 'pt-BR': 'Vendem frotas idênticas aos dois lados da Guerra Civil de Thaxis. Ambos perdem. Xhalen vence.' } },
      { year: '1983', text: { en: 'Observe a human arms race with professional admiration.', 'pt-BR': 'Observam uma corrida armamentista humana com admiração profissional.' } },
      { year: '2049', text: { en: 'Claim Earth under a 400-year-old leasing contract nobody else remembers signing.', 'pt-BR': 'Reivindicam a Terra com base num contrato de arrendamento de 400 anos que ninguém lembra de ter assinado.' } },
    ],
  },
];

export const factionById = (id: string): Faction | undefined => factions.find((f) => f.id === id);

export const factionIds: FactionId[] = factions.map((f) => f.id);
