# Rentify Application Documentation

## Table of Contents
- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Frontend](#frontend)
  - [Features](#features)
  - [Routes](#routes)
- [Backend](#backend)
  - [Features](#features-1)
  - [Routes](#routes-1)
- [Database](#database)
- [Installation and Usage](#installation)
  - [Local Installation](#local-installation)
  - [Docker Installation](#docker-installation)
  - [Docker Usage](#starting-docker-container)
-  [Working Images](#images)


## Overview:

Rentify is a web application designed to facilitate property rental transactions between sellers and buyers. It consists of a frontend built with React.js and a backend developed using Django and Django REST Framework. The application incorporates features such as pagination, filters, property liking, and email notifications.

## Technologies Used:

- **Frontend:**
  - React.js
  - JavaScript
  - HTML
  - CSS
  - Material-UI

- **Backend:**
  - Django
  - Django REST Framework
  - Python

- **Database:**
  - MySQL

- **Others:**
  - Docker
  - Docker Compose


## Frontend:

The frontend is responsible for providing an intuitive user interface for sellers and buyers to interact with the application.

### Features:
- Pagination: Allows users to navigate through multiple pages of property listings.
- Filters: Enables users to refine their property search based on various criteria such as price, location, and amenities.
- Like Feature: Allows buyers to like properties and save them for future reference.
- Email Feature: Sends email notifications to users for various events such as property updates and account registration.

### Routes:

1. **Home Page:** `/`
2. **Seller Registration:** `/register`
3. **Buyer Registration:** `/register`
4. **Buyer Login Page:** `/login`
5. **Seller Login Page:** `/seller/login`
6. **Seller Dashboard:** `/properties`
7. **Buyer Dashboard:** `/properties`
8. **Property Details:** `/property/:id`


## Backend:

The backend manages data storage, retrieval, and business logic, providing RESTful APIs for frontend communication.

### Features:
- User Authentication: Allows users to register, login, and manage their accounts securely.
- CRUD Operations: Supports Create, Read, Update, and Delete operations for property listings.
- Email Integration: Sends email notifications to users using SMTP configuration.

### Routes:

1. **User Registration:** `POST /register/`
2. **User Login:** `POST /login/`
3. **Seller Dashboard:** `GET /seller/dashboard/`
4. **Buyer Dashboard:** `GET /buyer/dashboard/`
5. **Property Listing:** `GET /properties/`
6. **Property Details:** `GET /properties/:id/`
7. **Property Creation:** `POST /properties/`
8. **Property Update:** `PUT /properties/:id/`
9. **Property Deletion:** `DELETE /properties/:id/`

- #### Swagger API Documentation
    ```shell
    http:localhost:8000
    ```


## Database:

The application uses MySQL as the database for storing property and user data.

## Installation:

### Local Installation(Try Docker installation you need to change the localhost to 127.0.0.1 in react components):

To install and run the application locally, follow these steps:

1. **Clone the repository:**
    ```shell
    git clone https://github.com/Suryakiran09/RentifyApp.git
    ```

2. **Navigate to the project directory:**
    ```shell
    cd rentify
    ```

3. **Install frontend dependencies:**
    ```shell
    cd rentify-frontend
    npm install
    ```

4. **Install backend dependencies:**
    ```shell
    cd rentify-backend
    pip install -r requirements.txt
    ```

5. **Start frontend server:**
    ```shell
    npm start
    ```

6. **Start backend server:**
    ```shell
    python manage.py runserver
    ```
    
The application will now be accessible at `http://localhost:3000` for the frontend and `http://127.0.0.1:8000` for the backend.

### Docker Installation:

**Install Docker:**
    - Ensure you have Docker installed on your machine. Follow the instructions based on your operating system:
        - [Install Docker on Windows](https://docs.docker.com/desktop/install/windows-install/)
        - [Install Docker on macOS](https://docs.docker.com/desktop/install/mac-install/)
        - [Install Docker on Linux](https://docs.docker.com/desktop/install/linux-install/)

### Starting Docker Container:

After installation run the application using Docker, follow these steps:

1. **Clone the repository:**
    ```shell
    git clone https://github.com/Suryakiran09/RentifyApp.git
    ```

2. **Navigate to the project directory:**
    ```shell
    cd rentify
    ```

3. **Build and start Docker containers:**
    ```shell
    docker-compose build
    ```

    ```shell
    docker-compose up
    ```

The application will now be accessible at `http://localhost:3000` for the frontend and `http://localhost:8000` for the backend.


### Images

#### Backend Swagger API Documentation

![alt text](/images/image.png)

#### Rentify Homepage

![alt text](/images/image1.png)

#### Register Page

![alt text](/images/image2.png)

#### Seller and Buyer Login Page

![alt text](/images/image3.png)
![alt text](/images/image4.png)

#### Property creation

![alt text](/images/image5.png)

#### Seller Dashboard with Pagination

![alt text](/images/image6.png)

#### Seller Property Update and Delete

![alt text](/images/image7.png)

#### Buyer Dashboard with Pagination, Filters, Like feature and Email feature

![alt text](/images/image8.png)

#### Confirmation Emails

##### sender Email

![alt text](/images/image9.png)

##### Receiver Email

![alt text](/images/image10.png)


#### `The application I hosted in the internet is hosted in a free tier so it takes time to load as it will go into sleep if the application is idle please open the backend application first and wait some 30 seconds to load and then use the frontend application`

#### `The code I used for deployment is updated with backend hosted application url but this file which I sent as submission contains the localhost url which can run without any waiting but if the frontend application isn't loading check the logs in docker it may be taking time to start the application.`

Frontend is taking time to load in docker But it will load

![alt text](/images/image11.png)