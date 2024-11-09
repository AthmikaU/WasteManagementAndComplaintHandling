# Waste Management and Prioritised Complaint Handling System

This project is a basic **Waste Management Complaint System** built using **Node.js** and **Express**. It provides an API to manage complaints regarding waste collection, resolve them, undo resolutions, and maintain logs of resolved complaints.

## Features

- **Register Complaints**: Allows users to register complaints with different priorities.
- **Sort Complaints**: Complaints are sorted by priority.
- **Resolve Complaints**: Marks complaints as resolved and stores them for historical reference.
- **Undo Resolutions**: Allows undoing the last resolved complaint.
- **Log Resolved Complaints**: Logs all resolved complaints to a CSV file for future audits.

## Table of Contents
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [POST /complaints](#post-complaints)
  - [GET /complaints](#get-complaints)
  - [POST /resolve](#post-resolve)
  - [GET /undo](#get-undo)
  - [GET /logs](#get-logs)
- [License](#license)

## Installation

To run this project locally, follow these steps:

1. Clone this repository:
   ```bash
   git clone https://github.com/AthmikaU/WasteManagementAndComplaintHandling.git
   cd WasteManagementAndComplaintHandling

2. Install dependencies:
   ```bash
   npm init -y
   npm install express fs
   
3. Start the Server:
   ```bash
   node server.js
- The server will be running at http://localhost:3000


### How to Use the Endpoints in Postman:

1. **POST /complaints**:
   - Method: `POST`
   - URL: `http://localhost:3000/complaints`
   - Body (JSON):
     ```json
     {
       "id": "1",
       "issueType": "health-risk",
       "sensitiveArea": true
     }
     ```
   - This registers a new complaint with priority based on the issue type and sensitive area.

2. **GET /complaints**:
   - Method: `GET`
   - URL: `http://localhost:3000/complaints`
   - This retrieves the list of complaints sorted by priority.

3. **POST /resolve**:
   - Method: `POST`
   - URL: `http://localhost:3000/resolve`
   - Body (JSON):
     ```json
     {
       "id": "1"
     }
     ```
   - This resolves the complaint with the specified `id`.

4. **GET /undo**:
   - Method: `GET`
   - URL: `http://localhost:3000/undo`
   - This undoes the last resolved complaint and reverts it back to the queue.

5. **GET /logs**:
   - Method: `GET`
   - URL: `http://localhost:3000/logs`
   - This retrieves the CSV file of resolved complaints.

Just copy and paste the contents of the `README.md` file into your project, and it will be ready for use!
