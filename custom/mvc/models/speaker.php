<?php

	namespace ormframework\custom\mvc\models;

	use ormframework\core\mvc\Model;
	use \ormframework\custom\setup\utils;
	use sql_links\factories\Request;
	use sql_links\factories\RequestConnexion;
	use \ormframework\custom\mvc\views\Json;

	class speaker extends Model {
		private $my_utils, $bdd_type;
		public function __construct($is_assoc, $bdd_type='json') {
			parent::__construct($is_assoc);
			$this->my_utils = new utils();
			$this->bdd_type = $bdd_type;
		}

		/**
		 * @model speaker
		 * @description récupère tous les speaker
		 * @method get
		 * @param mixed $args
		 * @return Json
		 * @route speaker/get
		 * @throws \Exception
		 **/
		public function get($args = []) {
			if($conf = $this->get_manager('services')->conf()->get_sql_conf($this->bdd_type)['eventsbook']) {
				$request = Request::getIRequest(new RequestConnexion((array)$conf, $this->bdd_type), $this->bdd_type);
				$retour = $request->select()->from('speaker')->query()->get($this->get_from_name('id', $args));
			}
			else {
				$retour = [];
			}
			return new Json($retour);

		}

		/**
		 * @model speaker
		 * @description ajoute un speaker
		 * @method add
		 * @param mixed $args
		 * @return Json
		 * @route speaker/add
		 * @throws \Exception
		 **/
		public function add($args = []) {
			if($conf = $this->get_manager('services')->conf()->get_sql_conf($this->bdd_type)['eventsbook']) {
			    $request = Request::getIRequest(new RequestConnexion((array)$conf, $this->bdd_type), $this->bdd_type);
			    $speaker = new \ormframework\custom\db_context\speaker($request, false, ['nom' => $this->get_from_name('nom', $args), 'prenom' => $this->get_from_name('prenom', $args), 'description' => $this->get_from_name('description', $args)]);
				$speaker->add();
				$retour = $request->select()->from('speaker')->query()->get();
			}
			else {
				$retour = [];
			}
			return new Json($retour);

		}

		/**
		 * @model speaker
		 * @description supprime un speaker
		 * @method delete
		 * @param mixed $args
		 * @return Json
		 * @route speaker/delete
		 * @throws \Exception
		 **/
		public function delete($args = []) {
			if($conf = $this->get_manager('services')->conf()->get_sql_conf($this->bdd_type)['eventsbook']) {
				$request = Request::getIRequest(new RequestConnexion((array)$conf, $this->bdd_type), $this->bdd_type);
				$speaker = new \ormframework\custom\db_context\speaker($request, false, [['id' => $this->get_from_name('id', $args)]]);
				$speaker->remove();
				$retour = $request->select()->from('speaker')->query()->get();
			}
			else {
				$retour = [];
			}
			return new Json($retour);

		}

		/**
		 * @model speaker
		 * @description modifie certains champs d'un speaker
		 * @method update
		 * @param mixed $args
		 * @return Json
		 * @route speaker/update
		 * @throws \Exception
		 **/
		public function update($args = []) {
			if($conf = $this->get_manager('services')->conf()->get_sql_conf($this->bdd_type)['eventsbook']) {
			    $request = Request::getIRequest(new RequestConnexion((array)$conf, $this->bdd_type), $this->bdd_type);
				/**
				 * @var \ormframework\core\db_context\entity $speaker
				 */
				$speaker = $request->select()->from('speaker')->where(['id' => $this->get_from_name('id', $args)])->query()->get(0);
				$speaker->autosave(true);
				foreach($speaker->get_not_null_props() as $prop => $value) {
					if($this->get_from_name($prop, $args) !== null) {
						$speaker->$prop($this->get_from_name($prop, $args));
					}
				}
				$retour = $request->select()->from('speaker')->query()->get();
			}
			else {
				$retour = [];
			}
			return new Json($retour);

		}

        /**
         * @model speaker
         * @description connection d'un utilisateur
         * @method connection
         * @param mixed $args
         * @return Json
         * @route speaker/connection
         * @throws \Exception
         **/
		public function connection($args = []) {
		    $retour = ($conf = $this->get_manager('services')->conf()->get_sql_conf($this->bdd_type)['eventsbook'])
                    ? Request::getIRequest(new RequestConnexion((array)$conf, $this->bdd_type), $this->bdd_type)->select()
                    ->from('speaker')
                    ->where([
                        'email' => $this->get_from_name('email', $args),
                        'password' => $this->get_from_name('password', $args)
                    ])->query()->get(0) : [];

            if(empty((array)$retour)) {
                $retour = ['success' => false];
            }
            else {
                $user = (array)$retour->get_for_view();
                unset($user['password']);
                $retour = ['success' => true];
                $_SESSION['user'] = $user;
            }
            return new Json($retour);
        }

        /**
         * @model speaker
         * @description déconnecte un utilisateur
         * @method disconnect
         * @param mixed $args
         * @return Json
         * @route speaker/disconnect
         * @throws \Exception
         **/
        public function disconnect($args = []) {
		    unset($_SESSION['user']);
		    session_destroy();
		    return new Json(['success' => true]);
        }

        /**
         * @model speaker
         * @description inscrit un utilisateur
         * @method inscription
         * @param mixed $args
         * @return Json
         * @route speaker/inscription
         * @throws \Exception
         **/
        public function inscription($args = []) {
            return $this->add($args);
        }

        /**
         * @model speaker
         * @description retourne l'utilisateur connecté
         * @method connected
         * @param mixed $args
         * @return Json
         * @route speaker/connected
         * @throws \Exception
         **/
        public function connected($args = []) {
            return new Json(isset($_SESSION['user']) ? $_SESSION['user'] : []);
        }

	}