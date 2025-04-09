# DevTinder

DevTinder is a social networking platform designed to help developers connect, collaborate, and build meaningful relationships. The application allows users to like, skip, and match with other developers, manage friend requests, and maintain a list of connections.

## Features

1. **User Matching**:

   - Users can like or skip other users.
   - When two users like each other, they are matched and added to each other's connections.

2. **Friend Requests**:

   - Users can send friend requests to others.
   - Requests can be accepted or rejected.

3. **Connections**:

   - Users can view their list of connections (friends).
   - Connections are displayed with user details.

4. **Real-Time Notifications**:
   - Notifications are emitted for friend requests and their acceptance/rejection using Socket.IO.

## Project Structure

### Backend

- **Routes**:
  - `matchRoutes.js`: Handles user matching, friend requests, and connections.
- **Models**:
  - `User`: Represents user data.
  - `Match`: Represents matched users.
  - `Swipe`: Represents friend requests.
  - `Skipped`: Represents skipped users.
- **Middleware**:
  - `auth`: Validates user authentication.

### Frontend

- **Components**:
  - `Requests.jsx`: Displays pending friend requests and allows users to accept or reject them.
  - `Connections.jsx`: Displays the list of user connections.
  - `ConnectionCard.jsx`: Represents a single connection in the connections list.
- **State Management**:
  - `connectionSlice.js`: Manages the state of user connections.
  - `requestSlice.js`: Manages the state of friend requests.
- **API**:
  - Axios is used for making API calls to the backend.

## How It Works

1. **Friend Requests**:

   - Users can send friend requests to others.
   - Pending requests are displayed in the `Requests` component.
   - Requests can be accepted or rejected.

2. **Matching**:

   - When a friend request is accepted, the users are matched and added to each other's connections.

3. **Connections**:
   - Users can view their connections in the `Connections` component.
   - Each connection is displayed using the `ConnectionCard` component.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd devTinder
   ```

2. Install dependencies:

   - Backend:
     ```bash
     cd devTinder
     npm install
     ```
   - Frontend:
     ```bash
     cd frontend
     npm install
     ```

3. Start the application:
   - Backend:
     ```bash
     npm start
     ```
   - Frontend:
     ```bash
     npm start
     ```

## Technologies Used

- **Backend**:

  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - Socket.IO

- **Frontend**:
  - React.js
  - Redux Toolkit
  - Axios
  - Tailwind CSS

## Future Enhancements

- Add user profiles with more details.
- Implement chat functionality between matched users.
- Add filters for better user discovery.
- Improve UI/UX for a seamless experience.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Contact

For any questions or feedback, feel free to reach out to the project maintainer.
