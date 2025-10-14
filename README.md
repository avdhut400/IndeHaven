
# IndeHaven: Propiedad Rental Platform for the Indian Audience

## 🚀 Overview

**IndeHaven** is a feature-rich, full-stack property rental platform specifically crafted to make property discovery and management seamless for both travelers and hosts within the Indian market. Leveraging the MERN-stack ecosystem and modern real-time communication technologies, IndeHaven aims to be a leading solution for property rentals.

## ✨ Key Features

| Category | Feature | Description |
| :--- | :--- | :--- |
| **Security & Access** | **User Authentication & Authorization** | Secure Sign Up / Log In with reliable session handling using **Passport.js**. |
| | **Role-Based Access Control (RBAC)** | Implemented middleware to ensure only property owners can edit or delete their respective listings. |
| **Data & Backend** | **MongoDB** | NoSQL database powering the storage and management of all listing and user data. |
| | **Express.js + Node.js** | Provides a scalable and efficient backend architecture. |
| **Real-time & UX** | **Real-time Chat** | **(Implemented)** Instant messaging between users and property owners powered by **Socket.IO**. |
| | **Smart Search** | Advanced filtering capabilities to easily find properties based on specific user needs. |
| | **GST Toggle** | Ensures transparent pricing with an in-app switch to show the Goods and Services Tax (GST) applied. |
| **Media Handling** | **Image Uploads with Cloudinary** | Fast, reliable media handling and secure cloud storage for all property images. |

-----

## 🖼️ Screenshots / Demo

<img width="1920" height="1080" alt="Screenshot (338)" src="https://github.com/user-attachments/assets/2d2d7db1-8e19-4eed-a484-1b6e4332274e" />
<img width="1920" height="1080" alt="Screenshot (337)" src="https://github.com/user-attachments/assets/0752476e-0185-4178-a710-fe682db12226" />
<img width="1920" height="1080" alt="Screenshot (325)" src="https://github.com/user-attachments/assets/dfdc46c8-b3b5-42e7-861e-ecfb759f3fbf" />
<img width="1920" height="1080" alt="Screenshot (323)" src="https://github.com/user-attachments/assets/80d485de-4ff0-48dc-8317-05643bf1f47c" />


-----

## 🛠️ Technical Stack

  * **Backend:** Node.js, Express.js
  * **Database:** MongoDB (NoSQL)
  * **Authentication:** Passport.js
  * **Real-time Communication:** Socket.IO
  * **Media Storage:** Cloudinary
  * **Frontend:** HTML, CSS, Bootstrap (for a clean, responsive UI)

### Technical Journey Highlights

  * Built stable **WebSocket connections** that can scale to manage real-time interactions efficiently.
  * Implemented **robust security middleware** throughout the application.
  * Optimized **media delivery** using Cloudinary for varied network conditions.

## 🌟 Future Enhancements (Work in Progress)

We are continuously working on improving the platform. These upcoming features are currently in development:

  * **💳 Payment Gateway Integration (WIP):** To enable smooth and secure rental transactions (form data for this is already stored in the DB to ease onboarding).
  * **🗨️ AI-Powered Chatbot (WIP):** To assist users during their session for quick inquiries and guidance.
  * **📌 Real-time Notifications (WIP):** In-app and browser alerts for new chat messages.
  * **🗺️ Intelligent Location Search (WIP):** Enhanced, location-based search capabilities for better property discovery.

## 📚 What I Learned

Developing IndeHaven was a significant learning experience, notably in:

1.  Managing **real-time interactions** and building scalable connections with **Socket.IO**.
2.  Implementing robust **role-based access control (RBAC)** using **Express middleware**.
3.  Designing a clean, responsive user interface utilizing **HTML, CSS & Bootstrap**.
4.  Handling secure image uploads and cloud storage using **Cloudinary**.

## 💻 Setup and Installation

*(The GitHub link is coming soon\! These are placeholder instructions for when the repository is public.)*

1.  **Clone the repository:**
    ```bash
    git clone [REPO_URL_HERE]
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd IndeHaven
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add your credentials for:
      * `MONGO_URI`
      * `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
      * `SESSION_SECRET` (for Passport)
5.  **Start the server:**
    ```bash
    npm start
    ```

## 👤 Author

  * **Developer:** Avdhut Magar
  * **Connect:** [Avdhut Magar on LinkedIn](https://www.google.com/search?q=https://www.linkedin.com/in/avdhut-magar-94088333b/)
  * **Project Launch Post:** [LinkedIn Activity](https://www.linkedin.com/posts/avdhut-magar-94088333b_webdevelopment-nodejs-expressjs-activity-7318525305525100545-fQpd?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAF_MY_8BDDMzMK7CHt9q5ryHqC9ToL_RRK8)

-----

*Stay tuned – the full repository link will be shared shortly\!*
