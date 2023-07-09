const bcrypt = require('bcrypt');
const db = require('../config/connection')
const { User, Post } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');


db.once('open', async () => {
	//delete all existing documents
	await User.deleteMany({})
	await Post.deleteMany({});


	// Hash passwords - "belt and suspenders" approach hash is seed and model 
	const hashedUserData = userData.map(user => ({
		...user,
		password: bcrypt.hashSync(user.password, 10),
	}));

	//seed User
	const users = await User.insertMany(hashedUserData);
	console.log('Usernames:', users.map(user => user.username));
	console.log('Poster username:', postData.map(post => post.postAuthor));

	// Seed posts and associate them with users
	const posts = await Post.insertMany(postData.map(post => ({
		...post,
		author: users.find(user => user.username === post.postAuthor)._id
	})));

	// Map post titles to their IDs for easy reference
	const postTitleToIdMap = {};
	posts.forEach(post => {
		postTitleToIdMap[post.postTitle] = post._id;
	});

	console.log('Database seeded!');
	process.exit(0);
})

//trying to test heroku