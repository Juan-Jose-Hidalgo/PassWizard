# 🔑 **PassWizard** 🧙‍♂️
### 🇬🇧 English | 🇪🇸 [Español](./docs/LEEME.md)
PassWizard is an application for generating and managing passwords securely. It is developed in Angular 15 and uses angular-cli.

## 🔧 **Installation**
### 🛠️ ***Prerequisites***
To be able to use PassWizard, you need the following prerequisites:

- Node.js (version 15 or higher)
- Angular CLI (version 15 or higher)
- Firebase CLI (optional)
### 💻 ***Local Installation***
1. Download or clone the PassWizard repository.
2. Unzip server.zip located in the server folder. This is the REST API that PassWizard needs to function correctly. Once the REST API is unzipped, you should move it to another folder on your computer. The REST API has its own LEEME.md file that you should read to configure it correctly.
3. Open a terminal and navigate to the project directory.
4. Run the command ``npm install`` to install the project dependencies.
### ☁️ ***Online Installation***
PassWizard is intended to be deployed on Firebase. To perform the online installation, you need to configure a project in Firebase and deploy it:

### 🚀 ***Firebase Deployment***
To deploy the application on Firebase, follow these steps:

1. Create a project in Firebase.
2. Install Firebase CLI on your machine with the command ``npm install -g firebase-tools``.
3. Log in to Firebase CLI with the command ``firebase login``.
4. In the project folder, run the command ``ng build --configuration=production`` to compile the application in production mode.
5. Run the ``firebase init`` command and follow the steps to initialize the Firebase project.
6. Run the ``firebase deploy`` command to deploy the application on Firebase.
   
Remember that you need to have the server application configured to work correctly.

## 🤖 **Usage**
### 🖥️ ***Local Usage***
1. Run the application with the command npm run start.
2. Open the address http://localhost:4200/ in your browser.
3. Log in or register to access the application functionalities.
### 🌐 ***Online Usage***
Access the URL provided by Firebase. For example: https://passwizard.firebaseapp.com
Log in or register to access the application functionalities.
## ***Author Information*** 👨‍💻
#### 🙋‍♂️ Name: Juan José Hidalgo
#### 🐙 GitHub: https://github.com/Juan-Jose-Hidalgo
#### 💼 Visit my profile on [LinkedIn](https://www.linkedin.com/in/juan-jos%C3%A9-hidalgo-ya%C3%B1ez-854698b4/)
#### 📨 Email: juanhidalgoyanez@gmail.com
## 📝 ***License***
This project is licensed under the MIT License. See the [LICENSE](./docs/LICENSE.md) file for more details.