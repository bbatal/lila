$(function() {
  var $form = $('#signup_form');
  var $exists = $form.find('.username-exists');
  var runCheck = lichess.debounce(function() {
    var name = $username.val();
    if (name.length >= 3) $.ajax({
      method: 'GET',
      url: '/player/autocomplete',
      data: {
        term: name,
        exists: 1
      },
      success: function(res) {
        $exists.toggle(res);
      }
    });
  }, 300);

  $username = $form.find('input[name="username"]')
    .on('change keyup paste', function() {
      $exists.hide();
      runCheck();
    });

  $form.on('submit', function() {
    $form.find('button.submit')
      .attr('disabled', true)
      .removeAttr('data-icon')
      .addClass('frameless')
      .html(lichess.spinnerHtml);
  });
});
window.signupSubmit = function(token) {
  const form = document.getElementById('signup_form');
  if (form.reportValidity()) form.submit();
}
