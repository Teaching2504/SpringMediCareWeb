package com.ttkp.controllers;

import com.ttkp.repositories.DoctorRepository;
import com.ttkp.repositories.SpecialtyRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import com.ttkp.pojo.UserAccount;
import com.ttkp.repositories.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @RequestMapping({"/", "/home"})
    public String home() {
        return "index";
    }

    @RequestMapping("/doctors")
    public String doctors(Model model) {
        DoctorRepository repo = new DoctorRepository();
        model.addAttribute("doctors", repo.getDoctors());
        return "doctor";
    }

    @RequestMapping("/login")
    public String login() {
        return "login";
    }

    @PostMapping("/login")
    public String doLogin(@RequestParam("username") String username,
            @RequestParam("password") String password,
            Model model,
            HttpSession session) {
        UserRepository repo = new UserRepository();
        UserAccount user = repo.login(username, password);

        if (user == null) {
            model.addAttribute("error", "Sai tên đăng nhập/email hoặc mật khẩu");
            return "login";
        }

        session.setAttribute("currentUser", user);
        return "redirect:/";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/";
    }

    @RequestMapping("/register")
    public String register() {
        return "register";
    }

    @PostMapping("/register")
    public String doRegister(@RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam("username") String username,
            @RequestParam("password") String password,
            @RequestParam("dateOfBirth") String dateOfBirth,
            @RequestParam("gender") String gender,
            @RequestParam("address") String address,
            Model model) {

        UserRepository repo = new UserRepository();

        if (repo.existsUsername(username)) {
            model.addAttribute("error", "Tên đăng nhập đã tồn tại");
            return "register";
        }

        if (repo.existsEmail(email)) {
            model.addAttribute("error", "Email đã tồn tại");
            return "register";
        }

        repo.registerPatient(firstName, lastName, email, phone, username, password,
                dateOfBirth, gender, address);

        model.addAttribute("success", "Đăng ký thành công, hãy đăng nhập");
        return "login";
    }

    @RequestMapping("/specialties")
    public String specialties(Model model) {
        SpecialtyRepository repo = new SpecialtyRepository();
        model.addAttribute("specialties", repo.getSpecialties());
        return "specialties";
    }
}
