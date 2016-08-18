<?php

error_reporting(E_ALL);
session_start();

include 'src/Helpers/http_response_code.function.php';

include 'src/Providers/INewsData.php';
include 'src/Providers/IPresent.php';
include 'src/Providers/ISortable.php';
include 'src/Providers/JSON.php';
include 'src/Providers/Router.php';
include 'src/Providers/Data.php';
include 'src/Providers/MySQL/Data.php';
include 'src/Providers/MySQL/Query.php';

include 'src/Model/Article.php';
include 'src/Model/User.php';

include 'src/API/IRequestHandler.php';
include 'src/API/Article.php';
include 'src/API/Login.php';
include 'src/API/Navigation.php';
include 'src/API/Register.php';
include 'src/API/User.php';

$data = \MyCoolNews\Providers\Data::getInstance();
$query = $data->select('users')
              ->sort(array(
                  'name' => 'asc',
                  'id' => 'desc'
              ))
              ->limit(10, 1);

var_dump($query->getQuery());
