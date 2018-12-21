$(document).ready(function(){

    if(document.documentMode) {
        $("body").addClass("IEMODE");
    }

    $(".popup").fancybox({
        padding: 1,
        autoSize: true,
        tpl: {
             closeBtn : '<a title="'+expressions[128]+'" class="fancybox-item fancybox-close link" href="javascript:void(0);">'+expressions[128]+'</a>',
                    },
        afterShow: function (){
            $('.inputError').each(function(){
                var labelHeight = $(this).height();
                $(this).children('.errorToolTip').css( "bottom", labelHeight + 6);
            });
        }
    });  

    tooltipPos();
    dataImageSizes();

});

function dataImageSizes(){
    $('figure img[data-size]').each(function(){
        var size = $(this).attr('data-size').split('/');
        if( size[0] != undefined && size[1] != undefined )
            $(this).parent().addClass('loader').css('padding-bottom', size[1] * 100 / size[0]+'%'); //ALTURA * 100 / LARGURA
    });
}

function tooltipPos(){
    $('.inputError').each(function(){
        var labelHeight = $(this).height();
        $(this).children('.errorToolTip').css( "bottom", labelHeight + 6);
    });
}

function upload(){
   $('.upload .hidden').change(function(){
      var fileName=$(this).val(),
          fileExt = $(this).val().split('.').pop().toLowerCase(),
          valArray=fileName.split('\\'),
          newVal=valArray[valArray.length-1];

      if($.inArray(fileExt, ['pdf']) == -1) {
         if(newVal != ''){
            $('.wrapper-upload p').addClass('shake error');
            setTimeout(function(){
               $('.wrapper-upload p').removeClass('shake error');
            }, 1000);
         }
      }else{
         $('.file-name').text(newVal);
      }

   });
}

function accordion(){
    $('.accordion > li > a').click(function() {
        if ($(this).parent().hasClass('active')) {
            $('.accordion > li').removeClass('active');
            $('.accordion-content').stop(true, true).slideUp('normal'); 
        } else {
            $('.accordion > li').removeClass('active');
            $('.accordion-content').slideUp('normal');
            $(this).parent().addClass('active');
            this2 = $(this).parent();
            $('.accordion-content', this2).stop(true, true).slideDown('normal');
        }
    });
}

function tabs(){
    $('.tabs li:first-child').addClass('sel');
    $('.tabs-content .tab:first-child').css('display', 'block');
    $('.tabs li').click(function (event) {

        event.preventDefault();
        rel = $(this).attr('rel');

        $('.tab').stop(true, true).css('display', 'none');
        $('.tabs li').removeClass('sel');

        $('.'+rel).stop(true, true).css('display', 'block');
        $('.tabs li[rel='+rel+']').addClass('sel');

    });
}

$(window).on('load',function(){

    jQuery(".inputError input").on("click blur change",function(){
        jQuery('.inputError').removeClass('displayError');
        jQuery('.inputError').children('.errorToolTip').removeClass('show');
    });
    
     jQuery(".inputError select").on("click blur change",function(){
        jQuery('.inputError').removeClass('displayError');
        jQuery('.inputError').children('.errorToolTip').removeClass('show');
    });
    
    jQuery(".inputError textarea").on("click blur change",function(){
        jQuery('.inputError').removeClass('displayError');
        jQuery('.inputError').children('.errorToolTip').removeClass('show');
    });
    
});

function validarFormulario(este){

    jQuery('.inputError', este).removeClass('displayError');

    var erro = false;

    jQuery("input[type='text']",este).each(function()
    {
        if(erro==false && jQuery(this).attr("require") == 1 && jQuery.trim(jQuery(this).val()) == "")
        {
            erro = true;
            jQuery(this).parents('.inputError').addClass('displayError');
        }
        if(erro==false && jQuery(this).attr("minl")>0 && jQuery.trim(jQuery(this).val()).length < jQuery(this).attr("minl"))
        {
            
            erro = true;
            jQuery(this).parents('.inputError').addClass('displayError');
        }
        if(erro==false && jQuery(this).attr("maxl")>0 && jQuery.trim(jQuery(this).val()).length >= jQuery(this).attr("maxl"))
        {
            erro = true;
            jQuery(this).parents('.inputError').addClass('displayError');
        }
        if(erro==false && jQuery(this).attr("email") == 1 && verify_email(jQuery.trim(jQuery(this).val())) == false)
        {
            erro = true;
            jQuery(this).parents('.inputError').addClass('displayError');         
        }
        if(erro==false && jQuery(this).attr("numerico") == 1 && isNaN(jQuery(this).val())==true)
        {
            erro = true;
            jQuery(this).parents('.inputError').addClass('displayError');
        }
    })
    
    jQuery("select",este).each(function()
    {
        if(erro==false && jQuery(this).attr("require") == 1 && (jQuery.trim(jQuery(this).val()) == 0 || jQuery.trim(jQuery(this).val()) == ""))
        {
            erro = true;
            jQuery(this).parents('.inputError').addClass('displayError');
        }
    })

    jQuery("textarea",este).each(function()
    {
        if(erro==false && jQuery(this).attr("require") == 1 && jQuery.trim(jQuery(this).val()) == "")
        {
            erro = true;
            jQuery(this).parents('.inputError').addClass('displayError');
        }
    })

    jQuery("input[type='password']",este).each(function()
    {
        
  
        if(erro==false && jQuery(this).attr("require") == 1 && jQuery.trim(jQuery(this).val()) == "")
        {
            erro = true;
            //jQuery(this).parents('.inputError').addClass('displayError');
            jQuery(this).parents('.inputError').children('.erro1').addClass('show')
        }
        if(erro==false && jQuery(this).attr("minl")>0 && jQuery.trim(jQuery(this).val()).length < jQuery(this).attr("minl") && jQuery.trim(jQuery(this).val()) != "")
        {
            erro = true;
            //jQuery(this).parents('.inputError').addClass('displayError');
            jQuery(this).parents('.inputError').children('.erro2').addClass('show')
        }
        if(erro==false && jQuery(this).attr("maxl")>0 && jQuery.trim(jQuery(this).val()).length >= jQuery(this).attr("maxl"))
        {
            erro = true;
            jQuery(this).parents('.inputError').addClass('displayError');
        }
        if(erro==false && jQuery(this).attr("match") == 1 && jQuery("input[wrefo='"+jQuery(this).attr("wref")+"']",este).val()!=jQuery(this).val())
        {
            erro = true;
            //jQuery(this).parents('.inputError').addClass('displayError');
            jQuery(this).parents('.inputError').children('.erro3').addClass('show')
        }
    })

    jQuery("input[type='checkbox']",este).each(function()
    {
        if(erro==false && jQuery(this).attr("require") == 1 && !jQuery("input[name='"+$(this).attr("name")+"']").is(':checked'))
        {
            erro = true;
            jQuery(this).parents('.inputError').addClass('displayError');
        }
    })
    
    
     $("input[type='file']",este).each(function()
    {

        //var regex = new RegExp("(.*?)\.(docx|doc|pdf|xml|bmp|ppt|xls)$");
        var regex = new RegExp("(.*?)\.pdf$");

        if(erro==false && ( ($(this).attr("require") == 1 && $.trim($(this).val()) == "") || !(regex.test($(this).val().toLowerCase())) ) )
        {
            erro = true;
            $(this).parents('.inputError').addClass('displayError');
        }
    })


    if(erro == false) return true;
    else {
        return false;
    }
}

function verify_email(_mail){
	var status = false;
	var emailRegEx = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;

	if (_mail.search(emailRegEx) == -1) {
		status = false;
	} else {
		status = true;
	}
	return status;
}

function isMobileDevice(){
    try {
        if (/.*\(BB[0-9]+;.*Mobile.*/.test(navigator.userAgent)) {
            return true;
        }

        if (/.*BlackBerry.*/.test(navigator.userAgent)) {
            return true;
        }

        if (/.*Android.*Mobile.*/.test(navigator.userAgent)) {
            return true;
        }

        if (/.*MSIEMobile.*/.test(navigator.userAgent)) {
            return true;
        }

        if (/.*SymbianOS.*/.test(navigator.userAgent)) {
            return true;
        }

        if (/.*Windows Phone.*/.test(navigator.userAgent)) {
            return true;
        }

        if (/.*iPhone.*/.test(navigator.userAgent)) {
            return true;
        }

        return false;
    } catch (err) {
        return false;
    }
}

if(isMobileDevice()){
    document.querySelector('meta[name="viewport"]').content = 'width=device-width, maximum-scale=1';
}else{
    document.querySelector('meta[name="viewport"]').content = 'width=1150, maximum-scale=1';
}