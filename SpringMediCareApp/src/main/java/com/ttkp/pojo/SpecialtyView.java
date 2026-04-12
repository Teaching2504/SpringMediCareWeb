package com.ttkp.pojo;

public class SpecialtyView {
    private int specialtyId;
    private String name;
    private String description;
    private String image;

    public SpecialtyView() {
    }

    public SpecialtyView(int specialtyId, String name, String description, String image) {
        this.specialtyId = specialtyId;
        this.name = name;
        this.description = description;
        this.image = image;
    }

    public int getSpecialtyId() {
        return specialtyId;
    }

    public void setSpecialtyId(int specialtyId) {
        this.specialtyId = specialtyId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
