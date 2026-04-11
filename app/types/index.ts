export type Category =
  | 'FIRST'
  | 'SECOND'
  | 'THIRD'
  | 'FOURTH'
  | 'FIFTH'
  | 'SIXTH'
  | 'SEVENTH'
  | 'DONE';

export interface Card {
  id: string;
  category: Category;
  question: string;
  answer: string;
  tag: string;
}

export interface CardPayload {
  question: string;
  answer: string;
  tag: string;
}