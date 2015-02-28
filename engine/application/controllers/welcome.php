<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends CI_Controller {

	public function index()
	{
		$this->session->set_userdata('user_id', "1");
		$this->load->view('welcome_message');
	}

	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */