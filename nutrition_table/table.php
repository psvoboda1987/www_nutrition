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
$db = new SQLite3(__DIR__ . '/data/khp.db');
$data = getDataFromSqlite($db);

$adapter = new AssocArrayAdapter($data, $paginator);
$tableGenerator = new TableGenerator($adapter, new BootstrapDesignMiddleware());

$latte = new Latte\Engine();
$latte->setCacheDirectory(__DIR__ . '/temp');
$latte->render(__DIR__ . '/assets/template/table.latte', [
    'table' => new Html($tableGenerator->render()),
    'paginator' => new Html($paginator->getBuilder()->render()),
    'categories' => getCategories($db),
]);

function getDataFromSqlite(SQLite3 $db)
{
    $data = [];
    $sql = "SELECT
        product_name,
        kcal,
        protein,
        carbs,
        fat,
        fiber,
        cholesterol,
        glycemic_index
        FROM nutrition";
    if (isset($_GET['category']) && !empty($_GET['category'])) {
        $category = $db->escapeString($_GET['category']);
        $sql .= " WHERE category = '$category'";
    }
    if (isset($_GET['orderBy'])) {
        $sort = $db->escapeString($_GET['sort']) ?? 'ASC';
        $orderBy = strtolower(str_replace(' ', '_', $_GET['orderBy']));
        $sql .= " ORDER BY $orderBy $sort";
    }
    $query = $db->query($sql);
    while ($row = $query->fetchArray(SQLITE3_ASSOC)) {
        $data[] = $row;
    }
    return $data;
}

function getCategories(SQLite3 $db)
{
    $categories = [];
    $query = $db->query("SELECT DISTINCT category FROM nutrition");
    while ($row = $query->fetchArray(SQLITE3_ASSOC)) {
        $categories[] = $row['category'];
    }
    return $categories;
}
