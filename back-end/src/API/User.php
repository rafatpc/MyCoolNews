<?php

namespace MyCoolNews\API;

class User extends \MyCoolNews\Providers\JSON implements IRequestHandler {

    private $data;

    public function all() {
        $this->output($this->data->all());
    }

    public function single($id) {
        $this->output($this->data->single($id));
    }

    public function status() {
        $username = isset($_SESSION['username']) ? $_SESSION['username'] : null;

        $output = array(
            'isLoggedIn' => isset($username),
            'user' => null
        );

        if (isset($username)) {
            $output['user'] = $this->data->single($_SESSION['userId']);
        }

        $this->output($output);
    }

    public function logout() {
        session_destroy();
        $response = array(
            'loggedIn' => false
        );

        $this->output($response, true);
    }

    public function setup() {
        $this->data = new \MyCoolNews\Model\User();
    }
}
