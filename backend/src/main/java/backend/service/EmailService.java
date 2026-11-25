package backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.activation-url}")
    private String activationUrl;

    public EmailService(JavaMailSender mailSender) {
    this.mailSender = mailSender;
    }

    public void sendActivationEmail(String email, String token) {

    SimpleMailMessage message = new SimpleMailMessage();

    message.setTo(email);
    message.setSubject("Hill Recipes - Account activation");
    message.setText("Welcome to Hill Recipes!\n\n" + "Click the following link to activate your account:\n"
    + activationUrl + token);

    mailSender.send(message);
    }
}