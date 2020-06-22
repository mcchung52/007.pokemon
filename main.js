'use strict';

$(document).ready(init);

var pokemons;
var URL = 'http://pokeapi.co/api/v2'

function init() {
	$('button').prop('enabled',false);
	$('#get').click(getClicked);
	
	$.ajax(URL + "/pokedex/1/", {
		success: function(data) {
			pokemons = data.pokemon_entries;
			$('button').prop('enabled',true);
		}
	});
}

function getClicked() {

	var pokemonName = $('#input').val();
	var selectedPokemons = pokemons.filter(function(ob){
		return ob.pokemon_species.name.toLowerCase().includes(pokemonName.toLowerCase());
	});
	
	$('#container').empty();
	
	for (var pm in selectedPokemons) {
		var $pokemon = $('<div>').addClass('card');
		$.ajax(URL + '/pokemon/' + selectedPokemons[pm].entry_number, {
			success: function(data) {
				//$.ajax(URL + data.sprites[0].resource_uri, {
				//	success: function(data) {
						var $img = $('<img>');
						$img.attr('src',data.sprites.front_default);
						$img.css('width','200px');
						$pokemon.prepend($img);
				//	}
				//});
				var $p1 = $('<p>').text(data.name).addClass('name');
				var stat = data.stats;
				var $p2 = $('<p>').text('HP: ' + stat['0'].base_stat);
				var $p3 = $('<p>').text('Attack: ' + stat['1'].base_stat);
				var $p4 = $('<p>').text('Defense: ' + stat['2'].base_stat);
				$pokemon.append($p1,$p2,$p3,$p4);
				$('#container').append($pokemon);
			}
		});
	}	
}
