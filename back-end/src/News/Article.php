<?php

namespace MyCoolNews\News;

class Article {
    private $id;
    private $author;
    private $title;
    private $text;
    private $date;

    public function __construct($id) {
        $this->setId($id);
        $this->fetchArticleData();
    }

    private function setId($id)
    {
        if ((int) $id === 0) {
            throw new \Exception("Invalid article id!", 400);
        }

        $this->id = $id;
    }

    private function fetchArticleData() {

    }

    public function getId() {
        return $this->id;
    }
}
