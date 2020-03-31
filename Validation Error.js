const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true, useUnifiedTopology: true });

// mongoose*****Validation Error*****
//Validation Error control for in loop

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20,

    },
    author: String,
    tags: {
        type: Array,
        validate: (value) => new Promise((resolve, reject) => {
            setTimeout(() => {
                const result = value && value.length > 0;
                if (result) {
                    resolve();
                } else {
                    reject(new Error('A course should have at least one tag.'));
                }
            }, 1000);
        })
    },
    date: Date,
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'desktop']
    },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublished; },
        min: 10,
        max: 100

    }
});
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Node.js',
        author: 'Khalid2',
        tags: null,
        category: '-',
        isPublished: true,
        price: 10
    })
    try {

        const result = await course.save();
        console.log('result check', result)

    }
    catch (err) {
        //these appoarches error in sample line by line .
        //why we use for in loop because return object .

        for (let field in err.errors) {
            console.log(err.errors[field].message)
        }
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