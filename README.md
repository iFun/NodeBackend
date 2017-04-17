# NodeJs backend, MongoDB, REST API 

[![Greenkeeper badge](https://badges.greenkeeper.io/iFun/NodeBackend.svg)](https://greenkeeper.io/)

This is my own project when I interned at Genesys, This is not the complete code base and can only be use as study purpose. 

## Quick Start
run npm install

You need to have your own mongoDB set up(/database/mongodb.js)

run node /routing/router

## Feature

* Parse log file(sample log file provided)
* Watch feedback folder if there is new log file automatically parse it and store into MongoDB
* An API that reads feedback data from the database and send out data with search ability as well as pagination 


## Goal
We are collecting feedbacks from customers across Genesys applications. Yet, we don't have an easy way to read through those file as they can be pretty complex and heavy to process.

This backend intends to serve as such and provide an API to easily and quickly access feedback data.


