<?php

	namespace ormframework\custom\db_context;

	use \ormframework\core\db_context\entity;

	/**
	 * @method integer id(integer $id = null)
	 * @method string nom(string $nom = null)
	 * @method string prenom(string $prenom = null)
	 * @method string description(string $description = null)
     * @method string email(string $email = null)
     * @method string password(string $password = null)
	 **/
	class speaker extends entity {
		protected $id;
		protected $nom;
		protected $prenom;
		protected $description;
		protected $email;
		protected $password;
	}