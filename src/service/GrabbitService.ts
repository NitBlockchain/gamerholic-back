import { createConnection, getConnectionManager, getConnection, getRepository } from "typeorm";
import { user } from "../entity/user";
import { hash, compare } from 'bcryptjs';
import * as bcrypt from "bcryptjs";

// import { GrabbitUsers } from "../entity/GrabbitUsers";
// import { GrabbitPlayers } from "../entity/GrabbitPlayers";
// import { GrabbitBuyTools } from "../entity/GrabbitBuyTools";
import * as moment from "moment";
import 'moment/locale/pt-br';
import { $log } from "ts-log-debug";
const crypto = require('crypto');
// let geoLib = require('geo-lib');

const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID_KEY);
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bytes (32 characters)

const IV_LENGTH = 16; // For AES, this is always 16
const axios = require('axios');
const poster = axios.create();
poster.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const math = require('mathjs')
var sb = require('satoshi-bitcoin');
let convertBTC = require('bitcoin-units');

import { EmailService } from "./EmailService";
let emailservice = new EmailService();

var WALLETBTC = require('blockchain.info/MyWallet')
let options = { apiCode: process.env.BTC_API, apiHost: 'https://www.btc.grabbit.cheap', secondPassword: process.env.BTC_PASS2 }
let BTCWALLET = new WALLETBTC(process.env.BTC_GUID, process.env.BTC_PASS, options)
const accountSid = 'ACbbc227cd6b30229125cad037a2d76225'; // Your Account SID from www.twilio.com/console
const authToken = '520b227fda723c9da32633ad71a9f7b2';   // Your Auth Token from www.twilio.com/console

const twilio = require('twilio')
const TwilioClient = new twilio(accountSid, authToken);

class GamerholicService {

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

  decimalPlaces = function(num) {
    var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) { return 0; }
    return Math.max(
      0,
      // Number of digits right of decimal point.
      (match[1] ? match[1].length : 0)
      // Adjust for scientific notation.
      - (match[2] ? +match[2] : 0));
  }

  //payout Winner
  async ENDBTC(game) {

    return new Promise(async (resolve) => {

      // await Game.gGame(game)
      //   .then(async (GAME: any) => {
      //
      //     let WINNER = GAME.winner
      //     let HOST = GAME.details.host
      //     let PLAYERS = GAME.players
      //
      //     await User.gID(HOST)
      //       .then(async (HOSTU: any) => {
      //
      //         ///get  winners btc  address
      //         let W: any = await User.gID(WINNER)
      //         let WINNERBTCADDRESS = W.wallet[0].btc[0].btc_address
      //
      //         ///get host btc address
      //         let HOSTBTCADDRESS = HOSTU.wallet[0].btc[0].btc_address
      //
      //         //calculate how many none free  tools were  used
      //         let grabsUsed = 0
      //         let slapsUsed = 0
      //         let sneaksUsed = 0
      //         let grabs = 0
      //         let slaps = 0
      //         let sneaks = 0
      //         let totalTools = 0
      //         let totalUSD = 0
      //         let totalBTC = 0
      //         let txid;
      //         let payAmountBTC;
      //         let payAmountUSD;
      //         let prize;
      //
      //         for (var i = 0; i < PLAYERS.length; i++) {
      //
      //           grabs += math.subtract(PLAYERS[i].grabsUsed, PLAYERS[i].freeGrabs)
      //           slaps += math.subtract(PLAYERS[i].slapsUsed, PLAYERS[i].freeSlaps)
      //           sneaks += math.subtract(PLAYERS[i].sneaksUsed, PLAYERS[i].freeSneaks)
      //           if (grabs > 0) {
      //             grabsUsed += grabs
      //           }
      //           if (slaps > 0) {
      //             slapsUsed += slaps
      //           }
      //           if (sneaks > 0) {
      //             sneaksUsed += sneaks
      //           }
      //
      //           totalTools = math.add(grabsUsed, slapsUsed, sneaksUsed)
      //           totalUSD = math.multiply(totalTools, .25).toFixed(0)
      //
      //         }
      //
      //         let btc_value = GAME.details.btc_value
      //         let Tfee = await poster.get('https://bitcoinfees.earn.com/api/v1/fees/recommended')
      //         let Tfee_OG = Tfee.data.fastestFee
      //
      //         Tfee = Tfee_OG
      //         totalBTC = math.divide(totalUSD, btc_value).toFixed(6)
      //         let overageBTC = math.subtract(totalBTC, GAME.details.prize).toFixed(6)
      //
      //         let grabsToPlayUSD = math.multiply(GAME.details.grabsToPlay, GAME.details.playersReady) //players * grabs to play
      //         let grabsToPlayBTC = math.divide(grabsToPlayUSD, GAME.details.btc_value)
      //
      //         let overageUSD = math.multiply(btc_value, overageBTC).toFixed(2)
      //         prize = sb.toSatoshi(GAME.details.prize);
      //
      //         if (overageBTC > 0) {
      //
      //           payAmountBTC = math.add(grabsToPlayBTC, overageBTC).toFixed(6)
      //
      //           payAmountBTC = sb.toSatoshi(payAmountBTC);
      //
      //         } else {
      //
      //           payAmountBTC = sb.toSatoshi(grabsToPlayBTC);
      //
      //         }
      //
      //         //process payout
      //         let payTo: any = { [WINNERBTCADDRESS]: prize };
      //         let opts = {
      //           from: GAME.details.btc_address,
      //           feePerByte: Tfee_OG,
      //         }
      //         BTCWALLET.sendMany(payTo, opts)
      //           .then(async (jordi: any) => {
      //
      //             if (jordi) {
      //
      //               txid = jordi.data.tx_hash
      //               if (txid) {
      //
      //                 GAME.details.hostPayTxid = null
      //                 GAME.details.hostPaid = 0
      //                 WINNER.txid = txid
      //
      //               }
      //             } else {
      //
      //             }
      //           })
      //
      //         GAME.details.hostPayAmountUSD = totalUSD
      //         GAME.details.hostPayAmountBTC = totalBTC
      //         GAME.details.totalGrabs = grabsUsed
      //         GAME.details.totalSlaps = slapsUsed
      //         GAME.details.totalSneaks = sneaksUsed
      //         Game.save(GAME)
      //           .then(async (response) => {
      //
      //             //send   sms  to  winner
      //             emailservice.basic(W.email, 'grabbit game over', W.profile.name, 'congrats on your grabbit win, your payout  transaction id  is ' + txid)
      //               .then(async () => {
      //
      //                 //send  email  to host
      //
      //                 emailservice.basic(HOSTU.email, 'grabbit game over', HOSTU.profile.name, 'congrats on a successful grabbit auction, head over to your wallet to claim your earnings for this game')
      //                   .then(() => {
      //                     let res = { success: true }
      //                     resolve(res)
      //
      //                   })
      //
      //               })
      //
      //           })
      //
      //
      //       })
      //
      //   })
    })


  }

}

export { GamerholicService };
