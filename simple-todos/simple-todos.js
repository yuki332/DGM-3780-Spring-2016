if (Meteor.isClient) {
  Template.body.helpers({
    tasks: [
      { text: "this is task 1" },
      { text: "this is task 2" },
      { text: "this is task 3" },
    ]
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
