'use strict';

$(document).ready(init);

var pokemon;
var URL = 'http://pokeapi.co/'

function init() {
	console.log('ok!');
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
	/*$.ajax({
		method: 'GET',
		//url: 'http://pokeapi.co/api/v1/pokedex/1/',
		url: 'http://www.wunderground.com/weather/api/d/196ab87c421083e2/',
		success: function (data,status) {
			data.pokemon.forEach(function(pokemon){
				console.log(pokemon.name);
			});
		},
		error: function(promise,status,error) {

		}
	});*/
/*	.done(function() {
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});*/
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
			console.log(data);
			var $p1 = $('<p>').text(data.name).addClass('name');
			var $p2 = $('<p>').text('HP: ' + data.hp);
			var $p3 = $('<p>').text('Attack: ' + data.attack);
			var $p4 = $('<p>').text('Defense: ' + data.defense);
			$pokemon.append($p1,$p2,$p3,$p4);
		}
	});
	//$pokemon.append();
	$('#container').append($pokemon);
	
}