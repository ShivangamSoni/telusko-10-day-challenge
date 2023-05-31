import { Button, Table } from 'antd';

import { Technology } from '../../../api/admin/technology/type';

export default function TechnologyTable({
  technologies,
  onDelete,
  onSubmit,
}: {
  technologies: Technology[];
  onSubmit: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      sorter: (a: Technology, b: Technology) => a.id - b.id,
    },
    {
      title: 'Technology Name',
      dataIndex: 'name',
      sorter: (a: Technology, b: Technology) => a.name.localeCompare(b.name),
    },
    {
      title: 'Actions',
      render: (_: void, record: Technology) => (
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
      dataSource={technologies}
    />
  );
}
