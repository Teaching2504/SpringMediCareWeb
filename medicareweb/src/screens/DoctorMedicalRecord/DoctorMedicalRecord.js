import { useContext, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { MyUserContext } from "../../configs/Contexts";
import { authApis, endpoints } from "../../configs/Apis";
import MySpinner from "../../components/MySpinner";
import MedicalRecordDetail from "../../components/MedicalRecordDetail";
import MedicalRecordForm from "../../components/MedicalRecordForm";

const DoctorMedicalRecord = () => {
  const [user] = useContext(MyUserContext);
  const [q] = useSearchParams();

  const [medicalRecord, setMedicalRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [editing, setEditing] = useState(false);

  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");

  const appointmentId = q.get("appointmentId");
  const isDoctor = user !== null && user.role === "doctor";

  const loadMedicalRecord = async () => {
    let res = await authApis().get(
      endpoints.medicalRecordByAppointment(appointmentId),
    );

    setMedicalRecord(res.data);
  };

  const openEditForm = () => {
    setDiagnosis(medicalRecord.diagnosis);
    setTreatment(medicalRecord.treatment);
    setMsg("");
    setEditing(true);
  };

  const cancelEdit = () => {
    setDiagnosis("");
    setTreatment("");
    setMsg("");
    setEditing(false);
  };

  const updateMedicalRecord = async (e) => {
    e.preventDefault();

    if (!diagnosis.trim() || !treatment.trim()) {
      setMsg("Vui lòng nhập đầy đủ chẩn đoán và hướng điều trị.");
      return;
    }

    setSaving(true);
    setMsg("");

    try {
      await authApis().put(
        endpoints.medicalRecordDetail(medicalRecord.recordId),
        {
          diagnosis,
          treatment,
        },
      );

      await loadMedicalRecord();

      setEditing(false);
      setMsg("Cập nhật hồ sơ bệnh án thành công.");
    } catch (err) {
      console.error(err);
      setMsg("Cập nhật hồ sơ bệnh án thất bại.");
    } finally {
      setSaving(false);
    }
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

        {msg && (
          <Alert variant={msg.includes("thành công") ? "success" : "info"}>
            {msg}
          </Alert>
        )}

        {medicalRecord && (
          <MedicalRecordDetail
            medicalRecord={medicalRecord}
            onEdit={openEditForm}
          />
        )}

        {medicalRecord && editing && (
          <MedicalRecordForm
            title="Cập nhật hồ sơ bệnh án"
            diagnosis={diagnosis}
            treatment={treatment}
            setDiagnosis={setDiagnosis}
            setTreatment={setTreatment}
            onSubmit={updateMedicalRecord}
            saving={saving}
            submitLabel="Lưu thay đổi"
            onCancel={cancelEdit}
          />
        )}

        {loading && <MySpinner />}
      </div>
    </div>
  );
};

export default DoctorMedicalRecord;
