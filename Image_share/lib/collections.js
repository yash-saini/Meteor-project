Images= new Mongo.Collection("images");

Images.allow({
insert:function(userId,doc){console.log("testing security on colections");
if (Meteor.user()){console.log(doc);
if (doc.createdBy!=userId;){return false;}
else {return true;}
}
else {return false;}
},
remove:function(userId,doc){return true; } 
})