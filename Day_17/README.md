### Problem 17: Mongoose Schema and Model
 
**Problem Statement:**
Define a Mongoose schema for a "User" with properties: "username" (string) and "email" (string). Create a Mongoose model for the User schema. Implement a function to add a new user to the MongoDB database.
 
**Function Signature:**
```javascript
/**
* Adds a new user to the MongoDB database
* @param {Object} user - User object with properties username and email
*/
function addUserToDatabase(user) {
  // Your implementation here
}
```
 
**Expected Output:**
- If the user is successfully added, log a success message.
 
**Test Cases:**
1. Call `addUserToDatabase({ username: 'john_doe', email: 'john@example.com' })` and check the server logs for a success message.
 
**Hint:**
 
To solve this problem, you need to follow these steps: 
- Define a Mongoose schema for the "User" with properties "username" (string) and "email" (string).
- Create a Mongoose model for the User schema.
- Implement a function addUserToDatabase that takes a user object and adds it to the MongoDB database using the User model.


Here are some hints to guide you through the process:
 
1. Define the Mongoose schema:
    1. Use mongoose.Schema to define a schema for the User.
    2. The schema should have two fields: "username" (String) and "email" (String).

2. Create the Mongoose model:
    1. Use mongoose.model to create a model for the User schema.
    2. Pass the model a name (e.g., 'User') and the schema you defined.

3. Implement the addUserToDatabase function:
    1. Inside the function, create a new User object using the provided user data.
    2. Use the save method on the User object to save it to the database.
    3. Log a success message if the user is saved successfully, or an error message if there's an error.

Remember to connect Mongoose to your MongoDB database using mongoose.connect.