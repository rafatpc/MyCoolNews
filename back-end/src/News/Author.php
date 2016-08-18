<?php

namespace MyCoolNews\News;

class Author extends \MyCoolNews\User {
    public function __construct($id) {
        parent::__construct($id);
    }

    private function getArticles()
    {
        echo "key key key";
    }
}
