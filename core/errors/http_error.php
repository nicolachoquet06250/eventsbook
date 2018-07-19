<?php

namespace ormframework\core\errors;

use ormframework\core\db_context\entity;

class http_error extends entity
{
    public $code, $message = 'Page not found';

    public function header() {
        header('HTTP/1.0 '.(string)$this->code.' '.$this->message);
    }
}