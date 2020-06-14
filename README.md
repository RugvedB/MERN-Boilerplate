<h1 align = 'center'> MERN-Boilerplate </h1>

<div align="center">

[![](https://img.shields.io/badge/Made_with-Nodejs-green?style=for-the-badge&logo=node.js)](https://nodejs.org/en/)
[![](https://img.shields.io/badge/Made_with-ReactJS-blue?style=for-the-badge&logo=react)](https://reactjs.org/docs/getting-started.html)
[![](https://img.shields.io/badge/Database-MongoDB-red?style=for-the-badge&logo=mongodb)](mongodb.com "MongoDB")

</div>

### Features

- This boilerplate contains react hooks components, higher order components ,mail verification (sign up ,password reset) ,login ,sample secured and open routes.
- No user with non existing mail id will have access to secured routes.
- No need to use complex redux boiler plate for creating store.
- Store is implemented using <strong>useRedux + useContext</strong>. 
- Ready to use for any MERN stack project.



------------------------------------------
###             Tech stack
`Backend` : NodeJS<br>
`Database` : MongoDB<br>
`Frontend` : ReactJS <br>

------------------------------------------
### Installation

Clone the repository and install node modules
```
git clone https://github.com/RugvedB/MERN-Boilerplate.git
cd MERN-Boilerplate/
cd client
npm i
cd ../backend
npm i
```
Now create  .env file
```
touch .env
```

Fill .env with relevant information as follows
```
PORT=8000
mongoURI= ENTER YOUR MONGOURI HERE
server_base_url=http://localhost:8000
mail_id= ENTER YOUR MAIL ID FROM WHICH VERIFICATION,PASSWORD RESET MAIL WILL BE SENT.
mail_pass= ENTER PASSWORD OF YOUR MAIL ID
SECRET_KEY= somerandomcomplexstring
```

Now we can start the backend server by using the following command
```
node index.js 
```

To start frontend server go to root directory and follow the steps(on a new terminal)
```
cd client
npm start
```

Checkout the site on <a href="http://localhost:3000/register">http://localhost:3000/register</a>



