/*
*  Gets data from address bar using Iron-Router
*  Sets the session according this data.
*/
Router.route('/:_id', {
  data: function () {
    var courses;
    var student = Router.current().params._id;
    if(Router.current().params.query.c) courses = _.uniq(Router.current().params.query.c.split(','));
    Session.set('student', student);
    Session.set('courses', courses);
    Session.set("cc-compliance", 5);
    Session.set("gc-compliance", 5);
    Session.set("hc-compliance", 5);
    Session.set("hc-toggle", true);
    Session.set("gc-toggle", true);
    Session.set("cf-toggle", true);
    Session.set("sf-toggle", true);
    Session.set("sc-toggle", false);
    Session.set("data-from","1999");
    Session.set("data-to","2012");
    Session.set("studentdata","redo");
    Session.set("studentYear","all");
    if(courses) {
      Session.set("selected-course", courses[0]);
    } else {
      $(".loading-screen").remove();
    }
    /*
    * Handling suscriptions (Start)
    */
    Meteor.subscribe("this_student", student, function() {
      Meteor.subscribe("this_courses", courses, function(){
        Meteor.subscribe("studentgrades", Session.get("student"), function() {
          Meteor.subscribe("historial", function() {
            for (i = 0; i<courses.length; i++){
              Meteor.subscribe('sufficientgrades',courses[i], function(){});
              Meteor.subscribe('failuregrades',   courses[i], function(){});
              Meteor.subscribe('goodgrades',      courses[i], function(){});
              Meteor.subscribe('verygoodgrades',  courses[i], function(){});
              Meteor.subscribe('excellentgrades', courses[i], function(){});
              if($(".loading-screen")) $(".loading-screen").remove();
            }
          });
        });
      });
    });
    /*
    * Handling suscriptions (End)
    */
  }
});
