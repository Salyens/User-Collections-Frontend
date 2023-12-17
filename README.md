# User Collections Project - Frontend

Developed during an internship at "Intransition", this project emphasizes functionality over aesthetics, designed to showcase practical capabilities in a web application context.

**Live Demo:** [User Collections App](https://user-collections-frontend.onrender.com)

## Key Features

- **User Registration:** Enables users to create their own accounts.
- **Theme Customization:** Users can switch between different visual themes for a personalized interface.
- **Language Selection:** Support for English and Russian languages, enhancing accessibility for users.
- **Collection Management:** Allows creation, editing, and deletion of collections, and adding items. Markdown support for detailed descriptions, with security measures on both front-end and back-end.
- **User Roles:** Separate privileges for administrators and root users, including user management and protection against deletion (for root users).
- **Interactive Tables:** Advanced features for user and item tables, including search, sorting, and pagination.
- **Full-Text Item Search:** Provides detailed searching within item content.
- **Tag Cloud:** Displays and utilizes popular tags for easier navigation and categorization.
- **AWS Bucket Integration for Images:** Built-in functionality for image uploads.
- **Deployment and Hosting:** The application is deployed and hosted on onRender.com for accessibility.

## Technical Specifications

- **Frontend Stack:** Built with JavaScript, React, Bootstrap 5, and CSS, offering a responsive and modern user interface.
- **Data Management:** Utilizes axios for reliable and secure HTTP requests, ensuring efficient data management.
- **Error Handling:** Includes error boundaries to maintain interface stability and provide user feedback in case of issues.
- **Route Protection:** Implements measures to restrict access to authenticated users only, enhancing security.
- **Context API and Custom Hooks:** Uses React's Context API for state management across components and custom hooks for handling forms and table management.
- **Rich Text Editor:** Integrates TinyMCE for rich text editing, allowing the creation of detailed and formatted content.
- **HTML Sanitization:** Uses DOMPurify to safely render user-generated HTML content, preventing XSS attacks.
