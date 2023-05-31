import { useEffect } from 'react';

import { Alert, Button, Form, Input, Radio, Space } from 'antd';

import { AnswerRequest, UserQuizQuestion } from '../../../api/user/type';

export default function PlayQuizForm({
  onSubmit,
  question,
}: {
  question: UserQuizQuestion;
  onSubmit: (values: AnswerRequest) => void;
}) {
  const [form] = Form.useForm();

  const options = [
    question.option1,
    question.option2,
    question.option3,
    question.option4,
  ];

  useEffect(() => {
    form.setFieldValue('questionId', question.id);
  }, [question, form]);

  return (
    <Form
      form={form}
      onFinish={(values) => {
        onSubmit(values);
        form.resetFields();
      }}
      layout="vertical"
    >
      <Form.Item hidden name="questionId">
        <Input />
      </Form.Item>

      <Form.Item
        name="answer"
        label={question.question}
        rules={[
          {
            required: true,
            message: 'Answer is Required',
          },
        ]}
      >
        <Radio.Group>
          <Space direction="vertical">
            {options.map((option) => (
              <Radio key={option} value={option}>
                {option}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
        {form.getFieldError('answer') && form.isFieldTouched('answer') && (
          <Alert message={form.getFieldError('answer')} type="error" showIcon />
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
