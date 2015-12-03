Template.riskwidget.helpers({
  risk: function() {
    var risk = Math.round(Session.get("riskValue")*100);
    return parseInt(risk) || 0;
  },
  riskText: function() {
    var risk = Session.get("riskValue");
    var text;
    if (risk >= 0.0) text = "Very Hard";
    if (risk >= 0.2) text = "Hardwork";
    if (risk >= 0.4) text = "Regular";
    if (risk >= 0.6) text = "Easy";
    if (risk >= 0.8) text = "Very Easy";
    return text;
  },
  riskColor: function() {
    var risk = Session.get("riskValue");
    if (risk >= 0.0) $("#svgCircle").css("stroke","#e74c3c");
    if (risk >= 0.2) $("#svgCircle").css("stroke","#e67e22");
    if (risk >= 0.4) $("#svgCircle").css("stroke","#f1c40f");
    if (risk >= 0.6) $("#svgCircle").css("stroke","#27ae60");
    if (risk >= 0.8) $("#svgCircle").css("stroke","#25a085");
    return risk;
  },
  riskKnob: function() {
    var risk = Session.get("riskValue");
    return (Math.round(Session.get("riskValue")*100) * 2)-12;
  }
});

Template.riskwidget.events({
  "click .risk-info": function (event,template) {
    template.$(".help-info").css("display","flex");
  },
  "click .close-info": function (event,template) {
    template.$(".help-info").fadeOut();
  }
});

Template.riskwidget.rendered = function () {
  setTimeout(function() {
    var risk = Session.get("riskValue");
    if (risk >= 0.0) $("#svgCircle").css("stroke","#e74c3c");
    if (risk >= 0.2) $("#svgCircle").css("stroke","#e67e22");
    if (risk >= 0.4) $("#svgCircle").css("stroke","#f1c40f");
    if (risk >= 0.6) $("#svgCircle").css("stroke","#27ae60");
    if (risk >= 0.8) $("#svgCircle").css("stroke","#25a085");
  },1300);
};
