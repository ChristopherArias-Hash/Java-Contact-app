package com.chris.fullstack_backend.repository;

import com.chris.fullstack_backend.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ContactRepository extends JpaRepository<Contact, Long> {
}