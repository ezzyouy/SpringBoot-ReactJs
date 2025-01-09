package com.springboot.backend.services;

import com.springboot.backend.entities.Messages;
import com.springboot.backend.respositories.MessageRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional

public class MessagesService {

    private MessageRepository messageRepository;

    public MessagesService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public void postMessage(Messages messagesRequest, String userEmail) {
        Messages messages = new Messages(messagesRequest.getTitle(), messagesRequest.getQuestion());
        messages.setUserEmail(userEmail);
        messageRepository.save(messages);
    }
}
