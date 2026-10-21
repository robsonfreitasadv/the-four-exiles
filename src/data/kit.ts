import type { FactionId, Localized } from './types';

/**
 * Free fan kit per race: sticker phrases and meme suggestions.
 * The images themselves are drawn in the browser from the official sheets and the race emblem.
 */

export interface MemeSuggestion {
  top: Localized;
  bottom: Localized;
}

export interface RaceKit {
  stickers: Localized[];
  memes: MemeSuggestion[];
}

export const raceKits: Record<FactionId, RaceKit> = {
  grays: {
    stickers: [
      { en: 'APPROVED', 'pt-BR': 'DEFERIDO' },
      { en: 'UNDER REVIEW', 'pt-BR': 'EM ANÁLISE' },
      { en: 'PLEASE FILE IT', 'pt-BR': 'FAVOR PROTOCOLAR' },
      { en: '7 SECONDS, PLEASE', 'pt-BR': '7 SEGUNDOS, POR FAVOR' },
    ],
    memes: [
      {
        top: { en: 'When Earth asks to skip the paperwork', 'pt-BR': 'Quando a Terra pede para pular a burocracia' },
        bottom: { en: 'Form 12. In triplicate.', 'pt-BR': 'Formulário 12. Em três vias.' },
      },
      {
        top: { en: 'Nobody:', 'pt-BR': 'Ninguém:' },
        bottom: { en: 'The Grays: filed, just in case', 'pt-BR': 'Os Grays: arquivado por precaução' },
      },
      {
        top: { en: 'Me after 40,000 complaints about chaos', 'pt-BR': 'Eu depois de 40.000 reclamações sobre o caos' },
        bottom: { en: 'One more, please', 'pt-BR': 'Mais uma, por favor' },
      },
    ],
  },
  nordics: {
    stickers: [
      { en: 'EVERYTHING IS FINE', 'pt-BR': 'ESTÁ TUDO BEM' },
      { en: 'JOIN THE PARTY', 'pt-BR': 'VEM PRA FESTA' },
      { en: 'RAISE YOUR FREQUENCY', 'pt-BR': 'ELEVE SUA FREQUÊNCIA' },
      { en: 'ONE MORE DESSERT', 'pt-BR': 'SÓ MAIS UMA SOBREMESA' },
    ],
    memes: [
      {
        top: { en: 'When you turn down the invitation', 'pt-BR': 'Quando você recusa o convite' },
        bottom: { en: 'The third dessert arrives anyway', 'pt-BR': 'A terceira sobremesa chega mesmo assim' },
      },
      {
        top: { en: 'Nobody is forced to stay', 'pt-BR': 'Ninguém é obrigado a ficar' },
        bottom: { en: 'Nobody manages to leave, either', 'pt-BR': 'Só ninguém consegue sair' },
      },
      {
        top: { en: 'A better world is possible', 'pt-BR': 'Um mundo melhor é possível' },
        bottom: { en: 'Sign here, here and here', 'pt-BR': 'Assine aqui, aqui e aqui' },
      },
    ],
  },
  reptilians: {
    stickers: [
      { en: 'CONTROL THE FLOW', 'pt-BR': 'CONTROLE O FLUXO' },
      { en: 'CHECK THE WATER', 'pt-BR': 'CONFIRA A ÁGUA' },
      { en: 'IT WAS MY NEPHEW', 'pt-BR': 'FOI MEU SOBRINHO' },
      { en: 'BY SEAL AND BY HEIR', 'pt-BR': 'POR SELO E POR HERDEIRO' },
    ],
    memes: [
      {
        top: { en: 'My 400-year plan', 'pt-BR': 'Meu plano de 400 anos' },
        bottom: { en: 'Ruined by my nephew on a Tuesday', 'pt-BR': 'Arruinado pelo meu sobrinho numa terça' },
      },
      {
        top: { en: 'Me looking at your river', 'pt-BR': 'Eu olhando o seu rio' },
        bottom: { en: 'Lovely river. Shame if it had an owner.', 'pt-BR': 'Belo rio. Seria uma pena se tivesse dono.' },
      },
      {
        top: { en: 'My human disguise', 'pt-BR': 'Meu disfarce humano' },
        bottom: { en: 'Nobody believed it. Not even me.', 'pt-BR': 'Ninguém acreditou. Nem eu.' },
      },
    ],
  },
  mantis: {
    stickers: [
      { en: 'ORDER RECEIVED', 'pt-BR': 'ORDEM RECEBIDA' },
      { en: 'IN WRITING, PLEASE', 'pt-BR': 'POR ESCRITO, POR FAVOR' },
      { en: 'PERFORMANCE REVIEW', 'pt-BR': 'AVALIAÇÃO DE DESEMPENHO' },
      { en: 'DISCIPLINE IS FREEDOM', 'pt-BR': 'DISCIPLINA É LIBERDADE' },
    ],
    memes: [
      {
        top: { en: 'When the war is almost over', 'pt-BR': 'Quando a guerra está quase acabando' },
        bottom: { en: 'Let’s talk about renewing the contract', 'pt-BR': 'Vamos falar de renovar o contrato' },
      },
      {
        top: { en: 'Before anything drastic', 'pt-BR': 'Antes de qualquer medida drástica' },
        bottom: { en: 'A brief performance review', 'pt-BR': 'Uma breve avaliação de desempenho' },
      },
      {
        top: { en: 'Discipline is freedom', 'pt-BR': 'Disciplina é liberdade' },
        bottom: { en: 'Unscheduled rest is mutiny', 'pt-BR': 'Folga fora da agenda é motim' },
      },
    ],
  },
};
