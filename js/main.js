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
                $('#underscore-toggle').show();
                $('#delete-results').show();
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

    /**
     * Function that loads/unloads Underscore.js
     */
    function toggleUnderscore() {
        var url = 'http://underscorejs.org/underscore-min.js';

        if (!window._) {
            $.getScript(url);
            console.info('Underscore.js was loaded!');
        }
        else {
            window._ = undefined;
            console.info('Underscore.js was removed!');
        }
    }

    /**
     * Function that deletes results
     */
    function deleteResults() {
        window.results = [];

        $('#result-message').hide();
        $('#result-message-extra').hide();
        $('#underscore-toggle').hide();
        $('#delete-results').hide();

        console.info('Removed results!');
    }

        // Init Semantic UI components
    semanticInit();

    // Event binding
    $('#launch-request').click(launchRequest);

    $('#underscore').click(toggleUnderscore);

    $('#delete-results').click(deleteResults);
    $('#delete-results').mouseenter(function() { $(this).removeClass('basic'); });
    $('#delete-results').mouseleave(function() { $(this).addClass('basic'); });

})(window);
