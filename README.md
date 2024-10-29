# ParentConnect 📱

**ParentConnect** is a mobile application designed to simplify the communication between parents and their children’s schools. With a focus on family and student management, the app provides parents with an organized way to stay connected to their children's academic journey.

## 📖 Overview

ParentConnect is your go-to app for staying connected to your child's school activities and academic information. Access student profiles, keep track of assignments, and stay up-to-date with school communications all in one place. Designed to enhance communication between parents and schools, ParentConnect provides a convenient, user-friendly experience.

## 🎨 Features

- **User Authentication**: Secure login with unique PIN and phone number.
- **Student Profiles**: View student details including name, grade level, and birthdate.
- **Multi-Child Support**: Manage profiles for multiple students from a single parent account.

## 🛠️ Technologies Used

- **Frontend**: React Native, TypeScript
- **State Management**: Default React State Management
- **UI**: Tailwind CSS for React Native (via twrnc)
- **Navigation**: React Navigation
- **API**: MockAPI for testing and data storage
- **Expo**: For streamlined development and testing

## 🚀 Getting Started

To get a local copy of the app up and running, follow these steps.

### Prerequisites

- **Node.js** and **npm**: Install [Node.js](https://nodejs.org/)
- **Expo CLI**: Install Expo globally for easy project setup:
  ```bash
  npm install -g expo-cli
  ```

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/gylraj/ParentConnect.git
   cd parentconnect
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up Environment Variables**:

   - Create a `.env` file in the root directory with the following variables:
     ```plaintext
     API_URL=https://sample.com/v1
     ```

4. **Run the App**:
   ```bash
   expo start
   ```
   - Use **Expo Go** to view the app on your mobile device or run it on an iOS/Android emulator.

### Directory Structure

```
├── /assets          # Static assets like icons, images
├── /components      # Reusable UI components
├── /navigation      # Navigation configuration
├── /screens         # App screens (Login, StudentList, StudentDetail)
├── /api             # API client and requests
├── /types           # TypeScript types
├── App.tsx          # Main app entry
├── README.md
└── .env             # Environment variables
```

## 📱 Screenshots

| Login Screen                                                                                     | Student List                                                                                     | Student Details                                                                                     |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| ![Login Screen](https://github.com/user-attachments/assets/31c0f1c2-5ed7-46c3-9f94-44735a932953) | ![Student List](https://github.com/user-attachments/assets/d22ad556-b1e0-4b11-9e8d-4f8fd9b61eb2) | ![Student Details](https://github.com/user-attachments/assets/9ff1cee3-d212-4f26-a27b-a8c6aa1d98d8) |

## 🎥 Screen Recording

[🎥 Screen Recording](https://github.com/user-attachments/assets/e85609e4-e0b1-4170-96c3-b9edb5a26495)

## 🔧 API Endpoints

- **Get All Parents**: `/parent`
- **Get Parent by ID**: `/parent/{parentId}`
- **Get Students for a Parent**: `/parent/{parentId}/student`
- **Get Student by ID**: `/parent/{parentId}/student/{studentId}`

For API testing, these endpoints are hosted on [MockAPI](https://documenter.getpostman.com/view/38077046/2sAY4rFQjM).

## 🔒 Security & Environment Variables

This app uses environment variables to securely manage API URLs and keys:

- **API_URL**: Base URL for API requests.

## 📖 Future Enhancements

- **Dark Mode**: Provide an alternate dark theme.
- **Messaging**: Communication between parents and school administration.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributors

- **Gylou Gian Sumayod** - [GitHub Profile](https://github.com/gylraj)
