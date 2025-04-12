export interface Completion {
  date: string;
}

export interface Habit {
  id: number;
  habit: string;
  description: string;
  completion: Completion[];
}

export interface HabitModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (habit: Partial<Habit>) => void;
  mode: 'add' | 'edit';
  initialData?: Habit;
}

export interface HabitChartProps {
  habit: Habit;
  title?: string;
}

export interface HabitCardProps {
  habit: Habit;
}