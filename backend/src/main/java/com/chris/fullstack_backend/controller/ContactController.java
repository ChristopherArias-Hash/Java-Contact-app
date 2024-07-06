package com.chris.fullstack_backend.controller;

import com.chris.fullstack_backend.exception.ContactNotFoundException;
import com.chris.fullstack_backend.model.Contact;
import com.chris.fullstack_backend.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @PostMapping("/contact")
    Contact newContact(@RequestBody Contact newContact) {
        return contactRepository.save(newContact);
    }

    @GetMapping("/contacts")
    List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    @GetMapping("/contact/{id}")
    Contact getContactById(@PathVariable Long id) {
        return contactRepository.findById(id)
                .orElseThrow(() -> new ContactNotFoundException(id));
    }

    @PutMapping("/contacts/{id}")
    Contact updateContact(@RequestBody Contact newContact, @PathVariable Long id) {
        return contactRepository.findById(id)
                .map(contact -> {
                    contact.setFirstName(newContact.getFirstName());
                    contact.setLastName(newContact.getLastName());
                    contact.setEmail(newContact.getEmail());
                    contact.setNotes(newContact.getNotes());
                    contact.setImageUrl(newContact.getImageUrl());
                    return contactRepository.save(contact);
                }).orElseThrow(() -> new ContactNotFoundException(id));
    }

    @DeleteMapping("/contact/{id}")
    String deleteContact(@PathVariable Long id) {
        if (!contactRepository.existsById(id)) {
            throw new ContactNotFoundException(id);
        }
        contactRepository.deleteById(id);
        return "Contact with id " + id + " was deleted";
    }
}
