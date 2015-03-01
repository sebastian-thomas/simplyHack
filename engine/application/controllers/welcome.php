<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('gen_model');
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

	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */