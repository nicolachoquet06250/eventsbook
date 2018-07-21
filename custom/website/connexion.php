<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Connection</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="/rest/Css/get_materialize" rel="stylesheet" />

    <script src="https://code.jquery.com/jquery-3.3.1.min.js"
            integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
            crossorigin="anonymous"></script>
    <script src="/rest/Js/get_scripts/script=Auth" type="text/javascript"></script>
    <script src="/rest/Js/get_materialize" type="application/javascript"></script>
    <script>
        $(window).ready(() => {
            if(Auth.is_connected()) {
                window.location.href = '/fr/';
            }
            Auth.page_connection();
        });
    </script>
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col s12" id="page"></div>
    </div>
</div>
</body>
</html>
