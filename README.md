# CSEC Cyber Division Frontend

## Overview

This project is the frontend application for the CSEC Cyber Division member portal. It was developed as part of an entrance exam ctf.
This project is aimed to create the portal to every person wanted to be memeber of the CSEC_Cyber division and post their opinion.

The UI is built with React, Vite, React Router, and Tailwind CSS using a hacking-inspired terminal theme.

## Key Features

- Secure member authentication with login and registration forms
- Protected dashboard access for authenticated members only
- Every CSEC-Cyber member can post their feelings
- Admin panel with user directory and post deletion controls
- Token-based route protection via `localStorage`
- Custom cyber-themed styling using Tailwind CSS

## Project Structure

- `src/App.jsx` - Main app router and protected route setup
- `src/pages/Register.jsx` - Member registration form
- `src/pages/Login.jsx` - Login form and token storage
- `src/pages/Dashboard.jsx` - User dashboard, feed, and post creation
- `src/pages/AdminDashboard.jsx` - Admin controls for users and posts
- `tailwind.config.js` - Custom hacker-style color theme and fonts

## Installation

1. Open a terminal in the `frontend` folder.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the application in your browser at the local Vite URL shown in the terminal.

## Backend Requirements

This frontend is designed to work with a backend with API Doc. The expected backend endpoints are:

- `POST /api/auth/register` - register a new user
- `POST /api/auth/login` - login and receive an access token
- `GET /api/users/me/profile` - fetch the current user profile
- `GET /api/posts/` - fetch posts for the feed
- `POST /api/posts/` - create a new post
- `GET /api/users/` - fetch all users for admin view
- `DELETE /api/posts/:id` - delete a post as admin


## Usage

- You know this is now publicallly available any user can register using the registration screen.
- Login with your credentials to access the dashboard.
- Create transmissions and view the global feed.
- If you are the captain, access the admin panel from the dashboard.
- Use the logout button to end the session and clear the auth token.

## Security & Design Notes

- The application uses a token stored in `localStorage` to protect routes.
- Admin-specific data is fetched only after authentication.
- Non-admin users are redirected away from the admin panel if access is denied.
- The UI intentionally uses a cyber security theme to match the CSEC division context.

## Styling

The app uses Tailwind CSS with a custom hacker theme:

- `hacker.dark`, `hacker.darker`, `hacker.green`, `hacker.red`
- Mono font family for a terminal-inspired appearance
- Neon-style buttons and panels for a secure operations aesthetic



## License
Copyright © 2026 CSEC Cyber Security Division. All rights reserved.

This project and its source code are the property of the CSEC Cyber Security Division. It was developed specifically for entrance exam purposes.

Unauthorized copying, modification, or distribution of this software, via any medium, is strictly prohibited without the express written permission of the CSEC Cyber Security Division.
