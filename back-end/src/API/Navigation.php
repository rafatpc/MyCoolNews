<?php

namespace MyCoolNews\API;

class Navigation extends \MyCoolNews\Providers\JSON implements IRequestHandler {

    private $data;

    public function links() {
        $links = array();

        $links['leftLinks'] = array(
            'articles' => "Articles"
        );

        $links['rightLinks'] = array(
            'signup' => "Sign Up",
            'login' => "Login"
        );

        $links['rightLinksActiveUser'] = array(
            'settings' => "Settings",
            'logout' => "Log out"
        );

        $links['title'] = "My Cool News";

        $this->output($links, true);
    }

    public function setup() {
        $this->data = new \MyCoolNews\Model\User();
    }
}
