$('.tabs').tabs();
$('.sidenav').sidenav();
$('.modal').modal();
$('.material-select').formSelect();
$('.datepicker').datepicker({
    format: 'dd/mm/yyyy',
    i18n: {
        cancel: 'Fermer',
        clear: 'Annuler',
        done: 'Valider',
        months: [
            'Janvier',
            'Fevrier',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Auût',
            'Septembre',
            'Octobre',
            'Novembre',
            'Décembre'
        ],
        monthsShort: [
            'Jan',
            'Fev',
            'Mar',
            'Avr',
            'Mai',
            'Jui',
            'Jui',
            'Aoû',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ],
        weekdays: [
            'Dimanche',
            'Lundi',
            'Mardi',
            'Mercredi',
            'Jeudi',
            'Vendredi',
            'Samedi'
        ],
        weekdaysShort: [
            'Dim',
            'Lun',
            'Mar',
            'Mer',
            'Jeu',
            'Ven',
            'Sam'
        ],
        weekdaysAbbrev: ['D','L','M','M','J','V','S']
    }
});
$('.timepicker').timepicker({
    twelveHour: false,
    i18n: {
        cancel: 'Fermer',
        clear: 'Annuler',
        done: 'Valider'
    }
});