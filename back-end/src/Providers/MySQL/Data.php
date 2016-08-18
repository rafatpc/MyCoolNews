<?php

namespace MyCoolNews\Providers\MySQL;

class Data implements \MyCoolNews\Providers\INewsData {
    private static $instance = null;
    private $connection = array();
    private $defaultKey = 'default';
    private $allowedConditions = array(
        'and',
        'or'
    );
    private $allowedFilterConditions = array(
        '=',
        '>',
        '<',
        '!='
    );

    private function __construct() {
        $databases = include './config/database.php';

        if (!array_key_exists($this->defaultKey, $databases)) {
            throw new \Exception("No default database set", 400);
        }

        foreach ($databases as $name => $config) {
            $this->setConnection($config, $name);
        }
    }

    private function setConnection($cfg, $name) {
        $link = mysqli_connect(
            $cfg['host'],
            $cfg['user'],
            $cfg['pass'],
            $cfg['db']
        );

        if (!$link) {
            throw new \Exception("Couldn't connect to the database", mysqli_connect_errno());
        }

        $this->connection[$name] = $link;
    }

    private function getConnections() {
        return $this->connection;
    }

    private function decodeFilters(array $filters) {
        $filterString = array();

        foreach ($filters as $condition => $filter) {
            if (!is_int($condition)) {
                if (!in_array($condition, $this->allowedConditions)) {
                    throw new \Exception("Condition {$condition} not allowed.", 400);
                }

                $filterString[] = $condition;
            }

            if (!in_array($filter[1], $this->allowedFilterConditions)) {
                throw new \Exception(">> Condition {$filter[1]} not allowed.", 400);
            }

            $filterString[] = "`{$filter[0]}`{$filter[1]}'{$filter[2]}'";
        }

        return join(" ", $filterString);
    }

    public function getConnection($name = 'default') {
        return $this->connection[$name];
    }

    public function select($node, array $filters = array()) {
        $query = "Select * From `{$node}`";

        if (count($filters) > 0) {
            $filtersString = $this->decodeFilters($filters);
            $query .= " Where " . $filtersString;
        }

        return new \MyCoolNews\Providers\MySQL\Query($query);
    }

    public function update($node, array $params, array $filters = array()) {

    }

    public function insert($node, array $params) {
        $columns = join(array_keys($params), '`, `');
        $values = join($params, "', '");
        $query = "INSERT INTO `{$node}` (`{$columns}`) VALUES ('{$values}')";

        return new \MyCoolNews\Providers\MySQL\Query($query);
    }

    public static function getInstance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public function __destruct() {
        $connections = $this->getConnections();

        foreach ($connections as $connection) {
            mysqli_close($connection);
        }
    }
}
