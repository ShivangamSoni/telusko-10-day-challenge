export interface UserQuiz {
  id: number;
  name: string;
  technology: Technology;
  numberOfQuestions: number;
}

export interface UserQuizQuestion {
  id: number;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  questionNumber: number;
  totalQuestions: number;
}

export interface AnswerRequest {
  questionId: number;
  answer: string;
}

export interface Score {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
}
