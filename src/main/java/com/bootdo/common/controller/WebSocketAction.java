package com.bootdo.common.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import com.bootdo.system.domain.SokectClientMessage;

@Controller
public class WebSocketAction {
	@MessageMapping("/changenotice1")
	public void greeting(SokectClientMessage msg) {
		System.out.println(msg.getId() + ":" + msg.getName());
		// this.template.convertAndSend("/topic/notice", value);
	}
}
