# Solita Dev Academy pre-assignment

This is a pre-assignment for Solita Dev Academy 01/2023. Instruction for the assignment are in [Solita's repository](https://github.com/solita/dev-academy-2023-exercise). Frontend code for this project can be found from [this repository](https://github.com/emilselroos/solita-academy-frontend).

## Prerequisites

To run this project you should meet following prerequisites:

- [NPM](https://www.npmjs.com/) (v8.19.3)
- [Node.js](https://nodejs.org/en/) (v18.13.0)
- [PostgreSQL](https://www.postgresql.org/) (?)
- Basic knowledge of ``cmd`` usage

You can speed up your testing process with my pre-made Postman collection.

[Postman Collection for this project's REST API](https://lunar-flare-127862.postman.co/workspace/New-Team-Workspace~88c5da53-2423-418f-b34d-f736dc92a995/collection/5869225-5df65a67-1d14-4527-8f74-e8615a9e2a4e?action=share&creator=5869225)

## How to run this project?

1. Clone this backend repository with Git or by downloading it.
``git clone https://github.com/emilselroos/solita-academy-backend``

2. Setup PostgreSQL database for the application.

3. Copy ``.env.example`` file in the root folder of the project. Rename it as ``.env`` and fill in your database details.

4. Run ``npm install`` in the root folder.

5. Build the project files: ``npm run build``.

6. Run the migration to get data from the datasets: ``npm run migrate:datasets``. Wait for the migration to get ready - it can take few minutes to finish.

7. Run the backend: ``npm run start``. Now your API server is (hopefully) running at http://localhost:4820/. You can test if everything is okay by visiting [http://localhost:4820/test](http://localhost:4820/test) which should return ``OK!`` if you are good to go.

8. (Frontend part under construction.)
