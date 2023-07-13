require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		await mongoose.connect('mongodb://127.0.0.1:27017/BrainSync'|| process.env.MONGO_URL , {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connected to MongoDB Atlas');
	} catch (error) {
		console.error('Error connecting to MongoDB', error);
	}
};

module.exports = connectDB;

//change 