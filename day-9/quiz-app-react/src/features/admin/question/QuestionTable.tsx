import { Button, List, Table } from 'antd';

import { AdminQuestion } from '../../../api/admin/question/type';
import { Technology } from '../../../api/admin/technology/type';

export default function QuestionTable({
  questions,
  onDelete,
  onSubmit,
}: {
  questions: AdminQuestion[];
  onSubmit: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      sorter: (a: AdminQuestion, b: AdminQuestion) => a.id - b.id,
    },
    {
      title: 'Question',
      dataIndex: 'question',
      sorter: (a: AdminQuestion, b: AdminQuestion) =>
        a.question.localeCompare(b.question),
    },
    {
      title: 'Technology',
      dataIndex: 'technology',
      render: (technology: Technology) => <>{technology.name}</>,
      sorter: (a: AdminQuestion, b: AdminQuestion) =>
        a.technology.name.localeCompare(b.technology.name),
    },
    {
      title: 'Options',
      render: (_: void, record: AdminQuestion) => {
        const options = [
          record.option1,
          record.option2,
          record.option3,
          record.option4,
        ];

        return (
          <List
            dataSource={options}
            renderItem={(option) => (
              <List.Item key={option}>{option}</List.Item>
            )}
          />
        );
      },
    },
    {
      title: 'Answer',
      dataIndex: 'answer',
    },
    {
      title: 'Actions',
      render: (_: void, record: AdminQuestion) => (
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
        pageSize: 5,
      }}
      columns={columns}
      dataSource={questions}
    />
  );
}
