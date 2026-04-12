package com.ttkp.pojo;

public class DoctorView {
    private int doctorId;
    private String fullName;
    private String specialtyName;
    private int experienceYears;
    private String image;

    public DoctorView() {
    }

    public DoctorView(int doctorId, String fullName, String specialtyName, int experienceYears, String image) {
        this.doctorId = doctorId;
        this.fullName = fullName;
        this.specialtyName = specialtyName;
        this.experienceYears = experienceYears;
        this.image = image;
    }

    public int getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(int doctorId) {
        this.doctorId = doctorId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getSpecialtyName() {
        return specialtyName;
    }

    public void setSpecialtyName(String specialtyName) {
        this.specialtyName = specialtyName;
    }

    public int getExperienceYears() {
        return experienceYears;
    }

    public void setExperienceYears(int experienceYears) {
        this.experienceYears = experienceYears;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}