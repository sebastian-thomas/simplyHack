<?php
class Gen_model extends CI_Model {

	public function __construct()
	{
		//$this->load->model('user_model');
	}

	public function getNonEnrolledCourses($uid){
		$sql = "select * from course where id not in (select course_id from user_course where user_id='".$uid."')";
		$query = $this->db->query($sql); 
		$courses = array();
		foreach($query->result() as $row){
			$course = array();
			$course['name'] = $row->name;
			$course['id'] = $row->id;
			$course['noOfChapters'] = $row->noOfChapters;
			$course['price'] = $row->price;
			array_push($courses, $course);
		}
		return $courses;
	}

	public function insertPost($data){
		$this->db->insert('question',$data);
	}

	public function insertAns($data){
		$this->db->insert('answers',$data);
	}

	public function insertBadge($data){
		$this->db->insert('user_badges',$data);
	}

	public function addCourse($data){
		$this->db->insert('user_course',$data);
	}


}