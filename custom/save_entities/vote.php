<?php

	namespace ormframework\custom\db_context;

	use \ormframework\core\db_context\entity;

	/**
	 * @method integer id(integer $id = null)
	 * @method string id_evenement(string $id_evenement = null)
	 **/
	class vote extends entity {
		protected $id;
		protected $id_evenement;
	}