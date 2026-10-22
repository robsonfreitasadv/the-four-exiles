import type { InfoBlock } from './pages';

/**
 * Privacy policy and terms of use for v1 (static site, no accounts, no server of our own).
 * Written for Brazilian law (LGPD, Lei 13.709/2018; Marco Civil, Lei 12.965/2014; CDC, Lei 8.078/1990).
 * The controller's name, contact e-mail and host come from data/legal.ts. Have a lawyer review before launch.
 */

export const privacyBlocks: InfoBlock[] = [
  {
    title: { en: 'Who we are', 'pt-BR': 'Quem somos' },
    items: [
      {
        en: 'THE FOUR EXILES is an original fiction and humour project. This policy explains what happens to information when you use this website. The person responsible (data controller) and the contact for any privacy request are listed in the “Contact” section below.',
        'pt-BR': 'THE FOUR EXILES é um projeto original de ficção e humor. Esta política explica o que acontece com as informações quando você usa este site. O responsável (controlador dos dados) e o contato para qualquer pedido sobre privacidade estão na seção “Contato”, abaixo.',
      },
    ],
  },
  {
    title: { en: 'What we do not collect', 'pt-BR': 'O que não coletamos' },
    items: [
      {
        en: 'Browsing needs no account. There are no payments, no wallets and no analytics or advertising trackers, and we do not use cookies. An account is only needed to send mission entries (next section).',
        'pt-BR': 'Navegar não exige conta. Não há pagamento, carteira nem ferramentas de análise ou publicidade, e não usamos cookies. A conta só é necessária para enviar missões (próxima seção).',
      },
      {
        en: 'We do not sell, rent or share personal data, and we do not build profiles of visitors.',
        'pt-BR': 'Não vendemos, alugamos nem compartilhamos dados pessoais, e não montamos perfis de visitantes.',
      },
    ],
  },
  {
    title: { en: 'What stays in your browser', 'pt-BR': 'O que fica no seu navegador' },
    items: [
      {
        en: 'To remember your choices, the site saves a few items in your own browser (localStorage): the language, whether the soundtrack is on, your sign-in session (if you have an account), the race you chose, the optional name and the random number on your census card, and the demo missions you accepted. This information never leaves your device and we cannot see it.',
        'pt-BR': 'Para lembrar suas escolhas, o site guarda alguns itens no seu próprio navegador (localStorage): o idioma, se a trilha sonora está ligada, sua sessão de entrada (se tiver conta), a raça escolhida, o nome opcional e o número aleatório da sua carteirinha do Censo e as missões demo que você aceitou. Essas informações não saem do seu aparelho e nós não temos acesso a elas.',
      },
      {
        en: 'Wallpapers, avatars, stickers, memes and the census card are drawn in your browser. The text you type in them is not sent anywhere.',
        'pt-BR': 'Wallpapers, avatares, figurinhas, memes e a carteirinha são gerados no seu navegador. O texto que você digita neles não é enviado a lugar nenhum.',
      },
      {
        en: 'You can erase all of it at any time with the button at the end of this page, or by clearing this site’s data in your browser settings.',
        'pt-BR': 'Você pode apagar tudo a qualquer momento pelo botão no fim desta página ou limpando os dados deste site nas configurações do navegador.',
      },
    ],
  },
  {
    title: { en: 'If you create an account to send missions', 'pt-BR': 'Se você criar conta para enviar missões' },
    items: [
      {
        en: 'We collect your e-mail (only to send the sign-in code), the nickname and race you choose, and what you send: title, link, image, note, date and time, plus the moderation result.',
        'pt-BR': 'Coletamos seu e-mail (só para enviar o código de entrada), o apelido e a raça que você escolher e o que você envia: título, link, imagem, recado, data e hora, além do resultado da moderação.',
      },
      {
        en: 'Purpose and legal basis: running the championship you joined under these terms (LGPD, art. 7, V). Your nickname, race and approved points appear in the public score log; your e-mail never does. Entries are seen only by you and the moderators until the project reposts them with credit, as the terms allow.',
        'pt-BR': 'Finalidade e base legal: realizar o campeonato do qual você participa, conforme os termos (LGPD, art. 7º, V). Seu apelido, sua raça e os pontos aprovados aparecem no registro público de pontos; seu e-mail, nunca. Os envios são vistos só por você e pela moderação até o projeto repostá-los com crédito, como os termos permitem.',
      },
      {
        en: 'Storage: Supabase, in its data centre in the United States (North Virginia), an international transfer made to run the service you asked for (LGPD, art. 33, IX). The sign-in session is kept in your browser. Data is kept while your account exists. You can delete the account, entries, images and their points yourself on the account page, or ask the contact below.',
        'pt-BR': 'Armazenamento: Supabase, no data center dos Estados Unidos (Virgínia do Norte), uma transferência internacional feita para executar o serviço que você pediu (LGPD, art. 33, IX). A sessão de entrada fica no seu navegador. Os dados ficam guardados enquanto a conta existir. Você mesmo pode apagar a conta, os envios, as imagens e os pontos deles na página da conta, ou pedir ao contato abaixo.',
      },
      {
        en: 'Accounts are for people aged 13 or over; under 18, with the knowledge of a parent or guardian.',
        'pt-BR': 'A conta é para quem tem 13 anos ou mais; menores de 18, com ciência dos responsáveis.',
      },
    ],
  },
  {
    title: { en: 'Third parties involved', 'pt-BR': 'Terceiros envolvidos' },
    items: [
      {
        en: 'Hosting: like any website, the server that delivers these pages receives technical data from each visit (IP address, date and time, page requested, browser) and may keep access logs. Under the Marco Civil da Internet (art. 15), access logs may be kept for six months. The hosting provider is named in the “Contact” section.',
        'pt-BR': 'Hospedagem: como em qualquer site, o servidor que entrega estas páginas recebe dados técnicos de cada visita (endereço IP, data e hora, página pedida, navegador) e pode guardar registros de acesso. Pelo Marco Civil da Internet (art. 15), esses registros podem ser mantidos por seis meses. O provedor de hospedagem está na seção “Contato”.',
      },
      {
        en: 'Fonts: the typefaces are loaded from Google Fonts, so your browser connects to Google, which receives your IP address under its own privacy policy.',
        'pt-BR': 'Fontes: as fontes do site são carregadas do Google Fonts, então seu navegador se conecta ao Google, que recebe seu endereço IP conforme a política de privacidade dele.',
      },
      {
        en: 'Accounts: sign-in e-mails are sent by Supabase (and, when set up, by Resend, the e-mail service). If the bot check is on, the sign-in form loads Cloudflare Turnstile, which receives technical data from your browser to tell people from bots.',
        'pt-BR': 'Contas: os e-mails de entrada são enviados pelo Supabase (e, quando configurado, pelo Resend, o serviço de e-mail). Se a verificação contra robôs estiver ligada, o formulário de entrada carrega o Cloudflare Turnstile, que recebe dados técnicos do seu navegador para distinguir pessoas de robôs.',
      },
      {
        en: 'Community: the community lives on Discord. Nothing is sent to Discord unless you click an invitation; once there, Discord’s own terms and privacy policy apply.',
        'pt-BR': 'Comunidade: a comunidade fica no Discord. Nada é enviado ao Discord a menos que você clique num convite; lá, valem os termos e a política de privacidade do próprio Discord.',
      },
      {
        en: 'These providers may store data outside Brazil. That transfer follows their own safeguards, as allowed by art. 33 of the LGPD.',
        'pt-BR': 'Esses provedores podem armazenar dados fora do Brasil. Essa transferência segue as salvaguardas deles, como permite o art. 33 da LGPD.',
      },
    ],
  },
  {
    title: { en: 'Why and on what legal basis', 'pt-BR': 'Por que e com qual base legal' },
    items: [
      {
        en: 'Technical visit data is processed only to deliver the site, keep it secure and comply with the law: legitimate interest and legal obligation (LGPD, art. 7, II and IX).',
        'pt-BR': 'Os dados técnicos de visita são tratados apenas para entregar o site, mantê-lo seguro e cumprir a lei: legítimo interesse e obrigação legal (LGPD, art. 7º, II e IX).',
      },
      {
        en: 'What stays in your browser is saved because you asked for it (choosing a language, a race or a mission) and is under your control.',
        'pt-BR': 'O que fica no seu navegador é salvo porque você pediu (ao escolher idioma, raça ou missão) e fica sob o seu controle.',
      },
    ],
  },
  {
    title: { en: 'Your rights', 'pt-BR': 'Seus direitos' },
    items: [
      {
        en: 'Under art. 18 of the LGPD you may ask to confirm whether we process your data, access, correct, anonymise or delete it, learn who it is shared with and revoke consent. Write to the contact below; we answer within 15 days.',
        'pt-BR': 'Pelo art. 18 da LGPD, você pode pedir confirmação de que tratamos seus dados, acesso, correção, anonimização ou eliminação, saber com quem são compartilhados e revogar consentimento. Escreva para o contato abaixo; respondemos em até 15 dias.',
      },
      {
        en: 'You may also complain to the Brazilian data protection authority (ANPD, gov.br/anpd).',
        'pt-BR': 'Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD, gov.br/anpd).',
      },
    ],
  },
  {
    title: { en: 'Children', 'pt-BR': 'Crianças e adolescentes' },
    items: [
      {
        en: 'The site collects nothing from anyone, of any age. Its humour is aimed at teenagers and adults, and the Discord community follows Discord’s minimum age (13). Children should use the site with a parent or guardian.',
        'pt-BR': 'O site não coleta nada de ninguém, de nenhuma idade. O humor é pensado para adolescentes e adultos, e a comunidade no Discord segue a idade mínima do Discord (13 anos). Crianças devem usar o site com um responsável.',
      },
    ],
  },
  {
    title: { en: 'Changes', 'pt-BR': 'Mudanças' },
    items: [
      {
        en: 'If the site starts collecting anything (accounts, forms, analytics, a shop), this policy will be updated before that happens, with the new date at the top.',
        'pt-BR': 'Se o site passar a coletar qualquer coisa (conta, formulário, análise de uso, loja), esta política será atualizada antes, com a nova data no topo.',
      },
    ],
  },
];

export const termsBlocks: InfoBlock[] = [
  {
    title: { en: 'Agreement', 'pt-BR': 'Aceite' },
    items: [
      {
        en: 'By using this site you agree to these terms. If you do not agree, please do not use it.',
        'pt-BR': 'Ao usar este site, você concorda com estes termos. Se não concordar, por favor não use.',
      },
    ],
  },
  {
    title: { en: 'Fiction and satire', 'pt-BR': 'Ficção e sátira' },
    items: [
      {
        en: 'THE FOUR EXILES is fiction. The races, characters, the Census, the contract and every event are invented. References to UFO folklore, real places or real history are satire and do not claim to be true.',
        'pt-BR': 'THE FOUR EXILES é ficção. As raças, os personagens, o Censo, o contrato e todos os acontecimentos são inventados. Referências a folclore ufológico, lugares ou fatos reais são sátira e não afirmam que algo seja verdade.',
      },
      {
        en: 'AI characters on the site are always labelled as such. They are scripted characters, not people, and never count as real participants.',
        'pt-BR': 'Os personagens de IA do site são sempre identificados como tal. São personagens roteirizados, não pessoas, e nunca contam como participantes reais.',
      },
    ],
  },
  {
    title: { en: 'Nothing financial', 'pt-BR': 'Nada financeiro' },
    items: [
      {
        en: 'This project has no token, cryptocurrency, NFT, pre-sale or investment of any kind, and nothing on the site is a financial product or advice. Anyone offering you one in the project’s name is not authorised: report it.',
        'pt-BR': 'Este projeto não tem token, criptomoeda, NFT, pré-venda nem investimento de nenhum tipo, e nada no site é produto ou recomendação financeira. Quem oferecer algo assim em nome do projeto não está autorizado: denuncie.',
      },
      {
        en: 'Championship points come only from community activity under public rules. They have no monetary value and cannot be bought, sold or exchanged.',
        'pt-BR': 'Os pontos do campeonato vêm apenas de atividades da comunidade, por regras públicas. Não têm valor em dinheiro e não podem ser comprados, vendidos nem trocados.',
      },
    ],
  },
  {
    title: { en: 'Accounts and the championship', 'pt-BR': 'Conta e campeonato' },
    items: [
      {
        en: 'An account is optional and only used to send mission entries. One account per person; no fake or shared accounts. Pick a nickname that does not impersonate anyone or offend.',
        'pt-BR': 'A conta é opcional e serve só para enviar missões. Uma conta por pessoa; nada de contas falsas ou compartilhadas. Escolha um apelido que não se passe por ninguém nem ofenda.',
      },
      {
        en: 'Moderators decide whether an entry is approved under public rules. Points go to the race chosen in your profile for the whole season and can be removed if the rules were broken.',
        'pt-BR': 'A moderação decide se um envio é aprovado, por regras públicas. Os pontos vão para a raça escolhida no seu perfil durante toda a temporada e podem ser retirados se as regras forem descumpridas.',
      },
    ],
  },
  {
    title: { en: 'Intellectual property', 'pt-BR': 'Propriedade intelectual' },
    items: [
      {
        en: 'The name THE FOUR EXILES, the characters, art, texts, emblems and the site’s design belong to the project and are protected by copyright law (Lei 9.610/1998).',
        'pt-BR': 'O nome THE FOUR EXILES, os personagens, as artes, os textos, os emblemas e o design do site pertencem ao projeto e são protegidos pela Lei de Direitos Autorais (Lei 9.610/1998).',
      },
      {
        en: 'Free fan kit: you may download and use the wallpapers, avatars, stickers, memes and census card for personal, non-commercial fan use, including sharing on social media. Selling them, printing them on products for sale or using them as another brand is not allowed without written permission.',
        'pt-BR': 'Kit grátis: você pode baixar e usar wallpapers, avatares, figurinhas, memes e a carteirinha para uso pessoal e de fã, sem fins comerciais, inclusive para compartilhar em redes sociais. Vender, estampar em produtos para venda ou usar como marca de terceiros não é permitido sem autorização por escrito.',
      },
    ],
  },
  {
    title: { en: 'What you create', 'pt-BR': 'O que você cria' },
    items: [
      {
        en: 'Memes, art and stories you share with the community remain yours. By sharing them in the project’s channels you allow the project, free of charge and without exclusivity, to repost and display them with credit to you, inside the project’s site and channels.',
        'pt-BR': 'Memes, artes e histórias que você compartilha com a comunidade continuam seus. Ao compartilhar nos canais do projeto, você autoriza o projeto, de graça e sem exclusividade, a repostar e exibir o conteúdo com crédito a você, no site e nos canais do projeto.',
      },
      {
        en: 'Only share what you made or have the right to share. You can ask for any repost of your work to be removed.',
        'pt-BR': 'Compartilhe apenas o que você fez ou tem direito de compartilhar. Você pode pedir a retirada de qualquer repostagem do seu trabalho.',
      },
    ],
  },
  {
    title: { en: 'Conduct', 'pt-BR': 'Conduta' },
    items: [
      {
        en: 'Make fun of the races, never of people. Hate speech, harassment, sexual content involving minors, threats, scams, spam, impersonation and sharing other people’s personal data are not allowed, on the site or in the community.',
        'pt-BR': 'Zoe as raças, nunca as pessoas. Discurso de ódio, assédio, conteúdo sexual envolvendo menores, ameaças, golpes, spam, falsificação de identidade e exposição de dados pessoais de outras pessoas não são permitidos, no site nem na comunidade.',
      },
      {
        en: 'Do not try to break, overload or copy the site in bulk, or to manipulate the championship (fake accounts, bought engagement, vote rigging). Breaking these rules may lead to removal from the community and from the rankings.',
        'pt-BR': 'Não tente quebrar, sobrecarregar ou copiar o site em massa, nem manipular o campeonato (contas falsas, engajamento comprado, fraude em votação). Quem descumprir pode ser removido da comunidade e dos rankings.',
      },
    ],
  },
  {
    title: { en: 'The site as it is', 'pt-BR': 'O site como ele é' },
    items: [
      {
        en: 'The site is free and offered as is. It may change, pause or end, and features marked as demo or provisional may change without notice. Links to other services (such as Discord and the partner store that prints and sells the products) follow their own rules; purchases are made with that store.',
        'pt-BR': 'O site é gratuito e oferecido como está. Pode mudar, pausar ou acabar, e recursos marcados como demonstração ou provisórios podem mudar sem aviso. Links para outros serviços (como o Discord e a loja parceira que produz e vende os produtos) seguem as regras deles; a compra é feita com essa loja.',
      },
      {
        en: 'Within the limits of Brazilian law, including the consumer protection code where it applies, the project is not liable for indirect damages from using the site or third-party services.',
        'pt-BR': 'Nos limites da lei brasileira, inclusive do Código de Defesa do Consumidor quando aplicável, o projeto não responde por danos indiretos decorrentes do uso do site ou de serviços de terceiros.',
      },
    ],
  },
  {
    title: { en: 'Law and changes', 'pt-BR': 'Lei e mudanças' },
    items: [
      {
        en: 'These terms follow Brazilian law. Disputes go to the courts of the user’s domicile when the user is a consumer. If the terms change, the new date appears at the top of this page.',
        'pt-BR': 'Estes termos seguem a lei brasileira. Disputas vão para o foro do domicílio do usuário, quando ele for consumidor. Se os termos mudarem, a nova data aparece no topo desta página.',
      },
    ],
  },
];
