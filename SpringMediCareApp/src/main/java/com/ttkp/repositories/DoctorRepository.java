package com.ttkp.repositories;

import com.ttkp.configs.JdbcConfigs;
import com.ttkp.pojo.Doctor;
import com.ttkp.pojo.Specialty;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class DoctorRepository {

    public List<Doctor> getDoctors() {
        List<Doctor> doctors = new ArrayList<>();

        String sql = """
            SELECT d.doctor_id, d.full_name, d.experience_years, d.image,
                   s.specialty_id, s.name AS specialty_name
            FROM doctor d
            JOIN specialty s ON d.specialty_id = s.specialty_id
            ORDER BY d.doctor_id
        """;

        try (Connection conn = JdbcConfigs.getConn(); PreparedStatement stm = conn.prepareStatement(sql); ResultSet rs = stm.executeQuery()) {

            while (rs.next()) {
                Doctor d = new Doctor();
                d.setDoctorId(rs.getInt("doctor_id"));
                d.setFullName(rs.getString("full_name"));
                d.setExperienceYears(rs.getInt("experience_years"));
                d.setImage(rs.getString("image"));

                Specialty s = new Specialty();
                s.setSpecialtyId(rs.getInt("specialty_id"));
                s.setName(rs.getString("specialty_name"));

                d.setSpecialtyId(s);

                doctors.add(d);
            }

            System.out.println("SO LUONG BAC SI = " + doctors.size());

        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("LOI LAY DANH SACH BAC SI: " + ex.getMessage(), ex);
        }

        return doctors;
    }
}
