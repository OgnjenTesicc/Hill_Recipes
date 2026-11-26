package backend.controller;
import java.util.Map;

import backend.dto.LoginRequest;
import backend.service.AuthService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.dto.RegisterRequest;
import backend.service.UserService;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final AuthService authService;

    public AuthController(UserService userService, AuthService authService) {
    this.userService = userService;
    this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request) {

    userService.register(request);

    return ResponseEntity.status(HttpStatus.CREATED)
    .body("Registration successful. Please check your email to activate your account.");
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@Valid @RequestBody LoginRequest request) {

    String token = authService.login(request);

    return ResponseEntity.ok(Map.of("token", token));
    }

    @GetMapping("/activate")
    public ResponseEntity<String> activate(@RequestParam String token) {

    try {
    userService.activate(token);

    return ResponseEntity.ok("Account successfully activated");

    } catch (IllegalArgumentException e) {
    return ResponseEntity.badRequest().body(e.getMessage());
    }
    }

    @GetMapping("/check-username")
    public ResponseEntity<Boolean> checkUsername(@RequestParam String username) {

    return ResponseEntity.ok(userService.isUsernameAvailable(username));
    }

    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {

    return ResponseEntity.ok(userService.isEmailAvailable(email));
    }

}