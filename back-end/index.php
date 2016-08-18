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

$router = MyCoolNews\Providers\Router::getInstance();

$router->get('/articles', array(
    'MyCoolNews\API\Article',
    'all'
));

$router->get('/articles/page/(page:\d+)', array(
    'MyCoolNews\API\Article',
    array('paginate' => 'page')
));

$router->get('/articles/(id:\d+)', array(
    'MyCoolNews\API\Article',
    array('single' => 'id')
));

$router->get('/articles/userId/(id:\d+)', array(
    'MyCoolNews\API\Article',
    array('byUser' => 'id')
));

$router->get('/users', array(
    'MyCoolNews\API\User',
    'all'
));

$router->get('/users/status', array(
    'MyCoolNews\API\User',
    'status'
));

$router->get('/users/(id:\d+)', array(
    'MyCoolNews\API\User',
    array('single' => 'id')
));

$router->get('/logout', array(
    'MyCoolNews\API\User',
    'logout'
));

$router->get('/navigation', array(
    'MyCoolNews\API\Navigation',
    'links'
));

$router->post('/login', array(
    'MyCoolNews\API\Login',
    'login'
));

$router->post('/register', array(
    'MyCoolNews\API\Register',
    'register'
));
