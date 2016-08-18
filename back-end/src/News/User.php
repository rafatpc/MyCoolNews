<?php

namespace MyCoolNews;

class User {
    private $id;
    private $name;
    private $username;
    private $password;
    private $mail;
    private $date;
    private $permissions;

    public function __construct($id) {
        $this->setId($id);
        $this->fetchAuthorData();
    }

    private function setId($id)
    {
        if ((int) $id === 0) {
            throw new \Exception("Invalid user id!", 400);
        }

        $this->id = $id;
    }

    private function fetchUserData() {

    }

    protected function getId() {
        return $this->id;
    }
}
