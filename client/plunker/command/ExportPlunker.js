/**
 * A command sample for calling the 'sample' service.
 * 
 * The command is added to the menu bar at 'Tools->Sample->Hello World' as defined in the plugin.json file.
 */
define({
	execute: function() {
		var me = this;
		return this.context.service.project.getSelectedProjectFiles().then(function(allFiles){
			return me.context.service.plunker.sendFilesToPlunker(allFiles).then(function(url){
				return me.context.service.message.showMessage(url);
			});
		})  ;            
		
	},

	isAvailable: function() {
		return true;
	},

	isEnabled: function() {
		return this.context.service.project.hasWebApp();
	}
});