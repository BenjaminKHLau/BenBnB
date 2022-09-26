# Welcome to BenBnB! 

BenBnB is an AirBnB clone. In BenBnB, you can host a spot and give it a review based on your likings. 

Live Link: https://benbnb.herokuapp.com/

## Technologies Used
### Frameworks, Libraries, Platform utilized

![image](https://user-images.githubusercontent.com/20654267/192156837-122333b5-1337-4630-abcd-e48f538c141d.png)
![image](https://user-images.githubusercontent.com/20654267/192156854-da992c42-d7fc-468a-ad02-65316be0d9c2.png)
![image](https://user-images.githubusercontent.com/20654267/192156876-64b1afdd-e93f-4f6b-a0ff-2d7e9b75258a.png)
![image](https://user-images.githubusercontent.com/20654267/192156881-268b4f35-02b2-4113-861b-c2ea54b6ff87.png)
![image](https://user-images.githubusercontent.com/20654267/192156890-ca8a0612-9350-4d10-88f7-cc09dd740865.png)
![image](https://user-images.githubusercontent.com/20654267/192156892-eddb0af2-29cc-46bf-9d6d-fc0ead32005b.png)
![image](https://user-images.githubusercontent.com/20654267/192156896-44718733-3b28-4f64-934a-78522df3a444.png)

### Database
![image](https://user-images.githubusercontent.com/20654267/192156956-e6ef56f2-5645-406a-8778-83baf75489a1.png)

### Hosting
![image](https://user-images.githubusercontent.com/20654267/192156972-28d4bd6a-7012-4d73-8bbd-105cfba12108.png)

## Site Preview
### Home Page
<img width="1920" alt="image" src="https://user-images.githubusercontent.com/20654267/192157360-a52da25d-1de0-4e68-b960-a157657ac4d1.png">

### Spot Details Page
<img width="1920" alt="image" src="https://user-images.githubusercontent.com/20654267/192157413-9840de61-221b-4077-83dc-a2681c3c847f.png">

### Login Form Modal
<img width="1920" alt="image" src="https://user-images.githubusercontent.com/20654267/192157454-7ea3c5f1-1c49-40c0-85db-96453ab6c6e3.png">

### Signup Form Modal 
<img width="1920" alt="image" src="https://user-images.githubusercontent.com/20654267/192157483-b0372de9-1e00-433c-9b01-f1d53df697c5.png">

### Create a Spot Modal (Login Required)
<img width="1920" alt="image" src="https://user-images.githubusercontent.com/20654267/192157545-2ec9377f-e918-4f5b-994b-58697fa78eb6.png">

### Your Spots Page (Login Required)
<img width="1920" alt="image" src="https://user-images.githubusercontent.com/20654267/192157581-1bcf32c8-25eb-41a1-a702-dcaa5431b66e.png">

### Your Reviews Page (Login Required) 
<img width="1920" alt="image" src="https://user-images.githubusercontent.com/20654267/192157611-c4f737e3-3594-42a0-935d-50be71ba840f.png">


## Upcoming Features
* Bookings
* Add Extra Images to Spots and Reviews

## How to set up to run on your machine locally
* Clone/download the repo

* Open two terminals, in one <code>cd</code> into the backend and the other <code>cd</code> into the frontend

* In the backend run <code>npm install</code> and run <code>npm start</code>

* In the frontend run <code>npm install</code> and run <code>npm start</code>

### Environment
  ```
  PORT=8000
  DB_FILE=db/dev.db
  JWT_SECRET=«generate_strong_secret_here»
  JWT_EXPIRES_IN=604800
  ```

### Database Setup
Run these commands in the Backend folder to seed data locally.
  ```
   npx dotenv sequelize db:migrate
   npx dotenv sequelize db:seed:all
  ```

## Contact Me
- If you have any questions or concerns, please email me at <code>BenjaminKHLau@gmail.com</code>
- You can find me on LinkedIn using this link: https://www.linkedin.com/in/benjaminkhlau/
