$(document).ready(function() {
    if(!Modernizr.meter){
        alert('Sorry your brower does not support HTML5 progress bar');
    } else {
        var progressbar = $('#progressbar'),
            max = progressbar.attr('max'),
            time = 180,	
            value = progressbar.val();

        var loading = function() {
            value -= 1;
            addValue = progressbar.val(value);
            
            $('.progress-value').html(value + '%');

            if (value == max) {
                clearInterval(animate);			           
            }
            
            if (value == 0) {
                clearInterval(animate);			           
            }
        };

        var animate = setInterval(function() {
            loading();
        }, time);
    }
});