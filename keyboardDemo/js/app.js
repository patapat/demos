define(["jquery"], function($) {

  $(document).ready(function () {
    var instrument = Synth.createInstrument(0);

    $('#instruments > button').click(function (e) {
      var $currentTarget = $(e.currentTarget);
      var instrumentID = $currentTarget.data('id');
      instrument = Synth.createInstrument(instrumentID);
    })

    $('.white-key').click(function (e) {
      var $currentTarget = $(e.currentTarget)
      var key = $currentTarget.data('key');
      $('.key-log').append(key + " ");
      instrument.play(key.toUpperCase(), 4, 2);
    });

    $('.black-key').click(function (e) {
      e.stopPropagation();
    });

    $('body').keypress(function (e) {
      console.log(e.which);
    })

    $('.key-input').on("keypress", function (e) {
      e.stopPropagation();
      highlightKeys(e, instrument);
    });

    $('.btn-input').on("click", function (e) {
      highlightKeys(e, instrument);
    });
  });

  var highlightKeys = function (e, instrument) {
    if (e.which == '13' || e.type === "click") {
      var input = $('.key-input').val();
      var formattedArr = filterKeys(input);
      var i = 0;

      var keyInterval = setInterval(function() {
        if (i < formattedArr.length) {
          $('.active-key').toggleClass('active-key');
          var $target = $('[data-key="' + formattedArr[i] + '"]');
          $target.toggleClass('active-key');
          instrument.play(formattedArr[i].toUpperCase(), 4, 2);
          $('.key-log').append(formattedArr[i] + " ");
          i++;
        } else {
          $('.active-key').toggleClass('active-key');
          clearInterval(keyInterval);
        }
      }, 1000);
      $('.key-input').val('');
    }
  }

  function filterKeys (keys) {
    var validKeys = "cdefgab";
    var filteredKeys = [];
    var splitKeys = keys.replace(/[, ]/g, '').split('');
    splitKeys.forEach(function (char) {
      if (validKeys.indexOf(char) != -1) {
        filteredKeys.push(char);
      }
    });

    return filteredKeys;
  }
});
