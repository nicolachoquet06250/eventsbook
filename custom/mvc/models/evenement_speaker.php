<?php

	namespace ormframework\custom\mvc\models;

	use ormframework\core\mvc\Model;
	use \ormframework\custom\setup\utils;
	use sql_links\factories\Request;
	use sql_links\factories\RequestConnexion;
	use \ormframework\custom\mvc\views\Json;

	class evenement_speaker extends Model {
		private $my_utils;
		public function __construct($is_assoc)
		{
			parent::__construct($is_assoc);
			$this->my_utils = new utils();
		}

		/**
		 * @model evenement_speaker
		 * @description récupère tous les evenement_speaker
		 * @method get
		 * @param mixed $args
		 * @return Json
		 * @route evenement_speaker/get
		 * @throws \Exception
		 **/
		public function get($args = []) {
			if($conf = $this->get_manager('services')->conf()->get_sql_conf('json')['eventsbook']) {
				$request = Request::getIRequest(new RequestConnexion((array)$conf, 'json'), 'json');
				$retour = $request->select()->from('evenement_speaker')->query()->get($this->get_from_name('id', $args));
			}
			else {
				$retour = [];
			}
			return new Json($retour);

		}

		/**
		 * @model evenement_speaker
		 * @description ajoute un evenement_speaker
		 * @method add
		 * @param mixed $args
		 * @return Json
		 * @route evenement_speaker/add
		 * @throws \Exception
		 **/
		public function add($args = []) {
			if($conf = $this->get_manager('services')->conf()->get_sql_conf('json')['eventsbook']) {
				$request = Request::getIRequest(new RequestConnexion((array)$conf, 'json'), 'json');
				$evenement_speaker = new \ormframework\custom\db_context\evenement_speaker($request, false, ['id_evenement' => $this->get_from_name('id_evenement', $args), 'id_speaker' => $this->get_from_name('id_speaker', $args)]);
				$evenement_speaker->add();
				$retour = $request->select()->from('evenement_speaker')->query()->get();
			}
			else {
				$retour = [];
			}
			return new Json($retour);

		}

		/**
		 * @model evenement_speaker
		 * @description supprime un evenement_speaker
		 * @method delete
		 * @param mixed $args
		 * @return Json
		 * @route evenement_speaker/delete
		 * @throws \Exception
		 **/
		public function delete($args = []) {
			if($conf = $this->get_manager('services')->conf()->get_sql_conf('json')['eventsbook']) {
				$request = Request::getIRequest(new RequestConnexion((array)$conf, 'json'), 'json');
				$evenement_speaker = new \ormframework\custom\db_context\evenement_speaker($request, false, [['id' => $this->get_from_name('id', $args)]]);
				$evenement_speaker->remove();
				$retour = $request->select()->from('evenement_speaker')->query()->get();
			}
			else {
				$retour = [];
			}
			return new Json($retour);

		}

		/**
		 * @model evenement_speaker
		 * @description modifie certains champs d'un evenement_speaker
		 * @method update
		 * @param mixed $args
		 * @return Json
		 * @route evenement_speaker/update
		 * @throws \Exception
		 **/
		public function update($args = []) {
			if($conf = $this->get_manager('services')->conf()->get_sql_conf('json')['eventsbook']) {
				$request = Request::getIRequest(new RequestConnexion((array)$conf, 'json'), 'json');
				/**
				 * @var \ormframework\core\db_context\entity $evenement_speaker
				 */
				$evenement_speaker = $request->select()->from('evenement_speaker')->where(['id' => $this->get_from_name('id', $args)])->query()->get(0);
				foreach($evenement_speaker->get_not_null_props() as $prop) {
					if($this->get_from_name($prop, $args) !== null) {
						$evenement_speaker->$prop($this->get_from_name($prop, $args));
					}
				}
				$retour = $request->select()->from('evenement_speaker')->query();
			}
			else {
				$retour = [];
			}
			return new Json($retour);

		}

	}