$(document).ready(function() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    var id = $('#pokeName').val().toLowerCase() || $('#pokeNumber').val().toLowerCase();
    $('#button').addClass('disabled').attr('value', 'Loading ...');
    $('.buttonDiv').append('<p class="small" id="explainer">(Give us just a sec to fetch this pokémon)</p>');
    $.ajax({
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/pokemon/' + id
    }).done(function(results) {
      var sprite = results.sprites.front_default;
      var appendImg = $('<img src="' + sprite + '">');
      $('.pokemonShow').append(appendImg);
      $('#button').removeClass('disabled');
      $('#button').removeAttr('value');
      $('#explainer').remove();
      $('form').trigger("reset")
    }).fail(function(jqXHR, textStatus, errorThrown) {
      if (errorThrown === 'TOO MANY REQUESTS'){
      alert("Please try again later; we've went too many requests to the Pokémon server!");
    } else {
      alert("Oops! Please check the spelling of your pokémon name and try again.")
    }
      $('#explainer').remove();
      $('#button').removeAttr('value');
    });
  });
});
