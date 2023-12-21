import { Form, Input, InputNumber, Modal } from "antd";
import { CreateExpense } from "../Expense";

interface CreateExpenseModalProps {
  onSubmit: (values: CreateExpense) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const CreateExpenseModal = ({
  onSubmit,
  isOpen,
  onClose,
}: CreateExpenseModalProps) => {
  const [form] = Form.useForm();
  return (
    <Modal
      title="Create Expense"
      onOk={() => {
        onSubmit(form.getFieldsValue());
        onClose();
      }}
      open={isOpen}
      okText="Submit"
      onCancel={onClose}
      centered
      width="34rem"
    >
      <Form
        form={form}
        layout="inline"
        onFinish={onSubmit}
        onFinishFailed={(error) => console.error(error)}
        autoComplete="off"
      >
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input style={{ width: "10rem" }} placeholder="Expense name" />
        </Form.Item>
        <Form.Item name="amount" rules={[{ required: true }]}>
          <InputNumber style={{ width: "10rem" }} placeholder="$" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
