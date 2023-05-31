import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Alert, Button, Form, Input, Select } from 'antd';

import { AdminQuiz, AdminQuizRequest } from '../../../api/admin/quiz/type';
import { getTechnologies } from '../../../api/admin/technology/getTechnologies';
import { getQuestions } from '../../../api/admin/question/getQuestions';

export default function QuizForm({
  onSubmit,
  defaultData,
}: {
  defaultData?: AdminQuiz;
  onSubmit: (values: AdminQuizRequest) => void;
}) {
  const [form] = Form.useForm();

  const { data: technologies } = useQuery({
    queryKey: ['technology'],
    queryFn: getTechnologies,
  });

  const { data: questions } = useQuery({
    queryKey: ['question'],
    queryFn: getQuestions,
  });

  useEffect(() => {
    form.setFieldValue('name', defaultData?.name);
    form.setFieldValue(
      'question_ids',
      defaultData?.questions.map(({ id }) => id),
    );
    form.setFieldValue('technology_id', defaultData?.technology.id);
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
        label="Quiz Name"
        rules={[
          {
            required: true,
            message: 'Quiz Name is Required',
          },
        ]}
      >
        <Input />
        {form.getFieldError('name') && form.isFieldTouched('name') && (
          <Alert message={form.getFieldError('name')} type="error" showIcon />
        )}
      </Form.Item>

      <Form.Item
        name="technology_id"
        label="Technology"
        rules={[
          {
            required: true,
            message: 'Technology is Required',
          },
        ]}
      >
        <Select>
          {technologies?.map(({ id, name }) => (
            <Select.Option key={id} value={id}>
              {name}
            </Select.Option>
          ))}
        </Select>
        {form.getFieldError('technology_id') &&
          form.isFieldTouched('technology_id') && (
            <Alert
              message={form.getFieldError('technology_id')}
              type="error"
              showIcon
            />
          )}
      </Form.Item>

      <Form.Item
        name="question_ids"
        label="Questions"
        rules={[
          {
            required: true,
            message: 'Questions are Required',
          },
        ]}
      >
        <Select mode="multiple">
          {questions?.map(({ id, question }) => (
            <Select.Option key={id} value={id}>
              {question}
            </Select.Option>
          ))}
        </Select>
        {form.getFieldError('technology_id') &&
          form.isFieldTouched('technology_id') && (
            <Alert
              message={form.getFieldError('technology_id')}
              type="error"
              showIcon
            />
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
