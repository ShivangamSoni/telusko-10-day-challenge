import { Badge, Button, Card, Typography } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';

import { UserQuiz } from '../../../api/user/type';

export default function QuizCard({
  quiz,
  onStart,
}: {
  quiz: UserQuiz;
  onStart: (id: number) => void;
}) {
  return (
    <Badge.Ribbon text={quiz.technology.name}>
      <Card
        actions={[
          <Button title="Start the Quiz" onClick={() => onStart(quiz.id)}>
            <PlayCircleOutlined />
          </Button>,
        ]}
      >
        <Typography.Title level={3}>{quiz.name}</Typography.Title>

        <Typography.Paragraph strong style={{ fontSize: '1.5em' }}>
          Questions: {quiz.numberOfQuestions}
        </Typography.Paragraph>
      </Card>
    </Badge.Ribbon>
  );
}
