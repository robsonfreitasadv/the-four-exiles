/**
 * Album data: every sticker (number, section, type, source image, text), the bonus stickers and the page map.
 * Texts come from docs/lore/resumo-racas.md, docs/canon/resistencia.md and src/data/voices.ts (pt-BR).
 * Change the texts here and re-run `node design/album-art.cjs`. See design/album/plano.md.
 */

// Character ids on disk → public names. `eyes`/`detail`: face-sheet crops as fractions { cx, cy, w }.
const CHARS = {
  'vhal-ett': { name: 'VELLUM', race: 'grays', eyes: { cx: 0.5, cy: 0.36, w: 0.5 }, detail: { cx: 0.62, cy: 0.88, w: 0.42 } },
  ilvani: { name: 'AUREL', race: 'nordics', eyes: { cx: 0.47, cy: 0.3, w: 0.45 }, detail: { cx: 0.45, cy: 0.86, w: 0.42 } },
  sazhi: { name: 'SAZAR', race: 'reptilians', eyes: { cx: 0.55, cy: 0.27, w: 0.45 }, detail: { cx: 0.5, cy: 0.86, w: 0.45 } },
  'xhalen-kthrix': { name: 'VEX', race: 'mantis', eyes: { cx: 0.5, cy: 0.3, w: 0.45 }, detail: { cx: 0.5, cy: 0.66, w: 0.4 } },
  dora: { name: 'Dora', race: 'resistance', role: 'A Estrategista', quote: 'Eles acham que somos só uma espécie. Somos um problema.', eyes: { cx: 0.55, cy: 0.41, w: 0.48 } },
  rui: { name: 'Ray', race: 'resistance', role: 'O Hacker', quote: 'Se está conectado, eu consigo quebrar.' },
  livia: { name: 'Olivia', race: 'resistance', role: 'A Médica', quote: 'Pessoas primeiro. Sempre.' },
  julio: { name: 'Julian', race: 'resistance', role: 'O Piloto', quote: 'Mais alto, mais rápido, mais longe, talvez.' },
  tati: { name: 'Tasha', race: 'resistance', role: 'A Guerreira', quote: 'Coragem é um hábito.' },
};

const RACES = {
  grays: {
    id: 'vhal-ett', name: 'Grays', title: 'Os Escrivães', role: 'Supervisora de Sete', planet: 'hevra', planetName: 'Hevra',
    claim: 'biológica', motto: 'Procedimento é proteção.', stamp: 'DEFERIDO',
    views: ['vhal-ett-3d-1', 'vhal-ett-3d-2', 'vhal-ett-3d-3', 'vhal-ett-back-3d-1', 'vhal-ett-back-3d-2', 'vhal-ett-back-3d-3'],
    want: 'Diversidade genética. Gerações de clonagem deixaram o genoma deles uniforme demais.',
    ifWin: 'A Terra vira banco de amostras: cadastro genético da humanidade e coletas "com consentimento presumido".',
    act: 'Observam, calculam, contêm e protocolam. Preferem neutralizar a reação antes de qualquer briga.',
    weak: 'Precisam do caos genético humano e já protocolaram 40.000 reclamações sobre ele.',
    rel: {
      nordics: 'Dívida mútua: os Grays têm as estatísticas, os Nórdicos têm o método.',
      reptilians: 'Desconfiança com cheiro de negócio. A seca está "sob análise".',
      mantis: 'Há módulos de bloqueio Gray em sistemas Mantis. Autoria não esclarecida.',
      humans: 'A ufologia humana é um erro de data. Dora é um formulário que não fecha.',
    },
    quote: 'Ninguém será machucado de propósito. Todos serão lembrados.',
    extras: [['Sete', 'Auditor do Arquivo Central'], ['KAEL-RUUM', 'Comandante de campo (provisório)']],
  },
  nordics: {
    id: 'ilvani', name: 'Nórdicos', title: 'Os Pastores', role: 'Anfitrião do Plano Jardim', planet: 'maia-prime', planetName: 'Maia-Prime',
    claim: 'histórica', motto: 'Um mundo melhor é possível.', stamp: 'CONVIDADO',
    views: [1, 2, 3, 4, 5, 6].map((i) => `ilvani-3d-${i}`),
    want: 'Governar a humanidade "para o bem dela". Têm a melhor tradução do universo.',
    ifWin: 'O Plano Jardim: uma Assembleia Terrestre permanente, festas abertas e votos simbólicos.',
    act: 'Cultura, tradução, música e presentes. A força vem por último, com pedido de desculpas.',
    weak: 'A simpatia não funciona em quem desconfia dela por princípio.',
    rel: {
      grays: 'Parceria de bastidor: dados de comportamento por acesso ao Arquivo.',
      reptilians: 'Presentes com água e cerimônia. E uma lista de quem retribui.',
      mantis: 'Desprezo educado. O convite da festa continua sem resposta.',
      humans: 'O alvo preferido: música, festas e a palavra "juntos".',
    },
    quote: 'Venha como está. Fique de vez. Nós guardamos o seu lugar.',
    extras: [['Sael', 'Ex-jardineiro desertor (provisório)'], ['ELARA-VOSS', 'Enviada cultural (provisório)']],
  },
  reptilians: {
    id: 'sazhi', name: 'Reptilianos', title: 'A Dinastia de Sazhath', role: 'O Soberano', planet: 'thaxis', planetName: 'Thaxis',
    claim: 'estratégica', motto: 'Controle o fluxo, controle o futuro.', stamp: 'HERDADO',
    views: [1, 2, 3, 4, 5].map((i) => `sazhi-3d-${i}`),
    want: 'Água. Thaxis está secando, e a Terra ainda tem oceanos.',
    ifWin: 'A Terra vira província hídrica: cada rio ganha dono, selo e herdeiro.',
    act: 'Pacto secreto, longo prazo e controle de rota. Preferem tomar a destruir.',
    weak: 'Não têm solução biológica para a seca. E os herdeiros são um problema à parte.',
    rel: {
      grays: 'Suspeitam que os Grays guardam a resposta para a seca. Ainda não perguntaram.',
      nordics: 'Aceitam os presentes, conferem a água e guardam um rancor cordial.',
      mantis: 'Frotas compradas dos Mantis. A conta passa de geração em geração.',
      humans: 'Recurso com opinião: a Resistência ameaça cortar o fluxo.',
    },
    quote: 'Nós não tomamos rios. Nós os herdamos.',
    extras: [['SSARA-MIN', 'Chefe da Casa das Cisternas (provisório)'], ['VESH-KARA', 'Hidrologista (provisório)']],
  },
  mantis: {
    id: 'xhalen-kthrix', name: 'Mantis', title: 'Os Comandantes', role: 'O Comandante', planet: 'xhalen', planetName: 'Xhalen',
    claim: 'contratual', motto: 'Disciplina é liberdade.', stamp: 'CONTRATADO',
    views: [1, 2, 3, 4, 5, 6].map((i) => `xhalen-kthrix-3d-${i}`),
    want: 'Transformar a guerra numa linha de produto. Guerra encerrada é péssima para os negócios.',
    ifWin: 'Um contrato de segurança com validade eterna, vendendo para todos os lados.',
    act: 'Logística primeiro: suprimento, isolamento, enxame de drones e células de elite.',
    weak: 'O enxame depende do elo central. Sem ordem, a unidade hesita.',
    rel: {
      grays: 'Desconfiança técnica: os Grays alteram ordens e auditam tudo.',
      nordics: 'Tédio. Contratos e música não combinam, e as festas não pagam.',
      reptilians: 'O melhor cliente. Escolta, casco e abordagem, cobrados em juros.',
      humans: 'Adversário valioso. Querem uma guerra longa com Dora, não uma vitória rápida.',
    },
    quote: 'Vitória é um estado inconveniente.',
    extras: [['IXUL-DRA', 'Oficial que guarda ordens ignoradas (provisório)'], ['LIRA-VESS', 'Guarda do elo do enxame (provisório)']],
  },
};

const RACE_ORDER = ['grays', 'nordics', 'reptilians', 'mantis'];
const OTHER = { grays: 'Grays', nordics: 'Nórdicos', reptilians: 'Reptilianos', mantis: 'Mantis', humans: 'Humanos' };

const list = [];
const add = (s) => list.push({ n: String(list.length + 1).padStart(3, '0'), ...s });

// 001–012 Abertura
const OPEN = { section: 'Abertura', theme: 'census' };
add({ ...OPEN, type: 'logo', foil: true, title: 'THE FOUR EXILES', sub: 'Álbum oficial do Censo' });
add({ ...OPEN, type: 'quote', quote: 'Quatro espécies. Um planeta. Nenhum destino em comum.', by: 'THE FOUR EXILES' });
add({ ...OPEN, type: 'planet', planet: 'terra', title: 'Terra, 2049', sub: 'O planeta em disputa' });
add({ ...OPEN, type: 'text', kicker: '2049', title: 'O sinal', body: 'Um sinal chega à Terra: quatro civilizações reivindicam o planeta num Censo Intergaláctico.' });
for (const r of RACE_ORDER) add({ ...OPEN, theme: r, type: 'planet', planet: RACES[r].planet, title: RACES[r].planetName, sub: `Planeta dos ${RACES[r].name}` });
add({ ...OPEN, theme: 'resistance', type: 'emblem', kind: 'resistance', title: 'Resistência', sub: 'A última escolha da humanidade' });
add({ ...OPEN, theme: 'resistance', type: 'quote', quote: CHARS.dora.quote, by: 'Dora' });
add({ ...OPEN, type: 'text', kicker: 'Regra do álbum', title: 'Nenhuma raça é vilã', body: 'Todas querem a Terra. Cada uma tem virtudes reais. A Resistência narra e conta os votos.' });
add({ ...OPEN, type: 'text', kicker: 'Você', title: 'Quem fica com a Terra?', body: 'Você é um humano com direito a escolher. Complete o álbum e decida.' });

// 013–108 Raças (24 cada)
for (const r of RACE_ORDER) {
  const R = RACES[r];
  const C = CHARS[R.id];
  const S = { section: R.name, theme: r };
  add({ ...S, type: 'emblem', kind: r, foil: true, title: R.name, sub: R.title });
  add({ ...S, type: 'photo', src: `${R.id}-face.jpg`, title: C.name, sub: R.role });
  add({ ...S, type: 'photo', src: `${R.id}-3d`, title: C.name, sub: 'Retrato 3D' });
  const views = [...R.views];
  R.views.forEach((v, i) => add({ ...S, type: 'photo', src: v, fit: 'contain', title: C.name, sub: v.includes('back') ? `Costas ${i - 2}` : `Vista ${i + 1}` }));
  if (views.length < 6) add({ ...S, type: 'photo', src: `${R.id}-face.jpg`, crop: { cx: 0.36, cy: 0.42, w: 0.36 }, title: C.name, sub: 'Close das escamas' });
  add({ ...S, type: 'photo', src: `${R.id}-face.jpg`, crop: C.eyes, title: C.name, sub: 'Close dos olhos' });
  add({ ...S, type: 'photo', src: `${R.id}-face.jpg`, crop: C.detail, title: C.name, sub: 'Detalhe da roupa' });
  add({ ...S, type: 'quote', quote: R.motto, by: `Lema dos ${R.name}` });
  add({ ...S, type: 'planet', planet: R.planet, title: R.planetName, sub: `Reivindicação ${R.claim}` });
  add({ ...S, type: 'text', kicker: 'O que querem da Terra', title: R.name, body: R.want });
  add({ ...S, type: 'text', kicker: 'Se ganharem', title: 'Provisório', body: R.ifWin });
  add({ ...S, type: 'text', kicker: 'Como agem', title: R.name, body: R.act });
  add({ ...S, type: 'text', kicker: 'Ponto fraco', title: R.name, body: R.weak });
  for (const [k, v] of Object.entries(R.rel)) {
    add({ ...S, type: 'text', kicker: `Como veem: ${OTHER[k]}`, title: OTHER[k], body: v, mini: k === 'humans' ? 'resistance' : k });
  }
  add({ ...S, type: 'quote', quote: R.quote, by: C.name });
  for (const [name, role] of R.extras) add({ ...S, type: 'missing', title: name, sub: role });
}

// 109–138 Resistência
const RES = { section: 'Resistência', theme: 'resistance' };
add({ ...RES, type: 'emblem', kind: 'resistance', foil: true, title: 'Resistência', sub: 'Humanos. Não o inimigo.' });
add({ ...RES, type: 'photo', src: 'dora-face.jpg', title: 'Dora', sub: 'A Estrategista' });
add({ ...RES, type: 'photo', src: 'dora-3d', title: 'Dora', sub: 'Retrato 3D' });
for (let i = 1; i <= 6; i++) add({ ...RES, type: 'photo', src: `dora-3d-${i}`, fit: 'contain', title: 'Dora', sub: `Vista ${i}` });
add({ ...RES, type: 'quote', quote: CHARS.dora.quote, by: 'Dora' });
add({ ...RES, type: 'text', kicker: 'Ficha', title: 'Dora, 28', body: 'Fortaleza, Brasil. Líder e estrategista. Análise, liderança, improviso e guerra de memes.' });
add({ ...RES, type: 'photo', src: 'dora-face.jpg', crop: CHARS.dora.eyes, title: 'Dora', sub: 'Close dos olhos' });
for (const id of ['rui', 'livia', 'julio', 'tati']) {
  const C = CHARS[id];
  add({ ...RES, type: 'photo', src: `${id}-face.jpg`, title: C.name, sub: C.role });
  add({ ...RES, type: 'photo', src: `${id}-3d`, title: C.name, sub: 'Retrato 3D' });
  add({ ...RES, type: 'photo', src: `${id}-3d-3`, fit: 'contain', title: C.name, sub: 'Vista lateral' });
  add({ ...RES, type: 'quote', quote: C.quote, by: C.name });
}
add({ ...RES, type: 'palette', title: 'Paleta da equipe', sub: 'Verde-oliva, pedra, bege, vermelho, marrom, roxo', colors: ['#5b5f3a', '#7a7770', '#cdb79a', '#b33a32', '#6b4a33', '#9b5fc0'] });
add({ ...RES, type: 'quote', quote: 'Humanos. Não o inimigo.', by: 'A Resistência' });

// 139–150 O Censo
const CEN = { section: 'O Censo', theme: 'census' };
add({ ...CEN, type: 'text', kicker: 'Censo Intergaláctico', title: 'O sinal de 2049', body: 'Quatro civilizações, uma reivindicação cada. O planeta vai a recenseamento.' });
add({ ...CEN, type: 'text', kicker: 'Documento', title: 'O Contrato do Censo', body: 'Milhares de cláusulas, em quatro idiomas e nenhum humano. Quase ninguém leu inteiro.' });
add({ ...CEN, type: 'text', kicker: 'Cláusula', title: '4.812-c', body: 'A brecha que talvez exista. Dora sublinhou duas vezes.' });
for (const r of RACE_ORDER) add({ ...CEN, theme: r, type: 'text', kicker: 'Reivindicação', title: RACES[r].claim, body: `A dos ${RACES[r].name}. ${RACES[r].motto}`, mini: r });
add({ ...CEN, type: 'quote', quote: 'Ninguém perguntou se a Terra vota.', by: 'Dora, depois de ler o contrato' });
add({ ...CEN, type: 'text', kicker: 'Documento pessoal', title: 'Carteirinha do Censo', body: 'Escolha uma raça e receba a sua. Válida em todo o sistema solar, segundo os Grays.' });
add({ ...CEN, theme: 'resistance', type: 'text', kicker: 'Apuração', title: 'A Resistência conta os votos', body: 'Não é um time. É quem confere a urna.', mini: 'resistance' });
add({ ...CEN, type: 'text', kicker: 'Temporada 0', title: 'Liga de IA', body: 'Uma liga só de personagens de IA, sempre identificados como IA. As pessoas entram na Temporada 1.' });
add({ ...CEN, type: 'text', kicker: 'A escolha', title: 'Escolha sua raça', body: 'Grays, Nórdicos, Reptilianos ou Mantis. O placar é da Resistência.' });

// 151–174 Casos ufológicos reais: fatos públicos + parecer satírico (ficção)
const CASES = [
  ['1947', 'Kenneth Arnold', 'Monte Rainier, Washington, EUA', 'Um piloto relata nove objetos rápidos no céu. A imprensa cria a expressão "disco voador".', 'Erro de data. Arquivado em três vias.'],
  ['1947', 'Roswell', 'Novo México, EUA', 'O Exército anuncia um "disco" e depois fala em balão. Em 1994, a Força Aérea atribui os destroços ao Projeto Mogul.', 'Formulário de recolhimento fora do prazo.'],
  ['1948', 'Thomas Mantell', 'Kentucky, EUA', 'Um piloto morre ao perseguir um objeto. A explicação mais aceita é um balão de grande altitude.', 'Registrado com pesar. Nenhuma raça reivindica.'],
  ['1951', 'Luzes de Lubbock', 'Texas, EUA', 'Formações de luzes são vistas e fotografadas. O Projeto Blue Book sugere aves refletindo a luz da cidade.', 'Os Nórdicos chamam de decoração.'],
  ['1952', 'Washington', 'Washington, D.C., EUA', 'Radares registram alvos sobre a capital e caças decolam. A Força Aérea fala em inversão térmica.', 'Os Mantis anotam: resposta em tempo aceitável.'],
  ['1952', 'Flatwoods', 'Virgínia Ocidental, EUA', 'Moradores relatam uma criatura alta depois de uma luz no céu. Investigadores apontam um meteoro e uma coruja.', 'Os Reptilianos negam: a capa é de outra casa.'],
  ['1955', 'Kelly-Hopkinsville', 'Kentucky, EUA', 'Uma família relata pequenos seres ao redor da fazenda durante a noite toda.', 'Visita de rotina. A família não assinou o recibo.'],
  ['1958', 'Ilha da Trindade', 'Brasil', 'A bordo de um navio da Marinha, o fotógrafo Almiro Baraúna registra um objeto. As fotos são divulgadas pelo governo.', 'Os Nórdicos pedem desculpas pelo flash.'],
  ['1961', 'Betty e Barney Hill', 'New Hampshire, EUA', 'Um casal relata uma abdução, lembrada depois sob hipnose. É o primeiro caso famoso do tipo.', 'Coleta com consentimento presumido. Presumimos.'],
  ['1964', 'Socorro', 'Novo México, EUA', 'O policial Lonnie Zamora relata um objeto ovalado e marcas no chão. O Blue Book o deixa como não identificado.', 'Pouso técnico. A multa foi contestada.'],
  ['1966', 'Westall', 'Melbourne, Austrália', 'Alunos e professores veem um objeto descer perto da escola, em plena manhã.', 'Excursão sem autorização dos pais.'],
  ['1973', 'Pascagoula', 'Mississippi, EUA', 'Dois pescadores relatam ter sido levados para dentro de uma nave à beira do rio.', 'Inspeção de pesca. O rio já tinha herdeiro.'],
  ['1975', 'Travis Walton', 'Arizona, EUA', 'Um lenhador some por cinco dias. Os colegas relatam uma luz na floresta. O caso é contestado até hoje.', 'Empréstimo de cinco dias. Devolvido no prazo.'],
  ['1977', 'Operação Prato', 'Colares, Pará, Brasil', 'Moradores relatam luzes no céu. A Força Aérea Brasileira envia uma equipe; os relatórios saem décadas depois.', 'Teste de campo. Relatório interno: inconclusivo.'],
  ['1980', 'Rendlesham', 'Suffolk, Inglaterra', 'Militares de uma base relatam luzes e um objeto na floresta. O vice-comandante registra tudo num memorando.', 'Árvore de Natal mal posicionada.'],
  ['1986', 'Noite Oficial dos OVNIs', 'Brasil', 'Radares registram cerca de vinte alvos, caças da FAB decolam e o ministro da Aeronáutica fala em público.', 'Exercício conjunto. Humanos: desempenho aceitável.'],
  ['1989', 'Onda belga', 'Bélgica', 'Milhares de relatos de triângulos com luzes; caças decolam. A foto mais famosa foi admitida como falsa em 2011.', 'Triângulo é formulário. Os belgas preencheram.'],
  ['1994', 'Escola Ariel', 'Ruwa, Zimbábue', 'Mais de sessenta crianças relatam uma nave e seres perto do recreio.', 'Palestra sobre o meio ambiente. A plateia correu.'],
  ['1996', 'Varginha', 'Minas Gerais, Brasil', 'Moradores relatam uma criatura. Um inquérito militar conclui que não houve nada extraterrestre.', 'Criatura não recenseada. Processo reaberto.'],
  ['1997', 'Luzes de Phoenix', 'Arizona, EUA', 'Milhares veem luzes em formação de V. Parte é atribuída a sinalizadores militares.', 'Iluminação de barcaça. Ninguém pagou a luz.'],
  ['2004', 'Nimitz "Tic Tac"', 'Costa da Califórnia, EUA', 'Pilotos da Marinha seguem um objeto branco sem asas. O vídeo vem a público em 2017.', 'Demonstração técnica. Ninguém pediu.'],
  ['2006', "O'Hare", 'Chicago, EUA', 'Funcionários do aeroporto veem um disco parado sobre um portão, que some por um buraco nas nuvens.', 'Espera regulamentar no portão. Voo atrasado.'],
  ['2020', 'Vídeos da Marinha', 'Pentágono, EUA', 'O Departamento de Defesa divulga oficialmente três vídeos de fenômenos não identificados.', 'Vazamento em três vias. Apuração em andamento.'],
  ['2023', 'Audiência no Congresso', 'Washington, D.C., EUA', 'Ex-oficiais depõem sob juramento sobre fenômenos não identificados.', 'As quatro raças assistiram. Ninguém foi convocado.'],
];
for (const [year, title, place, body, verdict] of CASES) add({ section: 'Casos ufológicos reais', theme: 'census', type: 'case', year, title, place, body, verdict });

// 175–186 Galeria dos brilhantes (candidatas a NFT)
const GAL = { section: 'Galeria dos brilhantes', theme: 'gold', foil: true, nft: true };
for (const id of ['vhal-ett', 'ilvani', 'sazhi', 'xhalen-kthrix', 'dora', 'rui', 'livia', 'julio', 'tati']) {
  const C = CHARS[id];
  add({ ...GAL, type: 'gallery', src: `${id}-face.jpg`, id, race: C.race, title: C.name, sub: C.race === 'resistance' ? C.role : RACES[C.race].name });
}
add({ ...GAL, type: 'text', kicker: 'Documento dourado', title: 'O Contrato do Censo', body: 'A versão que todo mundo assinou e ninguém leu.', race: 'census' });
add({ ...GAL, type: 'text', kicker: 'Cláusula dourada', title: '4.812-c', body: 'A brecha. Talvez.', race: 'census' });
add({ ...GAL, type: 'planet', planet: 'terra', title: 'A Terra em disputa', sub: 'Quatro reivindicações, um planeta', race: 'census' });

// 187–200 Mural: two puzzles
for (let row = 0; row < 2; row++) for (let col = 0; col < 4; col++) add({ section: 'Mural', theme: 'census', type: 'puzzle', group: 'races', col, row, cols: 4, rows: 2 });
for (let row = 0; row < 2; row++) for (let col = 0; col < 3; col++) add({ section: 'Mural', theme: 'resistance', type: 'puzzle', group: 'resistance', col, row, cols: 3, rows: 2 });

// X1–X12 bônus, numeração à parte
const bonus = [];
const STAMP = { grays: 'DEFERIDO', nordics: 'CONVIDADO', reptilians: 'HERDADO', mantis: 'CONTRATADO', resistance: 'CONTANDO' };
for (const id of ['vhal-ett', 'ilvani', 'sazhi', 'xhalen-kthrix', 'dora', 'rui', 'livia', 'julio', 'tati']) {
  const C = CHARS[id];
  bonus.push({ type: 'stamped', src: `${id}-face.jpg`, crop: { cx: 0.5, cy: 0.42, w: 0.7 }, theme: C.race, title: C.name, stamp: STAMP[C.race] });
}
bonus.push({ type: 'card', theme: 'census', title: 'Carteirinha do Censo' });
bonus.push({ type: 'missing', theme: 'grays', title: 'Sete', sub: 'Arquivo sem retrato' });
bonus.push({ type: 'text', theme: 'gold', foil: true, kicker: 'Bônus dourado', title: '4.812-c', body: 'Leia com atenção. Depois leia de novo.' });
bonus.forEach((b, i) => Object.assign(b, { n: `X${i + 1}`, section: 'Extras' }));

// Page map: [page, title, theme, numbers]. Pages 1 and 36 hold no stickers.
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => String(a + i).padStart(3, '0'));
const PAGES = [
  [1, 'Bem-vindo ao Censo', 'census', []],
  [2, 'Abertura', 'census', range(1, 6)],
  [3, 'Abertura', 'census', range(7, 12)],
];
RACE_ORDER.forEach((r, k) => {
  const start = 13 + k * 24;
  for (let p = 0; p < 4; p++) PAGES.push([4 + k * 4 + p, RACES[r].name, r, range(start + p * 6, start + p * 6 + 5)]);
});
PAGES.push([20, 'Resistência', 'resistance', range(109, 116)], [21, 'Resistência', 'resistance', range(117, 124)]);
PAGES.push([22, 'Resistência', 'resistance', range(125, 131)], [23, 'Resistência', 'resistance', range(132, 138)]);
PAGES.push([24, 'O Censo', 'census', range(139, 144)], [25, 'O Censo', 'census', range(145, 150)]);
for (let p = 0; p < 4; p++) PAGES.push([26 + p, 'Casos ufológicos reais', 'census', range(151 + p * 6, 156 + p * 6)]);
PAGES.push([30, 'Galeria dos brilhantes', 'gold', range(175, 180)], [31, 'Galeria dos brilhantes', 'gold', range(181, 186)]);
PAGES.push([32, 'Mural: as quatro raças', 'census', range(187, 194)], [33, 'Mural: a Resistência', 'resistance', range(195, 200)]);
PAGES.push([34, 'Extras', 'gold', bonus.slice(0, 6).map((b) => b.n)], [35, 'Extras', 'gold', bonus.slice(6).map((b) => b.n)]);
PAGES.push([36, 'Lista de controle', 'census', []]);

module.exports = { CHARS, RACES, RACE_ORDER, stickers: list, bonus, PAGES };
