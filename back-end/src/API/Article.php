<?php

namespace MyCoolNews\API;

class Article extends \MyCoolNews\Providers\JSON implements IRequestHandler {

    private $data;

    public function all() {
        $this->output($this->data->all());
    }

    public function paginate($page) {
        $this->output($this->data->paginate($page));
    }

    public function single($id) {
        $this->output($this->data->single($id));
    }

    public function byUser($id) {
        $this->output($this->data->byUser($id));
    }

    public function setup() {
        $this->data = new \MyCoolNews\Model\Article();
    }
}
