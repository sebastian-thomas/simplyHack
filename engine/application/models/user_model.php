<?php
class User_model extends CI_Model {

	public function __construct()
	{
	
	}

	public function getDetails($id){
		$query = $this->db->get_where('user', array('id' => $id));
		$res = array();
		if($query->num_rows() > 0){
			$row = $query->row();
			$res['id'] = $row->id;
			$res['name'] = $row->name;
			$res['email'] = $row->email;
			$res['imgUrl'] = $row->imgUrl;
		}
		return $res;
	}

	public function getPublicProfile($id){
		$query = $this->db->get_where('user', array('id' => $id));
		$res = array();
		if($query->num_rows() > 0){
			$row = $query->row();
			$res['id'] = $row->id;
			$res['name'] = $row->name;
			$res['email'] = $row->email;
			$res['imgUrl'] = $row->imgUrl;
			$res['courses'] = $this->getCourses($row->id);
		}
		else{
			echo "none";
		}

		return $res;
	}

	public function getCourses($uid){
		$query = $this->db->get_where('user_course',array('user_id' => $uid));
		$courses = array();
		foreach ($query->result() as $row) {
			# code...
			$course = array();
			$course['id'] = $row->course_id;
			$course['name'] = $this->getCourseName($row->course_id);
			$course['totalChapters'] = $this->getCourseNoChapters($row->course_id);
			$course['completedChapters'] = $row->chapterCompleted;
			$course['startedOn'] = $row->startedOn;
			$course['completedOn'] = $row->completedOn;
			$course['level'] = $this->getCourseLevel($uid,$row->course_id);
			array_push($courses, $course);
		}
		return $courses;
	}

	public function getCourseName($id){
		$query = $this->db->get_where('course', array('id' => $id));
		$row = $query->row();
		return $row->name;
	}

	public function getCourseLevel($uid,$cid){
		$query = $this->db->get_where('user_course',array('user_id' => $uid,'course_id' => $cid));
		$completedChap = 0;
		if($query->num_rows() > 0){
			$row = $query->row();
			$completedChap = $row->chapterCompleted;
		}
		

		$query2 = $this->db->get_where('course',array('id' => $cid));
		$row2 = $query2->row();
		$totalChapters = $row2->noOfChapters;

		$level = (int) (($completedChap/$totalChapters) * 10);
		return $level;
	}



	public function getCourseNoChapters($id){
		$query = $this->db->get_where('course', array('id' => $id));
		$row = $query->row();
		return $row->noOfChapters;
	}

	public function incrementCourseCompletion($uid,$cid){
		$sql = "update user_course set chapterCompleted = chapterCompleted + 1 where user_id='".$uid."' and course_id='".$cid."'";
		$this->db->query($sql); 
		echo $sql . " done";
	}
}