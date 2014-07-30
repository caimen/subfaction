function War(id, name, starting_tick) {
	this.id = id;
	this.name = name;
	this.belligerent_attackers = [];//First value is war leader
	this.belligerent_defenders = [];//First value is war leader
	this.casus_belli = "";
	this.starting_tick = undefined;
	this.ending_tick = undefined;
}