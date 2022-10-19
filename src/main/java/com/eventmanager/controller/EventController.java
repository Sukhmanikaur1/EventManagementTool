package com.eventmanager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.PathVariable;

//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;


import com.eventmanager.model.Events;
import com.eventmanager.repository.EventsRepository;
//import com.eventmanager.exception.ResourceNotFoundException;


@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class EventController {




@Autowired
	private EventsRepository eventsRepo;
    


	//Get all events
	
	@GetMapping("/allevents")
	public List<Events> getAllEvents()
	{
		
		return eventsRepo.findAll();
	}
	
	

	@PostMapping("/addevent")
    public Events newEvent(@RequestBody Events event)
    {
		
		return eventsRepo.save(event);
    }
}//closing controller
