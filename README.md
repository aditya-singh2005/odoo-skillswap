# 🔄 Skill Swap Platform

**Skill Swap** is a dynamic web platform that empowers individuals to **offer their skills** and **request skills** in return — without the need for monetary exchange. It's a community-driven space where learning and sharing go hand-in-hand.

---

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

## ✨ Team SkillSwap

| Name               | Role                     |
|--------------------|--------------------------|
| Aditya Singh        | Frontend Developer
| Khawaish Jindal    | Backend Developer (Flask + DB) |
| Rakshit Khrab      | Designer / UX |
| Khushi             | Database + Testing |

_Add your real teammate names here!_

---

## 📂 Folder Structure (Backend)

