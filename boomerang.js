steal(
	"ontraport/components/component.js",
	"ontraport/components/collection/collection.js"
).then(
	"./builds/boomerang.js",
	function($) 
	{
		ontraport.Component.extend("ontraport.boomerang",
		/** @Static */
		{
			"defaults": {
				"instance": null,
				"counter": 0
			},
			
			"init": function()
			{
				this.defaults.instance = window.BOOMR;
				
				this.defaults.instance.subscribe("before_beacon", this.proxy(function(data)
				{
					var pa = ontraport.Models.PerformanceAudit.save({
						"data": JSON.stringify(data),
						"name": (new Date()).toString(),
						"counter": this.defaults.counter++
					}, this.proxy(function(data)
					{
						console.log("Posted data!", data);
					}));
					console.log("New Performance Audit Object", pa);
				}));
				
				this.defaults.instance.init({
					"autorun": false,
					"user_ip": "10.0.0.1",
					// "beacon_url": "/PerformanceMetric/beacon",
					"BW": {
						"base_url": "/js/boomerang/images/"
					}
				});
			},
			
			"finish": function()
			{
				this.defaults.instance.page_ready();
			},
			
			"report": function()
			{
				this.defaults.instance.sendBeacon();
			}
		},
		/** @Prototype */
		{});
	}
);