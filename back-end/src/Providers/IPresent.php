<?php

namespace MyCoolNews\Providers;

interface IPresent {
    public function wrap(array $data, $success = true);
    public function output(array $data, $success = true);
}
