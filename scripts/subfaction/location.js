function Location(id, city) {
	this.id = id;
	this.city = city;
	cities[city].locations.push(id);
	this.players = [];
	this.owner = 0;//0=No owner, otherwise organization that owns location
	this.player_owner = 0;//When a player, not an organization, owns the location
	this.proximity = chance.integer({min: 1, max: 7});
	this.building = chance.pick(['empty_plot', 'cantina', 'weapon_shop', 'ship_shop', 'module_shop', 'office_building', 'space_port']);
	this.is_for_sale = 0;//0=Not For Sale
	this.value = 0;
	if (console_debug_verbose) {
		console.log("Created new location " + l.building);
	}
	
	this.outputPlayersString = function() { 
		for (var x = 1; x < this.players.length; x++) { //Skip player[0] no need to see yourself
			output(players[this.players[x]].name + ' is here. <a href="javascript:talk_output(players[' + x + '].talk(\'greeting\'))">Talk</a>'); 
		} 
	}
}