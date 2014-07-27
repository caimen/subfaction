//Genesis - Let there be some light, but mostly darkness.  We are creating the universe here in case you didn't notice.
function genesis() {
	output("Generating Big Bang...");
	output("Let there be some light, but mostly darkness. - Caimen");
	
    game = Object();
    game.state = 0;
    game.input = "";
    game.tick = 0;
	
	$('#progressbar').progressbar({value: 15});
	$("#loading_text").html("Spawning Mobs...");
	//Create players
	for (var x = 0; x < 5000; x++) {//Where x <= Number of Players to spawn
		players[x] = new Player(x);
	}
	$('#progressbar').progressbar({value: 20});
	$("#loading_text").html("Spawning Solar Systems...");
	//Create systems
	for (var x = 0; x < 10; x++) {//Where x <= Number of Systems to spawn
		systems[x] = new System();
	}
	$('#progressbar').progressbar({value: 30});
	$("#loading_text").html("Spawning Planets...");
	//Create planets
	for (var x = 0; x < systems.length; x++) {
		for (var y = 0; y < chance.integer({min: 4, max: 15}); y++) {
			planets.push(new Planet(systems[x].name + " " + formatRoman(y+1), x));
			systems[x].planets.push(planets.length - 1);
		}
	}
	$('#progressbar').progressbar({value: 40});
	$("#loading_text").html("Spawning Cities...");
	for (var y = 0; y < planets.length; y++) {
		for (var z = 0; z < chance.integer({min: 7, max: 15}); z++) {//Where z <= City Development Level
			//Eventually make it so barren planets get less cities, terrans get more etc...
			cities.push(new City(y));
		}
	}
	$('#progressbar').progressbar({value: 55});
	$("#loading_text").html("Spawning Locations...");
	//Create Locations
	for (var z = 0; z < cities.length; z++) {//Where z <= Planet Development Level
		for (var l = 0; l < chance.integer({min: 20, max: 50}); l++) {//Where z <= City Development Level
			//console.log("Creating new location in city " + z + " locationid " + locations.length);
			locations.push(new Location(locations.length, z));
		}
	}
	//Create Sectors
	
	//Create Organizations
	
	$('#progressbar').progressbar({value: 75});
	$("#loading_text").html("Placing Mobs...");
	//Place Players at Random Locations
	for (var x = 0; x < players.length; x++) {//Where x <= Number of Players to spawn
		players[x].location = chance.integer({min: 0, max: locations.length-1});
		players[x].city = locations[players[x].location].city;
		players[x].planet = cities[locations[players[x].location].city].planet;
		players[x].system = planets[cities[locations[players[x].location].city].planet].system;
		locations[players[x].location].players.push(x);
	}
	
	$('#progressbar').progressbar({value: 85});
	$("#loading_text").html("Creating Items...");
	//ITEMS
	var i;
	
	//Minerals
	i = new Item(item_types.length, 'mercadium', 'mineral');
	i.value = 2;
	i.description = "Mercadium is the most plentiful mineral in the universe and is the base metal needed for many forms of production.";
	i.image = images.length;
	images.push(new Image('http://commons.wikimedia.org/wiki/File%3APyriteespagne.jpg', 'http://upload.wikimedia.org/wikipedia/commons/0/04/Pyriteespagne.jpg', 'By DidierDescouens (Own work) [GFDL (http://www.gnu.org/copyleft/fdl.html) or CC-BY-SA-3.0-2.5-2.0-1.0 (http://creativecommons.org/licenses/by-sa/3.0)], via Wikimedia Commons'));	
	item_types.push(i);
	i = new Item(item_types.length, 'torphyte', 'mineral');
	i.value = 4;
	i.description = "Torphyte is a plentiful mineral which is a primary component needed for electrical circuit boards and other electrical systems.";
	i.image = images.length;
	images.push(new Image('http://commons.wikimedia.org/wiki/File%3AChalcanthitefranceII.jpg', 'http://upload.wikimedia.org/wikipedia/commons/9/94/ChalcanthitefranceII.jpg', 'By Didier Descouens (Own work) [CC-BY-3.0 (http://creativecommons.org/licenses/by/3.0)], via Wikimedia Commons'));	
	item_types.push(i);
	i = new Item(item_types.length, 'zenophyte', 'mineral');
	i.description = "A somewhat plentiful mineral capable of withstanding extremely high temperatures.  Useful in ships";
	i.image = images.length;
	images.push(new Image('http://commons.wikimedia.org/wiki/File%3AAlurgite_St_Marcel.jpg', 'http://upload.wikimedia.org/wikipedia/commons/2/29/Alurgite_St_Marcel.jpg', 'By Didier Descouens (Own work) [CC-BY-3.0 (http://creativecommons.org/licenses/by/3.0)], via Wikimedia Commons'));	
	i.value = 8;
	item_types.push(i);
	i = new Item(item_types.length, 'cylocyte', 'mineral');
	i.value = 16;
	item_types.push(i);
	i = new Item(item_types.length, 'psytanium', 'mineral');
	i.value = 32;
	item_types.push(i);
	i = new Item(item_types.length, 'ipsogen', 'mineral');
	i.value = 64;
	item_types.push(i);
	i = new Item(item_types.length, 'zorphyte', 'mineral');
	i.value = 128;
	item_types.push(i);
	i = new Item(item_types.length, 'nytonium', 'mineral');
	i.value = 256;
	item_types.push(i);
	
	//Clothes	
	i = new Item(item_types.length, 'a beanie', 'wearable');
	i.is_wearable_head = true;
	i.image = images.length
	item_types.push(i);
	i = new Item(item_types.length, 'a shirt', 'wearable');
	i.is_wearable_torso = true;
	i.image = images.length;
	item_types.push(i);
	i = new Item(item_types.length, 'pants', 'wearable');
	i.is_wearable_legs = true;
	i.image = images.length;
	item_types.push(i);
	i = new Item(item_types.length, 'a pair of boots', 'wearable');
	i.is_wearable_feet = true;
	i.image = images.length;
	item_types.push(i);	
	images.push(new Image('http://commons.wikimedia.org/wiki/File%3AGnome-preferences-desktop-theme.svg', 'http://upload.wikimedia.org/wikipedia/commons/c/ca/Gnome-preferences-desktop-theme.svg', 'By GNOME icon artists (GNOME download / GNOME FTP) [GPL (http://www.gnu.org/licenses/gpl.html)], via Wikimedia Commons'));	
	
	//Let's put some clothes on these heathens
	//We are using items from items_types to instantiate these
	for (var p = 0; p < players.length; p++) {//Where p <= Number of Players to spawn
		var hat = jQuery.extend({},item_types[8]);
		players[p].wearing_head = items.length;
		hat.id = items.length;
		items.push(hat);
		var shirt = jQuery.extend({},item_types[9]);
		players[p].wearing_torso = items.length;
		shirt.id = items.length;
		items.push(shirt);
		var pants = jQuery.extend({},item_types[10]);
		players[p].wearing_legs = items.length;
		pants.id = items.length;
		items.push(pants);
		var boots = jQuery.extend({},item_types[11]);
		players[p].wearing_feet = items.length;
		boots.id = items.length;
		items.push(boots);
	}
	
	//Blueprints
	i = new Item(item_types.length, 'basic factory', 'blueprint');
	i.image = images.length;
	images.push(new Image('http://commons.wikimedia.org/wiki/File%3APolytechnic.svg', 'http://upload.wikimedia.org/wikipedia/commons/d/da/Polytechnic.svg', 'By Μηχανικός1 (Own work) [CC-BY-SA-3.0 (http://creativecommons.org/licenses/by-sa/3.0)], via Wikimedia Commons'));	
	i.value = 10000;
	i.is_original = true;
	i.ticks = 20;
	i.setMineralCosts(10000, 7500, 5000, 2500, 1000, 500, 250, 100);
	item_types.push(i);
	
	//Testing Setup
	locations[players[0].location].player_owner = 0;//Give player ownership of current location for testing.
	var factoryblueprint = jQuery.extend({},item_types[12]);
	factoryblueprint.id = items.length;
	players[0].inventory.push(items.length);
	items.push(factoryblueprint);	
	
	//Give player's location a bunch of minerals
	var mineral0 = jQuery.extend({},item_types[0]);
	mineral0.quantity = 10000;
	mineral0.id = items.length;
	locations[players[0].location].inventory.push(mineral0.id);
	items.push(mineral0);
	var mineral1 = jQuery.extend({},item_types[1]);
	mineral1.quantity = 10000;
	mineral1.id = items.length;
	locations[players[0].location].inventory.push(mineral1.id);
	items.push(mineral1);
	var mineral2 = jQuery.extend({},item_types[2]);
	mineral2.quantity = 10000;
	mineral2.id = items.length;
	locations[players[0].location].inventory.push(mineral2.id);
	items.push(mineral2);
	var mineral3 = jQuery.extend({},item_types[3]);
	mineral3.quantity = 10000;
	mineral3.id = items.length;
	locations[players[0].location].inventory.push(mineral3.id);
	items.push(mineral3);
	var mineral4 = jQuery.extend({},item_types[4]);
	mineral4.quantity = 1000;
	mineral4.id = items.length;
	locations[players[0].location].inventory.push(mineral4.id);
	items.push(mineral4);
	var mineral5 = jQuery.extend({},item_types[5]);
	mineral5.quantity = 1000;
	mineral5.id = items.length;
	locations[players[0].location].inventory.push(mineral5.id);
	items.push(mineral5);
	var mineral6 = jQuery.extend({},item_types[6]);
	mineral6.quantity = 500;
	mineral6.id = items.length;
	locations[players[0].location].inventory.push(mineral6.id);
	items.push(mineral6);
	var mineral7 = jQuery.extend({},item_types[7]);
	mineral7.quantity = 100;
	mineral7.id = items.length;
	locations[players[0].location].inventory.push(mineral7.id);
	items.push(mineral7);
	
	//End Testing Setup
	
	output("Big Bang finished...");
	
	$('#progressbar').progressbar({value: 100});
	$("#loading_text").html("Updating UI...");
	
	update_display();
	update_navigation();
	
	output ("UI finished...");
	
	output("Welcome to SubFaction version: Dysfunctional Prototype");
	look();
	state = 1;//Enter Name State
	
	$("#loading").css("display", "none");
}