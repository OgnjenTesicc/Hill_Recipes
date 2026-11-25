package backend.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import backend.dto.RegisterRequest;
import backend.entity.ActivationToken;
import backend.entity.User;
import backend.repository.ActivationTokenRepository;
import backend.repository.UserRepository;

import backend.repository.RoleRepository;
import backend.entity.Role;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import backend.service.EmailService;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final ActivationTokenRepository activationTokenRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final EmailService emailService;

    public UserService(UserRepository userRepository, ActivationTokenRepository activationTokenRepository,
    RoleRepository roleRepository, EmailService emailService) {
    this.userRepository = userRepository;
    this.activationTokenRepository = activationTokenRepository;
    this.roleRepository = roleRepository;
    this.emailService = emailService;
    this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Transactional
    public void register(RegisterRequest request) {

    if (userRepository.existsByUsername(request.getUsername())) {
    throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already exists");
    }

    if (userRepository.existsByEmail(request.getEmail())) {
    throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
    }

    User user = new User();

    user.setUsername(request.getUsername());
    user.setEmail(request.getEmail());
    user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
    user.setActive(false);

    userRepository.save(user);

    String token = UUID.randomUUID().toString();

    ActivationToken activationToken = new ActivationToken();
    activationToken.setToken(token);
    activationToken.setUser(user);
    activationToken.setExpiresAt(LocalDateTime.now().plusHours(24));

    activationTokenRepository.save(activationToken);
    emailService.sendActivationEmail(user.getEmail(), token);

    }

    @Transactional
    public void activate(String token) {

    ActivationToken activationToken = activationTokenRepository.findByToken(token)
    .orElseThrow(() -> new IllegalArgumentException("Invalid activation token"));

    if (activationToken.getExpiresAt().isBefore(LocalDateTime.now())) {
    throw new IllegalArgumentException("Activation token has expired");
    }

    User user = activationToken.getUser();

    user.setActive(true);

    Role role = roleRepository.findByName("USER").orElse(null);

    if (role == null) {
    role = new Role();
    role.setName("USER");
    role = roleRepository.save(role);
    }

    user.setRole(role);

    userRepository.save(user);

    activationTokenRepository.delete(activationToken);
    }

    public boolean isUsernameAvailable(String username) {
    return !userRepository.existsByUsername(username);
    }

    public boolean isEmailAvailable(String email) {
    return !userRepository.existsByEmail(email);
    }

}