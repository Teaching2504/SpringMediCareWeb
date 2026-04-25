package com.ttkp.controllers;

import com.ttkp.pojo.User;
import com.ttkp.services.DrugService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class DrugController {

    @Autowired
    private DrugService drugService;

    @RequestMapping("/drugs")
    public String drugs(Model model, HttpSession session) {
        User u = (User) session.getAttribute("currentUser");

        if (u == null) {
            return "redirect:/login";
        }

        if (!u.getRole().equals("admin") && !u.getRole().equals("staff")) {
            return "redirect:/";
        }

        model.addAttribute("drugs", this.drugService.getDrugs());
        return "drugs";
    }
}
