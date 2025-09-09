export const PAGE_SIZE: number = 4;

export const COLOR_HEX: { [key: string]: string } = {
  Lavender: '#E6D0FF',
  Sage: '#B8C8B8', 
  "Mist Blue": '#A7C8EE',
  White: '#FFFFFF',
  Black: '#2D2D2D',
  "Cosmic Orange": '#FF6F3D',
  "Deep Blue": '#1F3A5B',
  Silver: '#F5F5F7', 
  "Sky Blue": '#89CFF0', 
  "Light Gold": '#F1E0B6', 
  "Cloud White": '#F4F4F4',
  "Space Black": '#1A1A1A', 
};

export const statuses: string[] = [
  "canceled",
  "paid",
  "not_responding",
  "not_interested",
  "already_bought",
  "voice_msg",
  "follow_up",
  "called",
  "pending",
] as const;
