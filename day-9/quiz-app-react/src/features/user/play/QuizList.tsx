import { List } from 'antd';

import { UserQuiz } from '../../../api/user/type';

import QuizCard from './QuizCard';

export default function QuizList({
  quizzes,
  onStart,
}: {
  quizzes: UserQuiz[];
  onStart: (id: number) => void;
}) {
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      dataSource={quizzes}
      renderItem={(quiz) => (
        <List.Item key={quiz.id}>
          <QuizCard quiz={quiz} onStart={onStart} />
        </List.Item>
      )}
    />
  );
}
