package com.ttkp.repositories;

import com.ttkp.configs.JdbcConfigs;
import com.ttkp.pojo.SpecialtyView;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class SpecialtyRepository {

    public List<SpecialtyView> getSpecialties() {
        List<SpecialtyView> specialties = new ArrayList<>();

        String sql = """
            SELECT specialty_id, name, description, image
            FROM specialty
            ORDER BY specialty_id
        """;

        try (Connection conn = JdbcConfigs.getConn(); PreparedStatement stm = conn.prepareStatement(sql); ResultSet rs = stm.executeQuery()) {

            while (rs.next()) {
                SpecialtyView s = new SpecialtyView(
                        rs.getInt("specialty_id"),
                        rs.getString("name"),
                        rs.getString("description"),
                        rs.getString("image")
                );
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
