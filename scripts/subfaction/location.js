function Location(id, city) {
	this.id = id;
	this.city = city;
	cities[city].locations.push(id);
	this.players = [];
	this.inventory = [];//Items at location
	this.owner = undefined;//0=No owner, otherwise organization that owns location
	this.player_owner = undefined;//When a player, not an organization, owns the location
	this.proximity = chance.integer({min: 1, max: 7});
	this.building = 'empty_plot'; //'cantina', 'weapon_shop', 'ship_shop', 'module_shop', 'office_building', 'space_port']);
	this.size = chance.pick(['small', 'medium', 'large', 'massive']);
	this.is_for_sale = 0;//0=Not For Sale, otherwise if value of sale
	this.value = 0;
	if (console_debug_verbose) {
		console.log("Created new location " + l.building);
	}
	
	this.outputPlayersString = function() { 
		for (var x = 1; x < this.players.length; x++) { //Skip player[0] no need to see yourself
			output(players[this.players[x]].name + ' is here. <a href="javascript:talk_output(players[' + x + '].talk(\'greeting\'))">Talk</a>'); 
		} 
	}
	this.outputInventoryString = function() { 
		for (var x = 0; x < this.inventory.length; x++) {
			output(items[this.inventory[x]].name + ' [' + items[this.inventory[x]].quantity + '] is here. <a href="javascript:take(items[' + x + '])">Take</a>'); 
		} 
	}
}