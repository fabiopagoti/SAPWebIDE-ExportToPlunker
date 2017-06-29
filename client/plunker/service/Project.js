/**
 * A service implementation sample for displaying a greeting notification and counting the number of alerts displayed.
 * 
 * The service provides a public API which is defined in its interface (in this example, Sample.json file) 
 * and can be used by other plugins.   
 * 
 * Every method call on a service is asynchronous and returns a Q-promise.
 * If not done explicitly by the method, the return value is automatically wrapped with a promise object.
 * 
 * Other services (which are required by this service plugin, as defined in the plugin.json file) can be accessed 
 * using 'this.context.service' property.
 * 
 * A service can fire events that are defined in its interface. These events can be handled by any other service.
 * 
 * A service can also handle events from any other service (including its own).
 * The events subscription along with the handler methods must be defined in the plugin.json file.
 * 
 */
define({
	regex : /src=["]+[\W\w\d\s]*\/resources\/sap-ui-core.js"/g,
	getSelectedProjectFiles: function() {
		var me = this;
		return this.context.service.selection.getSelection().then(function(aSelection) { // get project content
			if (aSelection && aSelection.length !== 0 && aSelection[0]) {
				return aSelection[0].document.getProject().then(function(project) {
					return me.getProjectFiles(project);
				});
			}
		});
	},
	hasWebApp: function() {
		var me = this;
		return this.context.service.selection.getSelection().then(function(aSelection) { // get project content
			if (aSelection && aSelection.length !== 0 && aSelection[0]) {
				return aSelection[0].document.getProject().then(function(project) {
					return me.hasWebAppFolder(project);
				});
			}
		});
	},
	getProjectFiles: function(folder) {
		var me = this;
		var folders = [];
		return folder.getFolderContent().then(function(content) {
			var filesContent = [];
			var aContent = [];
			for (var i = 0; i < content.length; i++) {
				var item = content[i];
				if (item.getType() === "folder") {
					//repeat
					folders.push(me.getProjectFiles(item)); //item.getFolderContent());
					//me.getFiles(item,callback);
				} else {
					var entity = item.getEntity();
					if (entity.getFullPath().toUpperCase().indexOf('WEBAPP') >= 0 &&
						entity.getName().toUpperCase().indexOf('.JPG') === -1 &&
						entity.getName().toUpperCase().indexOf('.JPEG') === -1 &&
						entity.getName().toUpperCase().indexOf('.PNG') === -1 &&
						entity.getName().toUpperCase().indexOf('.ICO') === -1 &&
						entity.getName().toUpperCase().indexOf('.ICON') === -1) {
						var file = {};
						file.filename = entity.getParentPath() + "/" + entity.getName();
						file.filename = file.filename.substr(file.filename.toUpperCase().indexOf("WEBAPP") + 7);
						filesContent.push(file);
						aContent.push(item.getContent());
					}
				}
			}
			return Promise.all(aContent).then(function(contents) {
				for (var j = 0; j < contents.length; j++) {
					
					if (filesContent[j].filename.toUpperCase().indexOf("INDEX") > -1) {
						try{
							contents[j] = contents[j].replace(me.regex, 'src="https://sapui5.hana.ondemand.com/resources/sap-ui-core.js"');
						}catch(ex){
							
						}
						//contents[j] = contents[j].replace("../../", "https://sapui5.hana.ondemand.com/");
					}
					filesContent[j].content = contents[j];
				}
				if (folders && folders.length > 0) {
					return Promise.all(folders).then(function(values) {
						values.push(filesContent);
						var aFiles = [].concat.apply([], values);
						return aFiles;
					});
				} else {
					return filesContent;
				}
			});
		});
	},

	hasWebAppFolder: function(folder) {
		var me = this;
		return folder.getFolderContent().then(function(content) {
			var folders = [];
			var webapp = false;
			for (var i = 0; i < content.length; i++) {
				var item = content[i];
				if (item.getType() === "folder") {
					//repeat
					var entity = item.getEntity();
					if (entity.getFullPath().toUpperCase().indexOf('WEBAPP') >= 0) {
						webapp = true;
					} else {
						folders.push(me.hasWebAppFolder(item));
					}
				}
			}
			if (webapp) {
				return webapp;
			} else if (folders && folders.length > 0) {
				return Promise.all(folders).then(function(values) {
					for (var j = 0; j < values.length; j++) {
						if (values[j]) {
							return true;
						}
					}
					return false;
				});
			} else {
				return webapp;
			}

		});
	}
});