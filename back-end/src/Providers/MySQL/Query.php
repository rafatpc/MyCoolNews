<?php

namespace MyCoolNews\Providers\MySQL;

class Query implements \MyCoolNews\Providers\ISortable {
    private $link = null;
    private $query = null;
    private $execute = null;
    private $count = null;
    private $sort = null;
    private $limit = null;

    public function __construct($query, $link = 'default') {
        $this->query = $query;
        $this->link = \MyCoolNews\Providers\MySQL\Data::getInstance()->getConnection($link);
    }

    public function execute() {
        if ($this->execute === null) {
            $this->execute = mysqli_query($this->link, join(" ", array(
                $this->query,
                $this->sort,
                $this->limit
            )));
        }

        return $this;
    }

    public function fetchRow() {
        return mysqli_fetch_array($this->execute, MYSQLI_ASSOC);
    }

    public function getResultArray() {
        $result = array();

        while ($row = $this->fetchRow()) {
            $result[] = $row;
        }

        return $result;
    }

    public function getCount() {
        if ($this->count === null) {
            $this->count = mysqli_num_rows($this->execute);
        }

        return $this->count;
    }

    public function sort(array $conditions) {
        $conditionsQuery = array();

        foreach ($conditions as $field => $order) {
            $conditionsQuery[] = "`{$field}` {$order}";
        }

        $this->sort = "order by " . join(", ", $conditionsQuery);

        return $this;
    }

    public function limit($start, $count) {
        $this->limit = "limit {$start}, $count";

        return $this;
    }

    public function getQuery() {
        return  join(" ", array(
            $this->query,
            $this->sort,
            $this->limit
        ));
    }
}
