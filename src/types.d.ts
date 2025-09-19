export type Quiz = {
  correct_answer: string;
  selected_answer: string | undefined;
  answers: string[];
  question: string | undefined;
};

export type QuizConfig = {
  category: Category;
  quantity: number;
  difficulty: Difficulty;
  type: "Multiple choice" | "True / False" | string;
};

type Difficulty = "easy" | "medium" | "hard";

export type Category = {
  name: string;
  id: number;
  emoji: string;
} | null;

export type feedbackMessages = {
  title: string;
  description: string;
};

export type UserDates = {
  name: string | undefined;
  points: {
    total: number;
    quiz: number;
  };
  avatar: string;
};

export type Stats = {
  points: number;
  percentage: number;
  completedQuizzes: number;
  questionsResponded: number;
  maxStreak: number;
  currentStreak: number;
  playedDifficulties: { easy: number; medium: number; hard: number; };
};
