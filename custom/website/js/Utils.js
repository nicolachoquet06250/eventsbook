"use strict";

class Utils {

    static escape(string) {
        let tab_in = [
            /(à)/g,
            /(À)/g,
            /(é)/g,
            /(É)/g,
            /(ê)/g,
            /(Ê)/g,
            /(è)/g,
            /(È)/g,
            /(ù)/g,
            /(Ù)/g,
        ];
        let tab_out = [
            '&agrave;',
            '&Agrave;',
            '&eacute;',
            '&Eacute;',
            '&ecirc;',
            '&Ecirc;',
            '&egrave;',
            '&Egrave;',
            '&ugrave;',
            '&Ugrave;',
        ];

        for(let i=0, max= tab_in.length; i<max; i++) {
            string = string.replace(tab_in[i], tab_out[i]);
        }
        return string;
    }

    static unescape(string) {
        let tab_in = [
            /(&agrave;)/g,
            /(&Agrave;)/g,
            /(&eacute;)/g,
            /(&Eacute;)/g,
            /(&ecirc;)/g,
            /(&Ecirc;)/g,
            /(&egrave;)/g,
            /(&Egrave;)/g,
            /(&ugrave;)/g,
            /(&Ugrave;)/g,
        ];
        let tab_out = [
            'à',
            'À',
            'é',
            'É',
            'ê',
            'Ê',
            'è',
            'È',
            'ù',
            'Ù',
        ];

        for(let i=0, max= tab_in.length; i<max; i++) {
            string = string.replace(tab_in[i], tab_out[i]);
        }
        return string;
    }

    static callback_for_conferencies(key, obj) {
        let speakers = [];
        $.ajax({
            url: '/rest/evenement_speaker/get/',
            type: 'get',
            async: false
        }).done((data_speaker) => {
            $(data_speaker).each((key_speaker, obj_speaker) => {
                if(obj.id === parseInt(obj_speaker.id_evenement)) {
                    speakers.push(obj_speaker.id_speaker);
                }
            });
        });
        $('#conferences_').append(Card.instence(
            obj.id,
            obj.label,
            obj.description,
            obj.id_type_evenement,
            obj.link,
            obj.date_start,
            obj.date_end,
            speakers
        ).get());
    }

    static callback_for_other(key, obj) {
        let speakers = [];
        $.ajax({
            url: '/rest/evenement_speaker/get/',
            type: 'get',
            async: false
        }).done((data_speaker) => {
            $(data_speaker).each((key_speaker, obj_speaker) => {
                if(obj.id === parseInt(obj_speaker.id_evenement)) {
                    speakers.push(obj_speaker.id_speaker);
                }
            });
        });
        $('#evenements_').append(Card.instence(
            obj.id,
            obj.label,
            obj.description,
            obj.id_type_evenement,
            obj.link,
            obj.date_start,
            obj.date_end,
            speakers
        ).get());
    }
}