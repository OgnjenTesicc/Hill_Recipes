package backend.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import backend.dto.RegisterRequest;
import backend.entity.ActivationToken;
import backend.entity.User;
import backend.repository.ActivationTokenRepository;
import backend.repository.RoleRepository;
import backend.repository.UserRepository;
import backend.entity.Role;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private ActivationTokenRepository activationTokenRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private UserService userService;

    @Test
    public void registerSuccessfully() {

    RegisterRequest request = new RegisterRequest();
    request.setUsername("novikorisnik");
    request.setEmail("novi@example.com");
    request.setPassword("password123");

    when(userRepository.existsByUsername("novikorisnik")).thenReturn(false);
    when(userRepository.existsByEmail("novi@example.com")).thenReturn(false);

    LocalDateTime beforeRegistration = LocalDateTime.now();

    userService.register(request);

    ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
    ArgumentCaptor<ActivationToken> tokenCaptor = ArgumentCaptor.forClass(ActivationToken.class);

    verify(userRepository).save(userCaptor.capture());
    verify(activationTokenRepository).save(tokenCaptor.capture());

    User savedUser = userCaptor.getValue();
    ActivationToken savedToken = tokenCaptor.getValue();

    assertEquals("novikorisnik", savedUser.getUsername());
    assertEquals("novi@example.com", savedUser.getEmail());
    assertFalse(savedUser.isActive());

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    assertNotEquals("password123", savedUser.getPasswordHash());
    assertTrue(encoder.matches("password123", savedUser.getPasswordHash()));

    assertNotNull(savedToken.getToken());
    assertEquals(savedUser, savedToken.getUser());
    assertTrue(savedToken.getExpiresAt().isAfter(beforeRegistration.plusHours(23)));
    assertTrue(savedToken.getExpiresAt().isBefore(LocalDateTime.now().plusHours(25)));

    verify(emailService).sendActivationEmail("novi@example.com", savedToken.getToken());
    }

    @Test
    public void registerWithExistingUsername() {

    RegisterRequest request = new RegisterRequest();
    request.setUsername("postojeci");
    request.setEmail("novi@example.com");
    request.setPassword("password123");

    when(userRepository.existsByUsername("postojeci")).thenReturn(true);

    ResponseStatusException exception = assertThrows(ResponseStatusException.class,
    () -> userService.register(request));

    assertEquals(HttpStatus.CONFLICT, exception.getStatusCode());

    verify(userRepository, never()).save(any(User.class));
    verify(activationTokenRepository, never()).save(any(ActivationToken.class));
    verifyNoInteractions(emailService);
    }

    @Test
    public void registerWithExistingEmail() {

    RegisterRequest request = new RegisterRequest();
    request.setUsername("novikorisnik");
    request.setEmail("postojeci@example.com");
    request.setPassword("password123");

    when(userRepository.existsByUsername("novikorisnik")).thenReturn(false);
    when(userRepository.existsByEmail("postojeci@example.com")).thenReturn(true);

    ResponseStatusException exception = assertThrows(ResponseStatusException.class,
    () -> userService.register(request));

    assertEquals(HttpStatus.CONFLICT, exception.getStatusCode());

    verify(userRepository, never()).save(any(User.class));
    verify(activationTokenRepository, never()).save(any(ActivationToken.class));
    verifyNoInteractions(emailService);
    }

    @Test
    public void activateSuccessfully() {

    User user = new User();
    user.setUsername("novikorisnik");
    user.setActive(false);

    ActivationToken token = new ActivationToken();
    token.setToken("valid-token");
    token.setUser(user);
    token.setExpiresAt(LocalDateTime.now().plusHours(24));

    Role role = new Role();
    role.setName("USER");

    when(activationTokenRepository.findByToken("valid-token")).thenReturn(Optional.of(token));

    when(roleRepository.findByName("USER")).thenReturn(Optional.of(role));

    userService.activate("valid-token");

    assertTrue(user.isActive());
    assertEquals(role, user.getRole());

    verify(userRepository).save(user);
    verify(activationTokenRepository).delete(token);
    }

    @Test
    public void activateWithInvalidToken() {

    when(activationTokenRepository.findByToken("invalid-token")).thenReturn(Optional.empty());

    IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
    () -> userService.activate("invalid-token"));

    assertEquals("Invalid activation token", exception.getMessage());

    verify(userRepository, never()).save(any(User.class));
    verify(activationTokenRepository, never()).delete(any(ActivationToken.class));
    }

    @Test
    public void activateWithExpiredToken() {

    User user = new User();

    ActivationToken token = new ActivationToken();
    token.setToken("expired-token");
    token.setUser(user);
    token.setExpiresAt(LocalDateTime.now().minusHours(1));

    when(activationTokenRepository.findByToken("expired-token")).thenReturn(Optional.of(token));

    IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
    () -> userService.activate("expired-token"));

    assertEquals("Activation token has expired", exception.getMessage());

    verify(userRepository, never()).save(any(User.class));
    verify(activationTokenRepository, never()).delete(any(ActivationToken.class));
    }
}