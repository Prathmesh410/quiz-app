# Quiz App API

This API provides functionality for a quiz application where users can create quizzes, answer questions, and view scores. The API is built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

# Features

1. User Authentication: Users can sign up, sign in, and sign out. Authentication is implemented using JWT (JSON Web Tokens).
2. Quiz Management: Users can create quizzes with multiple-choice questions and specify one or more correct answers.
3. Sharing Quizzes: Users can share quizzes with others using a unique link.
4. Answering Quizzes: Participants can take quizzes by following the shared link and submitting their answers.
5. Score Calculation: The API calculates the score for each participant based on their answers and the correct answers specified in the quiz.
6. Viewing Scores: Quiz creators can view the list of participants and their scores for each quiz.


# Prerequisites

Before running the API, make sure you have the following prerequisites installed:

Node.js
MongoDB

# Quiz App API

## User Routes
POST /api/signup - Register a new user.
POST /api/signin - Sign in with email and password.
GET /api/signout - Sign out the currently authenticated user.
## Quiz Routes
POST /api/quizzes/:userId - Create a new quiz.
GET /api/quizzes/:id - Get Quiz by id.
GET /api/quizzes/:userId - Get user quiz.
PUT /api/quizzes/:id/:userId - Update a specific quiz.
DELETE /api/quizzes/:id/:userId - Delete a particular quiz.
## Question Routes
POST /api/:quizId/questions/:userId - Create a new question for a quiz.
GET /api/questions/:id - Get a specific question.
GET /api/quizzes/:quizId/questions - Get a Questions of quiz.
PUT /api/questions/:id/:userId - Update a specific question.
DELETE /api/:quizId/questions/:id/:userId - Delete a specific question.
## Participant Routes
POST /api/quizzes/:quizId/participants - Register a participant for a quiz.
GET /api/quizzes/:quizId/participants - Get all participants for a quiz.
## Score Routes
POST /api/quizzes/:quizId/participants/:participantId/scores - Calculate and save the score for a participant.
GET /api/quizzes/:quizId/scores - Get all scores for a quiz.
GET /api/participants/:participantId/scores - Get all scores for a Participant.


Error Handling
The API handles errors and returns appropriate HTTP status codes and error messages in JSON format.


