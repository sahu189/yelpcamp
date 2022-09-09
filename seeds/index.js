const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const randimg=Math.floor(Math.random()*47);
        const randimg1=Math.floor(Math.random()*47);
        const randimg2=Math.floor(Math.random()*47);
        const camp = new Campground({
            //YOUR USER ID
            author: '6315f6ce33fb6f070e64ea7e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            images: [
                {
                    url: `https://res.cloudinary.com/dfgv4kake/image/upload/v1662470132/YelpCamp/img${randimg}.jpg`,
                    filename: `YelpCamp/img${randimg}`
                },
                {
                    url: `https://res.cloudinary.com/dfgv4kake/image/upload/v1662470132/YelpCamp/img${randimg1}.jpg`,
                    filename: `YelpCamp/img${randimg1}`
                },{
                    url: `https://res.cloudinary.com/dfgv4kake/image/upload/v1662470132/YelpCamp/img${randimg2}.jpg`,
                    filename: `YelpCamp/img${randimg2}`
                },
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})