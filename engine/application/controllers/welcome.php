<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('gen_model');
		$this->load->model('team_model');
	}

	public function index()
	{
		$this->session->set_userdata('user_id', "1");
		$this->load->view('welcome_message');
	}

	public function getUnentrolledCourses(){
		$uid = $this->session->userdata('user_id');
		echo json_encode($this->gen_model->getNonEnrolledCourses($uid));
	}

	public function teamMem(){
		$id = 1;
		echo json_encode($this->team_model->teamDetails($id));
	}

	public function teamPosts(){
		$id = 1;
		echo json_encode($this->team_model->getTeamPosts($id));
	}

	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */