<?php

namespace MyCoolNews\Providers;

interface INewsData {
    public function select($node, array $filters = array());
    public function update($node, array $params, array $filters = array());
    public function insert($node, array $params);
}
