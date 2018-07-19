<?php

	namespace ormframework\custom\mvc\models;

	use ormframework\core\mvc\Model;
	use \ormframework\custom\setup\utils;
	use sql_links\factories\Request;
	use sql_links\factories\RequestConnexion;
	use \ormframework\custom\mvc\views\Json;

	class media extends Model {
		private $my_utils;
		public function __construct($is_assoc)
		{
			parent::__construct($is_assoc);
			$this->my_utils = new utils();
		}

		/**
		 * @model media
		 * @description récupère tous les media
		 * @method get
		 * @param mixed $args
		 * @return Json
		 * @route media/get
		 * @throws \Exception
		 **/
		public function get($args = []) {
			if($conf = $this->get_manager('services')->conf()->get_sql_conf('json')['eventsbook']) {
				$request = Request::getIRequest(new RequestConnexion((array)$conf, 'json'), 'json');
				$retour = $request->select()->from('media')->query()->get($this->get_from_name('id', $args));
			}
			else {
				$retour = [];
			}
			return new Json($retour);

		}

		/**
		 * @model media
		 * @description ajoute un media
		 * @method add
		 * @param mixed $args
		 * @return Json
		 * @route media/add
		 * @throws \Exception
		 **/
		public function add($args = []) {
			if($conf = $this->get_manager('services')->conf()->get_sql_conf('json')['eventsbook']) {
				$request = Request::getIRequest(new RequestConnexion((array)$conf, 'json'), 'json');
				$media = new \ormframework\custom\db_context\media($request, false, ['label' => $this->get_from_name('label', $args), 'data_name' => $this->get_from_name('data_name', $args), 'base64_data' => $this->get_from_name('base64_data', $args)]);
				$media->add();
				$retour = $request->select()->from('media')->query()->get();
			}
			else {
				$retour = [];
			}
			return new Json($retour);

		}

		/**
		 * @model media
		 * @description supprime un media
		 * @method delete
		 * @param mixed $args
		 * @return Json
		 * @route media/delete
		 * @throws \Exception
		 **/
		public function delete($args = []) {
			if($conf = $this->get_manager('services')->conf()->get_sql_conf('json')['eventsbook']) {
				$request = Request::getIRequest(new RequestConnexion((array)$conf, 'json'), 'json');
				$media = new \ormframework\custom\db_context\media($request, false, [['id' => $this->get_from_name('id', $args)]]);
				$media->remove();
				$retour = $request->select()->from('media')->query()->get();
			}
			else {
				$retour = [];
			}
			return new Json($retour);

		}

		/**
		 * @model media
		 * @description modifie certains champs d'un media
		 * @method update
		 * @param mixed $args
		 * @return Json
		 * @route media/update
		 * @throws \Exception
		 **/
		public function update($args = []) {
			if($conf = $this->get_manager('services')->conf()->get_sql_conf('json')['eventsbook']) {
				$request = Request::getIRequest(new RequestConnexion((array)$conf, 'json'), 'json');
				/**
				 * @var \ormframework\core\db_context\entity $media
				 */
				$media = $request->select()->from('media')->where(['id' => $this->get_from_name('id', $args)])->query()->get(0);
				foreach($media->get_not_null_props() as $prop) {
					if($this->get_from_name($prop, $args) !== null) {
						$media->$prop($this->get_from_name($prop, $args));
					}
				}
				$retour = $request->select()->from('media')->query();
			}
			else {
				$retour = [];
			}
			return new Json($retour);

		}

	}