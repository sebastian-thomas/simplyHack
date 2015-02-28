<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->model('user_model');
		$this->load->model('team_model');
	}


	public function index()
	{
		$this->load->view('welcome_message');
	}

	public function getUserProfile($id = 0){
		//echo $id;
		echo json_encode($this->user_model->getPublicProfile($id));
	}

	public function team($id=0){
		//echo "hii";
		echo json_encode($this->team_model->teamDetails($id));
		echo "<br><br>";
		echo json_encode($this->team_model->getTeamPosts($id));
	}
}

