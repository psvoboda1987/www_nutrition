<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/class/BootstrapDesignMiddleware.php';

use Ucscode\HtmlComponent\TableGenerator\Adapter\AssocArrayAdapter;
use Ucscode\HtmlComponent\TableGenerator\TableGenerator;
use Ucscode\Paginator\Paginator;
use Latte\Runtime\Html;

$paginator = new Paginator(
    itemsPerPage: 20,
    currentPage: $_GET['page'] ?? 1
);
$data = getDataFromSqlite(__DIR__ . '/data/khp.db');
$adapter = new AssocArrayAdapter($data, $paginator);
$bootstrapMiddleware = new BootstrapDesignMiddleware();
$tableGenerator = new TableGenerator($adapter, $bootstrapMiddleware);
$paginatorBuilder = $paginator->getBuilder();

$params = [
    'table' => new Html($tableGenerator->render()),
    'paginator' => new Html($paginatorBuilder->render()),
];

$latte = new Latte\Engine();
$latte->setCacheDirectory(__DIR__ . '/temp');
$latte->render(__DIR__ . '/assets/template/table.latte', $params);

function getDataFromSqlite(string $path)
{
    $data = [];
    $db = new SQLite3($path);
    $sql = "SELECT * FROM nutrition";
    if (isset($_GET['orderBy'])) {
        $sort = $_GET['sort'] ?? 'ASC';
        $orderBy = strtolower(str_replace(' ', '_', $_GET['orderBy']));
        $sql .= " ORDER BY $orderBy $sort";
    }
    $query = $db->query($sql);
    while ($row = $query->fetchArray(SQLITE3_ASSOC)) {
        $data[] = $row;
    }
    return $data;
}
