import { Card, Statistic } from 'antd';

import { Score } from '../../../api/user/type';

export default function ScoreCard({
  score: { totalQuestions, correctAnswers, incorrectAnswers },
}: {
  score: Score;
}) {
  return (
    <Card title="Quiz Score">
      <Statistic title="Total Questions" value={totalQuestions} />
      <Statistic title="Correct Answers" value={correctAnswers} />
      <Statistic title="Incorrect Answers" value={incorrectAnswers} />
    </Card>
  );
}
