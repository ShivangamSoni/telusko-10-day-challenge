import { useEffect } from 'react';

import { Alert, Button, Form, Input } from 'antd';

import { Technology } from '../../../api/admin/technology/type';

export default function TechnologyForm({
  onSubmit,
  defaultData,
}: {
  defaultData?: Technology;
  onSubmit: (values: Omit<Technology, 'id'>) => void;
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldValue('name', defaultData?.name);
  }, [form, defaultData]);

  return (
    <Form
      form={form}
      onFinish={(values) => {
        onSubmit(values);
        form.resetFields();
      }}
      layout="vertical"
    >
      <Form.Item
        name="name"
        label="Technology Name"
        rules={[
          {
            required: true,
            message: 'Name is Required',
          },
        ]}
      >
        <Input defaultValue={defaultData?.name} />
        {form.getFieldError('name') && form.isFieldTouched('name') && (
          <Alert message={form.getFieldError('name')} type="error" showIcon />
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
