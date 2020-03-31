const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true, useUnifiedTopology: true });

// mongoose*****Built-in Validators*****

const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength:5,
        maxlength:20,
        //match:/regular_patteren/,
       // unique:true,
     },
    author: String,
    tags: [String],
    date: Date,
    category:{
        type:String,
        required:true,
        enum:['web','mobile','desktop'] // enum:['a','b'] :> find is'a' not a valid enum value
    },
    isPublished: Boolean,
    price: {
        type:Number,
        required: function(){return this.isPublished; } ,//not used arrow function
        min:10,
        max:100
        
    }
});
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name:'Node.js',
        author: 'Khalid2',
        tags: ['php', 'backend'],
        category:'aa',
        isPublished: true,
        price:10
    })
    try {
        // first approches:
        const result=await course.save();
        console.log('result check',result) 

        // second approches:
        //  await course.validate()
        //third approches custom validation:
        // course.validate(function (err) {
        //     if (err) handleError(err);
        //     else {
        //         // validation passed
        //     }
        // });

    }
    catch (err) {
        console.log(err.message);
    }

}
createCourse()


async function getCourses() {
    return await Course
        .find({ isPublished: true, tags: 'backend' })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 });
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

// run();