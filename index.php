<?php

declare(strict_types=1);

require_once(__DIR__ . '/vendor/autoload.php');

if ($_SERVER['REMOTE_ADDR'] !== '127.0.0.1' && $_SERVER['SERVER_NAME'] !== 'localhost') {
    \Sentry\init(['dsn' => 'https://4e032f5bedb0420fa69e348023a584f5@o1233979.ingest.sentry.io/4504237528973312']);
}

$latte = new Latte\Engine;
$latte->setTempDirectory(__DIR__ . '/temp');
$latte->render('index.latte');