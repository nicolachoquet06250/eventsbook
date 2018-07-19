<?php

	namespace ormframework\custom\mvc\models;

	use ormframework\core\mvc\Model;
	use \ormframework\custom\setup\utils;
	use sql_links\factories\Request;
	use sql_links\factories\RequestConnexion;
	use \ormframework\custom\mvc\views\Json;

	class type_evenement extends Model {
		private $my_utils;
		public function __construct($is_assoc)
		{
			parent::__construct($is_assoc);
			$this->my_utils = new utils();
		}

		/**
		 * @model type_evenement
		 * @description récupère tous les type_evenement
		 * @method get
		 * @param mixed $args
		 * @return Json
		 * @route type_evenement/get
		 * @throws \Exception
		 **/
		public function get($args = []) {
			if($conf = $this->get_manager('services')->conf()->get_sql_conf('json')['eventsbook']) {
				$request = Request::getIRequest(new RequestConnexion((array)$conf, 'json'), 'json');
				$retour = $request->select()->from('type_evenement')->query()->get($this->get_from_name('id', $args));
			}
			else {
				$retour = [];
			}
			return new Json($retour);

		}

		/**
		 * @model type_evenement
		 * @description ajoute un type_evenement
		 * @method add
		 * @param mixed $args
		 * @return Json
		 * @route type_evenement/add
		 * @throws \Exception
		 **/
		public function add($args = []) {
			if($conf = $this->get_manager('services')->conf()->get_sql_conf('json')['eventsbook']) {
				$request = Request::getIRequest(new RequestConnexion((array)$conf, 'json'), 'json');
				$type_evenement = new \ormframework\custom\db_context\type_evenement($request, false, ['label' => $this->get_from_name('label', $args)]);
				$type_evenement->add();
				$retour = $request->select()->from('type_evenement')->query()->get();
			}
			else {
				$retour = [];
			}
			return new Json($retour);

		}

		/**
		 * @model type_evenement
		 * @description supprime un type_evenement
		 * @method delete
		 * @param mixed $args
		 * @return Json
		 * @route type_evenement/delete
		 * @throws \Exception
		 **/
		public function delete($args = []) {
			if($conf = $this->get_manager('services')->conf()->get_sql_conf('json')['eventsbook']) {
				$request = Request::getIRequest(new RequestConnexion((array)$conf, 'json'), 'json');
				$type_evenement = new \ormframework\custom\db_context\type_evenement($request, false, [['id' => $this->get_from_name('id', $args)]]);
				$type_evenement->remove();
				$retour = $request->select()->from('type_evenement')->query()->get();
			}
			else {
				$retour = [];
			}
			return new Json($retour);

		}

		/**
		 * @model type_evenement
		 * @description modifie certains champs d'un type_evenement
		 * @method update
		 * @param mixed $args
		 * @return Json
		 * @route type_evenement/update
		 * @throws \Exception
		 **/
		public function update($args = []) {
			if($conf = $this->get_manager('services')->conf()->get_sql_conf('json')['eventsbook']) {
				$request = Request::getIRequest(new RequestConnexion((array)$conf, 'json'), 'json');
				/**
				 * @var \ormframework\core\db_context\entity $type_evenement
				 */
				$type_evenement = $request->select()->from('type_evenement')->where(['id' => $this->get_from_name('id', $args)])->query()->get(0);
				foreach($type_evenement->get_not_null_props() as $prop) {
					if($this->get_from_name($prop, $args) !== null) {
						$type_evenement->$prop($this->get_from_name($prop, $args));
					}
				}
				$retour = $request->select()->from('type_evenement')->query();
			}
			else {
				$retour = [];
			}
			return new Json($retour);

		}

	}