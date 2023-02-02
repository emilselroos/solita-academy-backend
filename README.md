# Solita Dev Academy pre-assignment

This is a pre-assignment for Solita Dev Academy 01/2023. Instructions for the assignment are in [Solita's repository](https://github.com/solita/dev-academy-2023-exercise). Frontend code for this project can be found from [this repository](https://github.com/emilselroos/solita-academy-frontend).

## Prerequisites

To run this project you should meet following prerequisites:

- [NPM](https://www.npmjs.com/) (v8.19.3)
- [Node.js](https://nodejs.org/en/) (v18.13.0)
- [PostgreSQL](https://www.postgresql.org/) (?)
- Basic knowledge of ``cmd`` usage

You can speed up your testing process with my pre-made Postman collection.

[Postman Collection for this project's REST API](https://lunar-flare-127862.postman.co/workspace/New-Team-Workspace~88c5da53-2423-418f-b34d-f736dc92a995/collection/5869225-5df65a67-1d14-4527-8f74-e8615a9e2a4e?action=share&creator=5869225)

## Notes on the exercise

I have a good knowledge of basic JavaScript and Node from the past. On the other, I wasn't too familiar with TypeScript beyond the syntax and some small exercises from Open University studies. I ended up choosing this technology stack to see what is it like to write an entire application with TypeScript - to be able to ship it in time but also to learn something new.

Sequelize have been my go-to ORM with JavaScript + Node combo and it has worked very well for me. During this project, I noticed that Sequelize actually lacks behind very badly when it comes to TypeScript support and best practices for that.

After a short googling TypeORM, for example, would most probably serve better in the future. As the backend was almost ready at that point, I didn't change the ORM on the fly.

Alongside Sequelize, Material UI has been a reliable tool for me for a long time. I decided to implement it in this project as well to be able to ship more production-ready-looking and feeling application without that much manual styling. This project doesn't use much if any ``styled`` components but they are my number one choice for customization.

What could be improved? My time was very limited for this pre-assignment which led to some compromises. In frontend pages and components could be divided more clearly and more smaller components could be used to respect React's best practices. There could also be more typing to get all out of TypeScript and the UI should be improved, for example, by disabling useless filters and so on. More and more detailed tests could be implemented.

## How to run this project?

### Backend

1. Clone this backend repository with Git or by downloading it.
``git clone https://github.com/emilselroos/solita-academy-backend``

2. Setup PostgreSQL database for the application.

3. Copy ``.env.example`` file in the root folder of the project. Rename it as ``.env`` and fill in your database details.

4. Run ``npm install`` in the root folder.

5. Build the project files: ``npm run build``.

6. Now run the application once by running ``npm run start`` to initialize the database before data migration.

7. Run the migration to get data from the datasets: ``npm run migrate:datasets``. Wait for the migration to get ready - it can take few minutes to finish.

8. Run the backend: ``npm run start``. Now your API server is (hopefully) running at http://localhost:4820/. You can test if everything is okay by visiting [http://localhost:4820/test](http://localhost:4820/test) which should return ``OK!`` if you are good to go.

### Frontend

1. Clone frontend repository with Git or download it.
``git clone https://github.com/emilselroos/solita-academy-frontend``

2. Run ``npm install`` in the root folder.

3. Run ``npm run start`` and head to [http://localhost:3000](http://localhost:3000).

### Tests

1. For the tests to run reliably, you should execute them againt a clear database. You can clear it by simply running premade resetting script ``npm run migrate:tests``. Note that this command clears your database.

2. You have to have both backend and frontend applications up and running.

2. To run E2E tests for this project, head into backend folder in your ``cmd``.

3. From there you can run tests by running ``npm run cypress:run``.
