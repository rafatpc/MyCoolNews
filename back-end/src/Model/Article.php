<?php

namespace MyCoolNews\Model;

class Article {
    private $data;
    private $rowsPerPage = 3;

    public function __construct() {
        $this->data = \MyCoolNews\Providers\Data::getInstance();
    }

    public function all() {
        $result = $this->data
                    ->select("articles")
                    ->execute()
                    ->getResultArray();

        $this->addUserInfo($result);

        return $result;
    }

    public function paginate($page) {
        $page = intval($page) === 0 ? 0 : (intval($page) - 1);
        $start = $page * $this->rowsPerPage;

        $result = $this->data
                       ->select("articles")
                       ->limit($start, $this->rowsPerPage)
                       ->execute()
                       ->getResultArray();

        $this->addUserInfo($result);
        $result['total'] = $this->data->select("articles")->execute()->getCount();

        return $result;
    }

    public function single($id) {
        $result = $this->data
                       ->select("articles", array(
                           array('id', '=', $id)
                       ))
                       ->execute()
                       ->getResultArray();

        $this->addUserInfo($result);

        return $result;
    }

    public function byUser($id) {
        $result = $this->data
                       ->select("articles", array(
                           array('author', '=', $id)
                       ))
                       ->execute()
                       ->getResultArray();

        $this->addUserInfo($result);

        return $result;
    }

    private function addUserInfo(&$articles) {
        $userModel = new \MyCoolNews\Model\User();

        foreach ($articles as &$article) {
            $article['author'] = $userModel->single($article['author']);
        }
    }
}
