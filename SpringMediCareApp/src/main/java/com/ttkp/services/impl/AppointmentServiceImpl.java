package com.ttkp.services.impl;

import com.ttkp.configs.HibernateConfigs;
import com.ttkp.pojo.Appointment;
import com.ttkp.pojo.Doctor;
import com.ttkp.pojo.Patient;
import com.ttkp.services.PatientService;
import com.ttkp.repositories.AppointmentRepository;
import com.ttkp.repositories.DoctorRepository;
import com.ttkp.services.AppointmentService;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepo;

    @Autowired
    private PatientService patientService;
    
    @Autowired
    private DoctorRepository doctorRepo;
    
    @Override
    public boolean addAppointment(int patientId, int doctorId,
            String appointmentDate, String notes) {

        try {
            
            Patient patient = this.patientService.getPatientById(patientId);
            Doctor doctor = this.doctorRepo.getDoctorById(doctorId);

            if (patient == null || doctor == null) {
                return false;
            }

            LocalDateTime ldt = LocalDateTime.parse(appointmentDate);
            Date date = Date.from(ldt.atZone(ZoneId.systemDefault()).toInstant());

            Appointment a = new Appointment();
            a.setPatientId(patient);
            a.setDoctorId(doctor);
            a.setAppointmentDate(date);
            a.setNotes(notes);
            a.setStatus("pending");
            a.setCreatedDate(new Date());

            return this.appointmentRepo.addAppointment(a);
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<Appointment> getAppointmentsByPatientId(int patientId) {
        return this.appointmentRepo.getAppointmentsByPatientId(patientId);
    }

    @Override
    public Appointment getAppointmentById(int id) {
        return this.appointmentRepo.getAppointmentById(id);
    }

    @Override
    public boolean cancelAppointment(int id) {
        return this.appointmentRepo.updateAppointmentStatus(id, "cancelled");
    }

    @Override
    public boolean confirmAppointment(int id) {
        return this.appointmentRepo.updateAppointmentStatus(id, "confirmed");
    }

    @Override
    public boolean updateAppointmentStatus(int id, String status) {
        return this.appointmentRepo.updateAppointmentStatus(id, status);
    }
}