<?php

namespace MyCoolNews\Model;

class User {
    private $data;
    private $cache = array();

    public function __construct() {
        $this->data = \MyCoolNews\Providers\Data::getInstance();
    }

    public function all() {
        $result = $this->data
                    ->select("users")
                    ->execute()
                    ->getResultArray();

        $this->filterSensitiveData($result);

        return $result;
    }

    public function single($id) {
        if (isset($this->cache[$id])) {
            return $this->cache[$id];
        }

        $result = $this->data
                    ->select("users", array(
                        array('id', '=', $id)
                    ))
                    ->execute()
                    ->getResultArray();

        $this->filterSensitiveData($result);
        $this->cache[$id] = $result[0];

        return $result[0];
    }

    public function login($username, $password) {
        if (!$this->validateUsername($username)) {
            throw new \Exception("Invalid username.", 400);
        }

        if (!$this->validatePassword($password)) {
            throw new \Exception("Invalid password.", 400);
        }

        $user = $this->data
                    ->select("users", array(
                        array(
                            'username', '=', $username
                        ),
                        'and' => array(
                            'password', '=', md5($password)
                        )
                    ))
                    ->execute()
                    ->getResultArray();

        if (count($user) !== 1) {
            throw new \Exception("Incorrect username or password.", 400);
        }

        return $user[0];
    }

    public function register(array $userData) {
        if (!$this->validateUsername($userData['username'])) {
            throw new \Exception("Invalid username.", 400);
        }

        if (!$this->validatePassword($userData['password'])) {
            throw new \Exception("Invalid password.", 400);
        }

        if ($userData['password'] !== $userData['repassword']) {
            throw new \Exception("Passwords didn't match.", 400);
        }

        if (!$this->validateEmail($userData['mail'])) {
            throw new \Exception("Invalid email.", 400);
        }

        if (!$this->validateName($userData['name'])) {
            throw new \Exception("Invalid name.", 400);
        }

        $usernameCntCondition = array('username', '=', $userData['username']);
        $userCntCheck = $count = $this->data
                    ->select("users", array($usernameCntCondition))
                    ->execute()->getCount();

        if ($userCntCheck !== 0) {
            throw new \Exception("Username already exists.", 400);
        }

        $mailCntCondition = array('mail', '=', $userData['mail']);
        $mailCntCheck = $count = $this->data
                    ->select("users", array($mailCntCondition))
                    ->execute()->getCount();

        if ($mailCntCheck !== 0) {
            throw new \Exception("E-mail already used.", 400);
        }

        unset($userData['repassword']);
        $userData['password'] = md5($userData['password']);

        return $this->data
                    ->insert("users", $userData)
                    ->execute();
    }

    private function validateUsername($username) {
        return preg_match('/^[A-Za-z0-9_-]{4,15}$/', $username);
    }

    private function validatePassword($password) {
        return preg_match("/^[^ ]{4,15}$/", $password);
    }

    private function validateEmail($email) {
        return preg_match("/^([A-Za-z0-9._]{4,})@([A-Za-z0-9_]{2,}\.\w{2,6})$/", $email);
    }

    private function validateName($name) {
        return preg_match("/^(\w+ ?){2,4}$/", $name);
    }

    private function filterSensitiveData(&$userData) {
        foreach ($userData as &$user) {
            unset($user['password'], $user['permissions']);
        }
    }
}
