<?php

	namespace ormframework\custom\mvc\models;

	use ormframework\core\mvc\Model;
	use \ormframework\custom\setup\utils;
	use sql_links\factories\Request;
	use sql_links\factories\RequestConnexion;
	use \ormframework\custom\mvc\views\Json;

	class media extends Model {
		private $my_utils, $bdd_type;
		public function __construct($is_assoc, $bdd_type='json') {
			parent::__construct($is_assoc);
			$this->my_utils = new utils();
			$this->bdd_type = $bdd_type;
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
			if($conf = $this->get_manager('services')->conf()->get_sql_conf($this->bdd_type)['eventsbook']) {
				$request = Request::getIRequest(new RequestConnexion((array)$conf, $this->bdd_type), $this->bdd_type);
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
			if($conf = $this->get_manager('services')->conf()->get_sql_conf($this->bdd_type)['eventsbook']) {
				$request = Request::getIRequest(new RequestConnexion((array)$conf, $this->bdd_type), $this->bdd_type);
				$existence_test = $request->select()->from('media')->query()->get();
				$ok = true;
                /**
                 * @var \ormframework\custom\db_context\media $item
                 */
                foreach ($existence_test as $item) {
                    if($item->id_evenement() === $this->get_from_name('id_evenement', $args) && $item->id_speaker() === utils::http_session('user', 'id') && $item->label() === $this->get_from_name('label', $args) && $item->base64_data() === utils::http_post('image')) {
                        $ok = false;
                        break;
                    }
				}
				if($ok) {
                    $media = new \ormframework\custom\db_context\media($request, false, ['id_evenement' => $this->get_from_name('id_evenement', $args), 'type_media' => $this->get_from_name('type_media', $args), 'id_speaker' => utils::http_session('user', 'id'), 'label' => $this->get_from_name('label', $args), 'base64_data' => utils::http_post('image')]);
                    $media->add();
                }
				$retour = $request->select()->from('media')->query()->get();
			}
			else {
				$retour = [];
			}
			return new Json($retour);

		}

        /**
         * @param array $args
         * @return Json
         * @throws \Exception
         */
        public function preview($args = []) {
            $file = utils::http_files('image');
            $base64_img = $file ? base64_encode(file_get_contents($file['tmp_name'])) : '';
            $base64_img = 'data: '.mime_content_type($file['tmp_name']).';base64,'.$base64_img;

            $retour = [
                'image_base64' => $base64_img,
            ];
            return new Json($retour);
        }

        /**
         * @param array $args
         */
        public function preview_youtube($args = []) {
            var_dump($this->get_from_name('media_type', $args), $this->get_from_name('id_evenement', $args), utils::http_get('youtube_url'));
            return new Json([]);
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
			if($conf = $this->get_manager('services')->conf()->get_sql_conf($this->bdd_type)['eventsbook']) {
				$request = Request::getIRequest(new RequestConnexion((array)$conf, $this->bdd_type), $this->bdd_type);
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
			if($conf = $this->get_manager('services')->conf()->get_sql_conf($this->bdd_type)['eventsbook']) {
				$request = Request::getIRequest(new RequestConnexion((array)$conf, $this->bdd_type), $this->bdd_type);
				/**
				 * @var \ormframework\core\db_context\entity $media
				 */
				$media = $request->select()->from('media')->where(['id' => $this->get_from_name('id', $args)])->query()->get(0);
				foreach($media->get_not_null_props() as $prop) {
					if($this->get_from_name($prop, $args) !== null) {
						$media->$prop($this->get_from_name($prop, $args));
					}
				}
				$retour = $request->select()->from('media')->query()->get();
			}
			else {
				$retour = [];
			}
			return new Json($retour);

		}

	}