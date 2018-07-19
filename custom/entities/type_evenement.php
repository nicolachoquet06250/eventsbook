<?php

	namespace ormframework\custom\db_context;

	use \ormframework\core\db_context\entity;

	/**
	 * @method integer id(integer $id = null)
	 * @method string label(string $label = null)
	 **/
	class type_evenement extends entity {
		protected $id;
		protected $label;
	}