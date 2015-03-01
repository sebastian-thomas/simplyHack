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

	public function insertQuestion(){

		$data = array (
			'team_id' => '1',
			'user_id' => $this->session->userdata('user_id'),
			'question' => $this->input->post('text'),
			'type' => $this->input->post('type')
			);

		$this->gen_model->insertPost($data);

	}

	public function insertAns(){
		$data = array (
			'question_id' => $this->session->post('question_id'),
			'user_id' => $this->session->userdata('user_id'),
			'answer' => $this->input->post('text')
			);

		$this->gen_model->insertAns($data);
	}

	public function addBadge(){
		$data = array(
			'user_id' => $this->input->post('user_id'),
			'badge_id' => $this->input->post('badge_id')
			);
		$this->gen_model->insertBadge($data);
	}

	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */