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
@CrossOrigin("http://localhost:5173/ContactApp") // Allow CORS requests from the specified origin
public class ContactController {

    @Autowired
    private ContactRepository contactRepository; // Inject ContactRepository to interact with the database

    private static final String UPLOAD_DIR = "uploads/"; // Directory to store uploaded files

    /**
     * Create a new contact.
     * @param firstName The first name of the contact.
     * @param lastName The last name of the contact.
     * @param email The email of the contact.
     * @param notes Any additional notes for the contact.
     * @param profileImage An optional profile image for the contact.
     * @return The newly created contact.
     * @throws IOException If an error occurs while saving the profile image.
     */
    @PostMapping("/contact")
    public Contact newContact(@RequestParam("firstName") String firstName,
                              @RequestParam("lastName") String lastName,
                              @RequestParam("email") String email,
                              @RequestParam("notes") String notes,
                              @RequestParam(value = "profileImage", required = false) MultipartFile profileImage) throws IOException {
        String profileImagePath = null;
        if (profileImage != null && !profileImage.isEmpty()) {
            profileImagePath = saveImage(profileImage); // Save the profile image and get its path
        }

        Contact newContact = new Contact();
        newContact.setFirstName(firstName);
        newContact.setLastName(lastName);
        newContact.setEmail(email);
        newContact.setNotes(notes);
        newContact.setProfileImagePath(profileImagePath);

        return contactRepository.save(newContact); // Save and return the new contact
    }

    /**
     * Retrieve all contacts.
     * @return A list of all contacts.
     */
    @GetMapping("/contacts")
    public List<Contact> getAllContacts() {
        return contactRepository.findAll(); // Return a list of all contacts
    }

    /**
     * Retrieve a contact by its ID.
     * @param id The ID of the contact.
     * @return The contact with the specified ID.
     * @throws ContactNotFoundException If no contact is found with the given ID.
     */
    @GetMapping("/contact/{id}")
    public Contact getContactById(@PathVariable Long id) {
        return contactRepository.findById(id)
                .orElseThrow(() -> new ContactNotFoundException(id)); // Throw an exception if contact not found
    }

    /**
     * Update an existing contact.
     * @param firstName The updated first name of the contact.
     * @param lastName The updated last name of the contact.
     * @param email The updated email of the contact.
     * @param notes The updated notes for the contact.
     * @param profileImage An optional updated profile image for the contact.
     * @param id The ID of the contact to update.
     * @return The updated contact.
     * @throws IOException If an error occurs while saving the new profile image.
     */
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
                            contact.setProfileImagePath(saveImage(profileImage)); // Save the new profile image and update its path
                        } catch (IOException e) {
                            e.printStackTrace(); // Log the error
                        }
                    }
                    return contactRepository.save(contact); // Save and return the updated contact
                }).orElseThrow(() -> new ContactNotFoundException(id)); // Throw an exception if contact not found
    }

    /**
     * Delete a contact by its ID.
     * @param id The ID of the contact to delete.
     * @return A confirmation message.
     * @throws ContactNotFoundException If no contact is found with the given ID.
     */
    @DeleteMapping("/contact/{id}")
    public String deleteContact(@PathVariable Long id) {
        if (!contactRepository.existsById(id)) {
            throw new ContactNotFoundException(id); // Throw an exception if contact not found
        }
        contactRepository.deleteById(id); // Delete the contact
        return "Contact with id " + id + " was deleted"; // Return confirmation message
    }

    /**
     * Save a profile image to the server.
     * @param profileImage The profile image to save.
     * @return The path where the image is saved.
     * @throws IOException If an error occurs while saving the image.
     */
    private String saveImage(MultipartFile profileImage) throws IOException {
        String fileName = profileImage.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR + fileName);

        // Copy the file to the target location, replacing existing files
        Files.copy(profileImage.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return UPLOAD_DIR + fileName; // Return the path to the saved file
    }
}
