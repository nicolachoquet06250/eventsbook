"use strict";

class Forms {
    static valid_new_event() {
        let id_event_type = $('#evenement_id').val();
        let label = $('#label').val();
        let description = $('#description').val();
        let date = $('#date_start').val().split('/');
        date = date[2]+'-'+date[1]+'-'+date[0];
        let date_start = date + ' ' + $('#time_start').val();
        date = $('#date_start').val().split('/');
        date = date[2]+'-'+date[1]+'-'+date[0];
        let date_end = date + ' ' + $('#time_end').val();

        $.ajax({
            url: '/rest/evenement/add/id_type_evenement='+id_event_type+'/label='+label+'/description='+description+'/date_debut='+date_start+'/date_fin='+date_end,
            type: 'get'
        }).done((data) => {
            let id_event_added = data[data.length-1].id;
            let my_id = $('.user-login-logout-profil').data('id');
            $.ajax({
                url: '/rest/evenement_speaker/add/id_evenement='+id_event_added+'/id_speaker='+my_id,
                type: 'get',
                async: false
            }).done(() => {
                $('#conferences_').html('');
                Events.get_conferences((key, obj) => {
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
                });
                $('#evenements_').html('');
                Events.get_other((key, obj) => {
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
                });
            });
        });
    }
}
