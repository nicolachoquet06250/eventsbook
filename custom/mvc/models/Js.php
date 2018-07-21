<?php

	namespace ormframework\custom\mvc\models;

	use ormframework\core\mvc\Model;
    use ormframework\custom\mvc\views\Javascript;

	class Js extends Model {

		/**
		 * @model Js
		 * @description récupère tous les Js materialize minimisées
		 * @method get_materialize
		 * @param void $args
		 * @return Javascript
		 * @route Js/get_materialize
		 * @throws \Exception
		 **/
		public function get_materialize() {
			if(is_file('custom/website/materialize/js/materialize.min.js')) {
			    $retour = file_get_contents('custom/website/materialize/js/materialize.min.js');
            }
            elseif (is_file('core/website/materialize/js/materialize.min.js')) {
			    $retour = file_get_contents('core/website/materialize/js/materialize.min.js');
            }
            else {
                $retour = '';
            }
			return new Javascript($retour);
		}

        /**
         * @model Js
         * @description récupère tous les Js perso
         * @method get_scripts
         * @param mixed $args
         * @return Javascript
         * @route Js/get_scripts
         * @throws \Exception
         **/
        public function get_scripts($args = []) {
            $script = $this->get_from_name('script', $args) ? $this->get_from_name('script', $args) : 'script';
            $script .= '.js';
            if(is_file('custom/website/js/'.$script)) {
                $retour = file_get_contents('custom/website/js/'.$script);
            }
            elseif (is_file('core/website/js/'.$script)) {
                $retour = file_get_contents('core/website/js/'.$script);
            }
            else {
                $retour = '';
            }
            return new Javascript($retour);
        }

	}