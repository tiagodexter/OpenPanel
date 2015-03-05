# OpenPanel

OpenPanel is a web administration domains for FreeBSD systems.

For first stage, we working with users authentication and nginx configuration.
For second stage, we want make a DNS configuration. 

It is writed in [NodeJS](http://www.nodejs.org) with [Sails.js](http://www.sailsjs.org) Framework and [MySQL](http://www.mysql.com) databases.

Requirements.
NodeJS
MySQL
Nginx

For installation you just clone this project and install node modules.

# unzip master.zip
# cd openproject
# npm install

Now you need to change the database connection, just edit the file config/connections.js and change a few lines.

  openPanelMysql: {
    adapter: 'sails-mysql',
    host: 'HOST',
    user: 'USERNAME',
    password: 'PASSWORD',
    database: 'DATABASE'
  },


After all packages was installed, you just start the app.

# node app.js
