<?php

$txt = '';
$new_url = '';
$path_dev = 'dev.ini';
$path_prod = 'prod.ini';

if (file_exists($path_prod)) {
    // File with settings
    $arr = parse_ini_file($path_prod);
} else {
    // File with settings
    $arr = parse_ini_file($path_dev);
}

$token = $arr['TELEGRAM_TOKEN'];
$chat_id = $arr['TELEGRAM_CHATID'];

//We determine the variables for transmitting data from our form

$name = $_POST['name'];
$phone = $_POST['phone'];
$comment = $_POST['comment'];

//We collect in the array what the bot will be transmitted
$arr = [
    'Имя:' => $name,
    'Телефон:' => $phone,
    'Комментарий:' => $comment,
];

//We set up the appearance of the message in the telegram
foreach ($arr as $key => $value) {
    $txt .= '<b>' . $key . '</b> ' . $value . '%0A';
}

try {
    //Submit data to the bot
    $sendToTelegram = fopen(
        "https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}",
        'r'
    );
} catch (\Exception $e) {
    $new_url = 'index.html?send=false';
    header('Location: ' . $new_url);
    exit();
}
//We display a message about successful sending
if ($sendToTelegram) {
    $new_url = 'index.html?send=true';
    header('Location: ' . $new_url);
    exit();
}
//We display an error message when sending
else {
    $new_url = 'index.html?send=false';
    header('Location: ' . $new_url);
    exit();
}

?>
