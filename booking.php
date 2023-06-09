<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $bookingInfo = $_POST["bookingInfo"];

    $file = fopen("bookings.txt", "a");
    fwrite($file, $bookingInfo);
    fclose($file);
}
?>
