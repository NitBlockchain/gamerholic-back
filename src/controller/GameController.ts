import { createConnection, getConnectionManager, getConnection, getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import * as moment from "moment";
import { user } from "../entity/user";
const DUSER = user
import { chat } from "../entity/chat";
const DCHAT = chat
import { tournaments } from "../entity/tournament";
const DTOURNY = tournaments
import { referee } from "../entity/refs";
const DREF = referee
// import { Game } from "../entity/Game";
const uniqid = require('uniqid');
import { hash, compare } from 'bcryptjs';
import * as bcrypt from "bcryptjs";
import { $log } from "ts-log-debug";

import { AuthService } from "../service/AuthService"
let authservice = new AuthService();

import { EmailService } from "../service/EmailService";
let emailservice = new EmailService();
// 73f11d88-4018-47e4-808d-ada2ecaa2a2f
// xpub6BpWC6XtHVKg89x9iWwzrdiaHzqm4TZExZgTkLJ1EAosQa3iDt7K41SSQUGwKoTum2EUGsXHAkvRr1Si8rKfNz7S9uWvgAtJbABBzw1jMQn
const math = require('mathjs')


import fetch from 'node-fetch';
///https://www.npmjs.com/package/node-fetch
const QRCode = require('qrcode')

const axios = require('axios');
const poster = axios.create();
poster.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

///https://github.com/axios/axios

const crypto = require('crypto');

const ENCRYPTION_KEY: any = process.env.ENCRYPTION_KEY; // Must be 256 bytes (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

const randtoken = require('rand-token');
const saltRounds = 10;

const salt = bcrypt.genSaltSync(saltRounds);
const querystring = require('querystring');
const nonce = require('nonce')();
///https://www.npmjs.com/package/nonce
///https://github.com/axios/axioss
const POST = axios.create();
POST.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const phpI = axios.create({
  baseURL: 'https://grabit.cheap'
});
phpI.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

var WALLETBTC = require('blockchain.info/MyWallet')
let options = { apiCode: process.env.BTC_API, apiHost: 'https://btc.gamerholic.com', secondPassword: process.env.BTC_PASS_2 }
let BTCWALLET = new WALLETBTC(process.env.BTC_GUID, process.env.BTC_PASS, options)
////https://github.com/blockchain/api-v1-client-node/tree/e3c1189bb130b29f9ee07c0a954e99f1576aa2fd/MyWallet

let convertBTC = require('bitcoin-units');
///https://www.npmjs.com/package/bitcoin-units

var sb = require('satoshi-bitcoin');
///https://www.npmjs.com/package/satoshi-bitcoin

import countryTelephoneCode, { countries } from "country-telephone-code";
const fs = require('fs');
const COUNTRY = require("./data.json");
//
export class GameController {

  private encrypt(text: string) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  private decrypt(text: string) {
    const textParts = text.split(':');
    const iv = new Buffer(textParts.shift(), 'hex');
    const encryptedText = new Buffer(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }

  randomString = function(length) {

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;

  }

  functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {

    for (var i = 0; i < arraytosearch.length; i++) {

      if (arraytosearch[i][key] == valuetosearch) {
        return i;
      }
    }
    return null;
  }

  async gTOURNYS(request: Request, response: Response, next: NextFunction) {

    try {
      const token = request.body.token;
      const user = request.body.user;

      let auth: any = await authservice.auth(user, token)
      if (auth.success) {

        let tourny = await DTOURNY.bTOURNAMENTS()
        let payload = await Promise.all([tourny])

        const json = { success: false, payload: payload }
        response.statusCode = 200;
        response.send(json)

      } else {

        const json = { success: false, message: 'login' }
        response.statusCode = 200;
        response.send(json)

      }

    } catch (err) {
      $log.info('gUSER error ' + err)

    }
  }

  async refOnline(request: Request, response: Response, next: NextFunction) {

    try {
      const token = request.body.token;
      const user = request.body.user;
      const game = request.body.game;

      let auth: any = await authservice.auth(user, token)
      if (auth.success) {

        let USER = auth.payload
        let ref = await DREF.gREF(user)
        if (ref) {

          if (Array.isArray(USER.gamesPlayed)) {
            let l = USER.gamesPlayed.length

            if (l < 10) {

              const json = { success: false, message: "play at least 10 games before you can start referring other games. Your games can be free games." }
              response.statusCode = 200;
              response.send(json)

            } else {

              ///user has played more than 10 games, they can go online as a ref
              if (ref.online > 0) {

                ref.online = 0
                ref.profile.game = game
                DREF.save(ref)
                  .then(() => {

                    const json = { success: false, message: "you are offline" }
                    response.statusCode = 200;
                    response.send(json)

                  })

              } else {

                ref.online = 1
                ref.profile.game = game
                DREF.save(ref)
                  .then(() => {

                    const json = { success: false, message: "you are online" }
                    response.statusCode = 200;
                    response.send(json)

                  })
              }


            }

          } else {

            ///user should play more games
            const json = { success: false, message: "play at least 10 games before you can start referring other games. Your games can be free games." }
            response.statusCode = 200;
            response.send(json)

          }

        } else {

          ///add user as a referee
          $log.info("creating new ref")
          let n: any = new DREF()
          n.user = user
          n.active = 1
          n.profile = {
            avatar: USER.profile.avatar,
            name: USER.profile.name,
            game: game,
            disputes: 0
          }
          n.online = 0
          n.games = []

          DREF.save(n)
            .then(() => {

              const json = { success: true, message: "referee account created" }
              response.statusCode = 200;
              response.send(json)

            })
        }

      } else {

        const json = { success: false, message: 'login' }
        response.statusCode = 200;
        response.send(json)

      }

    } catch (err) {
      $log.info('ref online error ' + err)

    }
  }

  async createSponsorWallet(request: Request, response: Response, next: NextFunction) {

    try {
      const token = request.body.token;
      const user = request.body.user;
      const split = request.body.split;
      const game = request.body.game;
      let amount = request.body.amount;

      let auth: any = await authservice.auth(user, token)
      if (auth.success) {

        let USER = auth.payload
        let WALLET: any = USER.wallet

        let balance = WALLET[0].btc[0].btc_balance

        let usd_value = await poster.get('https://api.coindesk.com/v1/bpi/currentprice/USD.json')
        let btc_value = usd_value.data.bpi.USD.rate.replace(/,/g, '');
        let Tfee = await poster.get('https://bitcoinfees.earn.com/api/v1/fees/recommended')
        let Tfee_OG = Tfee.data.fastestFee
        Tfee = Tfee_OG

        let balanceUSD = math.multiply(btc_value, balance)

        if (balanceUSD < amount) {

          const json = { success: false, message: 'insufficient balance' }
          response.statusCode = 200;
          response.send(json)

        } else {

          ///user has enough to create the challenge wallet
          if (Array.isArray(USER.walletsponsor)) {

            let options = { label: 'sponsor wallet' + user }
            let btc = await BTCWALLET.newAddress(options)
            let qr = await QRCode.toDataURL(btc.address)
            let balance = 0

            let o: any = new Object()
            o.address = btc.address
            o.qr = qr
            o.balance = 0
            o.player = null
            o.playerName = null
            o.game = game
            o.spilt = split
            o.amount = amount
            o.earnings = 0
            o.win = 0
            o.loss = 0
            o.active = 1
            o.claimed = 0
            o.sponsor = user
            o.sponsorName = USER.profile.name
            o.sponsorAvatar = USER.profile.avatar
            USER.walletsponsor.push(o)

            amount = math.divide(amount, btc_value)
            amount = sb.toSatoshi(amount);

            let payAddress = btc.address
            let payTo: any = { [payAddress]: parseFloat(amount) };
            let ops = {
              from: WALLETBTC.btc_address,
              feePerByte: Tfee_OG,
            }
            BTCWALLET.sendMany(payTo, options)
              .then((jordi: any) => {

                let txid = jordi.data.tx_hashs
                if (txid) {

                  const json = { success: true, message: 'wallet created' }
                  response.statusCode = 200;
                  response.send(json)

                } else {

                  const json = { success: false, message: 'insufficient balance' }
                  response.statusCode = 200;
                  response.send(json)

                }

              })

          } else {

            let options = { label: 'sponsor wallet' + user }
            let btc = await BTCWALLET.newAddress(options)
            let qr = await QRCode.toDataURL(btc.address)
            let balance = 0

            let B = []
            let o: any = new Object()
            o.address = btc.address
            o.qr = qr
            o.balance = 0
            o.player = null
            o.playerName = null
            o.game = game
            o.spilt = split
            o.amount = amount
            o.earnings = 0
            o.win = 0
            o.loss = 0
            o.active = 0
            o.claimed = 0
            o.sponsor = user
            o.sponsorName = USER.profile.name
            o.sponsorAvatar = USER.profile.avatar
            B.push(o)

            USER.walletsponsor = B

            amount = math.divide(amount, btc_value)
            amount = sb.toSatoshi(amount);

            let payAddress = btc.address
            let payTo: any = { [payAddress]: parseFloat(amount) };
            let ops = {
              from: WALLETBTC.btc_address,
              feePerByte: Tfee_OG,
            }
            BTCWALLET.sendMany(payTo, options)
              .then((jordi: any) => {

                let txid = jordi.data.tx_hashs
                if (txid) {

                  const json = { success: true, message: 'wallet created' }
                  response.statusCode = 200;
                  response.send(json)

                } else {

                  const json = { success: false, message: 'insufficient balance' }
                  response.statusCode = 200;
                  response.send(json)

                }

              })
          }

        }


      } else {

        const json = { success: false, message: 'login' }
        response.statusCode = 200;
        response.send(json)

      }

    } catch (err) {
      $log.info('gUSER error ' + err)

    }
  }

  async gREFS(request: Request, response: Response, next: NextFunction) {

    try {
      const token = request.body.token;
      const user = request.body.user;

      let auth: any = await authservice.auth(user, token)
      if (auth.success) {

        let tourny = await DTOURNY.bTOURNAMENTS()
        let payload = await Promise.all([tourny])

        const json = { success: false, payload: payload }
        response.statusCode = 200;
        response.send(json)

      } else {

        const json = { success: false, message: 'login' }
        response.statusCode = 200;
        response.send(json)

      }

    } catch (err) {
      $log.info('gUSER error ' + err)

    }
  }

  async gTOURNY(request: Request, response: Response, next: NextFunction) {

    try {
      const token = request.body.token;
      const user = request.body.user;
      const id = request.body.id;

      let auth: any = await authservice.auth(user, token)
      if (auth.success) {

        let tourny = await DTOURNY.gTournament(id)
        let payload = await Promise.all([tourny])

        const json = { success: false, payload: payload }
        response.statusCode = 200;
        response.send(json)

      } else {

        const json = { success: false, message: 'login' }
        response.statusCode = 200;
        response.send(json)

      }

    } catch (err) {
      $log.info('gUSER error ' + err)

    }
  }


  async COPYTHIS(request: Request, response: Response, next: NextFunction) {

    try {
      const token = request.body.token;
      const user = request.body.user;
      const gID = request.body.gID;

      let auth: any = await authservice.auth(user, token)
      if (auth.success) {


      } else {

        const json = { success: false, message: 'login' }
        response.statusCode = 200;
        response.send(json)

      }

    } catch (err) {
      $log.info('gUSER error ' + err)

    }
  }

}
