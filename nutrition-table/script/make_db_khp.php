<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Tracy\Debugger;
use League\Csv\Reader;

Debugger::enable();

$db = new SQLite3(__DIR__ . '/../data/khp.db');
$db->exec("DROP TABLE IF EXISTS nutrition");
$db->exec("CREATE TABLE IF NOT EXISTS nutrition(
        id INTEGER PRIMARY KEY,
        product_name TEXT,
        kj SMALLINT,
        kcal SMALLINT,
        protein DECIMAL(5,2),
        fat DECIMAL(5,2),
        carbs DECIMAL(5,2),
        glycemic_index TEXT,
        cholesterol SMALLINT,
        fiber DECIMAL(5,2),
        category TEXT)");

$csv = Reader::from(__DIR__ . '/../data/khp.csv', 'r');
$records = $csv->getRecords();
foreach ($records as $r => $row) {
    $compiledRow = array_filter($row, function ($value) {
        return $value !== '';
    });
    if (count($compiledRow) === 1) {
        $category = implode('', $compiledRow);
        continue;
    }
    if (isset($category)) {
        $row[] = $category;
    }
    $insert = sprintf(
        "INSERT INTO nutrition (
            'product_name',
            'kj',
            'kcal',
            'protein',
            'fat',
            'carbs',
            'glycemic_index',
            'cholesterol',
            'fiber',
            'category'
        )
        VALUES ('%s', %d, %d, %f, %f, %f, '%s', %d, %f, '%s')",
        $row[0],
        $row[1],
        $row[2],
        $row[3],
        $row[4],
        $row[5],
        $row[6],
        $row[7],
        $row[8],
        $row[9],
    );
    $db->exec($insert);
}
var_dump('<BR>Last inserted row ID : ' . $db->lastInsertRowID());
