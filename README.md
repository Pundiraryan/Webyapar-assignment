
# Classroom Task Manager

Classroom task Manager allows teachers to allot tasks to students , students can view and upadate status of tasks and Admin can controll all the teacher and student acitivities
 


## Features

- 1. Role-Based Authentication:
- Teacher can assign task to student
- student can update task completion status and teacher can view and track task status
- A task can be alloted to multiple students




## Run Locally

Clone the project :

```bash
 https://github.com/Pundiraryan/Webyapar-assignment.git
```

Go to the project directory :

```bash
  cd Webyapar-assignment
```

create a file named .env in the current directory and set the following variables in it  :

```bash
PORT=3000
URI="YOUR_MONGO_CONNECTION_URL"
SECRET="YOUR_SECRET"
```

Install package dependencies by running the command  :

```bash
npm install
```

Run project :

In the root directory, run the command:

```bash
npm run start
```
 Open your browser and go to http://localhost:3000 and boom!! The app will run 



##  Project walkthrough flow : 

-- Hit the url - http://localhost:3000/home/admin/register_user and create different types of users

- Now hit http://localhost:3000/ and login to enjoy features for different types of users 