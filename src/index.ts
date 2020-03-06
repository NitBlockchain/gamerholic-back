import "reflect-metadata";
import { createConnection } from "typeorm";
import { $log } from "ts-log-debug";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
import fetch from 'node-fetch';
const MyWallet = require('blockchain.info/MyWallet')
import * as config from '../ormconfig';
import { user } from "./entity/user";
const axios = require('axios');
///https://github.com/axios/axios
const btcInstance = axios.create({
  baseURL: 'http://btc.gamerholic.com'
});
btcInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

var WALLETBTC = require('blockchain.info/MyWallet')
let options = { apiCode: process.env.BTC_API, apiHost: 'https://www.btc.gamerholic.com', secondPassword: process.env.BTC_PASS_2 }

let BTCWALLET = new WALLETBTC(process.env.BTC_GUID, process.env.BTC_PASS, options)

createConnection().then(async connection => {

  // await connection.runMigrations();
  // create express app
  const app = express();
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  //app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  // app.use(bodyParser.json());
  app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST, GET");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
  });


  // { guid: '207385ba-2a95-4d62-8ac7-596c5825ee63',
  //   address:
  //    'xpub6D2BPFfeMonQYy8uzfHbsYriMbJUrNS5tDPvGb8jQ6bHHQ3X9n4F4ZJLbzXcqtR6N2s27yxPkEd5VMc7TWa4xorCJbPJ3XCdcMXc3k14hEv',
  //   label: 'gamerholic' }

  // var options = { apiCode: 'f497d0a5-23ef-447b-81e9-fdd9f1ffaf21', apiHost: 'http://localhost:3000' }
  // var wallet = new MyWallet('d56c3c52-c84c-418f-85ff-318ac2cdb6e9', encodeURIComponent('***SengbeShip2121***'), options)
  // wallet.getBalance().then(function(response) { console.log('My balance is %d!', response.balance); })

  Routes.forEach((route: any) => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
      const result = (new (route.controller as any))[route.action](req, res, next);
      if (result instanceof Promise) {
        result.then(result_ => result_ !== null && result_ !== undefined ? res.send(result_) : undefined);

      } else if (result !== null && result !== undefined) {
        // $log.info(route.route)
        res.json(result);
      }


    });
  });



  //fetch('https://api.owo.world/deamon')
  // fetch('https://api.owo.world/websocket')

  app.listen(3000);

  console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
