import type { Localized } from './types';

/**
 * Spoken introductions for the nine main characters, to be recorded with ElevenLabs.
 * Written to be heard: short sentences, punctuation that guides the reading, no acronyms.
 * Names are the public ones approved on 2026-10-22; ids are the legacy image-file ids.
 * Everything here is PROVISIONAL until the owner approves it.
 */

export interface CharacterVoice {
  /** id interno do arquivo de imagem: 'vhal-ett' | 'ilvani' | 'sazhi' | 'xhalen-kthrix' | 'dora' | 'rui' | 'livia' | 'julio' | 'tati' */
  id: string;
  name: string;
  /** Uma linha: quem é, para o título do balão. */
  role: Localized;
  /** O monólogo falado, 60 a 90 palavras por idioma (30 a 40 segundos), primeira pessoa. */
  line: Localized;
  /** Direção de voz para o ElevenLabs, em inglês: idade aparente, timbre, ritmo, emoção, sotaque. */
  voiceDirection: string;
}

export const voices: CharacterVoice[] = [
  {
    id: 'vhal-ett',
    name: 'VELLUM',
    role: {
      en: 'Gray supervisor. Keeper of the forms.',
      'pt-BR': 'Supervisora Gray. Guardiã dos formulários.',
    },
    line: {
      en: 'Good morning. I am VELLUM, supervisor of Sete. The Grays need genetic diversity. You have plenty. We call that an opportunity. You call it chaos, and we have already filed forty thousand complaints about it. If we win, Earth will be archived, organized and, technically, intact. Nobody will be hurt on purpose. Everybody will be remembered. Now, the mandatory pause of seven seconds. … … … Concluded. Choose the Grays. The form is in triplicate, and the third copy is yours.',
      'pt-BR': 'Bom dia. Eu sou VELLUM, supervisora de Sete. Os Grays precisam de diversidade genética. Vocês têm de sobra. Chamamos isso de oportunidade. Vocês chamam de caos, e nós já protocolamos quarenta mil reclamações sobre ele. Se ganharmos, a Terra será arquivada, organizada e, tecnicamente, intacta. Ninguém será machucado de propósito. Todos serão lembrados. Agora, a pausa regulamentar de sete segundos. … … … Encerrada. Escolha os Grays. O formulário está em três vias, e a terceira é sua.',
    },
    voiceDirection:
      'Adult female, ageless, thin and precise voice, slightly nasal and dry. Flat, courteous, deadpan delivery, almost no emotion, like a clerk reading a regulation aloud. Slow, even pace with clean consonants. Enumerations spoken as if ticking boxes. Hold a long, completely silent beat at the ellipses (about seven seconds in the final edit). Neutral accent, no regional color.',
  },
  {
    id: 'ilvani',
    name: 'AUREL',
    role: {
      en: 'Nordic envoy. Host of the Garden Plan.',
      'pt-BR': 'Enviado nórdico. Anfitrião do Plano Jardim.',
    },
    line: {
      en: 'Hello, dear one. I’m so glad you came. I am AUREL, and we, the Nordics, only want what’s best for you. A better world is possible, and we already have the music, the table and the dessert. Earth would be one big party, with a seat for everyone who agrees. Yes, the weeds leave the garden. But so gently that nobody complains. Come as you are. Stay for good. We’re saving your seat. Actually, we saved it already.',
      'pt-BR': 'Olá, querido. Que bom que você chegou. Eu sou AUREL, e nós, os Nórdicos, só queremos o seu bem. Um mundo melhor é possível, e nós já temos a música, a mesa e a sobremesa. A Terra seria uma grande festa, com lugar para todo mundo que concorda. Sim, as ervas daninhas saem do jardim. Mas com tanto carinho que ninguém reclama. Venha como está. Fique de vez. Nós guardamos o seu lugar. Aliás, já guardamos.',
    },
    voiceDirection:
      'Adult male, early thirties in appearance, warm baritone, smooth and velvety, close to the microphone. Gentle, intimate, affectionate delivery with a soft smile in the voice. Unhurried, melodic pace, tender pauses. Warmth stays perfectly constant, which is the unsettling part: the kindness never wavers, even on the line about the weeds. Slight transatlantic, calm Scandinavian-leaning lilt in the English.',
  },
  {
    id: 'sazhi',
    name: 'SAZAR',
    role: {
      en: 'The Sovereign of the Dynasty of Sazhath.',
      'pt-BR': 'O Soberano da Dinastia de Sazhath.',
    },
    line: {
      en: 'I am Sazar, Sovereign of the Dynasty of Sazhath. Listen closely, for I speak once. Thaxis is drying, and Earth still has oceans. We do not seize rivers. We inherit them, with a seal and an heir. You call water a resource. We call it a duty. My nephews believe they will inherit the throne. A puddle also believes it is a river. Humans are brief, but they will be useful. Choose the Dynasty. Rivers remember who kept them.',
      'pt-BR': 'Eu sou Sazar, o Soberano da Dinastia de Sazhath. Ouça com atenção, pois falo uma vez. Thaxis está secando, e a Terra ainda tem oceanos. Nós não tomamos rios. Nós os herdamos, com selo e herdeiro. Vocês chamam a água de recurso. Nós a chamamos de dever. Meus sobrinhos acham que herdarão o trono. Uma poça também acha que é rio. Os humanos são breves, mas serão úteis. Escolham a Dinastia. Os rios lembram de quem cuidou deles.',
    },
    voiceDirection:
      'Adult male, ancient and regal, deep resonant bass with a faint dry rasp. Very slow, majestic pace, long pauses between sentences, every phrase landing like a verdict. Cold elegance, quiet contempt on the lines about the nephews and humans, never shouting. Slightly hissed sibilants, subtle. Formal, theatrical, old-world accent with no specific country.',
  },
  {
    id: 'xhalen-kthrix',
    name: 'VEX',
    role: {
      en: 'Mantis Commander. Contractor of wars.',
      'pt-BR': 'Comandante Mantis. Empreiteiro de guerras.',
    },
    line: {
      en: 'VEX. Commander of the Mantis. Listen. We want Earth under contract. No end date. I sell security. I sell to every side. I call it neutrality. Humans: average performance. Potential: acceptable. One exception. Dora. A worthy opponent. I would rather have a long war with her than a quick victory. That is not in the minutes. Victory is an inconvenient state. Choose the Mantis. Sign here. We keep our word. In writing. You have until the end of this sentence.',
      'pt-BR': 'VEX. Comandante dos Mantis. Ouça. Queremos a Terra sob contrato. Sem prazo. Eu vendo segurança. Vendo para todos os lados. Chamo isso de neutralidade. Humanos: desempenho mediano. Potencial: aceitável. Uma exceção. Dora. Oponente digna. Prefiro uma guerra longa com ela a uma vitória rápida. Isso não consta em ata. Vitória é um estado inconveniente. Escolha os Mantis. Assine aqui. Nós cumprimos a palavra. Por escrito. Você tem até o fim desta frase.',
    },
    voiceDirection:
      'Adult male, military bearing, hard clipped voice with a faint metallic edge, mid-low register. Fast, clipped staccato: short commands, hard stops after each sentence, no filler. Impassive and terrifyingly polite, like a formal threat read from a contract. A flicker of real respect when saying Dora, one half-beat softer, then back to ice. Neutral drill-sergeant accent, no regional color.',
  },
  {
    id: 'dora',
    name: 'Dora',
    role: {
      en: 'Leader of the Resistance. Counts the votes.',
      'pt-BR': 'Líder da Resistência. Conta os votos.',
    },
    line: {
      en: 'Hi, I’m Dora, from Fortaleza, Brazil. Twenty-eight years old, zero patience for fine print. We’re the Resistance. And listen: we’re not a team. We’re the ones counting the votes. All four races want Earth, and none of them is the official villain. You choose. I read the whole Census contract, and nobody asked Earth if it gets a vote. They think we’re just a species. We’re a problem. Choose carefully. I’m counting.',
      'pt-BR': 'Oi, eu sou a Dora, de Fortaleza. Vinte e oito anos, zero paciência com letra miúda. A gente é a Resistência. E presta atenção: não somos um time. Somos quem conta os votos. As quatro raças querem a Terra, e nenhuma é a vilã oficial, visse? Quem escolhe é você. Eu li o contrato do Censo inteiro, e ninguém perguntou à Terra se ela vota. Eles acham que somos só uma espécie. Somos um problema. Escolhe direito, que eu estou contando.',
    },
    voiceDirection:
      'Young adult female, 28, warm mid-range voice with a little grit. Direct, quick, conversational, amused and sarcastic, with real empathy underneath, like talking to a friend across a table. Natural rhythm with playful stress. Brazilian speaker: light northeastern (Fortaleza) lilt in Portuguese; in English, a light Brazilian accent. Slightly slower and heavier on the line about being a problem.',
  },
  {
    id: 'rui',
    name: 'Ray',
    role: {
      en: 'The Hacker of the Resistance.',
      'pt-BR': 'O Hacker da Resistência.',
    },
    line: {
      en: 'Ray. Hacker. If it’s connected, I can break it. Grays, Nordics, Reptilians, Mantis: everybody runs a system, every system has a password, and every password is the name of somebody they love. I don’t want Earth. I want to read the source code of whoever does. Confession time. The Gray paperwork? Never cracked it. It’s paper. No ports. Choose carefully. I’m watching the scoreboard, and your history too.',
      'pt-BR': 'Ray. Hacker. Se está conectado, eu consigo quebrar. Os Grays, os Nórdicos, os Reptilianos, os Mantis: todo mundo tem um sistema, e todo sistema tem uma senha, e toda senha é o nome de alguém querido. Eu não quero a Terra. Eu quero ver o código-fonte de quem quer. Confesso uma coisa. O formulário dos Grays eu nunca consegui invadir. É papel. Não tem porta. Escolha com cuidado. Eu estou de olho no placar, e no seu histórico também.',
    },
    voiceDirection:
      'Young adult male, mid twenties, relaxed slightly nasal tenor. Laid-back, wry, quick-witted, a bit smug, like someone typing while talking. Fast on the list of races, then slows down for the confession about the paper form, almost embarrassed. Dry deadpan on the last line. Casual urban Brazilian accent in Portuguese; light Brazilian-tinged English.',
  },
  {
    id: 'livia',
    name: 'Olivia',
    role: {
      en: 'The Medic of the Resistance.',
      'pt-BR': 'A Médica da Resistência.',
    },
    line: {
      en: 'Olivia, medic of the Resistance. People first. Always. I have treated people from every side. The Nordics offer dessert. The Grays ask for a sample. The Mantis ask for a performance review. The Reptilians charge for the water in the IV. Nobody asks how you’re feeling. I do. That’s not weakness, it’s protocol, and a good one. Humans are not a resource, a sample or a target. We’re patients. Choose whoever you like, but notice who asks how you are.',
      'pt-BR': 'Olivia, médica da Resistência. Pessoas primeiro. Sempre. Eu já atendi gente de todos os lados. Os Nórdicos oferecem sobremesa. Os Grays pedem uma amostra. Os Mantis pedem uma avaliação de desempenho. Os Reptilianos cobram pela água do soro. Ninguém pergunta como você está. Eu pergunto. Não é fraqueza, é protocolo, e dos bons. Os humanos não são um recurso, nem uma amostra, nem um alvo. São pacientes. Escolha quem quiser, mas repare em quem pergunta como você está.',
    },
    voiceDirection:
      'Adult female, early thirties, soft warm alto, calm and steady. Gentle bedside manner with a thread of dry humor in the list of races. Measured, reassuring pace; slow down and soften on "Nobody asks how you’re feeling. I do." Compassion without sentimentality. Neutral Brazilian accent in Portuguese; light Brazilian-tinged English.',
  },
  {
    id: 'julio',
    name: 'Julian',
    role: {
      en: 'The Pilot of the Resistance.',
      'pt-BR': 'O Piloto da Resistência.',
    },
    line: {
      en: 'Julian, pilot. Higher, faster, further, maybe. The maybe is the honest part. I’ve outrun a Mantis fleet, flown past a Reptilian cistern barge, and been invited to a Nordic party in the middle of the chase. I almost went. The aliens have gorgeous ships and terrible plans. We have a borrowed ship and one of Dora’s plans. Buckle up and pick a side. If it works, great. If not, maybe.',
      'pt-BR': 'Julian, piloto. Mais alto, mais rápido, mais longe, talvez. O talvez é a parte honesta. Eu já fugi de uma frota Mantis, cruzei uma barcaça reptiliana e fui convidado para uma festa nórdica no meio da fuga. Quase aceitei. Os alienígenas têm naves lindas e planos terríveis. A gente tem uma nave emprestada e um plano da Dora. Aperte o cinto e escolha. Se der certo, ótimo. Se não der, talvez.',
    },
    voiceDirection:
      'Adult male, around thirty, bright easygoing tenor with a grin in the voice. Fast, upbeat, adrenaline-friendly rhythm, jokes tossed off casually, a little reckless charm. Brief mock-confessional dip on "I almost went." Cheerful fatalism on the last line, with a tiny shrug on "maybe." Casual Brazilian accent in Portuguese; light Brazilian-tinged English.',
  },
  {
    id: 'tati',
    name: 'Tasha',
    role: {
      en: 'The Warrior of the Resistance.',
      'pt-BR': 'A Guerreira da Resistência.',
    },
    line: {
      en: 'Tasha, warrior. Courage is a habit. Nobody is born brave. You train, every day, like brushing your teeth, only with more armed people around. I respect the Mantis. They have discipline. I distrust the Nordics. They have cake. The Reptilians have patience, and I’m in a hurry. The Grays gave me a case number and an answer in thirty days. I’m not afraid of any of them. Now it’s your turn. Stand up and choose. Don’t ask permission.',
      'pt-BR': 'Tasha, guerreira. Coragem é um hábito. Ninguém nasce corajoso, a gente treina, todo dia, como escovar os dentes, só que com mais gente armada. Eu respeito os Mantis, que têm disciplina. Desconfio dos Nórdicos, que têm bolo. Os Reptilianos têm paciência, e eu tenho pressa. Os Grays me deram um número de protocolo e uma resposta em trinta dias. Não tenho medo de nenhum. Agora é a sua vez. Levanta, escolhe, e não peça licença.',
    },
    voiceDirection:
      'Adult female, late twenties, strong low-mid voice, confident and grounded. Firm, rhythmic, short punchy sentences with a dry wink in the comparisons (teeth, cake, case number). No shouting; authority comes from calm. Lean into "Stand up and choose" like a coach. Direct Brazilian accent in Portuguese; light Brazilian-tinged English.',
  },
];
