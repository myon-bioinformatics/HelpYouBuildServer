<?php
/**
 * Simple HTTP server in PHP using the built-in server.
 * Start with: php -S localhost:3070 main.php
 */

define('PORT', 3070);

// Print server start message on first request or via CLI hint.
// When using `php -S`, this file is the router script.

/**
 * Process and log the control message.
 */
function processMessage(string $text, int $number): void {
    echo "Accepted Control message, Text: {$text}, Number: {$number}" . PHP_EOL;
}

$method = $_SERVER['REQUEST_METHOD'];
$path   = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ($path === '/admin' && $method === 'POST') {
    $body = file_get_contents('php://input');
    parse_str($body, $params);

    $text   = $params['text']   ?? null;
    $number = $params['number'] ?? null;

    if ($text === null || $number === null || !ctype_digit((string)$number)) {
        http_response_code(400);
        header('Content-Type: text/plain');
        echo 'Bad Request';
        exit;
    }

    $number = (int)$number;
    processMessage($text, $number);

    http_response_code(200);
    header('Content-Type: text/plain');
    echo "OK, Accepted Control message, Text: {$text}, Number: {$number}";
    exit;
}

http_response_code(200);
header('Content-Type: text/plain');
echo "OK: It's a GET method or url not in \"/admin\"";
