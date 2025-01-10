package com.springboot.backend.services;

import com.springboot.backend.entities.Messages;
import com.springboot.backend.requestModels.AdminQuestionRequest;
import com.springboot.backend.respositories.MessageRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

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

    public void putMessage(AdminQuestionRequest adminQuestionRequest, String userEmail) throws  Exception{
        Optional<Messages> messages=messageRepository.findById(adminQuestionRequest.getId());
        if(!messages.isPresent()) {
            throw new  Exception("Message not found");
        }

        messages.get().setAdminEmail(userEmail);
        messages.get().setResponse(adminQuestionRequest.getResponse());
        messages.get().setClosed(true);
        messageRepository.save(messages.get());
    }
}
