import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Button, Layout, Modal, Typography, message, theme } from 'antd';

import { getTechnologies } from '../../api/admin/technology/getTechnologies';
import { addTechnology } from '../../api/admin/technology/addTechnology';
import { updateTechnology } from '../../api/admin/technology/updateTechnology';
import { deleteTechnology } from '../../api/admin/technology/deleteTechnology';

import TechnologyTable from '../../features/admin/technology/TechnologyTable';
import TechnologyForm from '../../features/admin/technology/TechnologyForm';

export default function TechnologyPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [technologyToUpdate, setTechnologyToUpdate] = useState<number | null>(
    null,
  );

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const queryClient = useQueryClient();
  const { data: technologies } = useQuery({
    queryKey: ['technology'],
    queryFn: getTechnologies,
  });

  const addMutation = useMutation({
    mutationKey: ['add technology'],
    mutationFn: addTechnology,
    onSuccess: () => {
      queryClient.refetchQueries(['technology']);
      setModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationKey: ['update technology', technologyToUpdate],
    mutationFn: async (name: string) =>
      await updateTechnology(technologyToUpdate!, name),
    onSuccess: () => {
      queryClient.refetchQueries(['technology']);
      setTechnologyToUpdate(null);
      setUpdateModal(false);
    },
  });

  const deleteMutation = useMutation({
    mutationKey: ['delete technology'],
    mutationFn: deleteTechnology,
    onSuccess: (data) => {
      if (data.status === 409) {
        message.error(data.message);
      } else {
        message.success(data.message);
      }
      queryClient.refetchQueries(['technology']);
      setTechnologyToUpdate(null);
      setUpdateModal(false);
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
          Technology
        </Typography.Title>

        <Button type="primary" onClick={() => setModalOpen(true)}>
          Add
        </Button>
      </Layout.Header>

      <div style={{ flex: 1 }}>
        {technologies != null && (
          <TechnologyTable
            technologies={technologies}
            onDelete={(id) => deleteMutation.mutateAsync(id)}
            onSubmit={(id) => {
              setUpdateModal(true);
              setTechnologyToUpdate(id);
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
        <TechnologyForm
          onSubmit={({ name }) => addMutation.mutateAsync(name)}
        />
      </Modal>

      {technologies != null && (
        <Modal
          open={updateModal}
          centered
          title={'Update Technology'}
          footer={null}
          onCancel={() => setUpdateModal(false)}
        >
          <TechnologyForm
            onSubmit={({ name }) => updateMutation.mutateAsync(name)}
            defaultData={technologies.find(
              ({ id }) => id === technologyToUpdate,
            )}
          />
        </Modal>
      )}
    </Layout>
  );
}
