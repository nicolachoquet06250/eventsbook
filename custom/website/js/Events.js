"use strict";

class Events {
    static get_conferences(callback) {
        $.ajax({
            url: '?path=evenement/get',
            type: 'get',
        }).done((data) => {
            $(data).each((key, obj) => {
                if(parseInt(obj.id_type_evenement) === 1) {
                    callback(key, obj);
                }
            });
        });
    }

    static get_other(callback) {
        $.ajax({
            url: '?path=evenement/get',
            type: 'get',
        }).done((data) => {
            $(data).each((key, obj) => {
                if(parseInt(obj.id_type_evenement) === 0) {
                    callback(key, obj);
                }
            });
        });
    }

    static get_type_events(callback) {
        $.ajax({
            url: '?path=type_evenement/get',
            type: 'get'
        }).done((data) => {
            callback(data);
        });
    }
}