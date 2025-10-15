# QuickBlog Admin Dashboard

A modern, responsive blog administration application built with React, Vite, and TailwindCSS. This application provides a complete admin interface for managing blog posts, comments, and dashboard analytics.

## Features

### 🎯 Core Functionality
- **Dashboard**: Overview with statistics cards and recent posts table
- **Add Blog**: Complete form for creating new blog posts with image upload
- **All Blogs**: Grid view of all blog posts with search and filtering
- **Comments**: Comment management with approval/rejection workflow

### 🎨 Design & UI
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern Interface**: Clean, professional design matching the Figma mockup
- **Interactive Elements**: Hover states, transitions, and micro-interactions
- **Collapsible Sidebar**: Space-efficient navigation with icon-only mode

### 🛠 Technical Stack
- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **React Router**: Client-side routing for single-page application
- **TailwindCSS**: Utility-first CSS framework for styling
- **Lucide Icons**: Beautiful, consistent icon set

## Project Structure

```
blog-admin/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and media files
│   │   ├── user-avatar.jpg
│   │   ├── blog-placeholder.jpg
│   │   └── admin-icon.png
│   ├── components/        # Reusable components
│   │   ├── layout/        # Layout components
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Layout.jsx
│   │   └── common/        # Common components
│   ├── pages/             # Page components
│   │   ├── Dashboard.jsx
│   │   ├── AddBlog.jsx
│   │   ├── AllBlogs.jsx
│   │   └── Comments.jsx
│   ├── App.jsx           # Main application component
│   ├── App.css           # Global styles and theme
│   └── main.jsx          # Application entry point
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or pnpm package manager

### Installation

1. **Clone or download the project**
   ```bash
   cd blog-admin
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
# or
pnpm run build
```

The built files will be in the `dist/` directory.

## Pages Overview

### 1. Dashboard (`/`)
- Statistics cards showing total views, posts, comments, and likes
- Recent posts table with status indicators
- Responsive grid layout

### 2. Add Blog (`/add-blog`)
- Complete blog creation form
- Title, category, tags, and content fields
- Featured image upload area
- Status selection (Draft, Published, Scheduled)
- Preview and save functionality

### 3. All Blogs (`/all-blogs`)
- Grid view of all blog posts
- Search functionality
- Status filtering (All, Published, Draft, Scheduled)
- Individual post cards with actions

### 4. Comments (`/comments`)
- List view of all comments
- Status-based filtering and actions
- Approve/reject workflow for pending comments
- Reply and flag functionality

## Customization

### Changing Images
Replace the placeholder images in `src/assets/` with your own:
- `user-avatar.jpg`: User profile pictures
- `blog-placeholder.jpg`: Blog post thumbnails
- `admin-icon.png`: Admin dashboard icons

### Styling
The application uses TailwindCSS for styling. Key customization points:
- `src/App.css`: Global styles and CSS variables
- Component files: Individual component styling
- Color scheme: Defined in CSS variables for easy theming

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add the route in `src/App.jsx`
3. Add navigation link in `src/components/layout/Sidebar.jsx`

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing
This is a template project. Feel free to modify and extend it according to your needs.

## License
This project is provided as-is for educational and development purposes.

