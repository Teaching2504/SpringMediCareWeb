import { useContext, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { MyUserContext } from "../../configs/Contexts";
import { authApis, endpoints } from "../../configs/Apis";
import MySpinner from "../../components/MySpinner";
import MedicalRecordDetail from "../../components/MedicalRecordDetail";
import MedicalRecordForm from "../../components/MedicalRecordForm";
import TestResultList from "../../components/TestResultList";
import TestResultForm from "../../components/TestResultForm";

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

  const [testResults, setTestResults] = useState([]);
  const [testName, setTestName] = useState("");
  const [testResult, setTestResult] = useState("");
  const [savingTestResult, setSavingTestResult] = useState(false);

  const appointmentId = q.get("appointmentId");
  const isDoctor = user !== null && user.role === "doctor";

  const loadMedicalRecord = async () => {
    let res = await authApis().get(
      endpoints.medicalRecordByAppointment(appointmentId),
    );

    setMedicalRecord(res.data);

    await loadTestResults(res.data.recordId);
  };

  const loadTestResults = async (recordId) => {
    let res = await authApis().get(
      endpoints.testResultsByMedicalRecord(recordId),
    );

    setTestResults(res.data);
  };

  const addTestResult = async (e) => {
    e.preventDefault();

    if (!testName.trim() || !testResult.trim()) {
      setMsg("Vui lòng nhập đầy đủ tên xét nghiệm và kết quả.");
      return;
    }

    setSavingTestResult(true);
    setMsg("");

    try {
      await authApis().post(endpoints.testResults, {
        recordId: medicalRecord.recordId,
        testName,
        result: testResult,
      });

      await loadTestResults(medicalRecord.recordId);

      setTestName("");
      setTestResult("");
      setMsg("Thêm kết quả xét nghiệm thành công.");
    } catch (err) {
      console.error(err);
      setMsg("Thêm kết quả xét nghiệm thất bại.");
    } finally {
      setSavingTestResult(false);
    }
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
            showEdit={true}
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
        {medicalRecord && <TestResultList testResults={testResults} />}

        {medicalRecord && (
          <TestResultForm
            testName={testName}
            result={testResult}
            setTestName={setTestName}
            setResult={setTestResult}
            onSubmit={addTestResult}
            saving={savingTestResult}
          />
        )}
        {loading && <MySpinner />}
      </div>
    </div>
  );
};

export default DoctorMedicalRecord;
