import { Meteor } from 'meteor/meteor';

Images= new Mongo.Collection("images");
console.log(Images.find().count());


Meteor.startup(() => {
  // code to run on server at startup
        if(Images.find().count()==0)
        {
            for (var i=1;i<6;i++)
            {
               Images.insert(
               {img_src: "img_"+i+".jpg",
               img_alt: "image_number"+i
               }
              );
             }  
         console.log(Images.find().count());
         }
     });
