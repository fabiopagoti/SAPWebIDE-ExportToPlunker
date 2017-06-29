/**
 * A command sample for calling the 'sample' service.
 * 
 * The command is added to the menu bar at 'Tools->Sample->Hello World' as defined in the plugin.json file.
 */
define({
	execute: function(url) {
		window.open(url);            
		
	},

	isAvailable: function() {
		return true;
	},

	isEnabled: function() {
		return true;
	}
});