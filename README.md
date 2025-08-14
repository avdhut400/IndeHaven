IndiHaven 🏠

A simple, Airbnb-style listings app with auth, search, images, and email notifications

IndiHaven is a full-stack web app for discovering, listing, and managing stays. It supports secure authentication, image uploads to Cloudinary, a smart search with a tax toggle, and real-time email using Nodemailer. The project started with Node.js + Express + EJS and is being migrated to a React frontend.

✨ Features

Authentication: Register/Login/Logout (sessions or JWT—see env setup)

Listings: Create, edit, delete, and view listings with Cloudinary images

Search: Keyword + filter search with a tax toggle to show price with/without tax

Detail Pages: Listing details with photos, description, price

Email Notifications: Automated emails for booking confirmations via Nodemailer

Responsive UI: Bootstrap + custom CSS (EJS)

Secure Uploads: Cloudinary storage, server-side validation

Production-ready: .env support, CORS

🧰 Tech Stack

Frontend (current): EJS, Bootstrap, vanilla JS
Frontend (migration): React (planned)
Backend: Node.js, Express.js
Database: MongoDB (Mongoose)
Email: Nodemailer (SMTP or Gmail API)
Storage: Cloudinary
Auth: Sessions or JWT (project supports either—configure via .env)
Other: Helmet, CORS, bcrypt, dotenv
