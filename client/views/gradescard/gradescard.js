/*
* Event Handling:
*/
Template.gradescard.events({
  "click .good-grades": function(event,template){
    var id = template.$(".sg-good").attr("class").split(" ")[0];
    if(template.$(".good-grades").attr("checked")){
      template.$(".sg-good").attr("class",id + " sg-good animated fadeInLeft");
    } else {
      template.$(".sg-good").attr("class",id + " sg-good animated fadeOutLeft");
    }
  },
  "click .best-grades": function(event,template){
    var id = template.$(".sg-excellent").attr('class').split(' ')[0];
    if(template.$(".best-grades").attr("checked")){
      template.$(".sg-excellent").attr("class",id + " sg-excellent animated fadeInLeft");
    } else {
      template.$(".sg-excellent").attr("class",id + " sg-excellent animated fadeOutLeft");
    }
  },
  "click .bad-grades": function(event,template){
    var id = template.$(".sg-bad").attr('class').split(' ')[0];
    if(template.$(".bad-grades").attr("checked")){
      template.$(".sg-bad").attr("class",id + " sg-bad animated fadeInLeft");
    } else {
      template.$(".sg-bad").attr("class",id + " sg-bad animated fadeOutLeft");
    }
  },
  "click .lazy-grades": function(event,template){
    var id = template.$(".sg-lazy").attr('class').split(' ')[0];
    if(template.$(".lazy-grades").attr("checked")){
      template.$(".sg-lazy").attr("class",id + " sg-lazy animated fadeInLeft");
    } else {
      template.$(".sg-lazy").attr("class",id + " sg-lazy animated fadeOutLeft");
    }
  },
  "click .regular-grades": function(event,template){
    var id = template.$(".sg-regular").attr('class').split(' ')[0];
    if(template.$(".regular-grades").attr("checked")){
      template.$(".sg-regular").attr("class",id + " sg-regular animated fadeInLeft");
    } else {
      template.$(".sg-regular").attr("class",id + " sg-regular animated fadeOutLeft");
    }
  },
  "click .student-grades": function(event,template){
    if(template.$(".student-grades").attr("checked")){
      template.$(".sg-this").attr("class","sg-this animated fadeIn");
    } else {
      template.$(".sg-this").attr("class","sg-this animated fadeOut");
    }
  },
  "click .gc-toggle": function(event,template) {
    var grades = {courses: Session.get("courses"), student: Session.get("student")};
    template.$(".gc-progress").fadeIn();
    template.$(".cc-nothing-message").text("Loading dataset...");
    Meteor.subscribe("grades", grades, function() {
      Session.set("gc-toggle",template.$(".gc-toggle").attr("checked"));
      template.$(".gc-progress").fadeOut();
      template.$(".cc-nothing-message").text("This Card is Turned Off");
    });
  },
  "change .gc-paper-slider": function(event,template) {
    var n = template.$(".gc-paper-slider").attr("value");
    Session.set("gc-compliance", n);
    if(n==5) template.$(".gradescard-paper").css("opacity","1");
    if(n==4) template.$(".gradescard-paper").css("opacity","0.85");
    if(n==3) template.$(".gradescard-paper").css("opacity","0.75");
    if(n==2) template.$(".gradescard-paper").css("opacity","0.65");
    if(n==1) template.$(".gradescard-paper").css("opacity","0.55");
    if(n==0) template.$(".gradescard-paper").css("opacity","0.45");
  },
  "click .card-info": function (event,template) {
    template.$(".help-info").css("display","flex");
  },
  "click .close-info": function (event,template) {
    template.$(".help-info").fadeOut("fast");
  },
  "click .help-info": function (event,template) {
    template.$(".help-info").fadeOut("fast");
  },
  "click": function(event,template){
    /*** Interaction Recorder ***/
    var self = this;
    var myEvent = event;
    Recorder.insert({
      "user": Meteor.connection._lastSessionId,
      "template": template.view.name,
      "target": $(event.target).first().attr('class'),
      "screenX": event.screenX,
      "screenY": event.screenY,
      "offsetX": event.offsetX,
      "offsetY": event.offsetY,
      "timestamp": new Date()
    });
  }
});

/*
*  Check for courses
*/
Template.registerHelper('isCourse',function(input){
  return Session.get("courses");
});

/*
* Render Data from helpers
*/
Template.gradescard.helpers({
  excellent: function () {
    var sc   = Grades.find({ grade: { $gte : "9", $lte : "10"} }).fetch();
    for (i = 0; i < sc.length; i++) {
      sc[i].gp           = "#25a085";
      sc[i].grade        = (((sc[i].grade - 4.5) * 350) / 5.45);
      sc[i].performance  = 200 - (sc[i].performance * 200);
    }
    return sc;
  },
  good: function () {
    var sc   = Grades.find({ grade: {$gte : "8", $lt : "9" }}).fetch();
    for (i = 0; i < sc.length; i++) {
      sc[i].gp          = "#27ae60";
      sc[i].grade       = (((sc[i].grade - 4.5) * 350) / 5.45);
      sc[i].performance  = 200 - (sc[i].performance * 200);
    }
    return sc;
  },
  regular: function () {
    var sc   = Grades.find({grade:{$gte:"7",$lt:"8"}}).fetch();
    for (i = 0; i < sc.length; i++) {
      sc[i].gp          = "#f0c30e";
      sc[i].grade       = (((sc[i].grade - 4.5) * 350) / 5.45);
      sc[i].performance  = 200 - (sc[i].performance * 200);
    }
    return sc;
  },
  lazy: function () {
    var sc   = Grades.find({ grade: {$gte:"6",$lt:"7"}}).fetch();
    for (i = 0; i < sc.length; i++) {
      sc[i].gp           = "#e67d22";
      sc[i].grade        = (((sc[i].grade - 4.5) * 350) / 5.45);
      sc[i].performance  = 200 - (sc[i].performance * 200);
    }
    return sc;
  },
  bad: function () {
    var sc   = Grades.find({grade: {$lt:"6"}}).fetch();
    for (i = 0; i < sc.length; i++) {
      sc[i].gp           = "#e74c3c";
      sc[i].grade        = (((sc[i].grade + 1) * 150) / 10);
      sc[i].performance  = 200 - (sc[i].performance * 200);
    }
    return sc;
  },
  thisStudent: function() {
    var sc = Students.findOne({});
    if(sc) {
      sc.gpa         = (((sc.gpa) * 356) / 10);
      sc.performance = 200 - (sc.performance * 200);
    }
    return sc;
  },
  isOn: function() {
    // $(".gc-toggle").attr("checked",Session.get("gc-toggle"));
    return Session.get("gc-toggle");
  },
  compliance: function() {
    return Session.get("gc-compliance");
  },
  sessionCourses: function() {
    var courses = Session.get("courses");
    var sc;
    if(courses) sc = Courses.find({"_id": {$in: courses }}).fetch();
    return sc;
  }
});

Template.gradescard.rendered = function () {
  Session.set("gc-toggle", true);
};
