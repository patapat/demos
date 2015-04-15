$(document).ready(function () {
  $('.white-key').click(function (e) {
    var $currentTarget = $(e.currentTarget)
    var key = $currentTarget.data('key');
    console.log(key);
  });

  $('.black-key').click(function (e) {
    e.stopPropagation();
  })

})
