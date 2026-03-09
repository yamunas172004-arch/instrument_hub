const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://yamunas172004_db_user:Admin%40123%23@cluster0.czx01yh.mongodb.net/instrument_hub?retryWrites=true&w=majority';

async function listUsers() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        const User = mongoose.model('User', new mongoose.Schema({
            email: String,
            role: String,
            name: String
        }));

        const users = await User.find({}, 'email role name');
        console.log('--- Current Users ---');
        users.forEach(u => console.log(`${u._id}: ${u.email} [${u.role}] - ${u.name}`));
        console.log('--- End of list ---');

        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
    }
}

listUsers();
