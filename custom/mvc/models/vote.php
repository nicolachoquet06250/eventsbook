<?php

	namespace ormframework\custom\mvc\models;

	use ormframework\core\mvc\Model;
	use \ormframework\custom\setup\utils;
	use sql_links\factories\Request;
	use sql_links\factories\RequestConnexion;
	use \ormframework\custom\mvc\views\Json;

	class vote extends Model {
		private $my_utils;
		public function __construct($is_assoc)
		{
			parent::__construct($is_assoc);
			$this->my_utils = new utils();
		}

		/**
		 * @model vote
		 * @description récupère tous les vote
		 * @method get
		 * @param mixed $args
		 * @return Json
		 * @route vote/get
		 * @throws \Exception
		 **/
		public function get($args = []) {
			if($conf = $this->get_manager('services')->conf()->get_sql_conf('json')['eventsbook']) {
				$request = Request::getIRequest(new RequestConnexion((array)$conf, 'json'), 'json');
				$retour = $request->select()->from('vote')->query()->get($this->get_from_name('id', $args));
			}
			else {
				$retour = [];
			}
			return new Json($retour);

		}

		/**
		 * @model vote
		 * @description ajoute un vote
		 * @method add
		 * @param mixed $args
		 * @return Json
		 * @route vote/add
		 * @throws \Exception
		 **/
		public function add($args = []) {
			if($conf = $this->get_manager('services')->conf()->get_sql_conf('json')['eventsbook']) {
				$request = Request::getIRequest(new RequestConnexion((array)$conf, 'json'), 'json');
				$vote = new \ormframework\custom\db_context\vote($request, false, ['id_evenement' => $this->get_from_name('id_evenement', $args)]);
				$vote->add();
				$retour = $request->select()->from('vote')->query()->get();
			}
			else {
				$retour = [];
			}
			return new Json($retour);

		}

		/**
		 * @model vote
		 * @description supprime un vote
		 * @method delete
		 * @param mixed $args
		 * @return Json
		 * @route vote/delete
		 * @throws \Exception
		 **/
		public function delete($args = []) {
			if($conf = $this->get_manager('services')->conf()->get_sql_conf('json')['eventsbook']) {
				$request = Request::getIRequest(new RequestConnexion((array)$conf, 'json'), 'json');
				$vote = new \ormframework\custom\db_context\vote($request, false, [['id' => $this->get_from_name('id', $args)]]);
				$vote->remove();
				$retour = $request->select()->from('vote')->query()->get();
			}
			else {
				$retour = [];
			}
			return new Json($retour);

		}

		/**
		 * @model vote
		 * @description modifie certains champs d'un vote
		 * @method update
		 * @param mixed $args
		 * @return Json
		 * @route vote/update
		 * @throws \Exception
		 **/
		public function update($args = []) {
			if($conf = $this->get_manager('services')->conf()->get_sql_conf('json')['eventsbook']) {
				$request = Request::getIRequest(new RequestConnexion((array)$conf, 'json'), 'json');
				/**
				 * @var \ormframework\core\db_context\entity $vote
				 */
				$vote = $request->select()->from('vote')->where(['id' => $this->get_from_name('id', $args)])->query()->get(0);
				foreach($vote->get_not_null_props() as $prop) {
					if($this->get_from_name($prop, $args) !== null) {
						$vote->$prop($this->get_from_name($prop, $args));
					}
				}
				$retour = $request->select()->from('vote')->query();
			}
			else {
				$retour = [];
			}
			return new Json($retour);

		}

	}