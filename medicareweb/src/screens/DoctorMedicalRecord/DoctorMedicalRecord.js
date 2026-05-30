import { useContext, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { MyUserContext } from "../../configs/Contexts";
import { authApis, endpoints } from "../../configs/Apis";
import MySpinner from "../../components/MySpinner";

const DoctorMedicalRecord = () => {
  const [user] = useContext(MyUserContext);
  const [q] = useSearchParams();
  const [medicalRecord, setMedicalRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const appointmentId = q.get("appointmentId");
  const isDoctor = user !== null && user.role === "doctor";

  const formatDateTime = (value) => {
    if (!value) return "";

    return new Date(value).toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const loadMedicalRecord = async () => {
    setMsg("");

    let res = await authApis().get(
      endpoints.medicalRecordByAppointment(appointmentId),
    );

    setMedicalRecord(res.data);
  };

  useEffect(() => {
    if (user !== null && isDoctor && appointmentId) {
      setLoading(true);

      loadMedicalRecord()
        .catch((err) => {
          console.error(err);

          if (err.response?.status === 404) {
            setMedicalRecord(null);
            setMsg("Lịch hẹn này chưa có hồ sơ bệnh án.");
          } else {
            setMsg("Không tải được hồ sơ bệnh án.");
          }
        })
        .finally(() => setLoading(false));
    }
  }, [user, appointmentId]);

  if (user === null) {
    return (
      <div className="main-content">
        <div className="container">
          <Alert variant="warning">
            Vui lòng đăng nhập để xem hồ sơ bệnh án.
          </Alert>
        </div>
      </div>
    );
  }

  if (!isDoctor) {
    return (
      <div className="main-content">
        <div className="container">
          <Alert variant="danger">
            Chỉ tài khoản bác sĩ mới được xem trang này.
          </Alert>
        </div>
      </div>
    );
  }

  if (!appointmentId) {
    return (
      <div className="main-content">
        <div className="container">
          <Alert variant="warning">Không xác định được lịch hẹn.</Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="container">
        <div className="section-box">
          <h2>Chi tiết hồ sơ bệnh án</h2>

          <p>
            Mã lịch hẹn: <strong>{appointmentId}</strong>
          </p>
        </div>

        {msg && <Alert variant="info">{msg}</Alert>}

        {medicalRecord && (
          <div className="feature-card">
            <p>
              <strong>Mã hồ sơ:</strong> {medicalRecord.recordId}
            </p>

            <p>
              <strong>Bệnh nhân:</strong> {medicalRecord.patientId?.fullName}
            </p>

            <p>
              <strong>Bác sĩ:</strong> {medicalRecord.doctorId?.fullName}
            </p>

            <p>
              <strong>Chẩn đoán:</strong> {medicalRecord.diagnosis}
            </p>

            <p>
              <strong>Điều trị:</strong> {medicalRecord.treatment}
            </p>

            <p>
              <strong>Ngày tạo:</strong>{" "}
              {formatDateTime(medicalRecord.createdDate)}
            </p>
          </div>
        )}

        {loading && <MySpinner />}
      </div>
    </div>
  );
};

export default DoctorMedicalRecord;
