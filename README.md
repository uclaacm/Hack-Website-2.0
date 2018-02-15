<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Hack-Website-2.0](#hack-website-20)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Hack-Website-2.0

The UCLA ACM Hack website revamp.


### Prerequisites

You must have Docker installed. 

* For Mac users:
  1. Install [Homebrew](https://brew.sh/) if you haven't already. 
  2. `brew install docker`
  3. `brew install docker-compose`
  4. `brew install node`
  5. `make build`

* For windows users:
  1. Install Docker
      * Windows 10 Pro: https://docs.docker.com/docker-for-windows/install/
      * Windows 10 Home and below: https://docs.docker.com/toolbox/toolbox_install_windows/
  2. If you have Windows 10 Pro and don't have `docker-compose` yet, go to https://docs.docker.com/compose/install/#install-compose to install Docker Compose.
  3. Go to https://nodejs.org/en/download/ to install node.js
  4. `make build`


### Setup

Run the following to get your server up at `localhost:5000`

```shell
$ make up
```

In another terminal window or tab (`CMD+T` for Mac or `CTRL+T` for PC), run the following to enter the alpine shell:

```Bash
$ make ash
```

Once you're in the alphine shell, run the following to enable hot-reloading with webpack:

```Bash
# npm run dev
```



### Notes

- If the data stored in the Mongo database is not particularly important to you, to prevent schema conflicts from causing confusing problems, reset the database by running `npm run reset-database`
- Redis is an **in-memory database**. If you shutdown your computer or kill the redis server, sessions will not persist. If you need to shut down your computer or restart the redis server *and* want the data in the database to be restored the next time, make sure to run the command `redis-cli shutdown` to safely shutdown the server.