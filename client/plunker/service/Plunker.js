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

	sendFilesToPlunker: function(files) {
		var me = this;
		return this.getPunkerSession(files).then(function(sesid) {
			return me.uploadFilesToPlunker(sesid, files).then(function(data) {
				return 'https://plnkr.co/edit/'+data.id+'?p=preview';
			});
		});
	},
	getPunkerSession: function(files) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				crossDomain: true,
				async: true,
				type: 'GET',
				dataType: 'json',
				url: "https://api.plnkr.co/sessions",
				success: function(data) {
					resolve(data.id, files);
				},
				error: function(error) {
					reject(error);
				}
			});
		});
	},
	uploadFilesToPlunker: function(sessionid, files) {
		var oFiles = {};
		$.each(files, function(key, item) {
			oFiles[item.filename] = item;
		});
		var data = {
			description: "generated from webide",
			private:true,
			tags: [],
			files: oFiles
		};
		return new Promise(function(resolve, reject) {
			$.ajax({
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				type: 'POST',
				dataType: 'json',
				crossDomain: true,
				async: true,
				url: "https://api.plnkr.co/plunks?sessid=" + sessionid,
				data: JSON.stringify(data),
				success: function(result) {
					resolve(result);
				},
				error: function(error) {
					reject(error);
				}
			});
		});
	}
});