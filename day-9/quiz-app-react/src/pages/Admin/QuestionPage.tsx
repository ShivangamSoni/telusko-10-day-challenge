import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Button, Layout, Modal, Typography, message, theme } from 'antd';

import { AdminQuestionRequest } from '../../api/admin/question/type';

import { getQuestions } from '../../api/admin/question/getQuestions';
import { addQuestion } from '../../api/admin/question/addQuestion';
import { updateQuestion } from '../../api/admin/question/updateQuestion';
import { deleteQuestion } from '../../api/admin/question/deleteQuestion';

import QuestionTable from '../../features/admin/question/QuestionTable';
import QuestionForm from '../../features/admin/question/QuestionForm';

export default function QuestionPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [questionToUpdate, setQuestionToUpdate] = useState<number | null>(null);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const queryClient = useQueryClient();

  const { data: questions } = useQuery({
    queryKey: ['question'],
    queryFn: getQuestions,
  });

  const addMutation = useMutation({
    mutationKey: ['add question'],
    mutationFn: addQuestion,
    onSuccess: (data) => {
      message.success(data.message);
      queryClient.refetchQueries(['question']);
      setModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationKey: ['update technology', questionToUpdate],
    mutationFn: async (question: AdminQuestionRequest) =>
      updateQuestion(questionToUpdate!, question),
    onSuccess: (data) => {
      message.success(data.message);
      queryClient.refetchQueries(['question']);
      setQuestionToUpdate(null);
      setUpdateModal(false);
    },
  });

  const deleteMutation = useMutation({
    mutationKey: ['delete question'],
    mutationFn: deleteQuestion,
    onSuccess: (data) => {
      if (data.status === 409) {
        message.error(data.message);
      } else {
        message.success(data.message);
      }
      queryClient.refetchQueries(['question']);
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
          Question
        </Typography.Title>

        <Button type="primary" onClick={() => setModalOpen(true)}>
          Add
        </Button>
      </Layout.Header>

      <div style={{ flex: 1 }}>
        {questions != null && (
          <QuestionTable
            questions={questions}
            onDelete={(id) => deleteMutation.mutateAsync(id)}
            onSubmit={(id) => {
              setQuestionToUpdate(id);
              setUpdateModal(true);
            }}
          />
        )}
      </div>

      <Modal
        open={modalOpen}
        centered
        title={'Create Question'}
        footer={null}
        onCancel={() => setModalOpen(false)}
      >
        <QuestionForm
          onSubmit={(question) => addMutation.mutateAsync(question)}
        />
      </Modal>

      {questions && (
        <Modal
          open={updateModal}
          centered
          title={'Update Technology'}
          footer={null}
          onCancel={() => setUpdateModal(false)}
        >
          <QuestionForm
            onSubmit={(question) => updateMutation.mutateAsync(question)}
            defaultData={questions.find(({ id }) => id === questionToUpdate)}
          />
        </Modal>
      )}
    </Layout>
  );
}
