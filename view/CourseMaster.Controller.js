sap.ui.controller("view.CourseMaster", {

  onInit: function(){
      this.router = sap.ui.core.UIComponent.getRouterFor(this);

 },

 coursesItemPress: function(oEvent){
  var context = oEvent.getSource().getBindingContext(),
   oCourse = context.oModel.getProperty(context.sPath);
   console.log(context);
   console.log(oCourse);
  this.router.navTo("course-detail", {
   viewId: oCourse.id
   
  });
 }
  

});