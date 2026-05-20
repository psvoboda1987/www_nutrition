<?php

echo '<pre>';
$db = new SQLite3(__DIR__ . '/../data/khp.db');
$results = $db->query("SELECT * FROM nutrition");
$data = [];
while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
    $data[] = $row;
}
file_put_contents(__DIR__ . '/../data/khp.json', json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
