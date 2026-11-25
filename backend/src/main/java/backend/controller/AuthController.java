package backend.controller;

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

    public AuthController(UserService userService) {
    this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request) {

    userService.register(request);

    return ResponseEntity.status(HttpStatus.CREATED)
    .body("Registration successful. Please check your email to activate your account.");
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