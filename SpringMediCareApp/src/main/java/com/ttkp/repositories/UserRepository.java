package com.ttkp.repositories;

import com.ttkp.configs.JdbcConfigs;
import com.ttkp.pojo.UserAccount;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

public class UserRepository {

    public UserAccount login(String usernameOrEmail, String password) {
        String sql = """
            SELECT id, first_name, last_name, username, role
            FROM user
            WHERE (username = ? OR email = ?) AND password = ?
            LIMIT 1
        """;

        try (Connection conn = JdbcConfigs.getConn(); PreparedStatement stm = conn.prepareStatement(sql)) {

            stm.setString(1, usernameOrEmail);
            stm.setString(2, usernameOrEmail);
            stm.setString(3, password);

            try (ResultSet rs = stm.executeQuery()) {
                if (rs.next()) {
                    return new UserAccount(
                            rs.getInt("id"),
                            rs.getString("first_name"),
                            rs.getString("last_name"),
                            rs.getString("username"),
                            rs.getString("role")
                    );
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("LOI DANG NHAP: " + ex.getMessage(), ex);
        }

        return null;
    }

    public boolean existsUsername(String username) {
        String sql = "SELECT id FROM user WHERE username = ? LIMIT 1";

        try (Connection conn = JdbcConfigs.getConn(); PreparedStatement stm = conn.prepareStatement(sql)) {

            stm.setString(1, username);

            try (ResultSet rs = stm.executeQuery()) {
                return rs.next();
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("LOI KIEM TRA USERNAME", ex);
        }
    }

    public boolean existsEmail(String email) {
        String sql = "SELECT id FROM user WHERE email = ? LIMIT 1";

        try (Connection conn = JdbcConfigs.getConn(); PreparedStatement stm = conn.prepareStatement(sql)) {

            stm.setString(1, email);

            try (ResultSet rs = stm.executeQuery()) {
                return rs.next();
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("LOI KIEM TRA EMAIL", ex);
        }
    }

    public void registerPatient(String firstName, String lastName, String email, String phone,
            String username, String password, String dateOfBirth,
            String gender, String address) {

        String insertUser = """
            INSERT INTO user(first_name, last_name, email, phone, username, password, role)
            VALUES (?, ?, ?, ?, ?, ?, 'patient')
        """;

        String insertPatient = """
            INSERT INTO patient(user_id, full_name, date_of_birth, gender, address)
            VALUES (?, ?, ?, ?, ?)
        """;

        try (Connection conn = JdbcConfigs.getConn()) {
            conn.setAutoCommit(false);

            int userId;

            try (PreparedStatement stmUser = conn.prepareStatement(insertUser, Statement.RETURN_GENERATED_KEYS)) {
                stmUser.setString(1, firstName);
                stmUser.setString(2, lastName);
                stmUser.setString(3, email);
                stmUser.setString(4, phone);
                stmUser.setString(5, username);
                stmUser.setString(6, password);
                stmUser.executeUpdate();

                try (ResultSet rs = stmUser.getGeneratedKeys()) {
                    if (rs.next()) {
                        userId = rs.getInt(1);
                    } else {
                        throw new RuntimeException("Khong lay duoc user_id moi tao");
                    }
                }
            }

            try (PreparedStatement stmPatient = conn.prepareStatement(insertPatient)) {
                stmPatient.setInt(1, userId);
                stmPatient.setString(2, firstName + " " + lastName);
                stmPatient.setDate(3, Date.valueOf(dateOfBirth));
                stmPatient.setString(4, gender);
                stmPatient.setString(5, address);
                stmPatient.executeUpdate();
            }

            conn.commit();

        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException("LOI DANG KY TAI KHOAN", ex);
        }
    }
}
