"use strict";

class Events {
    static get_conferences(callback) {
        $.ajax({
            beforeSend: () => {
                $('#conferences_').html('<div class="col s12 preloader center-align" style="margin-top: 100px;">\n' +
                    '    <div class="preloader-wrapper big active">\n' +
                    '        <div class="spinner-layer spinner-blue-only">\n' +
                    '          <div class="circle-clipper left">\n' +
                    '            <div class="circle"></div>\n' +
                    '          </div><div class="gap-patch">\n' +
                    '            <div class="circle"></div>\n' +
                    '          </div><div class="circle-clipper right">\n' +
                    '            <div class="circle"></div>\n' +
                    '          </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>');
            },
            complete: () => {
                $('#conferences_ .preloader').remove();
            },
            url: '/rest/evenement/get',
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
            beforeSend: () => {
                $('#evenements_').html('<div class="col s12 preloader center-align" style="margin-top: 100px;">\n' +
                    '    <div class="preloader-wrapper big active">\n' +
                    '        <div class="spinner-layer spinner-blue-only">\n' +
                    '          <div class="circle-clipper left">\n' +
                    '            <div class="circle"></div>\n' +
                    '          </div><div class="gap-patch">\n' +
                    '            <div class="circle"></div>\n' +
                    '          </div><div class="circle-clipper right">\n' +
                    '            <div class="circle"></div>\n' +
                    '          </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>');
            },
            complete: () => {
                $('#evenements_ .preloader').remove();
            },
            url: '/rest/evenement/get',
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
            url: '/rest/type_evenement/get',
            type: 'get'
        }).done((data) => {
            callback(data);
        });
    }

    static open_update_event_modal(id) {
        $.ajax({
            url: '/rest/evenement/get/id='+id,
            type: 'get'
        }).done(data => {
            $('#update_evenement_id option[value="'+ data.id_type_evenement+'"]').attr('selected', 'selected');
            $('#update_evenement_id').formSelect();

            $('#update_label').val(Utils.unescape(data.label));

            $('#update_description').val(Utils.unescape(data.description).replace(new RegExp('&lt;br&gt;', 'g'), '\n'));

            let date_start = data.date_debut.split(' ')[0];
            date_start = date_start.split('-');
            date_start = date_start[2]+'/'+date_start[1]+'/'+date_start[0];
            let time_start = data.date_debut.split(' ')[1];

            let date_end = data.date_fin.split(' ')[0];
            date_end = date_end.split('-');
            date_end = date_end[2]+'/'+date_end[1]+'/'+date_end[0];
            let time_end = data.date_fin.split(' ')[1];

            $('#update_date_start').val(date_start);
            $('#update_time_start').val(time_start);
            $('#update_date_start').datepicker({
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
            $('#update_time_start').timepicker({
                twelveHour: false,
                i18n: {
                    cancel: 'Fermer',
                    clear: 'Annuler',
                    done: 'Valider'
                }
            });

            $('#update_date_end').val(date_end);
            $('#update_time_end').val(time_end);
            $('#update_date_end').datepicker({
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
            $('#update_time_end').timepicker({
                twelveHour: false,
                i18n: {
                    cancel: 'Fermer',
                    clear: 'Annuler',
                    done: 'Valider'
                }
            });

            $('#modal_update_event .modal-close').attr('href', 'javascript:Events.update_event('+ id +')');

            Events.get_speakers_for_modal(id);

            $('.id_evenement').val(id);

            Events.get_media(id);
            
            $('#modal_update_event').modal('open');
        });
    }

    static update_event(id) {
        let date = $('#update_date_start').val().split('/');
        date = date[2]+'-'+date[1]+'-'+date[0];
        let date_start = date + ' ' + $('#update_time_start').val();

        date = $('#update_date_end').val().split('/');
        date = date[2]+'-'+date[1]+'-'+date[0];
        let date_end = date + ' ' + $('#update_time_end').val();

        $.ajax({
            url: '/rest/evenement/update/id='+id+'/id_type_evenement='+$('#update_evenement_id').val()+'/label='+$('#update_label').val()+'/description='+$('#update_description').val().replace(/\n/g, '<br>')+'/date_debut='+date_start+'/date_fin='+date_end,
            type: 'get'
        }).done(data => {
            if(data.length > 0) {
                $('#conferences_').html('');
                Events.get_conferences(Utils.callback_for_conferencies);
                $('#evenements_').html('');
                Events.get_other(Utils.callback_for_other);
            }
            else {
                $('#modal_error #error_page_content').html('Votre évenement n\'à pas pu être modifié');
                $('#modal_error').modal('open');
            }
        });
    }

    static get_speakers_for_modal(id) {
        let speakers_autocomplete = [];
        let speakers_init = [];

        $.ajax({
            url: '/rest/speaker/get',
            type: 'get',
            async: false
        }).done(data => {
            $(data).each((key, _data) => {
                if(_data.id !== $('.user-login-logout-profil').data('id')) {
                    if (_data.image === '' ||  _data.image === undefined || _data.image === null) {
                        _data.image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAesAAAHrCAQAAABF+n0qAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfiAg4TFxrrxlS/AAAmLUlEQVR42u3deXRV5b3/8XcOYQgkkIARkKpBoEx6JcqtouK42jqgVosdrIJDKdRaC3V1rfbXetvb1dveq0vBoVasVRw7WepP7HTbWhVRaVWgzD+CTFII4wkQICHA748QMp6TM+z9fPfwea3VVZOcs/f3OeGT59l7P3s/BZuQEOtCOSfSnzJKj/+vhG70oZA+dKPXsdeVHX/H7mP/X0s9NTRQQz17SbL7+P+q2cZ2Dls3TXJXoFiHSG9O5hRO5mROYRADKKecAl/2dJTtbGcrm9nIh2xkI5vYY918yZRiHWxlDGcowxjKUE7jBNNadvABVVSxhipWH+/1JYAU6+Ap5QxGMZqRnM4A62JS2soyVrKC5SwlaV2MtKZYB8UgxjCGSs5isHUpWVvHIt5nMYvZbF2KgGJtrRdncS7j+BiDrEvxxGb+ztu8w/vUWpcSZ4q1jf6M50Iu4AwKrUvxRQNLeZM3mE+1dSlxpFi7NYDLGM+FjLQuxJlVvM58/spW60LiRLF2oycX8nE+zuk+XZAKvqX8mT/zBvutC4kDxdpvH+VqruR8ulsXEgh1LOD3vMJq60KiTbH2S1fGM4GrGWpdSCBVMY9XmM8h60KiSbH2XhGf5NNMoNS6kMBL8gq/4U8csC4kahRrL/XiSm7gyuMzsSUTtfye3/CKLol5R7H2Rlcu5/NcS0/rQkJrPy/zAn+i3rqQKFCs85VgPJ/nBvpaFxIJu3iRF5jPEetCwk2xzscpTObWEE72DLr1PMnTbLQuI7wU69wUcT23cCkJ60Ii6wivMoe5Op2WC8U6eyOZxiSd53YiyTM8xkrrMsJGsc5GN65jGhdblxE7rzGbuTqZljnFOlMDuYMp9LcuI7a28TiPssW6jHBQrDNxNl/js3SzLiP26vkVs3jPuozgU6zTS/ApZnCBdRnSwpvM5CVdAktHsU6tOzfzDT5qXYZ04P9xH89SZ11GUCnWHevNVKZzknUZksa/mMVsPQ+1I4p1e2VM5y5dwAqFJA8zU09BbUuxbq0vM7iL3tZlSBb28BAz2WVdRpAo1s36MYOvKtKhtJeHmMlO6zKCQrFuVMx07tbAO9RquJ+Z7LMuIwgUa+jGNL7NidZliAe28V88pvlocY91gpv5T061LkM8tJHv8ky8r2vHO9YX8wCV1kWIDxbxdV6zLsJOfG8sHMVL/E2hjqhK/sY8RlmXYSWese7Lj1nCtdZliK8msIQf08+6DAvxi3WCaazmjogukiMtFXIHq/hy/P6Vx+3Yehw/1sA7dhZxJ29ZF+FSnP6OncgzLFCoY6iSN3kmTvfKxyXWBUxhFTfHdgWsuCvgZlYyJS6//3gMwkfzmO6ZFuBNvswy6yL8F/3eugc/4H2FWgC4gPf4AT2sy/Bb1HvrcTzJCOsiJGBWcRtvWxfhpyj31j15gDcVamlnBG/yQJQXVopub30RT2gRWkmjii/yunUR/ohmb92N+3hVoZa0hvIqD0TzODuKvfVInuMs6yIkJFZwE4usi/Ba9HrrL/OuQi0ZG8VCvkUX6zK8Fa3eupwnuMa6CAmht7iRDdZFeCdKvfXl/FOhlpycx2ImWhfhnajEugcz+T0DrMuQ0Crl18yOykWvaAzCT+cFzrAuQiJgOZ+LwuTSKPTWk1moUIsnRrOQydZF5C/sse7BbOZEZegkAdCTOcwO+9XscA/CBzOXMdZFSAQt5tN8YF1E7sLcW1/F+wq1+GIM73GVdRG5C2usC/g2L2sVDvFNKS/znbA+diGcg/BinorSVUYJrBe5NYzL/4Qx1kP4rc58iyPL+BRrrYvIVvgG4Rfwd4VanDmdv4fv2Tphi/Xn+At9rYuQWOnLX/icdRHZCVesv8ULdLcuQmKnOy/wf6yLyEZ4jq278ihftC5CYuxnfJlD1kVkJiyx7s2v+YR1ERJz/8sN7LEuIhPhGISfzJsKtZj7BG9ysnURmQhDrCt5R+e+JRDO4J0wLPcU/FhfyRucZF2EyDEn8Ubwp5UGPdZf4CWKrYsQaaGYl/iCdRHpBTvWd/IsXa2LEGmjkGe507qIdIIc63t4OKxT7SXiCniY/7AuIk15Ab3AVcBMvmZdhEhaDzKDo9ZFdCSYvXUBP1GoJfC+xk+COZ4MYqy78CRTrYsQycBUngzi0gHBi3UX5nCLdREiGbqFp4MX7KDFuisvcJN1ESJZ+AIvBO16TaF1Aa104Tk+Y12ESJY+A9zIYesymgWpt+7CHIVaQukzzAnSUDw4sS7gpxp+S2jdxE+Dc1Y8KLEu4DFutS5CJA+3MjsowQ5KrB/gS9YliORpCg9Yl9AoGLG+h+nWJYh4YDr3WJcAwZg8+hUesS5BxDN38mPrEuxj/QWeDcoRiYgHjnIzz9uWYD0Iv4Y5CrVESgFzuMa4BNPe+hxe1SK2EkH7uZSFdru37K2HMk+hlkjqyTyG2u3eLtbl/IFyu4aL+Mr037dVrI3/mon4znA0ahPrAn7OOTYNFnHmHH5ukzCbWP/Q+kyhiBPX8F8Wu7U4E34rT1o0VcTE7e7/vbuP9aX8gW6udypipp4reNXtLl3Heihvc4LbXYoY28m5VLncodtj6z78VqGW2OnHS/RxuUOXsS7gaU532TiRgBjN0y4nSbuM9X9wrcO9iQTJtS5XAXF3bH0V83RTh8TYUa5lnptduYr1abxHqZtdiQRUkrP5wMWO3AzCe/BrhVpir5QX6eFiR25i/RBnOdmPSLBV8rCL3biI9WSmuGiKSAh8kcn+78T/Y+vTWai7qkWO2885LPN3F3731j35hUIt0kJPful3JvyO9UxG+7wHkbAZxUx/d+DvIHwiv/a3fJGQuoEX/du4n7GuYJEua4l0KEkl6/3auH+D8C68oFCLpFDKc/6tselfrL/JON+2LRJ+5/NNvzbt1yD8LN7WwxJE0qpnHO/7sWF/eusePKtQi3SiG8/6M5nUn1j/iFG+fhwi0TCKH/mxWT8G4RfxN92CKZKRo1zC615v1PtY92IJQ9x8IiIRsJYzqfV2k94Pwn+gUItkYYj3zxL3urcex3z/rsaJRNIRLuBtLzfobW/dgycVapEsJXjS2zPi3sb6HkY4/ThEomEE93i5OS8H4aNYTFfXn4dIJByikuVebcy73rqAxxVqkRx1ZbZ3l4W9i/UXOd/k4xCJhvO9eziYV4PwE1lFmdXnIRIJuxlJtRcb8qq3vlehFslTGfd6syFveuvzma/poiJ5O8pFzM9/M1701l14RKEW8UABD3kx88OLWH+JMdafhkhEjOFL+W8k/0F4P1bTz/qzEImMnQxnZ36byL+3/k+FWsRD/fjPfDeRb289kn9SaP05iERKA//Gynw2kG9vfa9CLeKxwnwvdOUX68uYYP0JiETQBC7L5+35DMITvM+Z1u0XiaTFnM2RXN+cT289SaEW8ckYJuX+5tx76+6s5lTrtktqDdQCSQAOcrDdzwspBqAU6EF363KlrQ0Mpy63t+Z+wmuaQh08DdSS5CAH2Z3Bq7e3+qqIHpTSg2J6WTdDAE5lGg/m9tZce+sSqjjRut3SpIGdJNnHXo+2V0YppfSxblbcbWNobr/SXHvrGQp1MNSygx2exbnJ7mO9fTmlnKABupUTmcH3c3ljbr11Xz7Qn3JrdezgQw442FMJA+ivCQoW9nBaLhNJc/td3a1Q29rJ1jZHxn7ay17WUM5H9Gt3rTdf59vZvy2X3rov6+ht3d64aqDaUR/dkSIq6Kd+26U9DGZXtm/K5br1DIXaRgMbeIc1ZqGGA6zkHTbQYP1RxEdvvp79m7LvrctYp7GYhc2sC0ycChlGf+si4mIPFRldr2wh+956hkLtXg0LWROYUEMDK1lIjXUZ8dCbGdm+JdveuoSNlFq3M17qqHJ4eiw75QzV5S//JTmVPdm8IdveeqpC7dZm/hHYUMN2/sFm6yKir5Sp2b0hu966G+sZaN3G+GhgdYAj3ayc4To77q8tVFCf+cuz660nKdTu1PBOKEIN23lHx9n+GsjkbF6eTW+dYCUftW5fXGxgnXUJWRrGIOsSomwNIzK//zqb3vpqhdqNBpaHLtSwhtXWJUTZMD6V+YuzifV065bFQwNLQjL4bmsL7wXoIlzkfDXzl2Y+CK/kfet2xUEti0IdjRLO1Okzv5zFosxemHlvPd26TXEQ9lDDXpaEvAUBNj3TF2baWw9kPd2sWxV14Q91I/XYPqmngi2ZvDDT3voOhdpvUQm1emzfdOOOzF6YWW/djU16Goq/ohPqRuqxfVHNKZlMS8mst75eofZX1EINe1luXUIU9ef6TF6WWaynWbcm2hoiF2qA3ay1LiGKMspiJrEeyYXWbYmyhsgeiW6i2rqE6LmQUZ2/KJNYT6PAui1Rttrz54YGxxpqrUuImoJM7ubq/JRZEf/SzZj+Cd/c7+yUcLZ1CVGT5KTOnnvVeW99nULtn5qIhxr2ssG6hKgp5brOXtJ5rG+zbkV0NbDUugQH1mkg7rXbO3tBZ7Gu4BLrNkTX8oieKmtrlXUBUXMxFelf0FmsJ+W5sL2ktDnbx0mG1l6dEfdWorNFctOHtoBbrFsQVXWRP6puKUhPTY2EW9MnN32sL2Swdf1RtSpW/9Ab9CBDb1UwPt2P08f6Ruvqo6o6NgPwJpti9WfMgbTZTBfrbky0rj2aGlhjXYJBm9Vfe2piunsq08X6cvpa1x5Nm2PZc6m/9lRfLk/9w3Sx1hDcF/E6WdasIZeFmiW1NPlMHetirrauO5rWWxeglkfD1RSn+lHqWF9FT+u6o6gus6fWRNIBLRLgpZ5cmepHqWP9aeuqo2m9dQGmtloXEC0pT2mninURV1jXHEVx7qsBtuu0mZeuoKjjH6SK9eWpx+2Su/XWBRjTaTNPFac6G54q1p3e+iXZi3tfDbDDuoBoSfFks45j3ZVrrOuNIh1ZErvZdT67mq4dfbvjWF9AH+t6oyirtcQjqkFnw73Uhws6+nbHsZ5gXW0UVet0EaBhuMc6HFd3/CyzKoZYVxs9S8wGoOWUUkwvCoEGajlIkmRnj8PyjZ5u5qm1DG3/zY4WXhihUHuvziTURVTQr9UvuZA+9KE/sJMPTWqK7nNWTQxhRPvHz3QU66usK40ii6HnYAalWTCnH/2oYZVBr12jUzdeuqp9rBMdvkw85/oseCGVnNrpKlh9OJty559F0vkeI62DvLaPdTHnWdcZPbWOh54l/HuGPWIhoxno+NPY53h/EXde+6lj7WN9Ed2t64yepNO9FXJmVr/E4Y6DfdDp3iKvOxe3/Vb7WH/CusoocjkEL6Qy6yVoh1PmsEKdNPPYJ9t+o32sL7OuMXrqnP5DHkmvHN412ulq1FoQwFOXtv1G21gPYrR1jdGTdLivcvrl9L5CRjqsUhNzPDWKQa2/0TbWF1tXGEXuLm4VMjzn9/ZzOBBPOttTTFzc+su2sdZK1j5wN+ljWF5D6QpndYrHLmr9pWLtu1pnQ84i+uf1/j7O+mtd4vJYm8UAWse6PyOs64uepLM9VeS9hQGOKtWxtcdGtP6L3jrW6qt9kHS0n3z7aiDH020SAK2G4Yq171wNOD/iwTYKHU0l1YQUz7UahreO9Tjr2qKnztmtFPn31QClTmq1uik0ws5v+UXLWPfkTOvaosdVX13u0XSSUkf1isfOaPlc/5axHut0olFMuIr1CR5tJ5cZahIAhYxt/qJlrM+1riyKko72493JrhJHFYvHWuRXsfaZm5NDJR4OtDRkC6kUsdYJMx+4OTnk1RAcFOvQapHf5lif5GwuQoy4eniul0uwaDmXkBrASU3/2RzrSuuqosjVbCo9G0xokWHF2lduzoMXaeAsoFi74uaEWQ/rZkowdBDrMdY1RZGbWJd6urWkk5rFB2Oa/qMp1qWcZl1TFGnuszh0WtNf+KZYn25dUTS5ubxV6unWXPwpcvlAxFg5o/H/ms61KNa+cHPCwtsJn7oNI8RGMx+aYz3Kup5oCt+FJy1TG2rHHjDaNAhXrAVwdUmu1LqZUXUsx02x1mOEBdB58JBrFeu+mjgqAA1sd7KfUuuGRtUA+kJTrPVgQgFgp6P9aAKNb0ZAU6y1TL0AsN7RfrR6o2+GQFOsh1rXIkFQ4+jilq5a+2gYKNbSwipH+ym1bmiUteitNQgXNjibiFJq3dQoGwpNsR5mXYtYq2Wdoz0VhnCSTogcj3WfxpPiEl+1LHK2LzcLDMRWX0obY32ydSViq4FVDlfF8mL1EUnjI4q10MAS9jrbW5meRO63UxRrYbnDUGsNbQeO9danWNchdlaz2+HeynS6zH/qreNuNVuc7k/H1Q4c6631WcdUteNQF2n9bBeOxVp3b8VSNSsd77HCusnxcFJjrHUhMYZ2Og91kUcrcEsnBkCCQk8XcJJQqHUeah3rOVNGjwQnUGBdh7hVyyKH008aFaqvdueEhI6s46aBZc5DDQO1oJA7JyZ0ZB0vDSwxeWSwhuAO9UvonvZ4cTlRtNlgPQ/FpbKEbn6Nk9UmoS5ikHXD46VUsY4R13PKmozQcbVbZRqEx8YGo1CfrHngrinWcVHt7OknrZVwqnXT40eD8HhwP1G0UaEG4BZKExRb1yB+q2WN0Z6H6aEJFooT9LSuQfxlMaes0UDNLLPRM6ELitHWYBbqEoZbNz6uuicosa5B/NPAEqNQF3KmdePjqyShVc6iy+3DB1ur1KkyO0UahEeYzZwygJE6VWape0JzBaJqtaO1qtvTqTJjvRPWFYg/rOaUQZlOlZlTrCPJak4ZlDDauvGiWEeRxSONGhVxpk6VBUBC5zaips7hMnmtFXK6Qh0EJQn9HqLF5pFGAIVUqo8IhoQG4RFjdVFLoQ4SxTpSNphd1NKV6iBJGI3YxAc1Zue/R2oZniA5kqDWugbxRh1LjfY8UtNPgmWvBuGRscpo4KVQB49iHREbnK5T3WywQh1AinUk1BodVQ/Uk8oCKUGNdQmSv1Umex2o2d/BtCdBvXUNkq8NJteqFerAqkuYLMgkHqpjk8FeyxXq4DqQMLvTXjyy3uAMuJ5TFmh7E9RZ1yD5qDG4r7pE92kFW12C/dY1SD62Ot+jQh14+xPss65BclfnvK9WqENgX4KkdQ2Sux2O96c7qkMhmTCanCSecDsEL6RSD6oNA8U6zBocX8bQHdUhsVuD8BBzO0FQd1SHRlKxDrGkw32drFs6wmO3BuEh5u4iRglDrBsrmUsm2Gldg+TK1ZG1lskLmR0Jqq1rkNw0OJs0OlIXtcJlW8L5pU/xiKunVZXrOWVhsyNBnY6uw8lNX13IUOuGSnZ2czABGoaHk5sTZidrAkrYbG186NG/rOuQ4BpgXYBk61+Nsf7Qug7JxUEH+yhXXx0+mxtjbfFwDcmbi1ifYN1Iyd6mxlhvtK5DgqrUugDJ3kYNwiWNQg3Bw+hD9daSRol1AZKLjTq2ljSKrQuQXBzrrWvYZV2JBJGmjIbQLpJNi/Wssa5FgqiHdQGSvSpoivVa61okiBTrEGoR6yrrWkTEE2tBsRaJljWgQbhItHwATbG2WUdVRLy2EppivctgzRcR8drWxovViWNfrrCuR0TydizHTbFebl2PiOStTazVW4uEn3prkchZ1vh/TbFeal2PiOStTayTjde7RCS01jU9RThx/FuLrWsSkbwsavoPxVokKjqI9aKcNiQiQdFBrN+3rklE8tJBrP+lCaQiIba1eSGPRItvv21dl4jkrEV+W8b6Heu6RCRnLfKrWItEQ4pYv+tsHXQR8VYD7zZ/0TLW+/mndW0ikpNl7G/+ItHqR29Z1yYiOVnQ8ovWsX7DujYRyUmr7CrWIlHwessvWq/HUs0qRljXJ5kZ4PsytXr8f2isprrll22XWXpDsQ6L/tYFSHC0GWcn0v9YRELg9dZfto31a9b1iUjWXmv9ZdtYb9bDCkVCZgWbW38j0e4lr1rXKCJZaZfZ9rH+k3WNIpKV/237jYJNbb9TzA66W9cpIhmqpx/7Wn+rfW+9T1NIRUJkQdtQdxRr+J11nSKSsQ7yqliLhFuGsV6lZexFQmJtR6vTJzp86TzrWkUkIx2OrTuO9cvWtYpIRl7q6JvtL3ABdGU7fazrlfzVkGQfDU1LMwFQSAk9KKaUXtblSb5qKOdQ+28XdvjiQ8zjJuuKJR/V7GB7hz9pDnkRJzBA4Q6zeR2FOlWsYa5iHVYNbGZTRk+bPMAmNlHGAN3kGVZzO/52x4NwKGIbxdY1S/Y2sy6HB8iWUaGjrvDZx4kc6OgHiRRvOMAfrWuWbNXyHmtyeir0bhbpqmb4/KHjUKeONbxoXbNkp5pF7M3j/Zt4jzrrRkg2fpPqB6kG4VDCVnpa1y2ZWsum/DdCIZU6hRYW++nffjZ4o9S99V5NSgmP1Z6EGhpY1PpZdxJc81KFOl2s4QXruiUzq9ni2bYaWEmNdYMkE2nyWZDmr3w3ttDXunbpjDfD75Y0FA+BXQykPtUP0/XW9TptFnzVnoe6cSiuVRYD7sXUoU4faw3DA6+WNb5st4Hl1k2T9NJmM32s57PeunpJZ5VvvepuNlg3TlJbz/x0P04f6yPMsa5fUtuQ13XqzqzTVezgeoYj6X6c6OTtT6d/u9ipY53Pe1iV/ybED0d4Kv0LOov1eq3zEVTrfd/Dbl3qCqbXOvvldxZreNK6DdKROg+vVae23rqZ0pGnOntB57GeS9K6FdLeeid72U2tdUOlrWSq2zGbdR7rAzxj3Q5pqyHFIxK896F1U6WtZ9nf2Us6jzXMtm6HtLXT2XQRV38+JGOPdf6STGK9QqteB80OZ3tqYKd1Y6Wl1zNZ0zaTWMNPrNsire3OfxMZS1o3VlrKoK/ONNZz2WbdGmlW63TGdtK6udJsW+enyyDTWNfzuHV7pFnS6d78nMkmWXo83Q0ezTKLNTya2ebEhYOO96dJKQFRz6OZvTDTWG/hF9Ztkib78t9EVlz/GZEUfpHpHKRMYw2zrNskTVzfC61YB8SsTF+YeawXpb8VTNzR0W4svcWiTF+aeazhIet2iQ311oEwK/OXZhPruT49ikMCTrEOgKrUTwVvL5tYH+E+67aJxNS92Tz5IJtYw9NO7gYUkda28HQ2L88u1vXMtG6fuNfDugCZmd28kexiDbM1lzB+FGtjyWzvosw21nt42LqNUmJdgLj1CHuye0O2sYaZ2e5CvFboeH9a6NzUnuwPfbOP9W7119Zcx8z1nxFp5RF2ZfuW7GMND2iaky3Xse5j3eA428v92b8pl1jv4hHrtsab21jrSN5UDn11brGG+3V8bamX02FxqXVz42xPLn11rrHemdvOxCvlDvd1gnVj4+z+3B4lV5DjMqolVHGidZvjaydLHe2pkAusGxtf2xia23ms3Hpr2MsPrdscZ/2cDcMHWjc1zn6Y68npXHtr6M5qTrVud3xt8H1hvUbj6G7d1LjawPBcFy3NtbeGOr5n3e44G+BkL2UKtZ3v5b4Sce6xhmdYYt3y+OruZHhcYd3M+FqSzyJZ+cT6CHdbtz3Ohvh+fD1QE1Hs3J3PyvL5xBr+yu+sWx9fhQz2efsV1k2Mr9/x13zenl+s4RvOH4Mpxw2izMetD9ZxtZUGvpHfBvKN9Uqtp2lphG8D8XIGWTcuvh5nZX4byP0CV5N+rKaf9ecQX/5MTCnhTN23ZWUnw/NdpjTf3hp2co/15xBn/Rjp+TYLfRwFSKfuyX/t4fx7a+jCu4yx/izibC0e/BaPK6SSXtZNiq/FjOVwvhvJv7eGw9zFUetPI86GcLJn21KoTR3lrvxD7U2sYT7PGX8cMTfEo6F4kUJt6+feLInlxSAcoD8rfb3aIp2qYWmeVxvLGK1jaku7GUm1FxvypreGar5p+HEI0Idz87gPu5BhOvtt7VvehNq73hoKmM/5Vp+HNNlJFQeyflc5QzX5xNoCxnt1jsq7WMNoFtHV5hORlqpZn0W0BzJAc7/tHeIslnm1sS5f966w7fRgvMUnIq0V8xHKKOBwJ8faJZzKcPpr1Y4guJefe7cxL3tr6MEiRrj+PCS1WvZxkCSw91jESyikkGKK6aMj6eBYRaWX6w17G2s4j/menYYTiYcjXMgCLzfodQTf0pofIll62NtQe99bQy+WMMTV5yESems5k1pvN+n9gLmW2zWVVCRDR7nd61D7EWt4nYccfBwiUfAQr3u/Ue8H4QBFvMsovz8PkdBbwdgcZg91yp+z1geYxCGfPxCRsKtnkh+h9ivW8B7f9/HjEImC7/OePxv2ZxAO0IX5jPNr4yKh9zbjvbi3uiP+TR05zI0kfdu6SLgludGvUPsZa1jPNB+3LhJmU1nv38b9nej5S37q6/ZFwumn/MrPzft3bN2oJ+/68GhMkTBbyVj2+7kDv2/L2M9n/W2ASMg4yIT/d1st5Su+70MkPO70ZcWGVlzcRDmHnznYi0gY/Iyn/N+J38fWjYpYQKWLHYkE2mLO82deWWtuHnlwgBuocbInkeCqYaKLULuKNaxlkm7XlFg7ys2sdbMrdw8oelmzxCXWvsc8V7tyc2x9bF+8xDXudicSIHOZ6G686jLW0IcFjHa5Q5FAWMY49rnbndunhNbwKXY53aOIvd1c5zLUrmMNVdxAveN9iliqZyJVbnfp/pner3KH832K2PkKr7repcWj+n/GfxvsVcTC//CE+526PWXWpAtzdU5cYuBlrvfvYQmp2cQaevIq59jsWsSRhVxqc/+i1XpZ+7na9WkEEaequNrqpmS7ZfC2cwXbzfYu4i/Tf9+Wq1sa/jUT8ZXxaNR20dqFfN7ihIKIrw7zeRZaFmC9FvXLTNadXRIpR5nMy7YlWMcanucu6xJEPHQXz1uXYB9reITvWpcg4pHv8oh1CcGINXyfB61LEPHAg8F4qkAwYg0ztFCAhN4TzLAuoVFQYn2UqS6eyCjim6f4UlBO/wYl1nCUKTxnXYRIjp5nSlBCHaRYw2Fu8XdlIhGf/IrJQZqBEaRYw2FuUrAldH7FTUEKddBiDYe40f6qn0gWnudGDlkX0VrQYg2Hmcwc6yJEMjQnWMPvRsGLNRzmNh63LkIkAz/ltuCFOpixhqNM0wQVCbyHmBqcs98tBTPWcJTpfM+6CJE0vsfXghlqu4ceZeZOHqLAugiRdo7yNR62LiK1oPbWjR5hEg3WRYi00cCkIIc66LGG57iOWusiRFqo5fqgz4cMeqzhFS7VM88kMLZzmbuVL3MV/FjD3znP1brAImmt5TzbxxllJgyxhirO4x/WRUjs/YPzwvEY7HDEGrZxCb+1LkJi7bdcwjbrIjITllhDLRO5z7oIia37mBiek7fBvm7d3u08SjfrIiRmDnGHxQJ5uQtbrOEi5tLXugiJkV1cz+vWRWQnPIPwJq/zMZZZFyGxsYyPhS3UYYw1rGUcc62LkFiYy7gwXlwNY6xhHxO5hyPWZUikHeEeJrLPuoxchO/YutnVPEOpdRESUUkmBX82WSrh7K0bzWMsi62LkEhazL+HN9ThjnXjUXaoLjxIKPyMceGYTZZKuGMNB5nCrVolWzyzn1v5Igety8hPmI+tm53BLxlpXYREwEo+y1LrIvIX9t660VLGajAueXuCsVEIdVRiDfuZwmdJWpchoZXks0yJyuFcVGIN8Csqecu6CAmltzkrSuvJRCnWsJ6L+E7QVliQgDvEd7iQddZleCkap8xaO4tnGWVdhITECm7mfesivBat3rrR+5zNrKA+wVkC5CizODt6oY5mb93oYp5giHUREmAfcDuvWRfhjyj21o1e4994ULeDSIeO8CBnRDXUUe6tG53Hkwy3LkICZjW3s8C6CD9Ft7du9BaV/EjnxuW4Q/w3ldEOdfR760an8xjnWxchAbCAL0djHll6Ue+tGy1jPFM1By3mkkzlwjiEOi6xhqM8zgie02WvmDrK84zg8bicQo1LrAGquZnxLLIuQ5xbxHhuotq6DHfiFGuABYzlDnZYlyHO7OQrjI36KbK24hZrOMJPGMmjWjc7Bhp4lBE8Gpehd7N4nAnvyCju5SrrIsRHf+RuVlgXYSN+vXWTFUzgEh1pR9QiLuGKuIY6zrEGeI2x3MpG6zLEUxu5jbHRnRiaiXjHGo4wh2FMZ7t1IeKJ7UxnGE/F72i6tfgeW7dWzAzupo91GZKHPdzPA+FchcNrinWzfnydr1JiXYbkYC+PcD87rcsICsW6tX7M4Kv0ti5DsrCHh5mpSLekWLfXl+ncpQF5KNTwELPYZV1G0CjWHevNNKYz0LoMSWMLs3iMPdZlBJFinVp3JvENhlmXIR1Yw308Q511GUGlWKeX4Dqmc4F1GdLCm8zit3G/hJWeYp2Js5nBDXSzLiP26vk1s3jXuozgU6wzNZA7mEJ/6zJiaxuP8yhbrMsIB8U6G924nqlcbF1G7LzGbOZSb11GeCjW2RvFVCbrApgTNTzN7PjespErxTo3RVzPLVwa+zn1/jnCq8xhLgesCwkjxTofpzCZ26iwLiNyNvIET+vOutwp1vlKMJ4bmUhf60IiYRcv8gLzdfkqP4q1N7pxOZ/nWoqsCwmtA/xffs4fdWLMC4q1l4q5ik9zJb2sCwmVWn7Pb/idbqn0jmLtvSI+yaeZQKl1IYGX5BV+w590WsxrirVfujGeCUxgqHUhgVTFK7zCfA25/aFY+20EE7iCCzT1FIB63uSPzGOVdSHRpli70ZOL+Dgf53TrQsws48/8hdfYb11IHCjWbg3kMi5kPCOsC3FmFfN5g79qNrdLirWN/lzEeMYzmkLrUnzRwHLmM5832GpdShwp1rZ6MZZzOYdzI/Ikli28w0Le4V1qrUuJM8U6KAYxhrOoZAyDrUvJ2joWs5j3WMxm61IEFOsgKuVMRjKK0YxigHUxKW1lBStYzkqWkLQuRlpTrIOtL8OpoILBDKaCU0wvk+2iiiqq+IA1rNLTPoNMsQ6TBCdRwWBOo4JT6M+JlPu2r+1so5oP2ciHfMgGPlSfHB6KdbgVUk45AymllFLKKKWUErrRh670pjs9AejWYpZ67bGZXfupYw+HqKGevSRJspskSZJsYTvbtf53mP1/y21gno4cUk8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDItMTRUMTk6MjM6MjYrMDA6MDBsLSPhAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTAyLTE0VDE5OjIzOjI2KzAwOjAwHXCbXQAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII=';
                    }
                    speakers_autocomplete[_data.email] = _data.image;
                }
            })
        });


        $.ajax({
            url: '/rest/evenement_speaker/get',
            type: 'get',
            async: false
        }).done(data => {
            $(data).each((key, obj) => {
                if(parseInt(obj.id_speaker) !== $('.user-login-logout-profil').data('id')) {
                    if(parseInt(obj.id_evenement) === id) {
                        if (obj.image === '' ||  obj.image === undefined || obj.image === null) {
                            obj.image = 'data:image/png;base64,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';
                        }

                        $.ajax({
                            url: '/rest/speaker/get/id='+obj.id_speaker,
                            type: 'get',
                            async: false
                        }).done(speaker => {
                            speakers_init.push({
                                tag: speaker.email,
                                image: obj.image
                            })
                        });

                    }
                }
            });
        });

        $('#modal_update_event .chips-autocomplete').chips({
            data: speakers_init,
            autocompleteOptions: {
                data: speakers_autocomplete
            },
            onChipAdd: (v, chip) => {
                let email = chip.textContent;

                $.ajax({
                    url: '/rest/speaker/get_id/email='+email,
                    type: 'get',
                    async: false
                }).done(data => {
                    $.ajax({
                        url: '/rest/evenement_speaker/add/id_evenement='+id+'/id_speaker='+data.id,
                        type: 'get',
                        async: false
                    }).done(_data => {
                        if(_data.length > 0) {
                            Events.get_conferences(Utils.callback_for_conferencies);
                            Events.get_other(Utils.callback_for_other);
                        }
                        else {
                            $('#modal_error #error_page_content').html('Nous n\'avons pas pu ajouter cet interlocuteur de la liste de cet évenemement');
                            $('#modal_error').modal('open');
                        }
                    });
                });
            },
            onChipDelete: (v, chip) => {
                let email = chip.textContent;
                let id_speaker = null;
                let id_evenement = id;
                let id_evenement_speaker = null;

                $.ajax({
                    url: '/rest/speaker/get_id/email='+email,
                    type: 'get',
                    async: false
                }).done(data => {
                    if(data.id) {
                        id_speaker = data.id;
                    }
                });

                $.ajax({
                    url: '/rest/evenement_speaker/get',
                    type: 'get',
                    async: false
                }).done(data => {
                    $(data).each((key, obj) => {
                        if(parseInt(obj.id_speaker) === id_speaker && parseInt(obj.id_evenement) === id_evenement) {
                            id_evenement_speaker = obj.id;
                        }
                    });
                });

                $.ajax({
                    url: '/rest/evenement_speaker/delete/id='+id_evenement_speaker,
                    type: 'get',
                    async: false
                }).done(_data => {
                    if(_data.length > 0) {
                        Events.get_conferences(Utils.callback_for_conferencies);
                        Events.get_other(Utils.callback_for_other);
                    }
                    else {
                        $('#modal_error #error_page_content').html('Nous n\'avons pas pu supprimer cet interlocuteur de la liste de cet évenemement');
                        $('#modal_error').modal('open');
                    }
                });
            }
        });
    }

    static open_view_event(id) {
        let event = null;
        $.ajax({
            url: '/rest/evenement/get/id='+id,
            type: 'get', async: false
        }).done(data => {
            event = data;
        });
        let speakers = [];
        $.ajax({
            url: '/rest/evenement_speaker/get/',
            type: 'get',
            async: false
        }).done((data_speaker) => {
            $(data_speaker).each((key_speaker, obj_speaker) => {
                if(event.id === parseInt(obj_speaker.id_evenement)) {
                    speakers.push(obj_speaker.id_speaker);
                }
            });
        });
        let speakers_html = Card.instence(event.id, event.label, event.description, event.id_type_evenement, event.link, event.date_debut, event.date_fin, speakers).get_speakers();
        $('#modal_view_event .event.title').html(event.label);
        $('#modal_view_event .event.description').html(event.description.replace(/\n/g, '<br>'));
        $('#modal_view_event .event.speakers').html(speakers_html);
        Events.get_media(id);

        $('#modal_view_event').modal('open');
    }

    static get_media(id_event) {
        let medias = [];
        let medias_html = '';
        $.ajax({
            url: '/rest/media/get',
            type: 'get',
            async: false
        }).done(data => {
            $(data).each((key, media) => {
                if(parseInt(media.id_evenement) === id_event) {
                    medias[medias.length] = media;
                }
            });
        });

        medias_html += '<div class="row">';
        medias_html += '<div class="col s12"><h4 class="title">Gallerie</h4></div>';
        $(medias).each((key, media) => {
            let classe = 'col s2';
            medias_html += '<div class="' + classe + '"><img src="' + media.base64_data + '" width="650" class="responsive-img materialboxed"></div>';
        });
        medias_html += '</div>';
        $('.event.medias').html(medias_html);
        $('.materialboxed').materialbox();
    }
}
