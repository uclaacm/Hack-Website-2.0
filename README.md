<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Hack-Website-2.0](#hack-website-20)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
    - [Installation](#installation)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Hack-Website-2.0

Welcome to the revamp of the UCLA ACM Hack website. Now featuring the Ghost blogging platform.



### Prerequisites

You must have Node.js 6.9.0 and MongoDB installed.

To update your Node version, follow the instructions [here](https://davidwalsh.name/upgrade-nodejs)

Visit the [MongoDB docs to install MongoDB](https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-os-x/)

If you want to run the Ghost server locally, Postgres must be installed and you must set the environment variable `DATABASE_URL` which has the complete `postgres://` URI for the database, containing the username, password, host, port, and database. To run the ghost server, the app must be run in production mode.



### Setup

Make sure the mongo server is running

```shell
$ mongod --dbpath ~/.mongodb
```



### Installation

Installing the new website is easy. Simply clone this repository and run:

```shell
$ npm install --production
$ npm start
```
To additionally run webpack:

```shell
$ npm run webpack
```


