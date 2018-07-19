<?php

	namespace ormframework\custom\db_context;

	use \ormframework\core\db_context\entity;

	/**
	 * @method integer id(integer $id = null)
	 * @method string label(string $label = null)
	 * @method string data_name(string $data_name = null)
	 * @method string base64_data(string $base64_data = null)
	 **/
	class media extends entity {
		protected $id;
		protected $label;
		protected $data_name;
		protected $base64_data;
	}