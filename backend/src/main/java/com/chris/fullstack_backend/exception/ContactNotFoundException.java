package com.chris.fullstack_backend.exception;

public class ContactNotFoundException extends RuntimeException {
    public ContactNotFoundException(Long id) {
        super("Could not find the user with id" + id);

    }
}
