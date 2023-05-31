import { Button, List, Table } from 'antd';
import { AdminQuiz } from '../../../api/admin/quiz/type';
import { Technology } from '../../../api/admin/technology/type';

export default function QuizTable({
  quizzes,
  onDelete,
  onSubmit,
}: {
  quizzes: AdminQuiz[];
  onSubmit: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      sorter: (a: AdminQuiz, b: AdminQuiz) => a.id - b.id,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a: AdminQuiz, b: AdminQuiz) => a.name.localeCompare(b.name),
    },
    {
      title: 'Technology',
      dataIndex: 'technology',
      render: (technology: Technology) => <>{technology.name}</>,
      sorter: (a: AdminQuiz, b: AdminQuiz) =>
        a.technology.name.localeCompare(b.technology.name),
    },
    {
      title: 'Questions',
      render: (_: void, record: AdminQuiz) => (
        <List
          pagination={{
            position: 'bottom',
            align: 'center',
            pageSize: 5,
          }}
          dataSource={record.questions}
          renderItem={({ id, question }) => (
            <List.Item key={id}>{question}</List.Item>
          )}
        />
      ),
    },
    {
      title: 'Actions',
      render: (_: void, record: AdminQuiz) => (
        <div key={record.id}>
          <Button onClick={() => onSubmit(record.id)}>Edit</Button>
          <Button onClick={() => onDelete(record.id)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      pagination={{
        showQuickJumper: true,
        position: ['topCenter', 'bottomCenter'],
      }}
      columns={columns}
      dataSource={quizzes}
    />
  );
}
