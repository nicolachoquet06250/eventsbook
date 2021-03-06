<?php

	namespace ormframework\custom\db_context;

	use \ormframework\core\db_context\entity;
    use phpDocumentor\Reflection\Types\Integer;

    /**
	 * @method integer id(integer $id = null)
     * @method integer id_speaker(integer $id_speaker = null)
     * @method integer id_evenement(integer $id_evenement = null)
     * @method integer type_media(Integer $type_media = null)
	 * @method string label(string $label = null)
	 * @method string base64_data(string $base64_data = null)
	 **/
	class media extends entity {
		protected $id;
		protected $id_speaker;
		protected $id_evenement;
		protected $type_media;
		protected $label;
		protected $base64_data;
	}