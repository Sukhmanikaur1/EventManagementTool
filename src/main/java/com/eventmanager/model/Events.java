package com.eventmanager.model;


	
import java.util.Date;
//import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

	@Entity
	@Table(name="events")
	public class Events {
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private int eventid;
		private String eventtype;
		private String eventname;
		private String eventplace;
		private String eventaddress;
		private String eventphone;
		private String eventstatus;
		Date startdate = new Date();
		Date enddate = new Date();
		
		
		public int getEventid() {
			return eventid;
		}

		public void setEventid(int eventid) {
			this.eventid = eventid;
		}

		public String getEventtype() {
			return eventtype;
		}

		public void setEventtype(String eventtype) {
			this.eventtype = eventtype;
		}

		public String getEventplace() {
			return eventplace;
		}

		public void setEventplace(String eventplace) {
			this.eventplace = eventplace;
		}

		public String getEventaddress() {
			return eventaddress;
		}

		public void setEventaddress(String eventaddress) {
			this.eventaddress = eventaddress;
		}

		public String getEventphone() {
			return eventphone;
		}

		public void setEventphone(String eventphone) {
			this.eventphone = eventphone;
		}

		public String getEventstatus() {
			return eventstatus;
		}

		public void setEventstatus(String eventstatus) {
			this.eventstatus = eventstatus;
		}

		public Date getStartdate() {
			return startdate;
		}

		public void setStartdate(Date startdate) {
			this.startdate = startdate;
		}

		public Date getEnddate() {
			return enddate;
		}

		public void setEnddate(Date enddate) {
			this.enddate = enddate;
		}

		
		
	      
	    public String getEventname() {
			return eventname;
		}

		public void setEventname(String eventname) {
			this.eventname = eventname;
		}

		public Events()
	    {
	    	
	    }
	    
	    public Events(int id, String name, String type, String place, String address, String phone ,String status , Date start, Date end) {
			super();
			this.eventid = id;
			this.eventtype = type;
			this.eventname = name;
			this.eventplace = place;
			this.eventaddress = address;
			this.eventphone = phone;
			this.eventstatus = status;
			this.startdate = start;
			this.enddate = end;
			
			
			
		}
	    
		
//		@Override
//		public String toString() {
//			return "Student [id=" + id + ", name=" + name + ", grade=" + grade + "]";
//		}
		



}//closing events  class



