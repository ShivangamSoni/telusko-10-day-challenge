import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Alert, Button, Form, Input, Select } from 'antd';

import {
  AdminQuestion,
  AdminQuestionRequest,
} from '../../../api/admin/question/type';
import { getTechnologies } from '../../../api/admin/technology/getTechnologies';

export default function QuestionForm({
  onSubmit,
  defaultData,
}: {
  defaultData?: AdminQuestion;
  onSubmit: (values: AdminQuestionRequest) => void;
}) {
  const [form] = Form.useForm();

  const { data: technologies } = useQuery({
    queryKey: ['technology'],
    queryFn: getTechnologies,
  });

  useEffect(() => {
    form.setFieldValue('question', defaultData?.question);
    form.setFieldValue('option1', defaultData?.option1);
    form.setFieldValue('option2', defaultData?.option2);
    form.setFieldValue('option3', defaultData?.option3);
    form.setFieldValue('option4', defaultData?.option4);
    form.setFieldValue('answer', defaultData?.answer);
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
        name="question"
        label="Question"
        rules={[
          {
            required: true,
            message: 'Question is Required',
          },
        ]}
      >
        <Input />
        {form.getFieldError('question') && form.isFieldTouched('question') && (
          <Alert
            message={form.getFieldError('question')}
            type="error"
            showIcon
          />
        )}
      </Form.Item>

      <Form.Item
        name="option1"
        label="Option 1"
        rules={[
          {
            required: true,
            message: 'Option 1 is Required',
          },
        ]}
      >
        <Input />
        {form.getFieldError('option1') && form.isFieldTouched('option1') && (
          <Alert
            message={form.getFieldError('option1')}
            type="error"
            showIcon
          />
        )}
      </Form.Item>

      <Form.Item
        name="option2"
        label="Option 2"
        rules={[
          {
            required: true,
            message: 'Option 2 is Required',
          },
        ]}
      >
        <Input />
        {form.getFieldError('option2') && form.isFieldTouched('option2') && (
          <Alert
            message={form.getFieldError('option2')}
            type="error"
            showIcon
          />
        )}
      </Form.Item>

      <Form.Item
        name="option3"
        label="Option 3"
        rules={[
          {
            required: true,
            message: 'Option 3 is Required',
          },
        ]}
      >
        <Input />
        {form.getFieldError('option3') && form.isFieldTouched('option3') && (
          <Alert
            message={form.getFieldError('option3')}
            type="error"
            showIcon
          />
        )}
      </Form.Item>

      <Form.Item
        name="option4"
        label="Option 4"
        rules={[
          {
            required: true,
            message: 'Option 4 is Required',
          },
        ]}
      >
        <Input />
        {form.getFieldError('option4') && form.isFieldTouched('option4') && (
          <Alert
            message={form.getFieldError('option4')}
            type="error"
            showIcon
          />
        )}
      </Form.Item>

      <Form.Item
        name="answer"
        label="Answer"
        rules={[
          {
            required: true,
            message: 'Answer is Required',
          },
        ]}
      >
        <Input />
        {form.getFieldError('answer') && form.isFieldTouched('answer') && (
          <Alert message={form.getFieldError('answer')} type="error" showIcon />
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

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
