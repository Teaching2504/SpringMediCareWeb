package com.ttkp.configs;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class JdbcConfigs {
    private static final String URL =
            "jdbc:mysql://localhost:3306/medicare_db"
            + "?useSSL=false"
            + "&allowPublicKeyRetrieval=true"
            + "&serverTimezone=UTC"
            + "&useUnicode=true"
            + "&characterEncoding=UTF-8";

    private static final String USER = "root";
    private static final String PASSWORD = "root";

    public static Connection getConn() throws SQLException {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException ex) {
            throw new SQLException("Khong tim thay MySQL JDBC Driver", ex);
        }
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}