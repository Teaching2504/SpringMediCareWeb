package com.ttkp.repositories;

import com.ttkp.pojo.Appointment;
import java.util.List;

public interface AppointmentRepository {

    boolean addAppointment(Appointment appointment);

    List<Appointment> getAppointmentsByPatientId(int patientId);

    Appointment getAppointmentById(int id);

    boolean updateAppointmentStatus(int id, String status);
}