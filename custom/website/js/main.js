$(window).ready(() => {

    Auth.get_user_profil();

    Events.get_type_events( data => {
        $(data).each((id, event) => {
            $('#evenement_id').append('<option value="' + event.id + '">' + event.label + '</option>');
            $('#update_evenement_id').append('<option value="' + event.id + '">' + event.label + '</option>');
        });
        $('select').formSelect();
    });

    Events.get_conferences(Utils.callback_for_conferencies);

    Events.get_other(Utils.callback_for_other);

    Forms.onsubmit_upload_form_with_preview();
});