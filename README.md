# Mindful Space - Mental Wellness Platform

A comprehensive mental wellness platform with  contact management and admin panel functionality.

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

## 🚀 Quick Start

- Modern web browser


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


## 📁 Project Structure

```
CC-PROJECT/
├── Frontend/
│   ├── index.html          # Main website
│   ├── admin.html          # Admin panel
│   ├── main.js            # Frontend JavaScript
│   ├── admin.js           # Admin panel JavaScript
│   └── style.css          # Styling


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
2. Test all functionality


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

