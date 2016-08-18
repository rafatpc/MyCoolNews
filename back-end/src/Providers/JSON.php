<?php

namespace MyCoolNews\Providers;

class JSON implements IPresent {

    public function wrap(array $data, $success = true) {
        $wrapper = array(
            'data' => &$data,
            'success' => $success,
            'time' => time()
        );

        if (isset($data['total'])) {
            $wrapper['total'] = $data['total'];
            unset($data['total']);
        }

        return $wrapper;
    }

    public function output(array $data, $success = true) {
        if(isset($data['code'])) {
            http_response_code($data['code']);
            unset($data['code']);
        }

        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: http://mycool.news:8080');
        header('Access-Control-Allow-Credentials: true');
        echo json_encode($this->wrap($data, $success));
    }
}
