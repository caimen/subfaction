//Genesis - Let there be some light, but mostly darkness.  We are creating the universe here in case you didn't notice.
function genesis() {
	output("Generating Big Bang...");
	output("Let there be some light, but mostly darknes. - Caimen");

    game = Object();
    game.state = 0;
    game.input = "";
    game.tick = 0;
	//Create players
	for (var x = 0; x < 300; x++) {//Where x <= Number of Players to spawn
		players[x] = new Player(x);
	}
	//Create systems
	for (var x = 0; x < 5; x++) {//Where x <= Number of Systems to spawn
		systems[x] = new System();
	}
	//Create planets
	for (var x = 0; x < systems.length; x++) {
		for (var y = 0; y < chance.integer({min: 4, max: 6}); y++) {
			planets.push(new Planet(systems[x].name + " " + formatRoman(y+1), x));
			systems[x].planets.push(planets.length - 1);
		}
	}
	
	//Create Cities
	//for (var x = 0; x < systems.length; x++) {
		for (var y = 0; y < planets.length; y++) {
			for (var z = 0; z < chance.integer({min: 1, max: 2}); z++) {//Where z <= City Development Level
				//Eventually make it so barren planets get less cities, terrans get more etc...
				cities.push(new City(y));
			}
		}
	//}
	
	//Create Locations
	//for (var x = 0; x < systems.length; x++) {
		//for (var y = 0; y < planets.length; y++) {
			for (var z = 0; z < cities.length; z++) {//Where z <= Planet Development Level
				for (var l = 0; l < chance.integer({min: 7, max: 10}); l++) {//Where z <= City Development Level
					//console.log("Creating new location in city " + z + " locationid " + locations.length);
					locations.push(new Location(locations.length, z));
				}
			}
		//}
	//}
	//Create Sectors
	
	//Create Organizations
	
	//Place Players at Random Locations
	for (var x = 0; x < players.length; x++) {//Where x <= Number of Players to spawn
		players[x].location = chance.integer({min: 0, max: locations.length-1});
		players[x].city = locations[players[x].location].city;
		players[x].planet = cities[locations[players[x].location].city].planet;
		players[x].system = planets[cities[locations[players[x].location].city].planet].system;
		locations[players[x].location].players.push(x);
	}
	
	//ITEMS
	var i;
	
	//Minerals
	i = new Item('mercadium', 'mineral');
	i.type = "mercadium";
	i.value = 2;
	item_types.push(i);
	i = new Item('torphyte', 'mineral');
	i.type = "torphyte";
	i.value = 4;
	item_types.push(i);
	i = new Item('zenophyte', 'mineral');
	i.type = "zenophyte";
	i.value = 8;
	item_types.push(i);
	i = new Item('cylocyte', 'mineral');
	i.type = "cylocyte";
	i.value = 16;
	item_types.push(i);
	i = new Item('psytanium', 'mineral');
	i.type = "psytanium";
	i.value = 32;
	item_types.push(i);
	i = new Item('ipsogen', 'mineral');
	i.type = "ipsogen";
	i.value = 64;
	item_types.push(i);
	i = new Item('zorphyte', 'mineral');
	i.type = "zorphyte";
	i.value = 128;
	item_types.push(i);
	i = new Item('nytonium', 'mineral');
	i.type = "nytonium";
	i.value = 256;
	item_types.push(i);
	
	//Clothes
	i = new Item('a beanie', 'wearable');
	i.is_wearable_head = true;
	item_types.push(i);
	i = new Item('a shirt', 'wearable');
	i.is_wearable_torso = true;
	item_types.push(i);
	i = new Item('pants', 'wearable');
	i.is_wearable_legs = true;
	item_types.push(i);
	i = new Item('a pair of boots', 'wearable');
	i.is_wearable_feet = true;
	item_types.push(i);
	
	//Let's put some clothes on these heathens
	//We are using items from items_types to instantiate these
	for (var p = 0; p < players.length; p++) {//Where p <= Number of Players to spawn
		items.push(item_types[8]);
		players[p].wearing_head = items.length-1;
		items.push(item_types[9]);
		players[p].wearing_torso = items.length-1;
		items.push(item_types[10]);
		players[p].wearing_legs = items.length-1;
		items.push(item_types[11]);
		players[p].wearing_feet = items.length-1;
	}
	
	//Blueprints
	i = new Item('basic factory', 'blueprint');
	//i.type = "basic factory";
	i.value = 10000;
	i.is_blueprint_original = true;
	i.setMineralCosts(10000, 7500, 5000, 2500, 1000, 500, 250, 100);
	item_types.push(i);
	
	//Testing Setup
	locations[players[0].location].player_owner = 0;//Give player ownership of current location for testing.
	items.push(item_types[12]);//factory blueprint
	players[0].inventory.push(items.length - 1);
	items.push(item_types[0]);
	items[items.length-1].quantity = 10000;
	locations[players[0].location].inventory.push(items.length-1);
	items.push(item_types[1]);
	items[items.length-1].quantity = 10000;
	locations[players[0].location].inventory.push(items.length-1);
	items.push(item_types[2]);
	items[items.length-1].quantity = 10000;
	locations[players[0].location].inventory.push(items.length-1);
	items.push(item_types[3]);
	items[items.length-1].quantity = 10000;
	locations[players[0].location].inventory.push(items.length-1);
	items.push(item_types[4]);
	items[items.length-1].quantity = 1000;
	locations[players[0].location].inventory.push(items.length-1);
	items.push(item_types[5]);
	items[items.length-1].quantity = 1000;
	locations[players[0].location].inventory.push(items.length-1);
	items.push(item_types[6]);
	items[items.length-1].quantity = 500;
	locations[players[0].location].inventory.push(items.length-1);
	items.push(item_types[7]);
	items[items.length-1].quantity = 100;
	locations[players[0].location].inventory.push(items.length-1);
	
	//End Testing Setup
	
	output("Big Bang finished...");
	
	update_display();
	update_navigation();
	
	output("Welcome to SubFaction version: Dysfunctional Prototype");
	look();
	state = 1;//Enter Name State
}