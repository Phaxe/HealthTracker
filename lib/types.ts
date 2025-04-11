export interface Completion {
  date: string;
}

export interface Habit {
  id: string;
  habit: string;
  description: string;
  completion: Completion[];
}
