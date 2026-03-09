const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const MONGO_URI = 'mongodb+srv://yamunas172004_db_user:Admin%40123%23@cluster0.czx01yh.mongodb.net/instrument_hub?retryWrites=true&w=majority';

async function setAdminByEmail(email) {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI);
        console.log('Connected!');

        const user = await User.findOneAndUpdate(
            { email: email },
            { role: 'admin' },
            { new: true }
        );

        if (user) {
            console.log(`Success! User ${email} is now an admin.`);
            console.log('User details:', user);
        } else {
            console.log(`User with email ${email} not found.`);
            // List all users to help the user find the right one
            const allUsers = await User.find({}, 'email name role');
            console.log('Available users:');
            allUsers.forEach(u => console.log(`- ${u.email} (${u.role})`));
        }

        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
}

// You can change this email to the one you want to make admin
const emailToPromote = 'rajgilbert101@gmail.com';
setAdminByEmail(emailToPromote);
