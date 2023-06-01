import mongoose from 'mongoose';


// Connect to MongoDB
mongoose.connect('mongodb+srv://tristanlgb:holass12@cluster0.ttwijc2.mongodb.net/eshop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB', error);
});


const createUser = async () => {
  try {
    const newUser = new userModel({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      age: 25,
      password: 'password123',
    });
  
    const savedUser = await newUser.save();
    console.log('User created:', savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

const getUsers = async () => {
  try {
    const users = await userModel.find();
    console.log('Users:', users);
  } catch (error) {
    console.error('Error getting users:', error);
  }
};

const updateUser = async (userId) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(userId, {
      age: 26,
    }, { new: true });
    console.log('User updated:', updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

const deleteUser = async (userId) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(userId);
    console.log('User deleted:', deletedUser);
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

createUser();
getUsers();
updateUser('adminCoder@coder.com');
deleteUser('adminCoder@coder.com');
