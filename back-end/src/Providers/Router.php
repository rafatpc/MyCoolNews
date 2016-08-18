<?php

namespace MyCoolNews\Providers;

class Router extends JSON {
    private static $instance = null;
    private $routeFound = false;
    private $interface = 'IRequestHandler';
    private $path;
    private $query;

    private function __construct() {
        $request = explode('?', $_SERVER['REQUEST_URI']);

        $this->path = isset($request[0]) ? trim($request[0], '/') : '';
        $this->query = isset($request[1]) ? $request[1] : '';
        $this->method = strtolower($_SERVER['REQUEST_METHOD']);
    }

    private function decodeRegExPath($path) {
        $params = array();
        $nomatch = array(
            'matches' => false
        );

        preg_match_all("/(\w+):([^)]*)/", $path, $params, PREG_SET_ORDER);

        if (count($params) === 0) {
            return $nomatch;
        }

        $routeRegEx = preg_replace("/(\w+):/", '', $path, -1);
        $routeRegEx = preg_replace("/([^\\\])\//", "$1\\/", $routeRegEx, -1);

        $matches = array();

        preg_match_all("/^$routeRegEx$/", $this->path, $matches, PREG_SET_ORDER);

        if (count($matches) === 0) {
            return $nomatch;
        }

        array_shift($matches[0]);

        $definedVariables = array();
        $variables = array();

        preg_match_all("/(\w+):/", $path, $definedVariables);

        foreach ($matches[0] as $key => $match) {
            $variables[$definedVariables[1][$key]] = $match;
        }

        return array(
            'matches' => true,
            'regex' => $routeRegEx,
            'variables' => $variables
        );
    }

    public function get($path, $routeHandler) {
        if ($this->method !== 'get') {
            return;
        }

        $this->route($path, $routeHandler);
    }

    public function post($path, $routeHandler) {
        if ($this->method !== 'post') {
            return;
        }

        $this->route($path, $routeHandler);
    }

    public function route($path, $routeHandler) {
        try {
            $routeParams = $this->handleRoute($path);
            $this->routeFound = true;
            $this->handleRequest($routeHandler, $routeParams);
        } catch(\Exception $e) {
            // Route didn't match
        }
    }

    public function handleRoute($path) {
        $regexRoute = array();

        if(strpos($path, '/') !== false) {
            $path = trim($path, '/');
        }

        if ($path !== $this->path) {
            $regexRoute = $this->decodeRegExPath($path);;

            if (!$regexRoute['matches']) {
                throw new \Exception("Route didn't match.", 400);
            }
        }

        $regexRoute['matches'] = true;

        return $regexRoute;
    }

    public function handleRequest($routeHandler, array $regexRoute = array()) {
        $handlerClass = $routeHandler[0];

        if (!$this->isRequestHandler($handlerClass)) {
            throw new \Exception("Your request handler should implement the " . $this->interface . " interface", 400);
        }

        $handler = new $handlerClass();
        $handler->setup();
        
        if (!is_array($routeHandler[1])) {
            $handler->$routeHandler[1]();
        } else {
            $method = current(array_keys($routeHandler[1]));
            $handlerParams = $routeHandler[1][$method];
            $params = array();

            if (!is_array($handlerParams)) {
                $params[] = $regexRoute['variables'][$handlerParams];
            } else {
                foreach ($handlerParams as $param) {
                    $params[] = $regexRoute['variables'][$param];
                }
            }

            call_user_func_array(array($handler, $method), $params);
        }
    }

    public function isRequestHandler($class) {
        $classInheritances = class_implements($class);

        foreach ($classInheritances as $inheritance) {
            if (strpos($inheritance, $this->interface) !== false) {
                return true;
            }
        }

        return false;
    }

    public function __destruct() {
        if ($this->routeFound) {
            return;
        }

        $this->output(array(
            'error' => 'Route not found.',
            'code' => 404
        ), false);
    }

    public static function getInstance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;
    }
}
