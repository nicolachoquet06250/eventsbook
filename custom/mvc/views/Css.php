<?php

namespace ormframework\custom\mvc\views;


use ormframework\core\mvc\view;

class Css extends view {
    public function content_type() {
        return 'text/css';
    }

    public function display() {
        return $this->data;
    }
}