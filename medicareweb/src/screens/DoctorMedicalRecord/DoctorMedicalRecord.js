import { useContext, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { MyUserContext } from "../../configs/Contexts";
import { authApis, endpoints } from "../../configs/Apis";
import MySpinner from "../../components/MySpinner";
import MedicalRecordDetail from "../../components/MedicalRecordDetail";

const DoctorMedicalRecord = () => {
  const [user] = useContext(MyUserContext);
  const [q] = useSearchParams();
  const [medicalRecord, setMedicalRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const appointmentId = q.get("appointmentId");
  const isDoctor = user !== null && user.role === "doctor";

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

          <p className="text-secondary mb-4">
            Mã lịch hẹn:{" "}
            <span className="fw-semibold text-dark">{appointmentId}</span>
          </p>
        </div>

        {msg && <Alert variant="info">{msg}</Alert>}

        {medicalRecord && <MedicalRecordDetail medicalRecord={medicalRecord} />}

        {loading && <MySpinner />}
      </div>
    </div>
  );
};

export default DoctorMedicalRecord;
