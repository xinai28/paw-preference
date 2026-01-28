export interface Cat {
  id: string;
  url: string;
  tags?: string[];
}

export interface SwipeResult {
  cat: Cat;
  liked: boolean;
}