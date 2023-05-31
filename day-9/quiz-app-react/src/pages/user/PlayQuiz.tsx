import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { Layout, Modal, Statistic, Typography, message, theme } from 'antd';

import { Score, UserQuizQuestion } from '../../api/user/type';
import { getQuizzesToPlay } from '../../api/user/getQuizzesToPlay';
import { startQuiz } from '../../api/user/startQuiz';
import { submitAnswer } from '../../api/user/submitAnswer';
import { cancelQuiz } from '../../api/user/cancelQuiz';

import QuizList from '../../features/user/play/QuizList';
import PlayQuizForm from '../../features/user/play/PlayQuizForm';
import ScoreCard from '../../features/user/play/ScoreCard';

export default function PlayQuiz() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] =
    useState<UserQuizQuestion | null>(null);
  const [playingQuiz, setPlayingQuiz] = useState<number | null>(null);
  const [score, setScore] = useState<Score | null>(null);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { data: quizzes } = useQuery({
    queryKey: ['user quiz'],
    queryFn: getQuizzesToPlay,
  });

  const startMutation = useMutation({
    mutationKey: ['start quiz'],
    mutationFn: startQuiz,
    onSuccess: (data) => {
      setCurrentQuestion(data.question);
      setModalOpen(true);
    },
  });

  const submitMutation = useMutation({
    mutationKey: ['submit quiz'],
    mutationFn: submitAnswer,
    onSuccess: (data) => {
      setCurrentQuestion(data.question);
      if (data.finished) {
        setScore(data.score);
      }
      setModalOpen(true);
    },
  });

  const cancelMutation = useMutation({
    mutationKey: ['cancel quiz'],
    mutationFn: cancelQuiz,
    onSuccess: (data) => {
      message.success(data.message);
      setScore(null);
      setCurrentQuestion(null);
      setModalOpen(false);
      setPlayingQuiz(null);
    },
  });

  useEffect(() => {
    const autoCancelQuiz = () => cancelMutation.mutate();
    window.addEventListener('beforeunload', autoCancelQuiz);
    return () => {
      autoCancelQuiz();
      window.removeEventListener('beforeunload', autoCancelQuiz);
    };
  }, []);

  return (
    <Layout>
      <Layout.Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: colorBgContainer,
        }}
      >
        <Typography.Title
          level={2}
          style={{
            margin: 0,
          }}
        >
          Play A Quiz
        </Typography.Title>
      </Layout.Header>

      <div style={{ flex: 1, padding: '16px 0 0' }}>
        {quizzes != null && (
          <QuizList
            quizzes={quizzes}
            onStart={(id) => {
              setPlayingQuiz(id);
              startMutation.mutateAsync(id);
            }}
          />
        )}
      </div>

      {quizzes && currentQuestion && (
        <Modal
          open={modalOpen}
          centered
          title={quizzes.find(({ id }) => id === playingQuiz)?.name}
          footer={[
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Statistic
                title="Total Questions"
                value={`${currentQuestion.totalQuestions}`}
              />
              <Statistic
                title="Current Question"
                value={`${currentQuestion.questionNumber}`}
              />
            </div>,
          ]}
          onCancel={() => cancelMutation.mutateAsync()}
        >
          <PlayQuizForm
            question={currentQuestion}
            onSubmit={(answer) => submitMutation.mutateAsync(answer)}
          />
        </Modal>
      )}

      {quizzes && score && (
        <Modal
          open={modalOpen}
          centered
          footer={null}
          onCancel={() => {
            setScore(null);
            setCurrentQuestion(null);
            setModalOpen(false);
            setPlayingQuiz(null);
          }}
        >
          <ScoreCard score={score} />
        </Modal>
      )}
    </Layout>
  );
}
