<?php
class Team_model extends CI_Model {

	public function __construct()
	{
		
		$this->load->model('user_model');
	}

	public function getTeams($uid){
		$query = $this->db->get_where('team_user',array('user_id' => $uid));
		$teams = array();
		foreach ($query->result() as $row) {
			# code...
			$team = array();
			$team['id'] = $row->team_id;
			array_push($teams, $team);
		}
		return $teams;
	}

	public function teamDetails($tid){
		$team = array();
		$query2 = $this->db->get_where('teams',array('id'=>$tid));
		$row2 = $query2->row();

		$team['id'] = $tid;
		$team['course_id'] = $row2->course;

		$query = $this->db->get_where('team_user',array('team_id' => $tid));

		$memebers = array();
		foreach($query->result() as $row){
			$member = array();
			$member['id'] = $row->user_id;
			$mdetails = $this->user_model->getDetails($row->user_id);
			$member['name'] = $mdetails['name'];
			$member['imgUrl'] = $mdetails['imgUrl'];
			$member['course_level'] = $this->user_model->getCourseLevel($row->user_id,$row2->course);
			array_push($memebers, $member);
		}

		$team['memebers'] = $memebers;
		//print_r($team);
		return $team;
	}

	public function getTeamPosts($tid){
		$posts = array();
		$query = $this->db->get_where('questions',array('team_id' => $tid));
		foreach($query->result() as $row){
			$post = array();
			$post['id'] = $row->id;
			$post['question'] = $row->question;
			$post['createdAt'] = $row->createdAt;
			$post['by'] = $this->user_model->getDetails($row->user_id);
			$post['answers'] = $this->getAnswers($row->id);
			array_push($posts, $post);
		}
		return $posts;
	}

	public function getAnswers($qid){
		$answers = array();
		$query = $this->db->get_where('answers',array('question_id' => $qid));
		foreach($query->result() as $row){
			$ans = array();
			$ans['user_id'] = $row->user_id;
			$ans['answer'] = $row->answer;
			$ans['createdAt'] = $row->createdAt;
			array_push($answers, $ans);
		}
		return $answers;
	}

}