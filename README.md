# 🔄 Skill Swap Platform

**Skill Swap** is a dynamic web platform that empowers individuals to **offer their skills** and **request skills** in return — without the need for monetary exchange. It's a community-driven space where learning and sharing go hand-in-hand.

---
## ✨ Team SkillSwap

| Name               | Role                     | Email      |
|--------------------|--------------------------|------------|
| Aditya Singh        | Frontend Developer | job.singhaditya00005@gmail.com |
| Khawaish Jindal    | Backend Developer (Flask + DB) | jindal.kh12@gmail.com |
| Rakshit Khrab      | Designer / UX | rakshitkharb2323@gmail.com |
| Khushi             | Database + Testing | 777khush.k@gmail.com | 


![App Screenshot](https://github.com/aditya-singh2005/odoo-skillswap/blob/main/Screenshot%202025-07-12%20165947.png)
![App Screenshot](https://github.com/aditya-singh2005/odoo-skillswap/blob/main/Screenshot%202025-07-12%20171500.png)
![App Screenshot](https://github.com/aditya-singh2005/odoo-skillswap/blob/main/Screenshot%202025-07-12%20171639.png)
## 🚀 Features

👤 **User Profile**
- Add name, location, profile photo (optional)
- Set availability (e.g., weekends, evenings)
- Toggle public/private visibility

🎯 **Skill Management**
- Add skills you can **offer**
- Add skills you **want to learn**
- Search and browse by skill (e.g., “Photoshop”, “Excel”)

🔁 **Swap Requests**
- Request swaps with other users
- Accept, reject, or cancel swap offers
- View current & pending swap status

⭐ **Ratings & Feedback**
- Leave feedback after completed swaps
- Rate experiences from 1 to 5 stars

🛡️ **Admin Dashboard**
- Reject inappropriate skills
- Ban users violating policies
- Monitor and manage all swaps
- View and act on user reports
- Broadcast platform-wide messages

📊 **Reports & Logs**
- Download feedback summaries
- Track user activity and swap stats

---

## 🧑‍💻 Tech Stack

| Layer        | Technology |
|--------------|------------|
| 👨‍🎨 Frontend   | React.js + Tailwind CSS |
| ⚙️ Backend     | Python + Flask + Flask-CORS |
| 🛢️ Database    | PostgreSQL |
| 🔗 ORM         | SQLAlchemy |
| 📦 Others      | dotenv, Flask-Migrate, GitHub |

---

## 🏗️ Database Design Overview

- `users` – Basic user info and flags (`is_admin`, `is_banned`)
- `skills` – Offered and wanted skills linked to users
- `swap_requests` – Swap interactions between users
- `feedback` – Post-swap ratings and comments
- `admin_actions` – Logs admin moderation activity
- `user_reports` – Tracks user-reported issues for review

📌 Built using raw SQL + SQLAlchemy ORM

---



---



