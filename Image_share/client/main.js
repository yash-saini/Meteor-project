import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor'
import './main.html';

Images= new Mongo.Collection("images");
console.log(Images.find().count());

if (Meteor.isClient){
Accounts.ui.config({ passwordSignupFields: "USERNAME_AND_EMAIL"});

Template.images.helpers({
images:function(){ 
if (Session.get("userFilter")){ return Images.find({createdBy:Session.get("userFilter")});}
else {
return Images.find({});
}},
filtering_images: function(){ if (Session.get("userFilter")){ return true;}
 else {return false;}
},


getFilterUser:function(){ if (Session.get("userFilter")){ var user=Meteor.users.findOne({_id:Session.get("userfilter")});
return user.username;}
else {
return false;
}},


getUser: function(user_id){

var user= Meteor.users.findOne({_id:user_id});
if (user){return user.username;}
else { return "anoymous";}
}});

Template.body.helpers({username:function(){
if (Meteor.user()){ return Meteor.user().username;
//return Meteor.user().emails[0].address;
}
else {return"anonymous user";}
}});


//Template.images.helpers({images:img_data});
Template.images.helpers({images:Images.find()});


Template.images.events({'click .js-image':function(event){  
alert("helooo")}});
Template.images.events({'click .js-del-image':function(event){  
var image_id=this._id;
console.log(image_id);
$("#"+image_id).hide('slow',function(){
Images.remove({"_id":image_id});
})  

},
'click .js-rate-image':function(event){ 
//var rating =$(event.currentTarget).data("userrating");
//console.log(rating);
//var image_id =this.id;
//console.log(image_id);

//Images.update({_id:image_id}, {$set:{rating:rating}});

}, 


'click .js-show-image-form':function(event){ $('#image_add_form').modal('show');
},
'click .js-set-image-filter':function(event){
Session.set("userFilter",this.createdBy);},

'click .js-unset-image-filter':function(event){
Session.set("userFilter",undefined);}

});

Template.image_add_form.events({ 'submit .js-add-image': function(events)
{
var img_src,img_alt;
img_src= event.target.img_src.value;
img_alt= event.target.img_alt.value;
console.log("src: "+img_src+"alt:" + img_alt);
if(Meteor.user()){
Images.insert({ img_src: img_src, img_alt:img_alt, createdBy: Meteor.user()._id});
}
return false;

}});
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
