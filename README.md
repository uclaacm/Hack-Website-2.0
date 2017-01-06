<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Hack-Website-2.0](#hack-website-20)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
    - [Installation](#installation)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Hack-Website-2.0

The UCLA ACM Hack website revamp.



### Prerequisites

You must have Node.js >=6.9.0 <=6.9.2, Redis, and MongoDB installed.

To update your Node version, follow the instructions [here](https://davidwalsh.name/upgrade-nodejs).

Visit the [MongoDB docs](https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-os-x/) to install MongoDB.

See the [Redis Docs](https://redis.io/download) to install Redis



### Setup

Make sure the mongo server is running

```shell
$ mongod --dbpath ~/.mongodb
```

In another window, make sure the redis server is running

```Bash
$ redis-server
```



### Installation

Installing the website by cloning this repository and running:

```shell
$ npm install
$ npm run webpack-production
```
Then start the website:

```Bash
$ npm start
```



### Notes

- Everytime you pull from the repository, make sure to run `npm install` incase any of the dependencies have changed.
- If the data stored in the Mongo database is not particularly important to you, to prevent schema conflicts from causing confusing problems, reset the database by running `npm run reset-database`
- Redis is an **in-memory database**. If you shutdown your computer or kill the redis server, sessions will not persist. If you need to shut down your computer or restart the redis server *and* want the data in the database to be restored the next time, make sure to run the command `redis-cli shutdown` to safely shutdown the server.