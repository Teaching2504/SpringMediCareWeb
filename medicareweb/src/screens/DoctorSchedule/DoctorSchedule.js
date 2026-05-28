import { useEffect, useState } from "react";
import { Alert, Button, Form, Table } from "react-bootstrap";
import Apis, { authApis, endpoints } from "../../configs/Apis";
import MySpinner from "../../components/MySpinner";

const DoctorSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [scheduleId, setScheduleId] = useState(null);
  const [doctorId, setDoctorId] = useState("");
  const [workDate, setWorkDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState("available");
  const [note, setNote] = useState("");

  const loadDoctors = async () => {
    let res = await Apis.get(endpoints.doctors);
    setDoctors(res.data);
  };

  const loadSchedules = async () => {
    let res = await Apis.get(endpoints.doctorSchedules);
    setSchedules(res.data);
  };

  const resetForm = () => {
    setScheduleId(null);
    setDoctorId("");
    setWorkDate("");
    setStartTime("");
    setEndTime("");
    setStatus("available");
    setNote("");
  };

  const saveSchedule = async (e) => {
    e.preventDefault();

    let data = {
      doctorId: {
        doctorId: parseInt(doctorId),
      },
      workDate: workDate,
      startTime: `${startTime}:00`,
      endTime: `${endTime}:00`,
      status: status,
      note: note,
    };

    setLoading(true);

    try {
      if (scheduleId === null) {
        await authApis().post(endpoints.secureDoctorSchedules, data);
        setMsg("Thêm lịch làm việc thành công!");
      } else {
        await authApis().put(
          endpoints.secureDoctorScheduleDetail(scheduleId),
          data,
        );
        setMsg("Cập nhật lịch làm việc thành công!");
      }

      resetForm();
      await loadSchedules();
    } catch (err) {
      console.error(err);
      setMsg("Có lỗi xảy ra. Kiểm tra lại đăng nhập hoặc dữ liệu nhập.");
    } finally {
      setLoading(false);
    }
  };

  const editSchedule = (s) => {
    setScheduleId(s.scheduleId);
    setDoctorId(s.doctorId?.doctorId || "");
    setWorkDate(
      s.workDate ? new Date(s.workDate).toISOString().slice(0, 10) : "",
    );
    setStartTime(
      s.startTime ? new Date(s.startTime).toTimeString().slice(0, 5) : "",
    );
    setEndTime(s.endTime ? new Date(s.endTime).toTimeString().slice(0, 5) : "");
    setStatus(s.status || "available");
    setNote(s.note || "");
    window.scrollTo(0, 0);
  };

  const deleteSchedule = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa lịch này không?") === false)
      return;

    setLoading(true);

    try {
      await authApis().delete(endpoints.secureDoctorScheduleDetail(id));
      setMsg("Xóa lịch làm việc thành công!");
      await loadSchedules();
    } catch (err) {
      console.error(err);
      setMsg("Không xóa được lịch. Kiểm tra lại quyền đăng nhập.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (value) => {
    if (!value) return "";
    return new Date(value).toLocaleDateString("vi-VN");
  };

  const formatTime = (value) => {
    if (!value) return "";
    return new Date(value).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    setLoading(true);

    Promise.all([loadDoctors(), loadSchedules()])
      .catch((err) => {
        console.error(err);
        setMsg("Không tải được dữ liệu lịch làm việc.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="main-content">
      <div className="container">
        <div className="section-box">
          <h2>Quản lý lịch làm việc bác sĩ</h2>
          <p>Thêm, cập nhật và theo dõi ca làm việc của bác sĩ.</p>
        </div>

        {msg && <Alert variant="info">{msg}</Alert>}

        <div className="feature-card" style={{ marginBottom: "30px" }}>
          <h3>
            {scheduleId === null
              ? "Thêm lịch làm việc"
              : "Cập nhật lịch làm việc"}
          </h3>

          <Form onSubmit={saveSchedule}>
            <Form.Group className="mb-3">
              <Form.Label>Bác sĩ</Form.Label>
              <Form.Select
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                required
              >
                <option value="">-- Chọn bác sĩ --</option>
                {doctors.map((d) => (
                  <option key={d.doctorId} value={d.doctorId}>
                    {d.fullName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ngày làm việc</Form.Label>
              <Form.Control
                type="date"
                value={workDate}
                onChange={(e) => setWorkDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Giờ bắt đầu</Form.Label>
              <Form.Control
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Giờ kết thúc</Form.Label>
              <Form.Control
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="available">Có lịch làm việc</option>
                <option value="unavailable">Không làm việc</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ghi chú</Form.Label>
              <Form.Control
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ví dụ: Ca sáng, ca chiều, nghỉ phép..."
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              {scheduleId === null ? "Thêm lịch" : "Cập nhật"}
            </Button>

            {scheduleId !== null && (
              <Button
                type="button"
                variant="secondary"
                className="ms-2"
                onClick={resetForm}
              >
                Hủy sửa
              </Button>
            )}
          </Form>
        </div>

        <div className="feature-card">
          <h3>Danh sách lịch làm việc</h3>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Bác sĩ</th>
                <th>Ngày</th>
                <th>Bắt đầu</th>
                <th>Kết thúc</th>
                <th>Trạng thái</th>
                <th>Ghi chú</th>
                <th>Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {schedules.map((s) => (
                <tr key={s.scheduleId}>
                  <td>{s.scheduleId}</td>
                  <td>{s.doctorId?.fullName}</td>
                  <td>{formatDate(s.workDate)}</td>
                  <td>{formatTime(s.startTime)}</td>
                  <td>{formatTime(s.endTime)}</td>
                  <td>{s.status === "available" ? "Có lịch" : "Không làm"}</td>
                  <td>{s.note}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => editSchedule(s)}
                    >
                      Sửa
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      className="ms-2"
                      onClick={() => deleteSchedule(s.scheduleId)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {loading && <MySpinner />}
      </div>
    </div>
  );
};

export default DoctorSchedule;
