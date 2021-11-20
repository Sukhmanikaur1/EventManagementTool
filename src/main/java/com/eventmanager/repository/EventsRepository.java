package com.eventmanager.repository;
//import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.eventmanager.model.*;

@Repository
public interface EventsRepository extends JpaRepository<Events,Integer>{

}













