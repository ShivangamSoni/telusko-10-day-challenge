import { AdminQuestion } from '../question/type';
import { Technology } from '../technology/type';

export interface AdminQuiz {
  id: number;
  name: string;
  technology: Technology;
  questions: AdminQuestion[];
}

export interface AdminQuizRequest {
  name: string;
  technology_id: Technology['id'];
  question_ids: AdminQuestion['id'][];
}
