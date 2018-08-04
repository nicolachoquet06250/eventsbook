<?php

	namespace ormframework\custom\db_context;

	use \ormframework\core\db_context\entity;

	/**
	 * @method integer id(integer $id = null)
	 * @method string id_type_evenement(string $id_type_evenement = null)
	 * @method string label(string $label = null)
	 * @method string description(string $description = null)
	 * @method string date_debut(string $date_debut = null)
	 * @method string date_fin(string $date_fin = null)
	 * @method string link(string $link = null)
	 **/
	class evenement extends entity {
		protected $id;
		protected $id_type_evenement;
		protected $label;
		protected $description;
		protected $date_debut;
		protected $date_fin;
		protected $link;
	}