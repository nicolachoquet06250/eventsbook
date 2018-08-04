"use strict";

class Medias {
    static select_tyme_media(container_id, destination_id, destination_container_class) {
        $('#' + container_id  + ' .' + destination_container_class + ' .media_type').addClass('hide');
        $('#' + container_id  + ' #' + destination_id).removeClass('hide');
    }

    static upload_image() {

        let action = $('#preview_media_image_upload_form').attr('action');
        let method = $('#preview_media_image_upload_form').attr('method');
        let enctype = $('#preview_media_image_upload_form').attr('enctype');
        let media_type = $($('#preview_media_image_upload_form .media_type')[0]).val();

        let formdata = new FormData();
        formdata.append('image', $('#preview_media_image_upload_form input[type=file]')[0].files[0]);

        $.ajax({
            url: action + '/media_type='+media_type,
            type: method,
            enctype: enctype,
            data: formdata,
            contentType: false,
            processData: false,
            cache: false
        }).done(data => {
            $('#upload_image .preview').html('<img src="' + data.image_base64 + '" class="responsive-img">');
        });
    }

    static onsubmit_upload_image() {
        $('#preview_media_image_upload_form').on('submit', e => {
            e.preventDefault();

            let image = $($('#upload_image .preview img')[0]).attr('src');
            let label = $('#preview_media_image_upload_form #label_media_image').val();
            let id_evenement = $($('#preview_media_image_upload_form .id_evenement')[0]).val();
            let media_type = $($('#preview_media_image_upload_form .media_type')[0]).val();

            $.ajax({
                url: '/rest/media/add/label=' + label + '/id_evenement=' + id_evenement + '/type_media='+media_type,
                type: 'post',
                data: {
                    image: image
                }
            }).done(data => {
                console.log(data);
            });

            console.log('submit image');

        });
    }

    static valid_new_image_media() {
        $('#preview_media_image_upload_form').submit();
    }

    static upload_video() {
        // let action = $('#preview_media_video_upload_form').attr('action');
        // let method = $('#preview_media_video_upload_form').attr('method');
        // let enctype = $('#preview_media_video_upload_form').attr('enctype');
        // let media_type = $($('#preview_media_video_upload_form .media_type')[0]).val();
        //
        // let formdata = new FormData();
        // formdata.append('image', $('#preview_media_video_upload_form input[type=file]')[0].files[0]);
        //
        // $.ajax({
        //     url: action + '/media_type='+media_type,
        //     type: method,
        //     enctype: enctype,
        //     data: formdata,
        //     contentType: false,
        //     processData: false,
        //     cache: false
        // }).done(data => {
        //     $('#upload_video .preview').html('<video class="responsive-video"><source src="' + data.image_base64 + '"></video>');
        // });
    }

    static onsubmit_upload_video() {
        // $('#preview_media_video_upload_form').on('submit', e => {
        //     e.preventDefault();
        //     console.log('submit video');
        //
        //     let formdata = new FormData();
        //     formdata.append('image', $('#media_video')[0].files[0]);
        // });
    }

    static valid_new_video_media() {
        // $('#preview_media_video_upload_form').submit();
    }

    static upload_youtube() {
        // let action = $('#preview_media_video_youtube_upload_form').attr('action');
        // let method = $('#preview_media_video_youtube_upload_form').attr('method');
        // let media_type = $($('#preview_media_video_youtube_upload_form .media_type')[0]).val();
        // let id_evenement = $($('#preview_media_video_youtube_upload_form .id_evenement')[0]).val();
        // let media_youtube = $('#media_youtube').val();
        //
        // console.log(media_youtube);
        //
        // $.ajax({
        //     url: action + '/media_type=' + media_type + '/id_evenement=' + id_evenement,
        //     type: 'get',
        //     data: {
        //         youtube_url: media_youtube
        //     }
        // }).done(data => {
        //     $('#upload_image .preview').html('<div>\n' +
        //         '   <div class="video-container">\n' +
        //         '       <iframe width="853" height="480" src="//www.youtube.com/embed/Q8TXgCzxEnw?rel=0" frameborder="0" allowfullscreen></iframe>\n' +
        //         '   </div>\n' +
        //         '</div>');
        // });
        // console.log('upload preview youtube video')
    }

    static onsubmit_upload_youtube() {
        // $('#preview_media_video_youtube_upload_form').on('submit', e => {
        //     e.preventDefault();
        //     console.log('submit youtube video');
        //
        //     let formdata = new FormData();
        //     formdata.append('image', $('#media_youtube input[type=file]')[0].files[0]);
        // });
    }

    static valid_new_youtube_media() {
        // $('#preview_media_video_youtube_upload_form').submit();
    }
}