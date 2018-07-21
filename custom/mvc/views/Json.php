<?php

namespace ormframework\custom\mvc\views;

use ormframework\core\db_context\entity;
use ormframework\core\mvc\view;

class Json extends view {

    public function content_type() {
        return 'application/json';
    }

    public function display()
    {
        if(gettype($this->data) === 'array' && $this->data[0] instanceof entity) {
            /**
             * @var entity $data
             */
            foreach ($this->data as $id => $data) {
                $this->data[$id] = $data->get_for_view();
            }
        }
        elseif (gettype($this->data) === 'object' && $this->data instanceof entity) {
            /**
             * @var entity $data;
             */
            $data = $this->data;
            $this->data = $data->get_for_view();
        }
        return json_encode($this->data);
    }
}