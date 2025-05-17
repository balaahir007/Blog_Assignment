
# BlogPage React Component

A simple React blog editor page with draft saving, validation, and publish functionality.

---

## Features

- Create or edit blog posts with title, content, and tags.
- Client-side validation for title (min 5 chars), content (min 20 chars), and tags (non-empty).
- Auto-save drafts with debounce (5 seconds after typing stops).
- Manual save as draft or publish with buttons.
- Error handling and loading state.
- Navigate home easily with a dedicated "Go Home" button.
- Toast notifications for success messages.

---

## Technologies Used

- **React**  
  Functional components with hooks: `useState`, `useEffect`, `useCallback`, `useMemo`, `useRef`

- **React Router**  
  Navigation and route state management using `useNavigate` and `useLocation`

- **Axios**  
  HTTP client for sending requests to backend APIs (`axiosInstance`)

- **Lodash debounce**  
  Used to debounce the auto-saving function, reducing frequent API calls during typing

- **React Toastify**  
  For user-friendly toast notifications on blog save and publish actions

- **React Icons**  
  Used to add icons (like ✍️, 💾, 🚀, 🏠) for better UI/UX in buttons and headings
---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/balaahir007/Blog.git
   cd Blog
## Preview
![Blog Preview](https://raw.githubusercontent.com/balaahir007/Blog/main/frontend/public/preview.png)

