package com.bootdo.common.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootdo.system.domain.SokectClientMessage;

@RestController
@RequestMapping("api/Socket")
public class SocketController {
	@Autowired
	SimpMessagingTemplate template;

	@MessageMapping("/changenotice")
	public void greeting(SokectClientMessage msg) {
		System.out.println(msg.getId() + ":" + msg.getName());
		// this.template.convertAndSend("/topic/notice", value);
	}

	@RequestMapping("GetName")
	public String GetName(String sName) {
		return sName;
	}
}
