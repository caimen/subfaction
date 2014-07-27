function Location(id, city) {
	this.id = id;
	this.city = city;
	cities[city].locations.push(id);
	this.players = [];
	this.inventory = [];//Items at location
	this.owner = undefined;//0=No owner, otherwise organization that owns location
	this.player_owner = undefined;//When a player, not an organization, owns the location
	this.constructing = "";
	this.constructing_finish = 0;
	this.proximity = chance.integer({min: 1, max: 7});
	this.building = 'empty plot'; //'cantina', 'weapon_shop', 'ship_shop', 'module_shop', 'office_building', 'space_port']);
	this.size = chance.pick([0, 1, 2, 3]);//0=small,1=medium,2=large,3=massive
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
			if (items[this.inventory[x]] !== undefined) {
				output(items[this.inventory[x]].name + ' (' + items[this.inventory[x]].type + ') [' + items[this.inventory[x]].quantity + '] is here. <a href="javascript:items[' + this.inventory[x] + '].examine()">Examine</a> <a href="javascript:take(items[' + x + '])">Take</a>'); 
			}
		} 
	}
	//Check for certain amounts of resources at this location
	this.checkResources = function(tot_mercadium, tot_torphyte, tot_zenophyte, tot_cylocyte, tot_psytanium, tot_ipsogen, tot_zorphyte, tot_nytonium) {
		var doeshaveenough = true;
		
		mercadium = 0;
		torphyte = 0;
		zenophyte = 0;
		cylocyte = 0;
		psytanium = 0;
		ipsogen = 0;
		zorphyte = 0;
		nytonium = 0;
		for (var i = 0; i < this.inventory.length; i++) {
			if (items[this.inventory[i]] !== undefined) {
				if (items[this.inventory[i]].type == "mineral") {
					switch (items[this.inventory[i]].name) {
						case "mercadium": mercadium += mercadium + items[this.inventory[i]].quantity; break;
						case "torphyte": torphyte += torphyte + items[this.inventory[i]].quantity; break;
						case "zenophyte": zenophyte += zenophyte + items[this.inventory[i]].quantity; break;
						case "cylocyte": cylocyte += cylocyte + items[this.inventory[i]].quantity; break;
						case "psytanium": psytanium += psytanium + items[this.inventory[i]].quantity; break;
						case "ipsogen": ipsogen += ipsogen + items[this.inventory[i]].quantity; break;
						case "zorphyte": zorphyte += zorphyte + items[this.inventory[i]].quantity; break;
						case "nytonium": nytonium += nytonium + items[this.inventory[i]].quantity; break;
					}
				}
			}
		}
		
		if (tot_mercadium > mercadium) {
			output("You need " + (tot_mercadium - mercadium) + " more units of mercadium to do this."); doeshaveenough = false;
		}
		if (tot_torphyte > torphyte) {
			output("You need " + (tot_torphyte - torphyte) + " more units of torphyte to do this."); doeshaveenough = false;
		}
		if (tot_zenophyte > zenophyte) {
			output("You need " + (tot_zenophyte - zenophyte) + " more units of zenophyte to do this."); doeshaveenough = false;
		}
		if (tot_cylocyte > cylocyte) {
			output("You need " + (tot_cylocyte - cylocyte) + " more units of cylocyte to do this."); doeshaveenough = false;
		}
		if (tot_psytanium > psytanium) {
			output("You need " + (tot_psytanium - psytanium) + " more units of psytanium to do this."); doeshaveenough = false;
		}
		if (tot_ipsogen > ipsogen) {
			output("You need " + (tot_ipsogen - ipsogen) + " more units of ipsogen to do this."); doeshaveenough = false;
		}
		if (tot_zorphyte > zorphyte) {
			output("You need " + (tot_zorphyte - zorphyte) + " more units of zorphyte to do this."); doeshaveenough = false;
		}
		if (tot_nytonium > nytonium) {
			output("You need " + (tot_nytonium - nytonium) + " more units of nytonium to do this."); doeshaveenough = false;
		}
		return doeshaveenough;
	}
	
	this.removeResources = function(tot_mercadium, tot_torphyte, tot_zenophyte, tot_cylocyte, tot_psytanium, tot_ipsogen, tot_zorphyte, tot_nytonium) {
		var doeshaveenough = true;
		
		mercadium = 0;
		torphyte = 0;
		zenophyte = 0;
		cylocyte = 0;
		psytanium = 0;
		ipsogen = 0;
		zorphyte = 0;
		nytonium = 0;
		for (var i = 0; i < this.inventory.length; i++) {
			if (items[this.inventory[i]].type == "mineral") {
				switch (items[this.inventory[i]].name) {
					case "mercadium": 
						mercadium += mercadium + items[this.inventory[i]].quantity; 
						if (mercadium > tot_mercadium) {
							items[this.inventory[i]].quantity = items[this.inventory[i]].quantity - tot_mercadium;
							tot_mercadium = tot_meracdium - mercadium;
						}
						else {
							items[this.inventory[i]].quantity = 0;
							tot_mercadium = 0;
							delete items[this.inventory[i]];//If quantity is 0 destroy the item
						}
						break;
					case "torphyte": 
						torphyte += torphyte + items[this.inventory[i]].quantity; 
						if (torphyte > tot_torphyte) {
							items[this.inventory[i]].quantity = items[this.inventory[i]].quantity - tot_torphyte;
							tot_mercadium = tot_torphyte - torphyte;
						}
						else {
							items[this.inventory[i]].quantity = 0;
							tot_torphyte = 0;
							delete items[this.inventory[i]];//If quantity is 0 destroy the item
						}
						break;
					case "zenophyte": 
						zenophyte += zenophyte + items[this.inventory[i]].quantity; 
						if (zenophyte > tot_zenophyte) {
							items[this.inventory[i]].quantity = items[this.inventory[i]].quantity - tot_zenophyte;
							tot_zenophyte = tot_zenophyte - zenophyte;
						}
						else {
							items[this.inventory[i]].quantity = 0;
							tot_zenophyte = 0;
							delete items[this.inventory[i]];//If quantity is 0 destroy the item
						}
						break;
					case "cylocyte": 
						cylocyte += cylocyte + items[this.inventory[i]].quantity; 
						if (cylocyte > tot_cylocyte) {
							items[this.inventory[i]].quantity = items[this.inventory[i]].quantity - tot_cylocyte;
							tot_cylocyte = tot_cylocyte - cylocyte;
						}
						else {
							items[this.inventory[i]].quantity = 0;
							tot_cylocyte = 0;
							delete items[this.inventory[i]];//If quantity is 0 destroy the item
						}
						break;
					case "psytanium": 
						psytanium += psytanium + items[this.inventory[i]].quantity; 
						if (psytanium > tot_psytanium) {
							items[this.inventory[i]].quantity = items[this.inventory[i]].quantity - tot_psytanium;
							tot_psytanium = tot_psytanium - psytanium;							
						}
						else {
							items[this.inventory[i]].quantity = 0;
							tot_psytanium = 0;
							delete items[this.inventory[i]];//If quantity is 0 destroy the item
						}
						break;
					case "ipsogen": 
						ipsogen += ipsogen + items[this.inventory[i]].quantity; 
						if (ipsogen > tot_ipsogen) {
							items[this.inventory[i]].quantity = items[this.inventory[i]].quantity - tot_ipsogen;
							tot_ipsogen = tot_ipsogen - ipsogen;
						}
						else {
							items[this.inventory[i]].quantity = 0;
							tot_ipsogen = 0;
							delete items[this.inventory[i]];//If quantity is 0 destroy the item
						}
						break;
					case "zorphyte": 
						zorphyte += zorphyte + items[this.inventory[i]].quantity;
						if (zorphyte > tot_zorphyte) {
							items[this.inventory[i]].quantity = items[this.inventory[i]].quantity - tot_zorphyte;
							tot_zorphyte = tot_zorphyte - zorphyte;
						}
						else {
							items[this.inventory[i]].quantity = 0;
							tot_zorphyte = 0;
							delete items[this.inventory[i]];//If quantity is 0 destroy the item
						}
						break;
					case "nytonium": 
						nytonium += nytonium + items[this.inventory[i]].quantity; 
						if (nytonium > tot_nytonium) {
							items[this.inventory[i]].quantity = items[this.inventory[i]].quantity - tot_nytonium;
							tot_nytonium = tot_nytonium - nytonium;
						}
						else {
							items[this.inventory[i]].quantity = 0;
							tot_nytonium = 0;
							delete items[this.inventory[i]];//If quantity is 0 destroy the item
						}
						break;
				}
			}
		}
	}
}