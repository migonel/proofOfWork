# proofOfWork
Author: Lucas Migone

This is a project of my own. It started as a way of learning and practicing different topics:
- Blockchain concepts
- Blockchain coding
- Api concept
- Front End Concept
- Hosting the application on the cloud in different ways.

The project as a whole intends to educate in an easy and visual manner about how mining a block in a blockchain works.
This particular repository is just one part of the project. The backend, coded in node.js, and an API so i can consume it on the frontend.

It consists on a couple of files:
- block.js: contains block structure and its methods.
- transaction.js: contains transaction structure
- blockchain.js: contains blockchain structure and its methods. You could say its the heart of the app.
- app.js: api. On the first version its hosted locally, listening on port 3000.

Libraries used:
- express: to create a server to host the api
- crypto: used to create a hash using sha256
