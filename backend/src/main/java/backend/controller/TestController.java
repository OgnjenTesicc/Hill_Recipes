package backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping
    public String test() {
        return "ok";
    }

    @GetMapping("/error")
    public String testError() {
    throw new RuntimeException("Test greska");
    }
}