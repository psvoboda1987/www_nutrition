<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Tracy\Debugger;
use League\Csv\Reader;

Debugger::enable();

$db = new SQLite3(__DIR__ . '/../data/nutrition.db');
$db->exec("DROP TABLE IF EXISTS nutrition");
$db->exec(
    "CREATE TABLE IF NOT EXISTS nutrition
    (
        id INTEGER PRIMARY KEY,
        name TEXT,
        protein DECIMAL(5,2),
        fat DECIMAL(5,2),
        carbs DECIMAL(5,2),
        sugar DECIMAL(5,2),
        fiber DECIMAL(5,2),
        salt DECIMAL(5,2),
        kcal SMALLINT,
        kj SMALLINT,
        protein_per_kcal DECIMAL(5,2)
    )"
);

$csv = Reader::from(__DIR__ . '/../data/nutrition.csv', 'r');
$csv->setHeaderOffset(0);
$records = $csv->getRecords();
foreach ($records as $row) {
    if ($row['kCal'] == 0) continue;
    $row['protein_per_kcal'] = $row['Bílkoviny'] / $row['kCal'] * 100;
    $insert = sprintf(
        "INSERT INTO nutrition (
            'name',
            'protein',
            'fat',
            'carbs',
            'sugar',
            'fiber',
            'salt',
            'kcal',
            'kj',
            'protein_per_kcal'
        )
        VALUES ('%s', %f, %f, %f, %f, %f, %f, %d, %d, %d)",
        $row['Název výrobku'],
        $row['Bílkoviny'],
        $row['Tuky'],
        $row['Sacharidy'],
        $row['Cukry'],
        $row['Vláknina'],
        $row['Sůl'],
        $row['kCal'],
        $row['kJ'],
        $row['protein_per_kcal'],
    );
    $db->exec($insert);
}
var_dump('<BR>Last inserted row ID : ' . $db->lastInsertRowID());
