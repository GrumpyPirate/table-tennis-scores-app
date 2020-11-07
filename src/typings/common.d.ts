// styled-components sadly doesn't give us a utility type for React 'with className' props
export type PropsWithClassName<T = {}> = T & {
  className?: string;
};

// Data model
export interface Player {
  avatar: string;
  id: string;
  name: string;
}

export interface GamePlayerResult {
  id: string;
  score: number;
}

export interface GameResult {
  date: string;
  player1: GamePlayerResult;
  player2: GamePlayerResult;
}
