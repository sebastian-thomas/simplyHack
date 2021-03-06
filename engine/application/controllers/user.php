<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('user_model');
		$this->load->model('team_model');
		$this->session->set_userdata('user_id', "1");
	}


	public function index()
	{
		$id = $this->session->userdata('user_id');
		echo json_encode($this->user_model->getPublicProfile($id));
	}

	public function getUserProfile($id=0){
		//echo $id;
		echo json_encode($this->user_model->getPublicProfile($id));
	}

	public function team($id=0){
		//echo "hii";
		echo json_encode($this->team_model->teamDetails($id));
		echo "<br><br>";
		echo json_encode($this->team_model->getTeamPosts($id));
	}

	public function courses(){
		$id = $this->session->userdata('user_id');
		echo json_encode($this->user_model->getCourses($id));
	}

	public function inCrementChaptersCompleted(){
		print_r($_POST);
		$id = $this->session->userdata('user_id');
		$course = $this->input->post('course');
		$this->user_model->incrementCourseCompletion($id,$course);
		echo "done " . $course;
	}

	public function setSession($uid){
		$this->session->set_userdata('user_id', $uid);
	}
}

