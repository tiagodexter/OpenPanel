# OpenPanel

OpenPanel is a web administration domains for FreeBSD systems.

For first stage, we working with users authentication and nginx configuration.
For second stage, we want make the DNS configuration. 

It was wrote with [NodeJS](http://www.nodejs.org) with [Sails.js](http://www.sailsjs.org) Framework and [NeDB](https://www.npmjs.com/package/sails-nedb) database.

Requirements.
FreeBSD
NodeJS
Nginx

For installation you just clone this project and install node modules.
```
$ git clone https://github.com/tiagodexter/OpenPanel.git openpanel
$ cd openproject
$ npm install
```

If you want to change some informations about configuration files, initialization script, you just need to change options in definitions file:
```
openproject/config/definitions.js
```

After all packages was installed, you just start the app.
```
$ node app.js
```