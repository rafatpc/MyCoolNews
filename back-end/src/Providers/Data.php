<?php

namespace MyCoolNews\Providers;

class Data {
    private static $instance = null;
    private static $dataSource = null;

    private function __construct() {}

    private static function getDataSource() {
        $dataSourceInstance = \MyCoolNews\Providers\MySQL\Data::getInstance();

        self::$dataSource = $dataSourceInstance;
    }

    public static function getInstance() {
        if (null === self::$instance) {
            self::$instance = new self();
            self::getDataSource();
        }

        return self::$dataSource;
    }
}
