package com.ttkp.repositories;

import com.ttkp.configs.JdbcConfigs;
import com.ttkp.pojo.DoctorView;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class DoctorRepository {

    public List<DoctorView> getDoctors() {
        List<DoctorView> doctors = new ArrayList<>();

        String sql = """
            SELECT d.doctor_id, d.full_name, s.name AS specialty_name,
                   d.experience_years, d.image
            FROM doctor d
            JOIN specialty s ON d.specialty_id = s.specialty_id
            ORDER BY d.doctor_id
        """;

        try (Connection conn = JdbcConfigs.getConn(); PreparedStatement stm = conn.prepareStatement(sql); ResultSet rs = stm.executeQuery()) {

            while (rs.next()) {
                DoctorView d = new DoctorView(
                        rs.getInt("doctor_id"),
                        rs.getString("full_name"),
                        rs.getString("specialty_name"),
                        rs.getInt("experience_years"),
                        rs.getString("image")
                );
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
