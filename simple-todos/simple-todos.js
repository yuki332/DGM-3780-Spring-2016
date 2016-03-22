Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
    Template.body.helpers({
        tasks: function() {
            if(Session.get("hideCompleted")){
                return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
            }else{
                return Tasks.find({}, {sort: {createdAt: -1}});
            }
        },
        hideCompleted: function(){
            return Session.get("hideCompleted");
        },
        incompleteCount: function(){
            return Tasks.find({checked: {$ne: true}}).count();
        }
    // tasks: [
    //   { text: "this is task 1" },
    //   { text: "this is task 2" },
    //   { text: "this is task 3" },
    // ]
    });

    Template.body.events({
        "submit .new-task": function(event){
            event.preventDefault();

            var text = event.target.text.value;

            Tasks.insert({
                text: text,
                createdAt: new Date(),
                owner: Meteor.userId(),           username: Meteor.user().username
            });

            event.target.text.value = "";
        },
        "change .hide-completed input": function(event){
            Session.set("hideCompleted", event.target.checked);
        }
    });

    Template.task.events({
        "click .toggle-checked": function(){
            Tasks.update(this._id, {
                $set: {checked: ! this.checked}
            });
        },
        "click .delete": function(){
            Tasks.remove(this._id);
        }
    });

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });
}

// if (Meteor.isClient) {
//   // counter starts at 0
//   Session.setDefault('counter', 0);
//
//   Template.hello.helpers({
//     counter: function () {
//       return Session.get('counter');
//     }
//   });
//
//   Template.hello.events({
//     'click button': function () {
//       // increment the counter when button is clicked
//       Session.set('counter', Session.get('counter') + 1);
//     }
//   });
// }
//
// if (Meteor.isServer) {
//   Meteor.startup(function () {
//     // code to run on server at startup
//   });
// }
