import { createConnection, getConnectionManager, getConnection, getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import * as moment from "moment";
import { user } from "../entity/user";
const DUSER = user
import { chat } from "../entity/chat";
const DCHAT = chat
import { game } from "../entity/challenges";
const DGAME = game
// import { Game } from "../entity/Game";

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
const accountSid = 'ACbbc227cd6b30229125cad037a2d76225'; // Your Account SID from www.twilio.com/console
const authToken = '520b227fda723c9da32633ad71a9f7b2';   // Your Auth Token from www.twilio.com/console

const twilio = require('twilio')
const TwilioClient = new twilio(accountSid, authToken);
///https://github.com/axios/axios
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

// const googleMapsClient = require('@google/maps').createClient({
//   key: process.env.GOOGLE
// });
export class UserController {



  // private encrypt(text: string) {
  //   const iv = crypto.randomBytes(IV_LENGTH);
  //   const cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
  //   let encrypted = cipher.update(text);
  //
  //   encrypted = Buffer.concat([encrypted, cipher.final()]);
  //
  //   return iv.toString('hex') + ':' + encrypted.toString('hex');
  // }

  // private decrypt(text: string) {
  //   const textParts: any = text.split(':');
  //   const iv = Buffer.alloc(textParts.shift(), 'hex');
  //   const encryptedText = Buffer.alloc(textParts.join(':'), 'hex');
  //   const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.alloc(ENCRYPTION_KEY), iv);
  //   let decrypted = decipher.update(encryptedText);
  //
  //   decrypted = Buffer.concat([decrypted, decipher.final()]);
  //
  //   return decrypted.toString();
  // }
  private encrypt(text) {

    var mykey = crypto.createCipher('aes-128-cbc', ENCRYPTION_KEY);
    var mystr = mykey.update(text, 'utf8', 'hex')
    mystr += mykey.final('hex');
    return mystr;
  }
  private decrypt(text) {

    var mykey = crypto.createDecipher('aes-128-cbc', ENCRYPTION_KEY);
    var mystr = mykey.update(text, 'hex', 'utf8')
    mystr += mykey.final('utf8');
    return mystr
  }

  functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {

    for (var i = 0; i < arraytosearch.length; i++) {

      if (arraytosearch[i][key] == valuetosearch) {
        return i;
      }
    }
    return null;
  }
  randomString = function(length) {

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;

  }

  async gUSER(request: Request, response: Response, next: NextFunction) {

    try {

      const token = request.body.token;
      const user = request.body.user;
      const lat = request.body.lat;
      const lng = request.body.lng;
      let OWOVALUE;
      // $log.info('getting user')

      let authen: any = await authservice.auth(user, token)
      if (authen.success) {
        $log.info("getting user")
        // let getCode = await poster.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=18.3237984,121.6288586&key=AIzaSyCPdrnYlWJAsdBHMOmXPVUdg6jlsrxFP2s')
        // let country = getCode.data.results[0].address_components[4].short_name
        // countryCode = this.getCountryCode(country)

        ///get  current  btc  price
        let usd_value = await poster.get('https://api.coindesk.com/v1/bpi/currentprice/USD.json')
        let btc_value = usd_value.data.bpi.USD.rate.replace(/,/g, '');
        let Tfee = await poster.get('https://bitcoinfees.earn.com/api/v1/fees/recommended')
        Tfee = sb.toSatoshi(Tfee.data.fastestFee);
        let Tfee_usd = btc_value * Tfee

        // $log.info(authen.payload)
        // let wins: any = await Game.bUSERWINS(user)
        let USER: any = authen.payload
        let WALLET: any = USER.wallet
        let options = {

        }
        // $log.info(WALLET[0].owo[0])

        if (!WALLET[0].owo[0]) {
          $log.info(2)

          const rand1 = randtoken.generate(6);
          const rand2 = randtoken.generate(18);
          const rand3 = randtoken.generate(9);
          let Wemail = 'owo@' + rand1 + 'owo' + rand2 + 'owo' + rand3

          //generate owo address
          phpI.post('/session.php?type=register&email=' + Wemail)
            .then(async (doc: any) => {

              if (doc.data.address) {

                // $log.info(doc.data.key)
                let k = doc.data.key
                let s = doc.data.secret
                // $log.info(doc)
                // let secret = this.encrypt(s)
                // let key = this.encrypt(k)
                let o: any = new Object()
                o.owo_address = doc.data.address
                o.owo_balance = 0
                o.secret = s
                o.key = k
                //
                let qr = await QRCode.toDataURL(doc.data.address)
                o.owo_qr = qr

                WALLET[0].owo.push(o)
                DUSER.save(USER)

              } else {
                $log.info(doc)

              }
            })

        } else {
          $log.info(1)

          ////get the  users balance
          let key = WALLET[0].owo[0].key
          let secret = WALLET[0].owo[0].secret
          // $log.info(key, secret)
          await phpI.post('/gamerholic.php?type=balance&key=' + this.decrypt(key) + '&secret=' + this.decrypt(secret))
            .then(async (res: any) => {
              // $log.info(res.data)
              let OWObalance = res.data.balance
              WALLET[0].owo[0].owo_balance = res.data.balance

              POST.get('https://api-r.bitcoinchain.com/v1/status')
                .then(async (doc: any) => {

                  let diffOWO = res.data.diffOWO
                  let difficulty = doc.data.difficulty
                  let percent = math.divide(diffOWO, difficulty)
                  // $log.info(btc_value, percent)
                  let owo_price = math.multiply(btc_value, percent).toFixed(15)

                  OWOVALUE = math.divide(.10, owo_price).toFixed(8)
                  let tools = math.divide(10000000, OWOVALUE).toFixed(8)
                  // $log.info(OWOVALUE, owo_price)
                  // $log.info(doc.data)
                  DUSER.save(USER)
                })

            })

        }


        await BTCWALLET.getAddress(WALLET[0].btc[0].btc_address, options)
          .then((res: any) => {
            // $log.info(WALLET[0].btc[0].btc_address)
            // $log.info(res)
            let amount;
            if (res.balance) {

              amount = sb.toBitcoin(res.balance);
            } else {
              amount = 0
            }
            if (lat && lng) {
              USER.lat = lat
              USER.lng = lng
            }
            WALLET[0].btc[0].btc_balance = amount
            DUSER.save(USER)
              .then(async (jordi: any) => {

                //get users active  games
                let games = await DGAME.bMyGames(user)
                // $log.info(games)
                let payload = await Promise.all([jordi, games])
                // $log.info(OWOVALUE)
                const json = { success: true, payload: payload, btc_value: btc_value, btc_fee: Tfee, btc_fee_usd: Tfee_usd, owoValue: OWOVALUE }
                response.statusCode = 200;
                response.send(json)

              })
          }, (error) => {

            const json = { success: false, message: 'error address' }
            response.statusCode = 200;
            response.send(json)

          })


        // $log.info(amount)

        // $log.info(business[0].profile[0])


      } else {

        $log.info('couldn\'t get user')
        const json = { success: false, message: 'login' };
        response.statusCode = 200;
        response.send(json)

      }
    } catch (err) {
      $log.info('gUSER error ' + err)

    }
  }

  async gPROFILE(request: Request, response: Response, next: NextFunction) {

    try {

      const token = request.body.token;
      const user = request.body.user;
      const profile = request.body.profile;

      let authen: any = await authservice.auth(user, token)
      if (authen.success) {
        ///global chat
        await DUSER.gID(profile)
          .then(async (user: any) => {

            $log.info(profile)
            const json = { success: true, payload: user }
            response.statusCode = 200;
            response.send(json)

          })


      } else {

        const json = { success: false, message: 'login to view profile' }
        response.statusCode = 200;
        response.send(json)

      }

    } catch (err) {
      $log.info('gProfile error ' + err)

    }
  }

  async gGAME(request: Request, response: Response, next: NextFunction) {

    try {

      const token = request.body.token;
      const user = request.body.user;
      const challenge = request.body.challenge;

      let authen: any = await authservice.auth(user, token)
      if (authen.success) {
        ///global chat
        $log.info(challenge)
        await DGAME.gChallenge(challenge)
          .then(async (game: any) => {

            const json = { success: true, payload: game }
            response.statusCode = 200;
            response.send(json)

          })


      } else {

        const json = { success: false, message: 'login to view game' }
        response.statusCode = 200;
        response.send(json)

      }

    } catch (err) {
      $log.info('gGAME error ' + err)

    }
  }

  async CHALLENGE(request: Request, response: Response, next: NextFunction) {

    try {

      const token = request.body.token;
      const user = request.body.user;
      const opponent = request.body.opponent;
      const game = request.body.game;
      const amount = request.body.amount;
      const rules = request.body.rules;
      const type = request.body.type;
      let authen: any = await authservice.auth(user, token)
      if (authen.success) {
        ///global chat
        let USER = authen.payload
        let WALLETBTC = authen.payload.wallet[0].btc[0]
        let WALLETOWO = authen.payload.wallet[0].owo[0]
        // $log.info(WALLETOWO)

        let gameNAME = game
        //  let gameRULES = rules
        await DUSER.gID(opponent)
          .then(async (opp: any) => {

            let DOP = opp
            let OPWALLETBTC = opp.wallet[0].btc[0]
            let OPWALLETOWO = opp.wallet[0].owo[0]

            ///check if opponent is in another game
            await DGAME.bMyGames(opponent)
              .then(async (jordi: any) => {
                if (jordi && jordi.active > 0) {

                  const json = { success: false, message: 'your opponent is in another game, score that 1st' }
                  response.statusCode = 200;
                  response.send(json)

                } else {

                  await DGAME.bMyGames(user)
                    .then(async (jordi: any) => {
                      if (jordi && jordi.active > 0) {

                        const json = { success: false, message: 'your are in another game, score that 1st' }
                        response.statusCode = 200;
                        response.send(json)

                      } else {


                        ///neither players are in an active
                        let USD;
                        if (type != 2) {

                          USD = amount.replace(/\D/g, '');

                        } else {
                          USD = 0
                        }
                        // $log.info(USD)
                        if (USD > 0) {

                          let usd_value = await poster.get('https://api.coindesk.com/v1/bpi/currentprice/USD.json')
                          let btc_value = usd_value.data.bpi.USD.rate.replace(/,/g, '');
                          let Tfee = await poster.get('https://bitcoinfees.earn.com/api/v1/fees/recommended')
                          Tfee = sb.toSatoshi(Tfee.data.fastestFee);
                          let Tfee_usd = btc_value * Tfee
                          let fee = math.multiply(USD, .10)
                          // USD = math.add(USD, fee)
                          let BTC = math.divide(USD, btc_value)
                          let BTC_SAT = sb.toSatoshi(BTC);

                          let BTC_FEE = math.divide(fee, btc_value)
                          let BTC_FEE_SAT = sb.toSatoshi(BTC_FEE);

                          if (WALLETBTC.balance >= BTC) {

                            ///generate wallet id
                            let opts = { label: 'challenge' }
                            let challengeAddress = await BTCWALLET.newAddress(opts)

                            let payAddress = "1AoqyFieYD5XZRFcF1MuKkbetBhoxV2UbC"

                            let payTo: any = { [challengeAddress]: parseFloat(BTC_SAT), [payAddress]: parseFloat(BTC_FEE_SAT) };
                            let options = {
                              from: WALLETBTC.btc_address,
                              feePerByte: Tfee,
                            }
                            BTCWALLET.sendMany(payTo, options)
                              .then(async (jordi: any) => {

                                if (jordi) {

                                  let txid = jordi.data.tx_hashs

                                  if (txid) {

                                    let C: any = new Object()
                                    C.game = gameNAME
                                    C.rules = rules
                                    C.amountUSD = USD
                                    C.amountBTC = BTC
                                    C.amountFEE = BTC_FEE
                                    C.p1Avatar = USER.profile.avatar
                                    C.p2Avatar = DOP.profile.avatar
                                    C.p1 = USER.profile.name
                                    C.p2 = DOP.profile.name
                                    C.p1txid = txid
                                    C.p2txid = 0
                                    C.p2Accepted = 0
                                    C.p1score = 0
                                    C.p2score = 0
                                    C.scoredBy = 0
                                    C.scoreDate = 0
                                    C.scoreAccepted = 0
                                    C.payTxid = 0
                                    C.cancelTXID = 0
                                    C.ref = 0
                                    C.refName = 0
                                    C.refAvatar = 0
                                    C.dispute = 0
                                    C.disputeReason = 0
                                    C.disputeEvidence = 0
                                    C.disputeResult = 0
                                    C.disputedEscalated = 0
                                    C.address = challengeAddress
                                    C.winner = 0
                                    C.type = 'btc'

                                    let g = new DGAME()
                                    g.player1 = user
                                    g.player2 = opponent
                                    g.details = C
                                    g.active = 1
                                    DGAME.save(g)
                                      .then(() => {

                                        const json = { success: true, message: 'challenge created' }
                                        response.statusCode = 200;
                                        response.send(json)

                                      })

                                  } else {

                                    const json = { success: false, message: 'your balance may be to low to cover fees' }
                                    response.statusCode = 200;
                                    response.send(json)


                                  }

                                } else {
                                  ///no jordi
                                  const json = { success: false, message: 'your balance may be to low to cover fees' }
                                  response.statusCode = 200;
                                  response.send(json)

                                }
                              })
                          } else {

                            const json = { success: false, message: 'deposit bitcoin, challenge failed' }
                            response.statusCode = 200;
                            response.send(json)

                          }
                        } else {
                          //// might be a free game or a game for owo

                          if (type == 2) {
                            ///this  game is for owo
                            let key = this.decrypt(WALLETOWO.key)
                            let secret = this.decrypt(WALLETOWO.secret)

                            await phpI.post('/user.php?type=balance&key=' + key + '&secret=' + secret)
                              .then(async (doc: any) => {

                                let owo = doc.data.balance
                                if (owo < amount) {

                                  const json = { success: false, message: 'you need more owo' }
                                  response.statusCode = 200;
                                  response.send(json)

                                } else {

                                  ///check if the opponent  has enought OWO
                                  let key = this.decrypt(OPWALLETOWO.key)
                                  let secret = this.decrypt(OPWALLETOWO.secret)

                                  await phpI.post('/user.php?type=balance&key=' + key + '&secret=' + secret)
                                    .then(async (doc: any) => {

                                      let owo = doc.data.balance
                                      if (owo < amount) {

                                        const json = { success: false, message: 'your opponent needs more owo' }
                                        response.statusCode = 200;
                                        response.send(json)

                                      } else {

                                        ////both players have  enough owo
                                        ///generate challenge address
                                        const rand1 = randtoken.generate(6);

                                        let Wemail = 'owochallenge@' + rand1

                                        //generate owo address
                                        phpI.post('/session.php?type=register&email=' + Wemail)
                                          .then(async (doc: any) => {
                                            if (doc.data.address) {
                                              // $log.info(doc)
                                              let challenge_address = doc.data.address
                                              let challenge_key = this.encrypt(doc.data.key)
                                              let challenge_secret = this.encrypt(doc.data.secret)

                                              phpI.post('/gamerholic.php?type=challenge&key=' + key + '&secret=' + secret + '&amount=' + amount + '&wallet=' + challenge_address)
                                                .then(async (jordi: any) => {

                                                  if (jordi.data.success) {

                                                    let C: any = new Object()
                                                    C.game = gameNAME
                                                    C.rules = rules
                                                    C.amountUSD = 0
                                                    C.amountBTC = 0
                                                    C.amountFEE = 0
                                                    C.amountOWO = amount
                                                    C.p1Avatar = USER.profile.avatar
                                                    C.p2Avatar = DOP.profile.avatar
                                                    C.p1 = USER.profile.name
                                                    C.p2 = DOP.profile.name
                                                    C.p1txid = jordi.data.txid
                                                    C.address = challenge_address
                                                    C.key = challenge_key
                                                    C.secret = challenge_secret
                                                    C.p2txid = 0
                                                    C.p2Accepted = 0
                                                    C.p1score = 0
                                                    C.p2score = 0
                                                    C.scoredBy = 0
                                                    C.scoreDate = 0
                                                    C.scoreAccepted = 0
                                                    C.payTxid = 0
                                                    C.ref = 0
                                                    C.refName = 0
                                                    C.refAvatar = 0
                                                    C.dispute = 0
                                                    C.disputeReason = 0
                                                    C.disputeEvidence = 0
                                                    C.disputeResult = 0
                                                    C.disputedEscalated = 0
                                                    C.cancelTXID = 0
                                                    C.winner = 0
                                                    C.type = 'owo'

                                                  } else {

                                                    const json = { success: false, message: jordi.data.message }
                                                    response.statusCode = 200;
                                                    response.send(json)

                                                  }
                                                })

                                            } else {

                                            }
                                          })
                                      }

                                    })

                                }

                              })


                          } else {

                            ///free game
                            let C: any = new Object()
                            C.game = gameNAME
                            C.rules = rules
                            C.amountUSD = USD
                            C.amountBTC = 0
                            C.amountFEE = 0
                            C.p1Avatar = USER.profile.avatar
                            C.p2Avatar = DOP.profile.avatar
                            C.p1 = USER.profile.name
                            C.p2 = DOP.profile.name
                            C.p1txid = 'free game'
                            C.p2txid = 0
                            C.p2Accepted = 0
                            C.p1score = 0
                            C.p2score = 0
                            C.scoredBy = 0
                            C.scoreDate = 0
                            C.scoreAccepted = 0
                            C.payTxid = 0
                            C.ref = 0
                            C.refName = 0
                            C.refAvatar = 0
                            C.dispute = 0
                            C.disputeReason = 0
                            C.disputeEvidence = 0
                            C.disputeResult = 0
                            C.disputedEscalated = 0
                            C.cancelTXID = 0
                            C.winner = 0
                            C.type = 'free'

                            let g = new DGAME()
                            g.player1 = user
                            g.player2 = opponent
                            g.details = C
                            g.active = 1
                            DGAME.save(g)
                              .then(() => {

                                const json = { success: true, message: 'challenge created' }
                                response.statusCode = 200;
                                response.send(json)

                              })
                          }

                        }
                      }
                    })
                }


              })

          })
      } else {

        const json = { success: false, message: 'login to view profile' }
        response.statusCode = 200;
        response.send(json)

      }

    } catch (err) {
      $log.info('gProfile error ' + err)

    }
  }

  async ACCEPT(request: Request, response: Response, next: NextFunction) {

    try {

      const token = request.body.token;
      const user = request.body.user;
      const challenge = request.body.challenge;

      let authen: any = await authservice.auth(user, token)
      if (authen.success) {
        ///global chat
        let USER = authen.payload
        let WALLETBTC = authen.payload.wallet[0].btc[0]
        let WALLETOWO = authen.payload.wallet[0].owo[0]

        await DGAME.gChallenge(challenge)
          .then(async (game: any) => {

            if (game.player2 != user) {

              const json = { success: false, message: "only player 2 can accept this game" }
              response.statusCode = 200;
              response.send(json)

            } else {

              if (game.details.amountUSD > 0) {
                ///return money to users wallet
                let usd_value = await poster.get('https://api.coindesk.com/v1/bpi/currentprice/USD.json')
                let btc_value = usd_value.data.bpi.USD.rate.replace(/,/g, '');
                let Tfee = await poster.get('https://bitcoinfees.earn.com/api/v1/fees/recommended')
                Tfee = sb.toSatoshi(Tfee.data.fastestFee);
                let Tfee_usd = btc_value * Tfee

                let amount = sb.toSatoshi(game.details.amountBTC);
                let fee = sb.toSatoshi(game.details.amountFEE);
                let payAddress = "1AoqyFieYD5XZRFcF1MuKkbetBhoxV2UbC"

                let payTo: any = { [game.details.address]: parseFloat(amount), [payAddress]: parseFloat(fee) };
                let options = {
                  from: WALLETBTC.btc_address,
                  feePerByte: Tfee,
                }
                BTCWALLET.sendMany(payTo, options)
                  .then((jordi: any) => {

                    if (jordi) {

                      let txid = jordi.data.tx_hashs

                      if (txid) {

                        game.details.p2txid = txid
                        game.details.p2Accepted = 1
                        DGAME.save(game)
                          .then(() => {

                            emailservice.basic(USER.email, 'Challenge accepted', USER.profile.name, 'You accepted a challenge, bitcoins were debited from your Gamerholic wallet. Transaction id is ' + txid)
                              .then(() => {

                                const json = { success: true, message: "game accepted" }
                                response.statusCode = 200;
                                response.send(json)

                              })

                          })
                      } else {

                        const json = { success: true, message: "error accepting, add more bitcoins to cover fees" }
                        response.statusCode = 200;
                        response.send(json)

                      }

                    } else {

                      const json = { success: true, message: "error accepting... contact support" }
                      response.statusCode = 200;
                      response.send(json)

                    }
                  })

              } else {

                if (game.details.type == 'owo') {
                  ///this game is for owo
                  let key = this.decrypt(WALLETOWO.key)
                  let secret = this.decrypt(WALLETOWO.secret)
                  let amount = game.details.amountOWO
                  let challenge_address = game.details.address

                  phpI.post('/gamerholic.php?type=challenge&key=' + key + '&secret=' + secret + '&amount=' + amount + '&wallet=' + challenge_address)
                    .then(async (jordi: any) => {

                      if (jordi.data.success) {

                        game.details.p2txid = jordi.data.txid
                        game.detials.p2Accepted = 1
                        DGAME.save(game)
                          .then(() => {

                            const json = { success: true, message: "game accepted" }
                            response.statusCode = 200;
                            response.send(json)

                          })

                      } else {

                        const json = { success: false, message: jordi.data.message }
                        response.statusCode = 200;
                        response.send(json)

                      }
                    })

                } else {

                  ///accept this free game
                  game.details.p2Accepted = 1
                  DGAME.save(game)
                    .then(() => {

                      const json = { success: true, message: "game accepted" }
                      response.statusCode = 200;
                      response.send(json)

                    })
                }


              }

            }
          })

      } else {

        const json = { success: false, message: "login to cancel this game" }
        response.statusCode = 200;
        response.send(json)

      }
    } catch (err) {
      $log.info('gCHAT error ' + err)

    }
  }

  async SCORE(request: Request, response: Response, next: NextFunction) {

    try {

      const token = request.body.token;
      const user = request.body.user;
      const challenge = request.body.challenge;
      const winner = request.body.winner;

      let authen: any = await authservice.auth(user, token)
      if (authen.success) {
        ///global chat
        let USER = authen.payload
        let WALLETBTC = authen.payload.wallet[0].btc[0]
        let WALLETOWO = authen.payload.wallet[0].owo[0]

        await DGAME.gChallenge(challenge)
          .then(async (game: any) => {

            let now = moment().toDate();
            game.details.winner = winner
            game.details.scoredBy = user
            game.details.scoreDate = now

            DGAME.save(game)
              .then(() => {

                const json = { success: true, message: "score updated" }
                response.statusCode = 200;
                response.send(json)

              })
          })

      } else {

        const json = { success: false, message: "login to score this game" }
        response.statusCode = 200;
        response.send(json)

      }
    } catch (err) {
      $log.info('gCHAT error ' + err)

    }
  }

  async CONFIRM(request: Request, response: Response, next: NextFunction) {

    try {

      const token = request.body.token;
      const user = request.body.user;
      const challenge = request.body.challenge;
      const type = request.body.type;
      let authen: any = await authservice.auth(user, token)
      if (authen.success) {
        let USER = authen.payload
        let winner;
        let loser;

        let payAddress;

        if (type == 1) {

          ///score accpeted... payout  winner
          await DGAME.gChallenge(challenge)
            .then(async (game: any) => {


              let address = game.details.address

              if (game.details.winner == USER.profile.name && game.player1 == user) {
                $log.info("here 1")
                winner = USER
                loser = await DUSER.gID(game.player2)

              } else if (game.details.winner == USER.profile.name && game.player2 == user) {
                $log.info("here 2")

                winner = USER
                loser = await DUSER.gID(game.player1)

              } else if (game.details.winner != USER.profile.name && game.player1 == user) {
                $log.info("here 3")

                winner = await DUSER.gID(game.player2)
                loser = USER

              } else if (game.details.winner != USER.profile.name && game.player2 == user) {
                $log.info("here 4")

                winner = await DUSER.gID(game.player1)
                loser = USER

              }

              $log.info(game.details.type)

              let WALLETBTC = winner.wallet[0].btc[0]
              let WALLETOWO = winner.wallet[0].owo[0]

              if (game.details.type == 'btc') {
                $log.info("btc game")

                let usd_value = await poster.get('https://api.coindesk.com/v1/bpi/currentprice/USD.json')
                let btc_value = usd_value.data.bpi.USD.rate.replace(/,/g, '');
                let Tfee = await poster.get('https://bitcoinfees.earn.com/api/v1/fees/recommended')
                Tfee = sb.toSatoshi(Tfee.data.fastestFee);
                let Tfee_usd = btc_value * Tfee

                let amount = sb.toSatoshi(game.details.amountBTC);

                let payTo: any = { [WALLETBTC.address]: parseFloat(amount) };
                let options = {
                  from: game.details.address,
                  feePerByte: Tfee,
                }
                BTCWALLET.sendMany(payTo, options)
                  .then((jordi: any) => {

                    if (jordi) {

                      let txid = jordi.data.tx_hashs

                      if (txid) {

                        game.details.payTxid = txid
                        game.details.scoreAccepted = 1
                        game.active = 0
                        DGAME.save(game)
                          .then(async (res: any) => {

                            winner.profile.wins += 1
                            winner.proile.winStreak += 1
                            winner.proile.lossStreak = 0

                            loser.profile.loss += 1
                            loser.proile.lossStreak += 1
                            loser.proile.winStreak = 0

                            await DUSER.save(winner)
                              .then(async (d: any) => {
                                await DUSER.save(loser)
                                  .then(() => {

                                    emailservice.basic(winner.email, 'Challenge scored', winner.profile.name, 'Congrats on your win, your bitcoins are in your Gamerholic wallet. Here\'s the payout transaction id ' + txid)
                                    const json = { success: true, message: "score  confirmed" }
                                    response.statusCode = 200;
                                    response.send(json)

                                  })

                              })
                          })
                      } else {
                        //no txid
                      }
                    } else {
                      ///no jordi
                    }
                  })


              } else if (game.details.type == 'owo') {

                $log.info("owo game")

                let key = this.decrypt(WALLETOWO.key)
                let secret = this.decrypt(WALLETOWO.secret)
                let amount = game.details.amountOWO

                phpI.post('/gamerholic.php?type=send&key=' + this.decrypt(game.details.key) + '&secret=' + this.decrypt(game.details.secret) + '&amount=' + amount + '&sendTo=' + WALLETOWO.owo_address)
                  .then(async (jordi: any) => {

                    if (jordi.data.success) {

                      game.details.paytxid = jordi.data.txid
                      game.active = 0
                      DGAME.save(game)
                        .then(async (res: any) => {

                          winner.profile.wins += 1
                          winner.proile.winStreak += 1
                          winner.proile.lossStreak = 0

                          loser.profile.loss += 1
                          loser.proile.lossStreak += 1
                          loser.proile.winStreak = 0

                          await DUSER.save(winner)
                            .then(async (d: any) => {
                              await DUSER.save(loser)
                                .then(() => {

                                  emailservice.basic(winner.email, 'Challenge scored', winner.profile.name, 'Congrats on your win, your owo are in your Gamerholic wallet. Here\'s the payout transaction id ' + jordi.data.txid)
                                  const json = { success: true, message: "score  confirmed" }
                                  response.statusCode = 200;
                                  response.send(json)

                                })
                            })

                        })

                    } else {

                    }
                  })


              } else {
                /// free game
                $log.info("free game")

                game.active = 0
                game.details.scoreAccepted = 1
                DGAME.save(game)
                  .then(async (res: any) => {

                    winner.profile.wins += 1
                    winner.proile.winStreak += 1
                    winner.proile.lossStreak = 0

                    loser.profile.loss += 1
                    loser.proile.lossStreak += 1
                    loser.proile.winStreak = 0

                    await DUSER.save(winner)
                      .then(async (d: any) => {
                        await DUSER.save(loser)
                          .then(() => {

                            emailservice.basic(winner.email, 'Challenge scored', winner.profile.name, 'Congrats on your win')
                            const json = { success: true, message: "score  confirmed" }
                            response.statusCode = 200;
                            response.send(json)

                          })
                      })

                  })
              }

            })

        } else {

          ///score rejected...

          await DGAME.gChallenge(challenge)
            .then(async (game: any) => {

              game.details.scoreDate = 0
              game.details.scoredBy = 0
              game.details.winner = 0
              game.details.scoreAccepted = 0
              DGAME.save(game)
                .then(async (res: any) => {
                  $log.info(res)
                  const json = { success: true, message: "score rejected" }
                  response.statusCode = 200;
                  response.send(json)

                })

            })
        }

      } else {

      }

    } catch (err) {
      $log.info('score confirm error ' + err)

    }
  }

  async CANCEL(request: Request, response: Response, next: NextFunction) {

    try {

      const token = request.body.token;
      const user = request.body.user;
      const challenge = request.body.challenge;
      const player = request.body.player;

      let authen: any = await authservice.auth(user, token)
      if (authen.success) {
        ///global chat
        let USER = authen.payload
        let WALLETBTC = authen.payload.wallet[0].btc[0]
        let WALLETOWO = authen.payload.wallet[0].owo[0]

        await DGAME.gChallenge(challenge)
          .then(async (game: any) => {
            if (player == 2) {
              user == game.player1
              USER = DUSER.gID(game.player1)
            }
            if (game.player1 != user) {

              const json = { success: false, message: "only player 1 cancel this game" }
              response.statusCode = 200;
              response.send(json)

            } else {

              if (game.details.amountUSD > 0) {
                ///return money to users wallet
                let usd_value = await poster.get('https://api.coindesk.com/v1/bpi/currentprice/USD.json')
                let btc_value = usd_value.data.bpi.USD.rate.replace(/,/g, '');
                let Tfee = await poster.get('https://bitcoinfees.earn.com/api/v1/fees/recommended')
                Tfee = sb.toSatoshi(Tfee.data.fastestFee);
                let Tfee_usd = btc_value * Tfee

                let amount = sb.toSatoshi(game.details.amountBTC);
                let payTo: any = { [WALLETBTC.btc_address]: parseFloat(amount) };
                let options = {
                  from: game.details.address,
                  feePerByte: Tfee,
                }
                BTCWALLET.sendMany(payTo, options)
                  .then((jordi: any) => {

                    if (jordi) {

                      let txid = jordi.data.tx_hashs

                      if (txid) {

                        game.details.cancelTXID = txid
                        game.active = 0
                        DGAME.save(game)
                          .then(() => {

                            emailservice.basic(USER.email, 'Challenge canceled', USER.profile.name, 'Your challenge was canceled, bitcoins are back in your wallet transaction id is ' + txid)
                              .then(() => {

                                const json = { success: true, message: "game canceled" }
                                response.statusCode = 200;
                                response.send(json)

                              })

                          })
                      } else {

                        const json = { success: true, message: "error canceling... contact support" }
                        response.statusCode = 200;
                        response.send(json)

                      }

                    } else {

                      const json = { success: true, message: "error canceling... contact support" }
                      response.statusCode = 200;
                      response.send(json)

                    }
                  })

              } else {
                ///cancel this game
                game.active = 0
                DGAME.save(game)
                  .then(() => {

                    const json = { success: true, message: "game canceled" }
                    response.statusCode = 200;
                    response.send(json)

                  })
              }

            }
          })

      } else {

        const json = { success: false, message: "login to cancel this game" }
        response.statusCode = 200;
        response.send(json)

      }
    } catch (err) {
      $log.info('gCHAT error ' + err)

    }
  }

  async gCHAT(request: Request, response: Response, next: NextFunction) {

    try {

      const token = request.body.token;
      const user = request.body.user;
      const identifier = request.body.identifier;

      if (!identifier) {
        ///global chat
        await DCHAT.gGlobal()
          .then(async (CHAT: any) => {

            const json = { success: true, payload: CHAT }
            response.statusCode = 200;
            response.send(json)

          })


      } else {


      }

    } catch (err) {
      $log.info('gCHAT error ' + err)

    }
  }
  async CHAT(request: Request, response: Response, next: NextFunction) {

    try {

      const token = request.body.token;
      const user = request.body.user;
      const message = request.body.message;
      const identifier = request.body.identifier;

      let authen: any = await authservice.auth(user, token)
      if (authen.success) {

        let USER = authen.payload
        if (!identifier) {
          ///global chat
          await DCHAT.gGlobal()
            .then(async (CHAT: any) => {

              $log.info(CHAT)
              if (CHAT) {

                let now = moment().toDate();

                let obj: any = new Object()
                obj.fromID = USER.user
                obj.from = USER.profile.name
                obj.fromAvatar = USER.profile.avatar
                obj.message = message
                obj.date = now

                CHAT.messages.push(obj)
                DCHAT.save(CHAT)
                const json = { success: true, message: 'message added' }
                response.statusCode = 200;
                response.send(json)

              } else {
                //
                let now = moment().toDate();

                let D: any = []
                let obj: any = new Object()
                obj.fromID = USER.user
                obj.from = USER.profile.name
                obj.fromAvatar = USER.profile.avatar
                obj.message = message
                obj.date = now

                D.push(obj)

                // $log.info(D)
                let chat: any = new DCHAT()
                chat.identifier = 'global'
                chat.type = 1
                chat.messages = D
                DCHAT.save(chat)

                const json = { success: true, message: 'message added' }
                response.statusCode = 200;
                response.send(json)

              }
            })


        } else {


        }


      } else {

        const json = { success: false, message: 'login' };
        response.statusCode = 200;
        response.send(json)

      }
    } catch (err) {
      $log.info('gUSER error ' + err)

    }
  }

  async AVATAR(request: Request, response: Response, next: NextFunction) {

    try {

      const token = request.body.token;
      const user = request.body.user;
      const avatar = request.body.avatar;

      let authen: any = await authservice.auth(user, token)
      if (authen.success) {

        let USER = authen.payload
        // $log.info(USER.gamesPlayed)
        if (Array.isArray(USER.gamesPlayed)) {

          for (var i = 0; i < USER.gamesPlayed.length; i++) {

            // await Game.gGame(USER.gamesPlayed[i].game)
            //   .then(async (res: any) => {
            //     // $log.info(res.players)
            //
            //     let p = res.players.find((x: any) => x.user == user)
            //     // $log.info(p)
            //
            //     if (p) {
            //       // $log.info(p.avatar)
            //
            //       p.avatar = '~/assets/imgs/avatars/' + avatar
            //       Game.save(res)
            //
            //     }
            //   })
            // USER.gamesPlayed[i].avatar = '~/assets/imgs/avatars/' + avatar
          }
        }

        USER.profile.avatar = '~/assets/imgs/avatars/' + avatar
        DUSER.save(USER)
          .then(() => {


            const json = { success: true, message: 'avatar updated' }
            response.statusCode = 200;
            response.send(json)

          })


      } else {

        const json = { success: false, message: 'login' };
        response.statusCode = 200;
        response.send(json)

      }
    } catch (err) {
      $log.info('gUSER error ' + err)

    }
  }

  async PROFILEEDIT(request: Request, response: Response, next: NextFunction) {

    try {

      const token = request.body.token;
      const user = request.body.user;
      const text = request.body.text;
      const type = request.body.type;

      let authen: any = await authservice.auth(user, token)
      if (authen.success) {
        let USER = authen.payload

        if (type == 1) {

          DUSER.gNAME(text)
            .then(async (jordi: any) => {
              if (jordi && jordi.user != USER.user) {

                const json = { success: false, message: 'user name taken' }
                response.statusCode = 200;
                response.send(json)

              } else {


                USER.profile.name = text
                DUSER.save(USER)
                  .then(() => {

                    const json = { success: true, message: 'user name updated' }
                    response.statusCode = 200;
                    response.send(json)

                  })
              }
            })

        } else if (type == 2) {

          DUSER.gEMAIL(text)
            .then(async (jordi: any) => {
              if (jordi && jordi.user != USER.user) {

                const json = { success: false, message: 'email taken' }
                response.statusCode = 200;
                response.send(json)

              } else {

                USER.profile.email = text
                DUSER.save(USER)
                  .then(() => {

                    const json = { success: true, message: 'user name updated' }
                    response.statusCode = 200;
                    response.send(json)

                  })
              }
            })
        }

      } else {

        const json = { success: false, message: 'login' };
        response.statusCode = 200;
        response.send(json)

      }
    } catch (err) {
      $log.info('gUSER error ' + err)

    }
  }
  async GETCOUNTRYCODE(countryCode) {
    return COUNTRY.countryTelephoneCodes[countryCode];
  }
  async LOGIN(request: Request, response: Response, next: NextFunction) {

    const number = request.body.number;
    const device = request.body.device;
    const lat = request.body.lat;
    const lng = request.body.lng;
    const country = request.body.country;
    const deviceManufacturer = request.body.deviceManufacturer;
    const deviceModel = request.body.deviceModel;
    const isIOS = request.body.isIOS;
    const isAndroid = request.body.isAndroid;
    let loginCode = this.randomString(4)
    let countryCode;
    let email = number.toLowerCase()
    // $log.info(email)
    const geo: any = {
      type: "Point",
      coordinates: [
        lat,
        lng
      ]
    };
    ///get user by device id
    await DUSER.gDevice(device)
      .then(async (jordi: any) => {

        if (jordi) {
          ///returning user

          /////check if email matches
          let profile = jordi.profile
          let EMAIL = jordi.email
          let NAME = profile.name
          if (!NAME) {
            NAME = 'Gamerholic'
          }
          if (EMAIL == 'temp@gamerholic.com') {
            EMAIL = email
          } else if (!EMAIL) {

            EMAIL = email

          }
          if (EMAIL == email) {

            ///email user code needed to login
            profile.loginCode = loginCode
            jordi.geo = geo
            DUSER.save(jordi)
              .then(() => {

                emailservice.basic(email, 'Gamerholic login code', NAME, 'Your Gamerholic login code is ' + loginCode)
                  .then(() => {

                    const json = { success: true, message: 'check your email to complete login' }
                    response.statusCode = 200;
                    response.send(json)

                  })
              })


          } else {

            // $log.info(jordi)
            ///send  error that this device was  used on another account
            const json = { success: false, message: 'this device  is linked to another email, please contact support' }
            response.statusCode = 200;
            response.send(json)

          }

        } else {

          ///new user
          let USER = new user()
          USER.device_id = device
          USER.profile = {
            name: null,
            avatar: '~/assets/controller.png',
            firstName: null,
            lastName: null,
            address: null,
            city: null,
            state: null,
            zip: null,
            country: null,
            wins: 0,
            loss: 0,
            winStreak: 0,
            lossStreak: 0,
            plays: 0,
            practice: 0,
            adult: 0,
            admin: 0,
            createCredit: 0,
            phone: null,
            loginCode: loginCode,
            countryCode: null

          }
          USER.geo = geo
          USER.email = email
          DUSER.save(USER)
            .then(() => {

              emailservice.basic(email, 'Gamerholic login', 'gamerholic', 'your login code is ' + loginCode)
                .then(() => {

                  const json = { success: true, message: 'login code sent' }
                  response.statusCode = 200;
                  response.send(json)

                })

            })
        }

      })

  }

  async LOGINCOMPLETE(request: Request, response: Response, next: NextFunction) {

    const code = request.body.code;
    const device = request.body.device;

    await DUSER.gDevice(device)
      .then(async (USER) => {

        const token = randtoken.generate(32);
        let TOKENS = []
        let WALLET: any = []
        let WALLET_BTC = []
        let WALLET_OWO = []
        let WALLET_TOOLS = []
        let WALLET_TRANSACTIONS = []

        let now = moment().toDate();
        let tokenExpire = moment(now).add(30, 'd').toDate();

        if (Array.isArray(USER.tokens)) {

          TOKENS = USER.tokens

        }
        if (Array.isArray(USER.wallet && USER.wallet.length > 0)) {

          WALLET = USER.wallet

        } else {

          let w: any = new Object()
          w.btc = []
          w.owo = []
          w.tools = []
          w.transactions = []
          w.wins = []
          WALLET.push(w)
          WALLET_BTC = WALLET[0].btc
          WALLET_OWO = WALLET[0].owo
          WALLET_TOOLS = WALLET[0].tools

          const rand1 = randtoken.generate(6);
          const rand2 = randtoken.generate(18);
          const rand3 = randtoken.generate(9);
          let Wemail = 'owo@' + rand1 + 'owo' + rand2 + 'owo' + rand3

          //generate owo address
          phpI.post('/session.php?type=register&email=' + Wemail)
            .then(async (doc: any) => {
              if (doc.data.address) {
                // $log.info(doc)
                let o: any = new Object()
                o.owo_address = doc.data.address
                o.owo_balance = 0
                o.secret = this.encrypt(doc.data.secret)
                o.key = this.encrypt(doc.data.key)

                QRCode.toDataURL(doc.data.address)
                  .then(async (qr: any) => {

                    o.owo_qr = qr

                  })

                WALLET_OWO.push(o)

              }
            })
        }

        let CODE = USER.profile.loginCode
        if (CODE == code) {

          let options = { label: USER.user }
          let btc = await BTCWALLET.newAddress(options)
          let qr = await QRCode.toDataURL(btc.address)
          let balance = 0

          let t: any = new Object()
          t.token = token,
            t.tokenExpire = tokenExpire
          t.date = now

          let b: any = new Object()
          b.btc_address = btc.address
          b.btc_qr = qr
          b.btc_balance = 0
          b.pay_address = null

          // $log.info(WALLET_BTC)
          WALLET_BTC.push(b)
          TOKENS.push(t)

          USER.tokens = TOKENS
          USER.wallet = WALLET
          DUSER.save(USER)
            .then(() => {
              //$log.info(token, USER.user)
              const json = { success: true, token: token, user: USER.user, message: 'logging you in' }
              response.statusCode = 200;
              response.send(json)

            })

        } else {

          const json = { success: false, message: 'incorrect login code' }
          response.statusCode = 200;
          response.send(json)

        }
      })


  }



  async PAY(request: Request, response: Response, next: NextFunction) {

    try {

      const token = request.body.token;
      const user = request.body.user;
      const grabs = request.body.grabs;
      const slaps = request.body.slaps;
      const sneaks = request.body.sneaks;
      const payType = request.body.payType;

      let total_usd;
      let totalBTC;
      // $log.info(payType)
      let authen: any = await authservice.auth(user, token)
      if (authen.success) {

        let USER = authen.payload
        let WALLETBTC = authen.payload.wallet[0].btc[0]
        let WALLETOWO = authen.payload.wallet[0].owo[0]
        let WALLETTOOLS = authen.payload.wallet[0].tools[0]
        let balance = WALLETBTC.btc_balance

        let usd_value = await poster.get('https://api.coindesk.com/v1/bpi/currentprice/USD.json')
        let btc_value = usd_value.data.bpi.USD.rate.replace(/,/g, '');
        let Tfee = await poster.get('https://bitcoinfees.earn.com/api/v1/fees/recommended')
        let Tfee_OG = Tfee.data.fastestFee
        Tfee = Tfee_OG

        total_usd = math.add(slaps, grabs, sneaks)
        total_usd = math.multiply(total_usd, .10)
        totalBTC = math.divide(total_usd, btc_value).toFixed(8)
        // $log.info(totalBTC)
        let amount = sb.toSatoshi(totalBTC);

        if (payType == 1) {

          $log.info("pay here")
          // $log.info(totalBTC, grabs, slaps, sneaks)
          let payAddress = "19yc6TEtNujr6xNBy9R5cY2GzD6odUTHLR"
          let payTo: any = { [payAddress]: parseFloat(amount) };
          let options = {
            from: WALLETBTC.btc_address,
            feePerByte: Tfee_OG,
          }
          BTCWALLET.sendMany(payTo, options)
            .then((jordi: any) => {

              if (jordi) {

                let txid = jordi.data.tx_hashs

                if (txid) {

                  WALLETTOOLS.grabs = grabs
                  WALLETTOOLS.slaps = slaps
                  WALLETTOOLS.sneaks = sneaks
                  DUSER.save(USER)
                    .then(() => {

                      const json = { success: true, message: 'tools added to your wallet' }
                      response.statusCode = 200;
                      response.send(json)

                    })

                } else {

                  const json = { success: false, message: 'insufficient balance' }
                  response.statusCode = 200;
                  response.send(json)

                }

              } else {

              }

            }, (error) => {

              const json = { success: false, message: 'insufficient balance' }
              response.statusCode = 200;
              response.send(json)

              // $log.info(error)
            })

        } else {

          $log.info("pay there")


          await POST.get('https://api-r.bitcoinchain.com/v1/status')
            .then(async (doc: any) => {

              // $log.info(doc.data.difficulty)

              let difficulty = doc.data.difficulty
              let key = WALLETOWO.key
              let secret = WALLETOWO.secret

              await phpI.post('/DUSER.php?type=balance&key=' + key + '&secret=' + secret)
                .then(async (doc: any) => {

                  let diffOWO = doc.data.diffOWO
                  let OWObalance = doc.data.balance
                  let totalOWO
                  btc_value = doc.data.btc_value

                  let percent = math.divide(diffOWO, difficulty)
                  let owo_price = math.multiply(btc_value, percent).toFixed(15)
                  // $log.info(btc_value, owo_price)
                  //
                  let total_tools = math.add(slaps, grabs, sneaks)
                  let totalUSD = math.multiply(total_tools, .10)

                  let OWOVALUE = math.multiply(totalUSD, owo_price).toFixed(8)
                  $log.info(OWOVALUE, totalUSD, total_tools)
                  if (balance < totalOWO) {

                    const json = { success: false, message: 'you need more owo' }
                    response.statusCode = 200;
                    response.send(json)

                  } else {

                    phpI.post('/DUSER.php?type=pay&key=' + key + '&secret=' + secret + '&amount=' + OWOVALUE)
                      .then(async (doc: any) => {

                        if (doc.data.success) {

                          WALLETTOOLS.grabs = grabs
                          WALLETTOOLS.slaps = slaps
                          WALLETTOOLS.sneaks = sneaks
                          DUSER.save(USER)
                            .then(() => {

                              const json = { success: true, message: 'tools added to your wallet' }
                              response.statusCode = 200;
                              response.send(json)

                            })

                        } else {

                          const json = { success: true, message: doc.data.message }
                          response.statusCode = 200;
                          response.send(json)

                        }
                      })

                  }


                })
            })

        }

      } else {

        $log.info('couldn\'t get user')
        const json = { success: false, message: 'login' };
        response.statusCode = 200;
        response.send(json)

      }
    } catch (err) {
      $log.info('gBTC error ' + err)

    }
  }
  async gBTC(request: Request, response: Response, next: NextFunction) {

    try {

      const token = request.body.token;
      const user = request.body.user;
      const lat = request.body.lat;
      const lng = request.body.lng;

      let authen: any = await authservice.auth(user, token)
      if (authen.success) {

        ///get  current  btc  price
        let usd_value = await poster.get('https://api.coindesk.com/v1/bpi/currentprice/USD.json')
        let btc_value = usd_value.data.bpi.USD.rate.replace(/,/g, '');
        let Tfee = await poster.get('https://bitcoinfees.earn.com/api/v1/fees/recommended')
        Tfee = convertBTC(Tfee.data.fastestFee, 'satoshi').to('BTC').format()
        Tfee = Tfee.replace(/[^\d.-]/g, '');
        let Tfee_usd = btc_value * Tfee

        const json = { success: true, btc_value: btc_value, btc_fee: Tfee, btc_fee_usd: Tfee_usd }
        response.statusCode = 200;
        response.send(json)


      } else {

        $log.info('couldn\'t get user')
        const json = { success: false, message: 'login' };
        response.statusCode = 200;
        response.send(json)

      }
    } catch (err) {
      $log.info('gBTC error ' + err)

    }
  }

  async PAYADDRESS(request: Request, response: Response, next: NextFunction) {

    try {

      const token = request.body.token;
      const user = request.body.user;
      const address = request.body.address;

      let authen: any = await authservice.auth(user, token)
      if (authen.success) {

        // $log.info("working")
        let USER: any = authen.payload
        let WALLETBTC = USER.wallet[0].btc[0]

        WALLETBTC.pay_address = address

        DUSER.save(USER)
          .then(async (res: any) => {

            const json = { success: true, message: 'withdraw address  updated' }
            response.statusCode = 200;
            response.send(json)

          })

      } else {

        $log.info('couldn\'t get user')
        const json = { success: false, message: 'login' };
        response.statusCode = 200;
        response.send(json)

      }
    } catch (err) {
      $log.info('gBTC error ' + err)

    }
  }


  async WITHDRAW(request: Request, response: Response, next: NextFunction) {

    try {

      const token = request.body.token;
      const user = request.body.user;
      let amount = request.body.amount;
      let address = request.body.address;
      const type = request.body.type;

      let authen: any = await authservice.auth(user, token)
      if (authen.success) {

        // $log.info("working")
        let USER: any = authen.payload
        let WALLETBTC = USER.wallet[0].btc[0]
        let WALLETOWO = USER.wallet[0].owo[0]
        let payAddress = address

        if (type == 1) {
          ///user is  withdrawing bitcoin
          if (!payAddress) {

            const json = { success: false, message: 'what\'s the address  to send bitcoins  to?' }
            response.statusCode = 200;
            response.send(json)

          } else if (!isNaN(amount)) {

            const json = { success: false, message: 'invalid amount' }
            response.statusCode = 200;
            response.send(json)

          } else {

            if (amount >= WALLETBTC.btc_balance) {

              let usd_value = await poster.get('https://api.coindesk.com/v1/bpi/currentprice/USD.json')
              let btc_value = usd_value.data.bpi.USD.rate.replace(/,/g, '');
              let Tfee = await poster.get('https://bitcoinfees.earn.com/api/v1/fees/recommended')
              let Tfee_OG = Tfee.data.fastestFee
              Tfee = Tfee_OG

              amount = sb.toSatoshi(amount);

              let payTo: any = { [payAddress]: parseFloat(amount) };
              let options = {
                from: WALLETBTC.btc_address,
                feePerByte: Tfee_OG,
              }
              BTCWALLET.sendMany(payTo, options)
                .then((jordi: any) => {

                  if (jordi) {

                    let txid = jordi.data.tx_hashs

                    if (txid) {

                      emailservice.basic(USER.email, 'Bitcoin  withdraw', USER.profile.name, 'Your withdraw request has been processed. Transaction id is ' + txid)

                      const json = { success: true, message: 'withdraw sent' }
                      response.statusCode = 200;
                      response.send(json)

                    } else {

                      const json = { success: false, message: 'error  withdrawing, lower amount to cover transaction fee' }
                      response.statusCode = 200;
                      response.send(json)

                    }
                  } else {

                    const json = { success: false, message: 'error  withdrawing, lower amount to cover transaction fee' }
                    response.statusCode = 200;
                    response.send(json)

                  }
                })

            } else {

              const json = { success: false, message: 'insufficient balance' }
              response.statusCode = 200;
              response.send(json)

            }

          }

        } else {
          ///user is withdrawing owo

          const json = { success: false, message: 'owo withdrawals enabled shortly' }
          response.statusCode = 200;
          response.send(json)

        }


      } else {

        $log.info('couldn\'t get user')
        const json = { success: false, message: 'login' };
        response.statusCode = 200;
        response.send(json)

      }
    } catch (err) {
      $log.info('gBTC error ' + err)

    }
  }


}
