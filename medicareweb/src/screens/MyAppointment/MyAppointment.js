import { useContext, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import Apis, { authApis, endpoints } from "../../configs/Apis";
import MySpinner from "../../components/MySpinner";
import { MyUserContext } from "../../configs/Contexts";
import AppointmentTable from "../../components/AppointmentTable";
import PaymentForm from "../../components/PaymentForm";
const MyAppointment = () => {
  const [user] = useContext(MyUserContext);
  const [appointments, setAppointments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("banking");
  const [savingPayment, setSavingPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const isPatient = user !== null && user.role === "patient";

  const loadAppointments = async () => {
    let patientId = user.patientId || user.id || user.userId;

    let res = await Apis.get(`/appointments/patient/${patientId}`);
    setAppointments(res.data);
  };
  const loadPayments = async () => {
    let res = await authApis().get(endpoints.payments);

    setPayments(Array.isArray(res.data) ? res.data : []);
  };
  const openPaymentForm = (appointment) => {
    setSelectedAppointment(appointment);
    setAmount("");
    setPaymentMethod("banking");
    setMsg("");
  };
  const closePaymentForm = () => {
    setSelectedAppointment(null);
    setAmount("");
    setPaymentMethod("banking");
  };
  const pay = async () => {
    if (!selectedAppointment || Number(amount) <= 0) {
      setMsg("Vui lòng nhập số tiền hợp lệ.");
      return;
    }

    setSavingPayment(true);
    setMsg("");

    try {
      await authApis().post(endpoints.pay, {
        appointmentId: selectedAppointment.appointmentId,
        amount: Number(amount),
        paymentMethod,
      });

      await loadPayments();

      closePaymentForm();
      setMsg("Thanh toán thành công.");
    } catch (err) {
      console.error(err);
      setMsg("Thanh toán thất bại.");
    } finally {
      setSavingPayment(false);
    }
  };
  useEffect(() => {
    if (user !== null && isPatient) {
      setLoading(true);

      Promise.all([loadAppointments(), loadPayments()])
        .catch((err) => {
          console.error(err);
          setMsg("Không tải được danh sách lịch hẹn.");
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (user === null) {
    return (
      <div className="main-content">
        <div className="container">
          <Alert variant="warning">Vui lòng đăng nhập để xem lịch hẹn.</Alert>
        </div>
      </div>
    );
  }

  if (!isPatient) {
    return (
      <div className="main-content">
        <div className="container">
          <Alert variant="danger">
            Chỉ tài khoản bệnh nhân mới được xem trang này.
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="container">
        <div className="section-box">
          <h2>Lịch hẹn của tôi</h2>
          <p>Danh sách các lịch hẹn khám bệnh bạn đã đặt.</p>
        </div>

        {msg && <Alert variant="info">{msg}</Alert>}

        <div className="feature-card">
          <AppointmentTable
            appointments={appointments}
            showDoctor={true}
            showPaymentAction={true}
            payments={payments}
            onPay={openPaymentForm}
          />

          {appointments.length === 0 && !loading && (
            <Alert variant="info">Bạn chưa có lịch hẹn nào.</Alert>
          )}
        </div>
        <PaymentForm
          show={selectedAppointment !== null}
          appointment={selectedAppointment}
          amount={amount}
          setAmount={setAmount}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          saving={savingPayment}
          onSubmit={pay}
          onClose={closePaymentForm}
        />

        {loading && <MySpinner />}
      </div>
    </div>
  );
};

export default MyAppointment;
