<?php
$redis = new Redis();
$redis->connect('127.0.0.1', 6379);


if (!$redis->ping()) {
    die("Redis server is not running");
}


$username = $_POST['username'];
$password = $_POST['password'];
$cacheKey = "user:$username:password:$password";
if ($redis->exists($cacheKey)) {
    echo "success (from cache)";
} else {
    
    $servername = "localhost";
    $dbusername = "root";
    $dbpassword = "";
    $dbname = "signup";
    $conn = mysqli_connect($servername, $dbusername, $dbpassword, $dbname);
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

   
    $stmt = mysqli_prepare($conn, "SELECT * FROM userdetails WHERE username=? AND password=?");
    mysqli_stmt_bind_param($stmt, "ss", $username, $password);
    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($result) > 0) {
        echo "success";
        
        $redis->set($cacheKey, 1);
        $redis->expire($cacheKey, 60); // expire the cache after 1 minute
    } else {
        echo "Invalid username or password";
    }

    
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
}


$redis->close();
?>
