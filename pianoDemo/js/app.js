$(document).ready(function () {
  $('.white-key').click(function (e) {
    var $currentTarget = $(e.currentTarget)
    var key = $currentTarget.data('key');
    $('.key-log').append(key + " ");
    console.log(key);
  });

  $('.black-key').click(function (e) {
    e.stopPropagation();
  });

  $('.key-input').keypress(function (e) {
    if (e.which == '13') {
      var input = $('.key-input').val();
      var formattedArr = filterKeys(input);
      var time = 1000;
      var i = 0;
      var keyInterval = setInterval(function() {
        if (i < formattedArr.length) {
          $('.highlighted').toggleClass('highlighted');
          var $target = $('[data-key="' + formattedArr[i] + '"]');
          $target.toggleClass('highlighted');
          i++;
        } else {
          $('.highlighted').toggleClass('highlighted');
          clearInterval(keyInterval);
        }
      }, 1000);
      $('.key-input').val('');
    }
  })
})

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

filterKeys('f, d, c,c d')
