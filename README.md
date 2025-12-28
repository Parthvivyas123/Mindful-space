# Mindful Space - Mental Wellness Platform

A comprehensive mental wellness platform with Firebase Firestore integration for contact management and admin panel functionality.

## 🌟 Features

### Frontend Features
- **Responsive Design**: Beautiful, modern UI with smooth animations
- **Multi-page Navigation**: Home, Services, Affirmations, Meditation, Contact
- **Interactive Elements**: 
  - Dynamic greetings with real-time clock
  - Daily affirmations generator
  - Breathing exercises with timer
  - Quote of the day
- **Contact Form**: Integrated with Firebase Firestore
- **Admin Panel**: Complete management interface for contact inquiries

### Backend Features
- **Firebase Integration**: Firestore database for data storage
- **RESTful API**: Express.js server with CRUD operations
- **Contact Management**: Save, retrieve, update, and delete contact inquiries
- **Real-time Data**: Live updates and synchronization

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Firebase project with Firestore enabled
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CC-PROJECT
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the Backend directory:
   ```env
   PORT=5000
   FIREBASE_PRIVATE_KEY_ID=your_private_key_id
   FIREBASE_PRIVATE_KEY="your_private_key"
   FIREBASE_CLIENT_EMAIL=your_client_email
   FIREBASE_CLIENT_ID=your_client_id
   ```

4. **Start the Backend Server**
   ```bash
   cd Backend
   npm start
   ```

5. **Open the Frontend**
   - Open `Frontend/index.html` in your web browser
   - Or use a local server like Live Server in VS Code

## 🔧 Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project named "noiraflappy"
3. Enable Firestore Database

### 2. Configure Firestore
1. Go to Firestore Database → Rules
2. Copy the rules from `firestore.rules` file
3. Deploy the rules

### 3. Get Firebase Configuration
The Firebase config is already included in the HTML files:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyANk2bd19xiMFgr-eaF7NnAy4Z5RklKJA4",
  authDomain: "noiraflappy.firebaseapp.com",
  projectId: "noiraflappy",
  storageBucket: "noiraflappy.firebasestorage.app",
  messagingSenderId: "20694549873",
  appId: "1:20694549873:web:e8abe0796f0633584fe2d0",
  measurementId: "G-BR3E1C6KX1"
};
```

## 📱 Usage

### Contact Form
1. Navigate to the Contact page
2. Fill out the form with your information
3. Submit the form - data will be saved to Firestore
4. Receive confirmation message

### Admin Panel
1. Open `Frontend/admin.html` in your browser
2. View all contact inquiries in a table format
3. Filter by status, urgency, or search terms
4. Update contact status (new, in-progress, completed)
5. Delete contacts if needed
6. View real-time statistics

## 🗄️ Database Structure

### Contacts Collection
```javascript
{
  id: "auto-generated-id",
  name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  service: "therapy",
  urgency: "medium",
  message: "I need help with anxiety...",
  timestamp: "2025-01-27T10:30:00Z",
  status: "new",
  lastUpdated: "2025-01-27T10:30:00Z"
}
```

## 🔒 Security

### Current Security Rules (Development)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contacts/{document} {
      allow read, write: if true;
    }
  }
}
```

### Production Security Rules
See `firestore-security-rules.md` for production-ready security rules with authentication and proper access control.

## 📁 Project Structure

```
CC-PROJECT/
├── Frontend/
│   ├── index.html          # Main website
│   ├── admin.html          # Admin panel
│   ├── main.js            # Frontend JavaScript
│   ├── admin.js           # Admin panel JavaScript
│   └── style.css          # Styling
├── Backend/
│   ├── server.js          # Express server
│   ├── package.json       # Dependencies
│   └── models/
│       └── Contact.js     # MongoDB model (legacy)
├── firestore.rules        # Basic security rules
├── firestore-security-rules.md  # Production security rules
└── README.md              # This file
```

## 🛠️ API Endpoints

### Contact Management
- `POST /api/contact` - Create new contact
- `GET /api/contact` - Get all contacts
- `PUT /api/contact/:id` - Update contact status
- `DELETE /api/contact/:id` - Delete contact

### Example API Usage
```javascript
// Create contact
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello world'
  })
});

// Get all contacts
fetch('/api/contact')
  .then(res => res.json())
  .then(contacts => console.log(contacts));
```

## 🎨 Customization

### Styling
- Modify `Frontend/style.css` for custom styling
- CSS variables are defined at the top for easy color changes
- Responsive design works on all screen sizes

### Functionality
- Add new pages by creating new sections in `index.html`
- Extend the admin panel by modifying `admin.html` and `admin.js`
- Add new API endpoints in `Backend/server.js`

## 🚀 Deployment

### Frontend Deployment
1. Upload the `Frontend` folder to any web hosting service
2. Ensure Firebase configuration is correct
3. Test all functionality

### Backend Deployment
1. Deploy to platforms like Heroku, Vercel, or Railway
2. Set environment variables in the deployment platform
3. Ensure Firebase Admin SDK is properly configured

## 📝 Development Notes

- The project uses Firebase v10.7.1
- No authentication is currently implemented (development mode)
- All data is stored in Firestore collections
- Real-time updates are available in the admin panel
- The backend can work with or without Firebase Admin SDK

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for educational purposes as part of a college mini project.

## 👨‍💻 Developer

**Parthvi Vyas**  
ITM(SLS)BARODA UNIVERSITY  
Diploma IT - 2025

---

For any questions or support, please contact through the platform's contact form or email.
