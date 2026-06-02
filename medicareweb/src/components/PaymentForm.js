import { Button, Form, Modal } from "react-bootstrap";

const PaymentForm = ({
  show,
  appointment,
  amount,
  setAmount,
  paymentMethod,
  setPaymentMethod,
  saving,
  onSubmit,
  onClose,
}) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Thanh toán lịch hẹn</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Mã lịch hẹn: <strong>{appointment?.appointmentId}</strong>
        </p>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Số tiền</Form.Label>

            <Form.Control
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Nhập số tiền cần thanh toán"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phương thức thanh toán</Form.Label>

            <Form.Select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="banking">Chuyển khoản ngân hàng</option>
              <option value="cash">Tiền mặt</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="button" variant="secondary" onClick={onClose}>
          Đóng
        </Button>

        <Button
          type="button"
          variant="primary"
          disabled={saving}
          onClick={onSubmit}
        >
          {saving ? "Đang thanh toán..." : "Xác nhận thanh toán"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentForm;
