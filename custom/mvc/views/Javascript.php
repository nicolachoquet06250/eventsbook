<?php

namespace ormframework\custom\mvc\views;


use ormframework\core\mvc\view;

class Javascript extends view {
    public function content_type() {
        return 'text/javascript';
    }

    public function display() {
        return $this->data;
    }
}