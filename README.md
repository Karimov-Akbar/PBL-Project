![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

# Manchester City Website

⚽ Manchester City Website is a Node.js-based web application designed to manage and showcase football-related content dynamically. The project integrates databases, dynamic routes, and a clean structure to provide an efficient platform for users.

## Features

- 📋 **Dynamic Data Display**: All data is displayed dynamically if there have been changes in the database
- 👨‍💻 **Admin Panel**: The admin panel where you can edit the data from pc and [telegram bot](https://t.me/manchester_admin_bot)
- 🌐 **Working with Api**: Integrated API for displaying information about club statistics
- 🗂️ **Database Integration**: Utilizes SQLite databases for news, users, products, and gallery management.
- 🌐 **Static File Serving**: Hosts and serves static files through the `public` directory.
- 🛠️ **Modular Routing**: Organized routing for a scalable application.

## Prerequisites

Ensure you have the following installed on your system:

- 🖥️ [Node.js](https://nodejs.org/) (v14 or higher recommended)
- 📦 [SQLite](https://sqlite.org/)

## Installation

1. 🌀 Clone the repository:

   ```bash
   git clone https://github.com/Karimov-Akbar/PBL-Project.git
   cd PBL-Project
   ```

2. 📂 Install dependencies:

   ```bash
   npm install
   ```

3. 🛠️ Set up the databases:

   Ensure the following SQLite database files are available in the project directory:

   - `news_database.db`
   - `gallery.db`
   - `products.db`
   - `users.db`

   If you need to create or modify the databases, use tools like `sqlite3`.

## Usage

1. 🚀 Start the server:

   ```bash
   node app.js
   ```

2. 🌐 Open your web browser and navigate to:

   ```
   http://localhost:10000
   ```

3. 🔎 Explore the app:

   - 📰 View dynamic news.
   - 🖼️ Access the gallery and other features.

## Project Structure

```plaintext
prosoccer/
├── .git/               # Git version control files
├── .gitignore          # Ignored files for Git
├── app.js              # Main application file
├── db/                 # Additional database-related files (if any)
├── gallery.db          # Gallery database
├── news_database.db    # News database
├── package.json        # Node.js dependencies
├── package-lock.json   # Locked dependency versions
├── products.db         # Products database
├── public/             # Static files (CSS, JS, images)
├── routes/             # Modular routes
├── users.db            # User data database
```
