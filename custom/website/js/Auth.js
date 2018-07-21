"use strict";

class Auth {

    static is_connected() {
        let is_connected = false;
        $.ajax({
            url: '?path=speaker/connected',
            type: 'get',
            async: false
        }).done((data) => {
            let length = 0;
            for(let prop in data) {
                length++;
            }
            if(length > 0) {
                is_connected = true;
            }
        });
        return is_connected;
    }

    static page_connection() {
        $.ajax({
            url: '?path=templates/connection.html',
            type: 'get',
            async: true
        }).done((data) => {
            $('#page').html(data);
        });
    }

    static page_inscription() {
        $.ajax({
            url: '?path=templates/inscription.html',
            type: 'get',
            async: true
        }).done((data) => {
            $('#page').html(data);
        });
    }

    static get_user_connected() {
        let user_connected = null;
        $.ajax({
            url: '?path=speaker/connected',
            type: 'get',
            async: false
        }).done((data) => {
            let length = 0;
            for(let prop in data) {
                length++;
            }
            if(length > 0) {
                user_connected = data;
            }
        });
        return user_connected;
    }

    static connection() {
        $.ajax({
            url: '?path=speaker/connection/email=' + $('#email').val() + '/password=' + $('#password').val(),
            type: 'get',
            async: true
        }).done((data) => {
            if(data.success) {
                window.location.href = '?path=index.php';
            }
        });
    }

    static inscription() {
        $.ajax({
            url: '?path=speaker/inscription/email=' + $('#email').val() + '/password=' + $('#password').val(),
            type: 'get',
            async: true
        }).done((data) => {
            console.log(data);
        });
    }

    static deconnection(redirect) {
        $.ajax({
            url: '?path=speaker/disconnect',
            type: 'get'
        }).done((data) => {
            if(data.success) {
                window.location.href = '?path='+redirect;
            }
        });
    }
}