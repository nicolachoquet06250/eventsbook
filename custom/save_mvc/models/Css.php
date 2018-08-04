<?php

	namespace ormframework\custom\mvc\models;

	use ormframework\core\mvc\Model;
    use ormframework\custom\mvc\views\Javascript;
    use sql_links\factories\Request;
	use sql_links\factories\RequestConnexion;
	use \ormframework\custom\mvc\views\Json;

	class Css extends Model {

        /**
         * @model Css
         * @description récupère tous les Css materialize minimisées
         * @method get_materialize
         * @param void $args
         * @return \ormframework\custom\mvc\views\Css
         * @route Css/get_materialize
         * @throws \Exception
         **/
        public function get_materialize() {
            if(is_file('custom/website/materialize/css/materialize.min.css')) {
                $retour = file_get_contents('custom/website/materialize/css/materialize.min.css');
            }
            elseif (is_file('core/website/materialize/css/materialize.min.css')) {
                $retour = file_get_contents('core/website/materialize/css/materialize.min.css');
            }
            else {
                $retour = '';
            }
            return new \ormframework\custom\mvc\views\Css($retour);
        }

        /**
         * @model Css
         * @description récupère tous les Css perso
         * @method get_styles
         * @param mixed $args
         * @return \ormframework\custom\mvc\views\Css
         * @route Css/get_styles
         * @throws \Exception
         **/
        public function get_styles($args = []) {
            $style = $this->get_from_name('style', $args) ? $this->get_from_name('style', $args) : 'style';
            $style .= '.css';
            if(is_file('custom/website/css/'.$style)) {
                $retour = file_get_contents('custom/website/css/'.$style);
            }
            elseif (is_file('core/website/css/'.$style)) {
                $retour = file_get_contents('core/website/css/'.$style);
            }
            else {
                $retour = '';
            }
            return new \ormframework\custom\mvc\views\Css($retour);
        }

	}