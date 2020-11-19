import express from 'express';
import bodyParser from 'body-parser'
import compression from 'compression';
import * as sapper from '@sapper/server';
import sirv from 'sirv'

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

express() // You can also use Express
  .use(bodyParser.json())
	.use(
	  '/',
		compression({ threshold: 0 }),
    sirv('static', { dev }),
		sapper.middleware({
        session: req => {
          return ({
            headers: req.headers
          })
        }
      }
    )
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
