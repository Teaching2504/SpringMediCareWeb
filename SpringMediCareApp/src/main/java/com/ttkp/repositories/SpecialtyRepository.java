package com.ttkp.repositories;

import com.ttkp.configs.JdbcConfigs;
import com.ttkp.pojo.Specialty;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class SpecialtyRepository {

    public List<Specialty> getSpecialties() {
        List<Specialty> specialties = new ArrayList<>();

        String sql = """
            SELECT specialty_id, name, description, image
            FROM specialty
            ORDER BY specialty_id
        """;

        try (Connection conn = JdbcConfigs.getConn(); PreparedStatement stm = conn.prepareStatement(sql); ResultSet rs = stm.executeQuery()) {

            while (rs.next()) {
                Specialty s = new Specialty();
                s.setSpecialtyId(rs.getInt("specialty_id"));
                s.setName(rs.getString("name"));
                s.setDescription(rs.getString("description"));
                s.setImage(rs.getString("image"));

                specialties.add(s);
            }

            System.out.println("SO LUONG CHUYEN KHOA = " + specialties.size());

        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("LOI LAY DANH SACH CHUYEN KHOA: " + ex.getMessage(), ex);
        }

        return specialties;
    }
}
