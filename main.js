'use strict';

$(document).ready(init);

var pokemon;
var URL = 'http://pokeapi.co/'

function init() {
	$('button').prop('enabled',false);
	$('#get').click(getClicked);
	
	$.ajax(URL + "api/v1/pokedex/1/", {
		success: function(data) {
			pokemon = data.pokemon;
			$('button').prop('enabled',true);
		}
	});
}

function getClicked() {

	var pokemonName = $('#input').val();
	var selectedPokemon = pokemon.filter(function(ob){
		return ob.name === pokemonName;
	})[0];

	var $pokemon = $('<div>').addClass('card');
	$.ajax(URL + selectedPokemon.resource_uri, {
		success: function(data) {
			$.ajax(URL + data.sprites[0].resource_uri, {
				success: function(data) {
					var $img = $('<img>');
					$img.attr('src',URL+data.image.slice(1));
					$img.css('width','200px');
					$pokemon.prepend($img);
				}
			});
			var $p1 = $('<p>').text(data.name).addClass('name');
			var $p2 = $('<p>').text('HP: ' + data.hp);
			var $p3 = $('<p>').text('Attack: ' + data.attack);
			var $p4 = $('<p>').text('Defense: ' + data.defense);
			$pokemon.append($p1,$p2,$p3,$p4);
		}
	});
	$('#container').append($pokemon);	
}