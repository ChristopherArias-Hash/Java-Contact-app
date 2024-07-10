package com.chris.fullstack_backend.controller;

import com.chris.fullstack_backend.exception.ContactNotFoundException;
import com.chris.fullstack_backend.model.Contact;
import com.chris.fullstack_backend.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping("/contact")
    public Contact newContact(@RequestParam("firstName") String firstName,
                              @RequestParam("lastName") String lastName,
                              @RequestParam("email") String email,
                              @RequestParam("notes") String notes,
                              @RequestParam(value = "profileImage", required = false) MultipartFile profileImage) throws IOException {
        String profileImagePath = null;
        if (profileImage != null && !profileImage.isEmpty()) {
            profileImagePath = saveImage(profileImage);
        }

        Contact newContact = new Contact();
        newContact.setFirstName(firstName);
        newContact.setLastName(lastName);
        newContact.setEmail(email);
        newContact.setNotes(notes);
        newContact.setProfileImagePath(profileImagePath);

        return contactRepository.save(newContact);
    }

    @GetMapping("/contacts")
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    @GetMapping("/contact/{id}")
    public Contact getContactById(@PathVariable Long id) {
        return contactRepository.findById(id)
                .orElseThrow(() -> new ContactNotFoundException(id));
    }

    @PutMapping("/contacts/{id}")
    public Contact updateContact(@RequestParam("firstName") String firstName,
                                 @RequestParam("lastName") String lastName,
                                 @RequestParam("email") String email,
                                 @RequestParam("notes") String notes,
                                 @RequestParam(value = "profileImage", required = false) MultipartFile profileImage,
                                 @PathVariable Long id) throws IOException {
        return contactRepository.findById(id)
                .map(contact -> {
                    contact.setFirstName(firstName);
                    contact.setLastName(lastName);
                    contact.setEmail(email);
                    contact.setNotes(notes);
                    if (profileImage != null && !profileImage.isEmpty()) {
                        try {
                            contact.setProfileImagePath(saveImage(profileImage));
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                    return contactRepository.save(contact);
                }).orElseThrow(() -> new ContactNotFoundException(id));
    }


    @DeleteMapping("/contact/{id}")
    public String deleteContact(@PathVariable Long id) {
        if (!contactRepository.existsById(id)) {
            throw new ContactNotFoundException(id);
        }
        contactRepository.deleteById(id);
        return "Contact with id " + id + " was deleted";
    }

    private String saveImage(MultipartFile profileImage) throws IOException {
        String fileName = profileImage.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR + fileName);

        // Copy with replace existing option
        Files.copy(profileImage.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return UPLOAD_DIR + fileName; // Return the path to the saved file
    }
}
