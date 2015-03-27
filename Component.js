jQuery.sap.declare("sap.ui.demo.splitapp.Component");

sap.ui.core.UIComponent.extend("sap.ui.demo.splitapp.Component", {

	metadata : {
		routing : {
			config : {
				viewType : "XML",
				viewPath : "view",
				targetControl : "splitApp",
				clearTarget : false,
				transition: "slide"
			},
			routes :[
				{
					pattern : "",
					name : "home-master",
					view : "CourseMaster",
					viewPath : "view",
					viewLevel : 1,
					targetAggregation : "masterPages",

					subroutes: [
      					{
       				pattern : "Courses/{viewId}",
       				name : "Course",
      			    view : "CourseDetail",
      				viewPath : "view",
       				viewLevel : 2,
       				targetAggregation : "detailPages"
      					}
      				]
				}
			] 
		}
	},

	/**
	 * !!! The steps in here are sequence dependent !!!
	 */
	init : function () {

		// 1. some very generic requires
		jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
		jQuery.sap.require("sap.ui.demo.splitapp.MyRouter");

		// 2. call overridden init (calls createContent)
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

		// 3a. monkey patch the router
		var router = this.getRouter();
		router.myNavBack = sap.ui.demo.splitapp.MyRouter.myNavBack;
		router.myNavToWithoutHash = sap.ui.demo.splitapp.MyRouter.myNavToWithoutHash;

		if (!sap.ui.Device.system.phone) {
			router.myNavToWithoutHash("view.Empty", "XML", false);
		}

		// 4. initialize the router
		this.routeHandler = new sap.m.routing.RouteMatchedHandler(router);
		router.initialize();
	},

	destroy : function () {
		if (this.routeHandler) {
			this.routeHandler.destroy();
		}

		// call overridden destroy
		sap.ui.core.UIComponent.prototype.destroy.apply(this, arguments);
	},

	createContent : function () {
		// create root view
		var oView = sap.ui.view({
			id : "app",
			viewName : "view.App",
			type : "JS",
			viewData : { component : this }
		});

		// set navigation model
		var i18nModel = new sap.ui.model.resource.ResourceModel({ bundleUrl : "i18n/messageBundle.properties" });
	    oView.setModel(i18nModel, "i18n");
		// load the global data model
		var oJSONDataModel = new sap.ui.model.json.JSONModel("model/data.json");
		oView.setModel(oJSONDataModel);

		// load the global image source model
		var oImgModel = new sap.ui.model.json.JSONModel("model/img.json");
		oView.setModel(oImgModel, "img");

		// done
		return oView;
	}
});