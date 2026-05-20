package com.ttkp.controllers;

import com.ttkp.pojo.Appointment;
import com.ttkp.services.AppointmentService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ApiAppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping(value = "/appointments", consumes = "application/json")
    public ResponseEntity<?> addAppointment(@RequestBody Map<String, String> params) {
        boolean result = this.appointmentService.addAppointment(
                Integer.parseInt(params.get("patientId")),
                Integer.parseInt(params.get("doctorId")),
                params.get("appointmentDate"),
                params.get("notes")
        );

        if (result)
            return new ResponseEntity<>("Đặt lịch thành công", HttpStatus.CREATED);

        return new ResponseEntity<>("Đặt lịch thất bại", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/patient/appointments/{patientId}")
    public ResponseEntity<List<Appointment>> getPatientAppointments(
            @PathVariable(value = "patientId") int patientId) {

        return new ResponseEntity<>(
                this.appointmentService.getAppointmentsByPatientId(patientId),
                HttpStatus.OK
        );
    }

    @GetMapping("/appointments/{id}")
    public ResponseEntity<Appointment> getAppointmentById(
            @PathVariable(value = "id") int id) {

        Appointment a = this.appointmentService.getAppointmentById(id);

        if (a != null)
            return new ResponseEntity<>(a, HttpStatus.OK);

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/appointments/{id}/cancel")
    public ResponseEntity<?> cancelAppointment(
            @PathVariable(value = "id") int id) {

        if (this.appointmentService.cancelAppointment(id))
            return new ResponseEntity<>("Hủy lịch thành công", HttpStatus.OK);

        return new ResponseEntity<>("Hủy lịch thất bại", HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/appointments/{id}/confirm")
    public ResponseEntity<?> confirmAppointment(
            @PathVariable(value = "id") int id) {

        if (this.appointmentService.confirmAppointment(id))
            return new ResponseEntity<>("Xác nhận lịch thành công", HttpStatus.OK);

        return new ResponseEntity<>("Xác nhận lịch thất bại", HttpStatus.BAD_REQUEST);
    }

    @PutMapping(value = "/appointments/{id}/status", consumes = "application/json")
    public ResponseEntity<?> updateStatus(
            @PathVariable(value = "id") int id,
            @RequestBody Map<String, String> params) {

        if (this.appointmentService.updateAppointmentStatus(id, params.get("status")))
            return new ResponseEntity<>("Cập nhật trạng thái thành công", HttpStatus.OK);

        return new ResponseEntity<>("Cập nhật trạng thái thất bại", HttpStatus.BAD_REQUEST);
    }
}