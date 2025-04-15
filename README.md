# 💬 Message Board App  
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?style=for-the-badge&logo=postgresql)  
![EJS](https://img.shields.io/badge/EJS-Template_Engine-green?style=for-the-badge)  
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)  
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)  
![Authentication](https://img.shields.io/badge/User-Authentication-blueviolet?style=for-the-badge)  

![image](https://github.com/user-attachments/assets/ecaaffd6-54ee-4117-894a-1e721a338904)
![image](https://github.com/user-attachments/assets/7f033a31-eb6f-497c-8b46-340c4b250716)

---

## 📜 Project Overview

This full-stack message board web app was built as part of **The Odin Project’s Full-Stack JavaScript Path**.

It allows users to:

- Register and log in (authentication with Passport.js)
- Post messages publicly
- Gain access to extra features as a **member**
- Use admin privileges to **delete messages**

---

## 🌍 Deployed on Railway

This app is deployed on **Railway**, including its PostgreSQL database.

🔗 **Live Demo**: [Click Here](https://house-of-messages-production.up.railway.app/)

---

## 🌟 Features

- ✅ **Register & Login**  
  Secure authentication with hashed passwords and session management

- 📥 **Sanitized Registration**  
  Form input is sanitized and validated using `express-validator`

- 🍪 **Persistent Sessions**  
  Sessions stored via cookies for automatic login if not expired

- 🔒 **Route Protection**  
  Routes protected with custom `isAuth` middleware

- 🏠 **Homepage Dashboard**  
  Shows account info and membership status when logged in

- ✍️ **Post a Message**  
  All users (logged in or not) can read messages  
  Logged-in users can post messages  
  Members can see who posted them and when  

- 🗝️ **Secret Membership**  
  A secret passcode is required to become a member

- 🛠️ **Admin Privileges**  
  Admin users can delete any message (admin flag set manually)

---

## 🎨 Planning & Design

- 🎨 **Figma**: Used Figma to design the user interface, focusing on simplicity and clarity for both desktop and mobile users  
- 🗂️ **Eraser.io**: Created an ERD (Entity Relationship Diagram) to visualize and plan the database structure, ensuring a clear one-to-many relationship between users and messages  

![image](https://github.com/user-attachments/assets/5593cd5a-4d24-42f0-8658-754ccdabdda1)
![image](https://github.com/user-attachments/assets/24a439fe-8097-4cbc-bcf7-cc943a3c75e9)



## 🧠 What I Learned

- 🛂 **Passport.js**: Implementing local strategy for user authentication  
- 🗃️ **PostgreSQL**: Defining models and managing relationships  
- 🔄 **Session Cookies**: Handling login persistence  
- 🧼 **express-validator**: Validating and sanitizing user input  
- 🧩 **MVC-like Structure**: Keeping code modular and maintainable  
- 🌐 **Deployment**: Hosting app and database on Railway  

---

## 🗂 Folder Structure

```
.
├── controllers/            # Logic for homepage, auth, and posting messages
├── db/                     # PostgreSQL setup
│   ├── create-tables.js    # Creates users/messages tables
│   ├── delete-tables.js    # Drops tables (optional)
│   └── pool.js             # PostgreSQL connection pool
├── middleware/
│   └── isAuth.js           # Protects routes that require login
├── models/                 # SQL query builders for user/message models
├── public/                 # Static files
│   ├── css/
│   ├── js/
│   └── favicon.ico
├── routes/                 # Express routers
├── utils/
│   ├── passport-config.js  # Passport setup
│   └── hash.js             # Password hashing utility
├── validators/
│   └── formValidators.js   # express-validator rules
├── views/                  # EJS templates
│   ├── partials/           # Includes like header/footer
│   ├── auth.ejs
│   ├── index.ejs
│   ├── new-message.ejs
│   ├── error.ejs
│   └── layout.ejs
├── .env                    # Environment variables
├── .gitignore
├── app.js                  # Main Express app
└── package.json            # Project config and dependencies
```

---

## 🔐 User Roles and Permissions

| Role     | Can Post | Can View Authors | Can Delete Messages |
|----------|----------|------------------|----------------------|
| Guest    | ❌       | ❌               | ❌                   |
| User     | ✅       | ❌               | ❌                   |
| Member   | ✅       | ✅               | ❌                   |
| Admin    | ✅       | ✅               | ✅                   |

---

## 🛠️ Tech Stack

- **Node.js** + **Express** — Backend server and routing
- **PostgreSQL** — Relational database
- **Passport.js** — Authentication
- **EJS** — Template engine for rendering views
- **express-validator** — Input validation
- **bcrypt** — Password hashing
- **dotenv** — Environment variable support
- **Railway** — Deployment & Database hosting

---

## 🙏 Thank You!

Thanks for checking out my **Message Board App**!  
I built this to better understand user authentication, backend security, and PostgreSQL integration in a Node.js environment.  
Feel free to reach out if you have questions or feedback! 

---
