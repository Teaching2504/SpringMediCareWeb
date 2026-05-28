import { useContext, useEffect, useState } from "react";
import { Alert, Table } from "react-bootstrap";
import Apis, { endpoints } from "../../configs/Apis";
import MySpinner from "../../components/MySpinner";
import { MyUserContext } from "../../configs/Contexts";

const MyAppointment = () => {
  const [user] = useContext(MyUserContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const isPatient = user !== null && user.role === "patient";

  const loadAppointments = async () => {
    let patientId = user.patientId || user.id || user.userId;

    let res = await Apis.get(`/appointments/patient/${patientId}`);
    setAppointments(res.data);
  };

  const formatDateTime = (value) => {
    if (!value) return "";
    return new Date(value).toLocaleString("vi-VN");
  };

  const getStatusName = (status) => {
    if (status === "pending") return "Chờ xác nhận";
    if (status === "confirmed") return "Đã xác nhận";
    if (status === "completed") return "Đã hoàn thành";
    if (status === "cancelled") return "Đã hủy";
    return status;
  };

  useEffect(() => {
    if (user !== null && isPatient) {
      setLoading(true);

      loadAppointments()
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
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Bác sĩ</th>
                <th>Thời gian khám</th>
                <th>Trạng thái</th>
                <th>Ghi chú</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((a) => (
                <tr key={a.appointmentId}>
                  <td>{a.appointmentId}</td>
                  <td>{a.doctorId?.fullName}</td>
                  <td>{formatDateTime(a.appointmentDate)}</td>
                  <td>{getStatusName(a.status)}</td>
                  <td>{a.notes}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {appointments.length === 0 && !loading && (
            <Alert variant="info">Bạn chưa có lịch hẹn nào.</Alert>
          )}
        </div>

        {loading && <MySpinner />}
      </div>
    </div>
  );
};

export default MyAppointment;
