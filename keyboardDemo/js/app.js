define(["jquery"], function($) {

  $(document).ready(function () {
    var instrument = Synth.createInstrument(0);
    var keydown = false;

    var logKeys = function (dataKey) {
      var $target = $('[data-log="' + dataKey + '"]');
      $('.log').each(function () {
        if ($(this).data('log') === $target.data('log')) {
          $target.prepend('<div class="logged-key">' + dataKey + '</div>');
          $('')
        } else {
          $(this).prepend('<div class="blank"></div>');
        }
      });
      var count = $target.children('span').text();
      count++;
      $target.children('span').text(count);
    }

    var highlightKeys = function (e, instrument) {
      if (e.which == '13' || e.type === "click") {
        var input = $('.key-input').val();
        var formattedArr = filterKeys(input);
        var i = 0;
        (function keyTimeout () {
          if (i < formattedArr.length) {
            toggleKeys(formattedArr[i]);
            i++;
            setTimeout(keyTimeout, 1000);
          } else {
            $('.active-key').toggleClass('active-key');
          }
        })();
        $('.key-input').val('');
      }
    }

    var toggleKeys = function (dataKey) {
      $('.active-key').toggleClass('active-key');
      var $target = $('[data-key="' + dataKey + '"]');
      $target.toggleClass('active-key');
      instrument.play(dataKey, 4, 2);
      logKeys(dataKey);
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
      var validKeys = "CDEFGAB";
      var filteredKeys = [];
      var splitKeys = keys.replace(/[, ]/g, '').split('');
      splitKeys.forEach(function (char) {
        if (validKeys.indexOf(char.toUpperCase()) != -1) {
          filteredKeys.push(char.toUpperCase());
        }
      });

      return filteredKeys;
    }

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
      logKeys(key);
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

    $('body').keyup(function (e) {
      if (e.which != '13') {
        $('.active-key').toggleClass('active-key');
        keydown = false;
      }
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
