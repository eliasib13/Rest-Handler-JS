/**
 * Created by eliasib on 14/6/16.
 */

// This var will store responses of requests resolved.
window.results = [];

(function(window) {
    /**
     * Function that initialize all Semantic UI components
     */
    function semanticInit() {

        // Init dropdowns
        $('.ui.dropdown')
            .dropdown()
        ;

    }

    /**
     * Function that launches the request
     */
    function launchRequest() {
        $('.loader').show();
        var method = $('#method').text();
        var url = $('#url').val();

        $.ajax({
            url: url,
            method: method,
            crossDomain: $('#cors').prop('checked'),
            success: function(data, textStatus, jqXHR) {
                $('#result-message').removeClass('red');
                $('#result-message').addClass('ui message green');
                $('#result-message-status').html(textStatus);

                if (!window.results.push)
                    window.results = [];
                window.results.push(data);
                $('#result-message-code').html('results[' + (window.results.length - 1) + ']');
                $('#result-message-extra').show();
                console.info('Results stored on results[' + (window.results.length - 1) + ']');

                $('.loader').hide();
                $('#result-message').css('display','block');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('#result-message').removeClass('green');
                $('#result-message').addClass('ui message red');
                $('#result-message-status').html(textStatus);

                $('#result-message-extra').hide();

                $('.loader').hide();
                $('#result-message').css('display','block');
            }
        });
    }

    // Init Semantic UI components
    semanticInit();

    // Event binding
    $('#launch-request').click(launchRequest);

})(window);