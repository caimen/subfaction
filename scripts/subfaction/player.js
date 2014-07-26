function Player(id) {
	this.id = id;
    this.first_name = generate_name("male_first_name");
    this.last_name = generate_name("male_last_name");
	this.name = this.first_name + " " + this.last_name;
	this.gender = chance.gender();
	this.inventory = [];
	this.wearing_head = undefined;
	this.wearing_neck = undefined;
	this.wearing_waist = undefined;
	this.wearing_torso = undefined;
	this.wearing_legs = undefined;
	this.wearing_feet = undefined;
	this.wearing_hands = undefined;
	this.holding_left = undefined;
	this.holding_right = undefined;
	this.location = 0;
	this.city = 0;
	this.planet = 0;
	this.system = 0;
	this.credits = chance.integer({min: 0, max: 1000000000});
	this.relationship = chance.integer({min: -200, max: 200});
	this.married = 0;//Points to another player if married, if not = 0
	//Nationalist are much more likely to revolt and plot against perceived occupiers.  Pacifists are much more likely to peacefully protest.
	this.nationalist_pacifist = chance.integer({min: -10, max: 10});//-10 Extreme Nationalist, + 10 Extreme Pacifist, 0 Indifferent
	this.communist_capitalist = chance.integer({min: -10, max: 10});//-10 Extreme Communist, + 10 Extreme Capitalist, 0 Indifferent
	this.fascist_republican = chance.integer({min: -10, max: 10});//-10 Extreme Fascist, + 10 Extreme Republican, 0 Indifferent
	
	//Social Flags
	this.friendly = chance.bool({likelihood: 30});
	this.outgoing = chance.bool({likelihood: 10});//Talks more than they should
	this.unfriendly = chance.bool({likelihood: 10});
	this.charismatic = chance.bool({likelihood: 10});
	this.miscreant = chance.bool({likelihood: 10});
	this.vagabond = chance.bool({likelihood: 10});
	this.loyal = chance.bool({likelihood: 10});//This person is loyal to any character with over 150 relationship
	
	//Tasks - A Player may only be performing one task, dictating what UI is used.  Certain tasks such as attacking will interrupt other tasks.
	this.talking_to = 0;//Who you are currently talking to
	this.is_travelling = false;
	this.is_travelling_in_space = false;
	this.is_travel_tick = 0;//What tick we are currently on
	this.is_travel_start_tick = 0;//What tick we started on
	
	//AI
	this.behavior = chance.pick(["business", "politics"]);//Overall Primary Objective in Life
	
	//Ease of Use Functions
	this.is_mobile = function() {
		if (this.id != 0) {
			return true;
		}
		return false;
	}
	
	if (console_debug_verbose) {
		console.log("Created new player " + this.gender + " " + this.first_name + " " + this.last_name + " with " + this.credits + " Credits");
	}
	
	this.isFemale = function() { if (p.gender == "Female") { return true; } return false; }
	this.isMale = function() { if (p.gender == "Male") { return true; } return false; }
	this.locationString = function() { return locations[this.location].building; }
	this.cityString = function() { return cities[this.city].name; }
	this.planetString = function() { return planets[this.planet].name; }
	this.systemString = function() { return systems[this.system].name; }
	this.travel = function (locationID) { return; }
	this.fulllocationString = function() { return this.locationString() + ", City of " + this.cityString() + ", " + this.planetString() + " Planet, " + this.systemString() + " System"; };
	this.travel = function(location_id) {
		if (this.location == players[0].location) {
			output(this.name + " has walked out of the room.");
		}
		//Remove from players location array
		var i = jQuery.inArray(this.location, locations.players);
		locations[this.location].players.splice(i, 1);
		
		this.location = location_id;
		
		locations[this.location].players.push(this.id);
		
		if (players[0].location == this.location) {
			output(this.name + " has walked into the room");
		}
	}
	this.AI = function() {
		if (this.is_mobile()) {
			if (chance.bool({likelihood: 5})) {
				var travellocation = chance.pick(cities[this.city].locations);
				if  (travellocation != this.location) {
					this.travel(travellocation);
				}
			}
			//console.log(cities[this.city].locations);
		}
	}
	this.talk = function(topic) {
		var speak = "";
		
		players[0].talking_to = this.id;
		
		$("#talk_name").html("");
		$("#talk_options").html("");
		$("#talk_console").html("");
		
		$("#talk_name").append(players[players[0].talking_to].name);
		//Topics
		$("#talk_options").append("<a href=\"javascript:talk_output(players[players[0].talking_to].talk(\'politics_general\'))\">Politics</a><br />");
		
		//UI ready
		$("#talk_dialog").dialog({ minWidth: 500 });
		
		if (topic == "greeting") {
			speak += chance.pick([
				"Greetings, how are you today?",
				"Hello",
				"How can I help you?"
			]);
		}
		if (topic == "politics_general") {
			
			if (this.fascist_republican > 7) { speak += "I'm a hardcore Republican and I would be willing to die for the cause. "; }
			else if (this.fascist_republican > 3) { speak += "I'm a Republican. "; }
			else if (this.fascist_republican < -7) { speak += "I'm a hardcore Fascist and I would be willing to die for the cause. "; }
			else if (this.fascist_republican < -3) { speak += "I'm a Fascist. "; }
			
			if (this.communist_capitalist > 7) { speak += "I'm a hardcore Capitalist and I would be willing to die for the cause. "; }
			else if (this.communist_capitalist > 3) { speak += "I'm a Capitalist. "; }
			else if (this.communist_capitalist < -7) { speak += "I'm a hardcore Communist and I would be willing to die for the cause. "; }
			else if (this.communist_capitalist < -3) { speak += "I'm a Communist. "; }
			
			if (this.communist_capitalist < 3 && this.fascisct_republican < 3) { speak += "I'm fairly indifferent about politics."; }
			
			if (this.fascist_republican < 3 && this.fascist_republican > -3 && this.communist_capitalist < 3 && this.communist_capitalist > -3) 
			{  speak += "I am completely indifferent to politics, let's talk about something else. "; }
		}
		return speak;
	}
}