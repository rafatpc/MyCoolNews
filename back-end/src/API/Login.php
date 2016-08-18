<?php

namespace MyCoolNews\API;

class Login extends \MyCoolNews\Providers\JSON implements IRequestHandler {

    private $data;

    public function login() {
        $success = false;
        $response = array();

        try {
            $data = $this->data->login($_POST['username'], $_POST['password']);
            $_SESSION['username'] = $data['username'];
            $_SESSION['userId'] = $data['id'];
            $success = true;
            $response = array(
                'loggedIn' => true,
                'username' => $_SESSION['username']
            );
        } catch(\Exception $e) {
            $response['error'] = $e->getMessage();
            $response['code'] = $e->getCode();
        }

        $this->output($response, $success);
    }

    public function setup() {
        $this->data = new \MyCoolNews\Model\User();
    }
}
