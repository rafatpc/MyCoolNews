<?php

namespace MyCoolNews\API;

class Register extends \MyCoolNews\Providers\JSON implements IRequestHandler {

    private $data;

    public function register() {
        $userData = array(
            "username" => $_POST['username'],
            "password" => $_POST['password'],
            "repassword" => $_POST['repassword'],
            "mail" => $_POST['email'],
            "name" => $_POST['name'],
            "date" => time()
        );

        try {
            $result = $this->data->register($userData);
            $output['message'] = "Registration successfull!";
            $autologin = new Login();
            $autologin->setup();
            $autologin->login();
        } catch(\Exception $e) {
            $this->output(array(
                'code' => $e->getCode(),
                'error' => $e->getMessage()
            ), false);
        }
    }

    public function setup() {
        $this->data = new \MyCoolNews\Model\User();
    }
}
