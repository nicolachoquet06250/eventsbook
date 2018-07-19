<?php

	namespace ormframework\custom\mvc\models;

	use ormframework\core\mvc\Model;
	use \ormframework\custom\setup\utils;
	use sql_links\factories\Request;
	use sql_links\factories\RequestConnexion;
	use \ormframework\custom\mvc\views\Json;

	class evenement extends Model {
		private $my_utils;
		public function __construct($is_assoc)
		{
			parent::__construct($is_assoc);
			$this->my_utils = new utils();
		}

		/**
		 * @model evenement
		 * @description récupère tous les evenement
		 * @method get
		 * @param mixed $args
		 * @return Json
		 * @route evenement/get
		 * @throws \Exception
		 **/
		public function get($args = []) {
			if($conf = $this->get_manager('services')->conf()->get_sql_conf('json')['eventsbook']) {
				$request = Request::getIRequest(new RequestConnexion((array)$conf, 'json'), 'json');
				$retour = $request->select()->from('evenement')->query()->get($this->get_from_name('id', $args));
			}
			else {
				$retour = [];
			}
			return new Json($retour);

		}

		/**
		 * @model evenement
		 * @description ajoute un evenement
		 * @method add
		 * @param mixed $args
		 * @return Json
		 * @route evenement/add
		 * @throws \Exception
		 **/
		public function add($args = []) {
			if($conf = $this->get_manager('services')->conf()->get_sql_conf('json')['eventsbook']) {
				$request = Request::getIRequest(new RequestConnexion((array)$conf, 'json'), 'json');
				$evenement = new \ormframework\custom\db_context\evenement($request, false, ['id_type_evenement' => $this->get_from_name('id_type_evenement', $args), 'label' => $this->get_from_name('label', $args), 'description' => $this->get_from_name('description', $args), 'date_debut' => $this->get_from_name('date_debut', $args), 'date_fin' => $this->get_from_name('date_fin', $args), 'link' => $this->get_from_name('link', $args)]);
				$evenement->add();
				$retour = $request->select()->from('evenement')->query()->get();
			}
			else {
				$retour = [];
			}
			return new Json($retour);

		}

		/**
		 * @model evenement
		 * @description supprime un evenement
		 * @method delete
		 * @param mixed $args
		 * @return Json
		 * @route evenement/delete
		 * @throws \Exception
		 **/
		public function delete($args = []) {
			if($conf = $this->get_manager('services')->conf()->get_sql_conf('json')['eventsbook']) {
				$request = Request::getIRequest(new RequestConnexion((array)$conf, 'json'), 'json');
				$evenement = new \ormframework\custom\db_context\evenement($request, false, [['id' => $this->get_from_name('id', $args)]]);
				$evenement->remove();
				$retour = $request->select()->from('evenement')->query()->get();
			}
			else {
				$retour = [];
			}
			return new Json($retour);

		}

		/**
		 * @model evenement
		 * @description modifie certains champs d'un evenement
		 * @method update
		 * @param mixed $args
		 * @return Json
		 * @route evenement/update
		 * @throws \Exception
		 **/
		public function update($args = []) {
			if($conf = $this->get_manager('services')->conf()->get_sql_conf('json')['eventsbook']) {
				$request = Request::getIRequest(new RequestConnexion((array)$conf, 'json'), 'json');
				/**
				 * @var \ormframework\core\db_context\entity $evenement
				 */
				$evenement = $request->select()->from('evenement')->where(['id' => $this->get_from_name('id', $args)])->query()->get(0);
				foreach($evenement->get_not_null_props() as $prop) {
					if($this->get_from_name($prop, $args) !== null) {
						$evenement->$prop($this->get_from_name($prop, $args));
					}
				}
				$retour = $request->select()->from('evenement')->query();
			}
			else {
				$retour = [];
			}
			return new Json($retour);

		}

	}