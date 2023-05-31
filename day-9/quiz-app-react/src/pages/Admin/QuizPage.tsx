import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Button, Layout, Modal, Typography, message, theme } from 'antd';

import { AdminQuizRequest } from '../../api/admin/quiz/type';
import { getQuizzes } from '../../api/admin/quiz/getQuizzes';
import { addQuiz } from '../../api/admin/quiz/addQuiz';
import { updateQuiz } from '../../api/admin/quiz/updateQuiz';
import { deleteQuiz } from '../../api/admin/quiz/deleteQuiz';

import QuizTable from '../../features/admin/quiz/QuizTable';
import QuizForm from '../../features/admin/quiz/QuizForm';

export default function QuizPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [quizToUpdate, setQuizToUpdate] = useState<number | null>(null);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const queryClient = useQueryClient();

  const { data: quizzes } = useQuery({
    queryKey: ['quiz'],
    queryFn: getQuizzes,
  });

  const addMutation = useMutation({
    mutationKey: ['add quiz'],
    mutationFn: addQuiz,
    onSuccess: (data) => {
      message.success(data.message);
      queryClient.refetchQueries(['quiz']);
      setModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationKey: ['update quiz', quizToUpdate],
    mutationFn: async (quiz: AdminQuizRequest) =>
      updateQuiz(quizToUpdate!, quiz),
    onSuccess: (data) => {
      message.success(data.message);
      queryClient.refetchQueries(['quiz']);
      setQuizToUpdate(null);
      setUpdateModal(false);
    },
  });

  const deleteMutation = useMutation({
    mutationKey: ['delete quiz'],
    mutationFn: deleteQuiz,
    onSuccess: (data) => {
      message.success(data.message);
      queryClient.refetchQueries(['quiz']);
    },
  });

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
          Quiz
        </Typography.Title>

        <Button type="primary" onClick={() => setModalOpen(true)}>
          Add
        </Button>
      </Layout.Header>

      <div style={{ flex: 1 }}>
        {quizzes != null && (
          <QuizTable
            quizzes={quizzes}
            onDelete={(id) => deleteMutation.mutateAsync(id)}
            onSubmit={(id) => {
              setQuizToUpdate(id);
              setUpdateModal(true);
            }}
          />
        )}
      </div>

      <Modal
        open={modalOpen}
        centered
        title={'Create Technology'}
        footer={null}
        onCancel={() => setModalOpen(false)}
      >
        <QuizForm onSubmit={(quiz) => addMutation.mutateAsync(quiz)} />
      </Modal>

      {quizzes != null && (
        <Modal
          open={updateModal}
          centered
          title={'Update Quiz'}
          footer={null}
          onCancel={() => setUpdateModal(false)}
        >
          <QuizForm
            onSubmit={(quiz) => updateMutation.mutateAsync(quiz)}
            defaultData={quizzes.find(({ id }) => id === quizToUpdate)}
          />
        </Modal>
      )}
    </Layout>
  );
}
