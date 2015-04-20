define(["jquery"], function($) {

  $(document).ready(function () {
    var instrument = Synth.createInstrument(0);
    var keydown = false;

    var highlightKeys = function (e, instrument) {
      if (e.which == '13' || e.type === "click") {
        var input = $('.key-input').val();
        var formattedArr = filterKeys(input);
        var i = 0;

        var keyInterval = setInterval(function() {
          if (i < formattedArr.length) {
            toggleKeys(formattedArr[i]);
            i++;
          } else {
            $('.active-key').toggleClass('active-key');
            clearInterval(keyInterval);
          }
        }, 1000);
        $('.key-input').val('');
      }
    }

    var toggleKeys = function (dataKey) {
      $('.active-key').toggleClass('active-key');
      var $target = $('[data-key="' + dataKey + '"]');
      $target.toggleClass('active-key');
      instrument.play(dataKey, 4, 2);
      $('.key-log').append(dataKey + " ");
    }

    var keyInput = function (e, instrument) {
      var inputPair = {
        113: 'C',
        119: 'D',
        101: 'E',
        114: 'F',
        116: 'G',
        121: 'A',
        117: 'B'
      }

      if (Object.keys(inputPair).indexOf(e.which.toString()) != -1) {
        var pianoKey = inputPair[e.which];
        toggleKeys(pianoKey);
      }
    }

    function filterKeys (keys) {
      var validKeys = "cdefgab";
      var filteredKeys = [];
      var splitKeys = keys.replace(/[, ]/g, '').split('');
      splitKeys.forEach(function (char) {
        if (validKeys.indexOf(char) != -1) {
          filteredKeys.push(char.toUpperCase());
        }
      });

      return filteredKeys;
    }

    $('#piano').toggleClass('active-tab');

    $('#instruments > div').click(function (e) {
      $('.active-tab').toggleClass('active-tab');
      var $currentTarget = $(e.currentTarget);
      $currentTarget.toggleClass('active-tab');
      var instrumentID = $currentTarget.data('id');
      instrument = Synth.createInstrument(instrumentID);
    })

    $('.white-key').click(function (e) {
      var $currentTarget = $(e.currentTarget)
      var key = $currentTarget.data('key');
      $('.key-log').append(key + " ");
      instrument.play(key, 4, 2);
    });

    $('.black-key').click(function (e) {
      e.stopPropagation();
    });

    $('body').keypress(function (e) {
      if (keydown === true) {
        return;
      }

      keydown = true;
      keyInput(e, instrument);
    });

    $('body').keyup(function () {
      $('.active-key').toggleClass('active-key');
      keydown = false;
    })

    $('.key-input').on("keypress", function (e) {
      e.stopPropagation();
      highlightKeys(e, instrument);
    });

    $('.btn-input').on("click", function (e) {
      highlightKeys(e, instrument);
    });
  });


});
