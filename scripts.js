var forms_list = {
   "#form1": "mail1.php",
   "#form2": "mail2.php",
   "#form3": "mail3.php",
   "#form4": "mail4.php",
   "#form5": "mail5.php",
   "#form6": "mail6.php",
   "#form7": "mail7.php",
   "#form8": "mail8.php",
   "#form9": "mail9.php",
   "#form10": "mail10.php",
   "#form11": "mail11.php",
};

var forms_placeholder_replace = {
    "Числомесяцгод рождения мужа": "Число, месяц и год рождения мужа",
    "Числомесяцгод рождения жены": "Число, месяц и год рождения жены"
};

if(typeof $ == 'undefined') {
    $ = jQuery;
}
jQuery(document).ready(function() {
    jQuery(document).ready(function() {
        for(var i in forms_list) {
            if(jQuery(i).length) {
                forma_cnt(i, forms_list[i], typeof jQuery(i).attr('data-form-load') != 'undefined');
                jQuery(i).attr('data-form-load', 1);
            }
        }
    });
});


function forma_cnt(form_id, form_script, form_loaded) {
    var all_speed = 0,
        all_n = 0,
        all_last = 0,
        all_count = false,
        lmforma = jQuery(form_id);

    var first_str = '',
        first_num = 0;

    jQuery('input, textarea, select', lmforma).each(function(i, inp){
        if(inp && inp.name && inp.name != 'agree' && inp.name.lastIndexOf('_wp') != 0) {
            first_str+= inp.name + '|';
            first_num++;
        }
    });


    if(!form_loaded) {
        jQuery.ajax({
            type: "POST",
            url: form_script,
            data: "first="+ first_str,
            async: false,
            cache: false,
            dataType : "json",
            success: function(data)
            {
                if(data && data[0] && data[0].length > first_num) {
                    lmforma.append('<'+'inp'+'ut '+'ty'+'pe'+'="h'+'idd'+'en"'+' n'+'am'+'e='+'"'+'1"'+'/'+'>');
                    var inp_i=0;
                    jQuery('input, textarea, select', lmforma).each(function(i, inp){
                        if(inp && inp.name && inp.name != 'agree' && inp.name.lastIndexOf('_wp') != 0 && !!data[0][inp_i]) {
                            var $inp = jQuery(this);
                            if(!(inp.name == 'desc' && form_id != "#form3")) {
                                $inp.attr('required', 'required');
                            }
                            if((inp.name == 'mail' || inp.name == 'email') && $inp.attr('type') != 'email') {
                                $inp.attr('type', 'email');
                            }
                            $inp.attr('name', data[0][inp_i]);

                            var inp_placeholder = $inp.attr('placeholder');
                            if(typeof inp_placeholder != 'undefined') {
                                for(var i in forms_placeholder_replace) {
                                    inp_placeholder = inp_placeholder.replace(i, forms_placeholder_replace[i]);
                                }
                                $inp.attr('placeholder', inp_placeholder);
                            }


                            inp_i++;
                            first_start = true;
                        }
                    });
                }
            }
        });
    }

    lmforma.on('input keypress focus blur', 'input,textarea', function(e) {
        if('focusin' == e.type) {
            all_count = false;
        }

        if('focusout' == e.type) {
            all_last = 0;
        }

        if(('input' == e.type || 'keypress' == e.type) && !all_count) {
            all_last = Date.now();
            all_count = true;
        } else if('input' == e.type || 'keypress' == e.type) {
            var speed = Date.now() - all_last;
            if(speed < 10000) {
                all_speed+= speed;
                all_n++;
            }

            all_last = Date.now();
        }
    });

    lmforma.unbind('submit');
    lmforma.submit(function() {
        jQuery('input, textarea, select', lmforma).filter(':last').val((all_speed / all_n) +'|'+ all_n);
        jQuery.ajax({
            type: "POST",
            url: form_script,
            data: jQuery(this).serialize()
        }).done(function() {
            jQuery(this).find("input").val("");
            alert("Ваше сообщение отправлено! Вам перезвонит наш оператор в течение 10 минут.");
            jQuery("form").trigger("reset");
        });
        return false;
    });
}













$(document).ready(function(){
    $('.header-menu__button').mouseup(function(e){
        $('.header-menu__burger,.header-menu__button,.mainmenutop, .menu').toggleClass('active')
        $('body').toggleClass('lock')
    });

    $(document).mouseup( function(e){ //^ событие клика по веб-документу
        let button = $( ".header-menu__button" ); //^ тут указываем класс кнопки
        let window = $( ".header-menu__window" ); //^ тут указываем класс окна
        if ( !button.is(e.target) //^ если клик был не по кнопки
            && button.has(e.target).length === 0   //^ и не по ее дочерним элементам
            && !window.is(e.target) //^ и не по окну
            && window.has(e.target).length === 0 //^ и не по его дочерним элементам
            && ($('.header-menu__window').hasClass('active'))){
            $('.header-menu__burger,.header-menu__list,.header-menu__window,.header-menu__button').removeClass('active');
            $('body').removeClass('lock')
            console.log('dfgdfg');
        }
    });


    function screen_check(){
        const tableSpan = document.querySelectorAll('table>tbody>tr>td>span');
        const tableSpanP = document.querySelectorAll('table>tbody>tr>td>p>span');
        const tableH3Span = document.querySelectorAll('table>tbody>tr>td>h3>span');
        const tableSpanImg = document.querySelectorAll('table>tbody>tr>td>span>img');
        const tablePSpanStrong = document.querySelectorAll('table>tbody>tr>td>p>span>strong');

        if ($(window).width() <= 600) {
            $(tableSpan).removeAttr('style')
            $(tableSpan).attr('style','font-size:12px')
            $(tableSpanP).removeAttr('style')
            $(tableSpanP).attr('style','font-size:12px')
            $(tableSpanImg).removeAttr('width')
            $(tableSpanImg).attr('width','100px')
            $(tableH3Span).removeAttr('style')
            $(tableH3Span).attr('style','font-size:12px; color:#ffffff')
        }

    }
    screen_check();

    $(window).on('resize', function(){
        screen_check();
    });

    $('.documents-button__button').mouseup(function(e){
        $('.documents-button__button, .leftBlocks, .graygreenfrm').toggleClass('active')
        $('body,html').animate({scrollTop:0},400);
    });
    $('.leftBlocks-button__button').mouseup(function(e){
        $('.documents-button__button, .leftBlocks, .graygreenfrm').toggleClass('active')
        $('body,html').animate({scrollTop:500},400);
    });
})


