import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

if (Meteor.isClient){
var img_data=[{
img_src: "tibet.jpg",
img_alt: "Let us free tibet from oppression of the Chinese"
},
{
img_src: "balochistan.jpg",
img_alt: "Let us free balochistan from oppression of the Pakis"
},{
img_src: "balochistan1.jpg",
img_alt: "Let us free balochistan from oppression of the Pakis"
},{
img_src: "balochistan2.jpg",
img_alt: "Let us free balochistan from oppression of the Pakis"
}

];
Template.images.helpers({images:img_data});
Template.images.events({'click .js-image':function(event){  
alert("helooo")}});

console.log("I am a client");
}

if (Meteor.isServer){
console.log("I am a server");
}


Template.images.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.images.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.images.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
