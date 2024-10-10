# 🗓️ ChuCalendar

Welcome to **ChuCalendar**! This is my first webpage project so if you have any suggestions please share ,  I created a  calendar application where you can keep your alimentation and exercise progress, ideal for people like me that has to measure everything. The first Fase is completed, it has a basic curls of exercises,meals and routines, as well as the day management.I started this proyect alone but with a group we are going to add more functionalities like tracking progress, gym tracker, weight, a new fresh UI.. etc.

**Update** Im going to continue this proyect with a few friends, ill create another repository, I wont delete this one bc its my first one.
## I used

- **React**: A JavaScript library for building user interfaces.
- **React Bootstrap**: A library that provides components
- **Golang** : Used for building the backend of the application.
- **MariaDB**: The database management system .


## How to set up

1. **Database**: The database structure can be found in the `db` directory of this project. You must have an existing empty mysql/mariadb db with the admin user.
  Copy the database files to your local MariaDB instance using 

   ```bash
   mysql -u username -p database_name < path_to_db_file.sql

2. **Backend**: First create an .env file and store your db credentials, also by default the socket is listeing in the 8080 port, you can change it
    ```bash
    usuariodb=user of de db
    passdb=password of the db

 Execute/compile Go proyect
    ```bash
    go run main/main.go```

3. **FrontEnd** : install node_modules using npm and then execute.
 ```bash
    npm install
    npm run dev
