import { Technology } from '../technology/type';

export interface AdminQuestion {
  id: number;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
  technology: Technology;
}

export interface AdminQuestionRequest
  extends Omit<AdminQuestion, 'id' | 'technology'> {
  technology_id: Technology['id'];
}
