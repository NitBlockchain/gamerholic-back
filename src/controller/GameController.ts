// import { createConnection, getConnectionManager, getConnection, getRepository } from "typeorm";
// import { NextFunction, Request, Response } from "express";
// import * as moment from "moment";
// import { User } from "../entity/User";
// import { Game } from "../entity/Game";
// import { Business } from "../entity/Business";
//
// import { hash, compare } from 'bcryptjs';
// import * as bcrypt from "bcryptjs";
// import { $log } from "ts-log-debug";
// // import { Seeds } from "../entity/SeedMembers"
// // import { aibots } from "../entity/Aibots";
// // import { aitrades } from "../entity/Aitrades";
// // import { Inbox } from "../entity/inbox";
// // import { BusinessOrders } from "../entity/business_orders";
// import { AuthService } from "../service/AuthService"
// let authservice = new AuthService();
// import { GrabbitService } from "../service/GrabbitService"
// let gameservice = new GrabbitService();
//
// var sb = require('satoshi-bitcoin');
// const parseJson = require('parse-json');
//
// import fetch from 'node-fetch';
// ///https://www.npmjs.com/package/node-fetch
// const QRCode = require('qrcode')
//
// const axios = require('axios');
// const poster = axios.create();
// poster.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// let convertBTC = require('bitcoin-units');
//
// const crypto = require('crypto');
//
// const sendgrid = require('@sendgrid/mail');
// sendgrid.setApiKey(process.env.SENDGRID_KEY);
// const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bytes (32 characters)
//
// const IV_LENGTH = 16; // For AES, this is always 16
//
// const randtoken = require('rand-token');
// const saltRounds = 10;
//
// const salt = bcrypt.genSaltSync(saltRounds);
// const querystring = require('querystring');
// const nonce = require('nonce')();
// ///https://www.npmjs.com/package/nonce
//
// const phpI = axios.create({
//   baseURL: 'https://grabit.cheap/'
// });
// phpI.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//
// const math = require('mathjs')
//
// var WALLETBTC = require('blockchain.info/MyWallet')
// let options = { apiCode: process.env.BTC_API, apiHost: 'https://www.btc.grabbit.cheap', secondPassword: process.env.BTC_PASS_2 }
// let BTCWALLET = new WALLETBTC(process.env.BTC_GUID, process.env.BTC_PASS, options)
////
// export class GameController {
//
//   private gameR = getRepository(Game);
//
//   private encrypt(text: string) {
//     const iv = crypto.randomBytes(IV_LENGTH);
//     const cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
//     let encrypted = cipher.update(text);
//
//     encrypted = Buffer.concat([encrypted, cipher.final()]);
//
//     return iv.toString('hex') + ':' + encrypted.toString('hex');
//   }
//
//   private decrypt(text: string) {
//     const textParts = text.split(':');
//     const iv = new Buffer(textParts.shift(), 'hex');
//     const encryptedText = new Buffer(textParts.join(':'), 'hex');
//     const decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
//     let decrypted = decipher.update(encryptedText);
//
//     decrypted = Buffer.concat([decrypted, decipher.final()]);
//
//     return decrypted.toString();
//   }
//
//   randomString = function(length) {
//
//     var text = "";
//     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     for (var i = 0; i < length; i++) {
//       text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return text;
//
//   }
//
//   functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {
//
//     for (var i = 0; i < arraytosearch.length; i++) {
//
//       if (arraytosearch[i][key] == valuetosearch) {
//         return i;
//       }
//     }
//     return null;
//   }
//
//   async GLOBALGAMES(request: Request, response: Response, next: NextFunction) {
//
//     const token = request.body.token;
//     const user = request.body.user;
//
//     let GG = await Game.bGLOBALGAMES()
//     let PG = await Game.bPRACTICEGAMES()
//     if (PG && PG.length < 3) {
//
//       const geo = {
//         type: "Point",
//         coordinates: [
//           null,
//           null
//         ]
//       };
//       let code = this.randomString(6)
//       let qr = await QRCode.toDataURL(code)
//
//       let grabbit = await new Game()
//       grabbit.details = {
//         title: 'Practice',
//         images: [{
//           url: '~/assets/imgs/practice.png',
//         }],
//
//         playersReady: 0,
//         playersMin: 2,
//         playersMax: 25,
//         full: 0,
//         startPrep: 0,
//         startPrepTime: 0,
//         started: 0,
//         completed: 0,
//         stop: 0,
//         info: "practice,  practice,  practice",
//         freeGrabs: 25,
//         freeSlaps: 25,
//         freeSneaks: 25,
//         toPlayGrabs: 0,
//         toPlaySlaps: 0,
//         toPlaySneaks: 0,
//         mysteryBoxValue: 0,
//         playFree: 1,
//         gameOver: null,
//         gameStart: null,
//         txid: null,
//         qr: qr,
//         host: 'grabbit',
//         hostName: 'grabbit',
//         hostAvatar: '~/assets/imgs/avatars/alien_6.png',
//         btc_address: null,
//         prizeType: 'practice',
//         hostPaid: 0,
//         hostPayTxid: null,
//         hostPayAmountBTC: 0,
//         hostPayAmountUSD: 0,
//         prize: null,
//         prize2: null,
//         btc_value: null
//
//       }
//       grabbit.user = null
//       grabbit.code = code
//       grabbit.geo = geo
//       grabbit.winner = {
//         player: null,
//         name: 'no one yet',
//         avatar: '~/assets/imgs/avatars/blank.jpg',
//         timeGrab: null,
//         timeEnd: null,
//         txid: null,
//         redeemed: 0,
//         redeemDate: null,
//         redeemOWO: null,
//         redeemOWOTXID: null,
//
//       },
//         grabbit.slapper = {
//           player: null,
//           name: null
//         }
//       grabbit.players = []
//       grabbit.active = 1
//       grabbit.type = 3
//
//       Game.save(grabbit)
//         .then(async (PG: any) => {
//
//           let GLOBALGAMES = GG.concat(PG);
//           let payload = await Promise.all([GLOBALGAMES])
//
//           const json = { success: true, payload: payload }
//           response.statusCode = 200;
//           response.send(json)
//         })
//
//     } else {
//
//       let GLOBALGAMES = GG.concat(PG);
//       let payload = await Promise.all([GLOBALGAMES])
//
//       const json = { success: true, payload: payload }
//       response.statusCode = 200;
//       response.send(json)
//     }
//
//
//   }
//
//   async bLOCALGAMES(request: Request, response: Response, next: NextFunction) {
//
//     const token = request.body.token;
//     const user = request.body.user;
//     // const gID = request.body.gID;
//     // const gType = request.body.gType;
//     let lat: any = request.body.lat;
//     let lng: any = request.body.lng;
//
//     $log.info(user, token, lat, lng)
//     let auth: any = await authservice.auth(user, token)
//     if (auth.success) {
//
//       let USER: any = auth.payload
//
//       if (USER.lng && USER.lng) {
//
//         phpI.post('grabbit.php?type=local&lat=' + USER.lat + '&lng=' + USER.lng)
//           .then(async (doc: any) => {
//
//             // $log.info(doc.data.grabs)
//             let payload: any = await Promise.all([doc.data.grabs])
//
//             const json = { success: true, payload: payload }
//             response.statusCode = 200;
//             response.send(json)
//
//           })
//       } else {
//
//         if (lat && lng) {
//
//           //get local games
//           phpI.post('grabbit.php?type=local&lat=' + lat + '&lng=' + lng)
//             .then(async (doc: any) => {
//
//               $log.info(doc)
//               let payload: any = await Promise.all([doc.data.grabs])
//
//               const json = { success: true, payload: payload }
//               response.statusCode = 200;
//               response.send(json)
//
//             })
//
//
//         } else {
//
//           const json = { success: false, payload: null }
//           response.statusCode = 200;
//           response.send(json)
//
//         }
//       }
//
//
//     } else {
//
//       if (lat && lng) {
//
//         //get local games
//         phpI.post('grabbit.php?type=local&lat=' + lat + '&lng=' + lng)
//           .then(async (doc: any) => {
//
//             // $log.info(doc.data)
//             let payload: any = await Promise.all([doc.data.grabs])
//
//             const json = { success: true, payload: payload }
//             response.statusCode = 200;
//             response.send(json)
//
//           })
//
//
//       } else {
//
//         const json = { success: false, payload: null }
//         response.statusCode = 200;
//         response.send(json)
//
//       }
//     }
//
//
//
//   }
//
//   async PLAY(request: Request, response: Response, next: NextFunction) {
//
//     const token = request.body.token;
//     const user = request.body.user;
//     const gID = request.body.gID;
//     // $log.info(token, user)
//     let auth: any = await authservice.auth(user, token)
//     if (auth.success) {
//
//       let USER = auth.payload
//       let WALLETTOOLS = auth.payload.wallet[0].tools[0]
//       let USERGAMESPLAYED: any = []
//       let ACTIVEGAME: any = []
//       let PLAYERS = []
//       let player: any;
//       let game: any
//       let now = moment().toDate();
//       let timeExpire = moment(now).add(2, 'm').toDate();
//       let pass = 1
//       await Game.gGame(gID)
//         .then(async (GRABBIT) => {
//           if (Array.isArray(USER.gamesPlayed) && USER.gamesPlayed && USER.gamesPlayed.length > 0) {
//             USERGAMESPLAYED = USER.gamesPlayed
//           }
//           if (Array.isArray(USER.activeGame) && USER.activeGame && USER.activeGame.length > 0) {
//             ACTIVEGAME = USER.activeGame
//           }
//           if (!USER.profile.name) {
//
//             pass = 0
//             const json = { success: false, message: 'complete your profile to play', type: 2 }
//             response.statusCode = 200;
//             response.send(json)
//           }
//           if (USER.profile.practice < 3 && GRABBIT.type != 3 && pass > 0) {
//
//             pass = 0
//             const json = { success: false, message: 'play 3 practice  games before playing real game', type: 3 }
//             response.statusCode = 200;
//             response.send(json)
//
//           }
//           if (GRABBIT.details.full > 0 && pass > 0) {
//
//             pass = 0
//             const json = { success: false, message: 'game is full', type: 3 }
//             response.statusCode = 200;
//             response.send(json)
//
//           }
//           if (GRABBIT.details.started > 0 && pass > 0) {
//
//             pass = 0
//             const json = { success: false, message: 'game already started', type: 3 }
//             response.statusCode = 200;
//             response.send(json)
//
//           }
//           if (GRABBIT.details.completed > 0 && pass > 0) {
//
//             pass = 0
//             const json = { success: false, message: 'game is over', type: 3 }
//             response.statusCode = 200;
//             response.send(json)
//
//           }
//           let seats = GRABBIT.details.playersReady + 1
//           if ((seats > GRABBIT.details.playersMax) && pass > 0) {
//
//             pass = 0
//             const json = { success: false, message: 'max players reached', type: 3 }
//             response.statusCode = 200;
//             response.send(json)
//
//           }
//           if (ACTIVEGAME.length > 0 && (ACTIVEGAME.active > 0) && pass > 0) {
//
//             pass = 0
//             const json = { success: false, message: 'you  are seated  in another game', type: 3 }
//             response.statusCode = 200;
//             response.send(json)
//
//           }
//           if (GRABBIT.details.toPlayGrabs > 0 && (WALLETTOOLS.grabs < GRABBIT.details.toPlayGrabs) && pass > 0) {
//
//             pass = 0
//             const json = { success: false, message: 'insert ' + GRABBIT.details.toPlayGrabs + ' grabs to play. Buy more tools', type: 3 }
//             response.statusCode = 200;
//             response.send(json)
//
//           }
//
//           if (pass > 0) {
//
//
//             player = new Object()
//             player.user = user,
//               player.name = USER.profile.name,
//               player.avatar = USER.profile.avatar,
//               player.freeGrabs = GRABBIT.details.freeGrabs,
//               player.freeSlaps = GRABBIT.details.freeSlaps,
//               player.freeSneaks = GRABBIT.details.freeSneaks,
//               player.grabs = GRABBIT.details.freeGrabs,
//               player.slaps = GRABBIT.details.freeGrabs,
//               player.sneaks = GRABBIT.details.freeGrabs,
//               player.sneakOpen = 0,
//               player.usedGrabs = 0,
//               player.usedSlaps = 0,
//               player.usedSneaks = 0,
//               player.timePlay = now,
//               player.timeExpire = timeExpire,
//               player.active = 1
//
//             game = new Object()
//             game.game = gID,
//               game.details = GRABBIT.details,
//               game.active = 1,
//               game.timePlay = now,
//               game.timeExpire = timeExpire
//
//             if (Array.isArray(GRABBIT.players) && GRABBIT.players.length > 0) {
//               $log.info('grabbit is an array')
//               PLAYERS = GRABBIT.players
//             }
//
//             let p = GRABBIT.details.playersReady += 1
//             if (p >= GRABBIT.details.playersMin && GRABBIT.details.startPrep < 1 && GRABBIT.details.started < 1) {
//
//               let startPrepTime = moment(now).add(10, 's').toDate();
//
//               GRABBIT.details.startPrep = 1
//               GRABBIT.details.full = 1
//               GRABBIT.details.gameStart = startPrepTime
//
//             }
//
//             if (PLAYERS.length > 0) {
//
//               ///check  if this player is in this game
//               let playerInGame = PLAYERS.find((x: any) => x.user == user && x.active == 1)
//               if (playerInGame) {
//
//                 const json = { success: false, message: 'you are already in this  game', type: 3 }
//                 response.statusCode = 200;
//                 response.send(json)
//
//               } else {
//                 $log.info(1)
//
//                 ///player is  not in this game
//                 PLAYERS.push(player)
//                 GRABBIT.players = PLAYERS
//                 GRABBIT.details.playersReady = +1
//                 Game.save(GRABBIT)
//                   .then(() => {
//
//                     //update user table
//                     if (USERGAMESPLAYED.length > 0) {
//                       USERGAMESPLAYED.splice(0, 1, game);
//
//                       // USERGAMESPLAYED.push(game)
//
//                     } else {
//                       // $log.info("error pushing")
//                       USERGAMESPLAYED.push(game)
//
//                     }
//                     if (ACTIVEGAME.length > 0) {
//                       ACTIVEGAME.splice(0, 1, game);
//
//                       // ACTIVEGAME.push(game)
//
//                     } else {
//                       // $log.info("error pushing")
//                       ACTIVEGAME.push(game)
//
//                     }
//                     if (GRABBIT.details.toPlayGrabs > 0 && (WALLETTOOLS.grabs < GRABBIT.details.toPlayGrabs)) {
//
//                       let g = WALLETTOOLS.grabs
//                       let t = math.subtract(g, GRABBIT.details.toPlayGrabs)
//
//                       WALLETTOOLS.grabs = t
//                     }
//                     USER.gamesPlayed = USERGAMESPLAYED
//                     USER.activeGame = ACTIVEGAME
//                     User.save(USER)
//                       .then(() => {
//
//
//                         ///start game if seats are full
//                         const json = { success: true, message: 'you are in' }
//                         response.statusCode = 200;
//                         response.send(json)
//
//                       })
//
//                   })
//               }
//
//             } else {
//
//               // $log.info(GRABBIT)
//               PLAYERS.push(player)
//               GRABBIT.players = PLAYERS
//               GRABBIT.details.playersReady = +1
//               Game.save(GRABBIT)
//                 .then(() => {
//
//                   //update user table
//                   if (USERGAMESPLAYED.length > 0) {
//                     USERGAMESPLAYED.splice(0, 1, game);
//
//                     // USERGAMESPLAYED.push(game)
//
//                   } else {
//                     USERGAMESPLAYED.push(game)
//
//                   }
//                   if (ACTIVEGAME.length > 0) {
//                     ACTIVEGAME.splice(0, 1, game);
//
//                     // ACTIVEGAME.push(game)
//
//                   } else {
//                     // $log.info("error pushing")
//                     ACTIVEGAME.push(game)
//
//                   }
//
//                   USER.activeGame = ACTIVEGAME
//                   USER.gamesPlayed = USERGAMESPLAYED
//                   User.save(USER)
//                     .then(() => {
//
//                       ///send text message
//                       let p = GRABBIT.details.playersReady
//                       // $log.info("players in game  is  " + p)
//                       if (p == 1) {
//
//                         TwilioClient.messages
//                           .create({
//                             body: 'go join a practice game ',
//                             from: '+14152124499',
//                             to: '+14155096812'
//                           })
//                           .then(async (message) => {
//
//                             TwilioClient.messages
//                               .create({
//                                 body: 'go join a practice game ',
//                                 from: '+14152124499',
//                                 to: '+14158495311'
//                               })
//                           })
//
//                       }
//                       const json = { success: true, message: 'you are in' }
//                       response.statusCode = 200;
//                       response.send(json)
//
//                     })
//                 })
//
//             }
//           }
//
//         })
//
//     } else {
//
//       // TwilioClient.lookups.phoneNumbers('+639217188737')
//       //   .fetch({ type: ['carrier'] })
//       //   .then(phone_number => $log.info(phone_number));
//
//       $log.info("user not  logged in")
//       const json = { success: false, message: 'log in to play', type: 1 }
//       response.statusCode = 200;
//       response.send(json)
//
//     }
//
//   }
//
//   async GRAB(request: Request, response: Response, next: NextFunction) {
//
//     const token = request.body.token;
//     const user = request.body.user;
//     let gID = request.body.game;
//     let pass = 1
//     let auth: any = await authservice.auth(user, token)
//     if (auth.success) {
//
//       let USER = auth.payload
//       if (Array.isArray(USER.activeGame) && USER.activeGame && USER.activeGame.length > 0) {
//
//         let g: any = USER.activeGame[0]
//
//         if (g.active > 0) {
//           gID = g.game
//           // $log.info(1, gID)
//         } else {
//           // $log.info(2, gID)
//
//         }
//
//       }
//       Game.gGame(gID)
//         .then(async (GAME: any) => {
//
//           let PLAYERS = GAME.players
//           let WINNER = GAME.winner
//           // $log.info(WINNER)
//           let SLAPPER = GAME.slapper[0]
//           let USER = auth.payload.profile
//           let seconds = 11
//           let now = moment().toDate();
//           let grabExpire;
//
//           // $log.info(USER)
//
//           let playerInGame = PLAYERS.find((x: any) => x.user == user && x.active == 1)
//
//           if (GAME.details.completed > 0) {
//             pass = 0
//             const json = { success: false, message: 'this game is OVER' }
//             response.statusCode = 200;
//             response.send(json)
//
//           }
//           if (pass > 0 && GAME.details.started < 1) {
//             pass = 0
//             const json = { success: false, message: 'this game hasn\'t started' }
//             response.statusCode = 200;
//             response.send(json)
//
//           }
//           if (pass > 0 && GAME.details.started < 1) {
//             pass = 0
//             const json = { success: false, message: 'this game hasn\'t started' }
//             response.statusCode = 200;
//             response.send(json)
//
//           }
//           if (pass > 0) {
//
//             if (!playerInGame) {
//
//               pass = 0
//               const json = { success: false, message: 'your are not in  this game' }
//               response.statusCode = 200;
//               response.send(json)
//
//             }
//
//           }
//           if (pass > 0) {
//
//             if (WINNER && WINNER.player == user) {
//
//               pass = 0
//               const json = { success: false, message: 'double grab prevented' }
//               response.statusCode = 200;
//               response.send(json)
//
//             }
//           }
//
//           if (pass > 0) {
//
//             if (SLAPPER && SLAPPER.user && SLAPPER.user != user) {
//
//               pass = 0
//               SLAPPER.user = null
//               SLAPPER.avatar = null
//               SLAPPER.time = null
//               Game.save(GAME)
//                 .then(() => {
//
//                   const json = { success: false, message: 'you were slapped' }
//                   response.statusCode = 200;
//                   response.send(json)
//
//                 })
//
//             }
//           }
//
//           if (pass > 0) {
//
//             if (playerInGame.grabs < 1) {
//
//               pass = 0
//               const json = { success: false, message: 'you are out of grabs' }
//               response.statusCode = 200;
//               response.send(json)
//
//             }
//           }
//
//           if (pass > 0) {
//
//             // $log.info(playerInGame)
//             $log.info("grabbing")
//             if (playerInGame.sneakOpen > 0) {
//               console.log("sneaking  prize")
//               seconds = 4
//               playerInGame.sneakOpen = 0
//
//             }
//
//             grabExpire = moment(now).add(seconds, 's').toDate();
//
//             // $log.info(WINNER.player)
//             ////submit  grab
//             WINNER.player = user
//             WINNER.name = USER.name
//             WINNER.avatar = USER.avatar
//             WINNER.grabExpire = grabExpire
//             WINNER.grabTime = now
//
//             playerInGame.grabs -= 1
//             playerInGame.grabsUsed += 1
//             GAME.details.gameOver = grabExpire
//             GAME.timeEnd = grabExpire
//             Game.save(GAME)
//               .then((res: any) => {
//
//
//                 const json = { success: true, message: 'prize grabbed' }
//                 response.statusCode = 200;
//                 response.send(json)
//
//               })
//
//           }
//         })
//
//     } else {
//
//       const json = { success: false, message: 'login to play' }
//       response.statusCode = 200;
//       response.send(json)
//
//     }
//
//   }
//
//   async SLAP(request: Request, response: Response, next: NextFunction) {
//
//     const token = request.body.token;
//     const user = request.body.user;
//     let gID = request.body.game;
//
//     let auth: any = await authservice.auth(user, token)
//     if (auth.success) {
//       let USER = auth.payload
//       if (Array.isArray(USER.activeGame) && USER.activeGame && USER.activeGame.length > 0) {
//
//         let g: any = USER.activeGame[0]
//
//         if (g.active > 0) {
//           gID = g.game
//           $log.info(1, gID)
//         } else {
//           $log.info(2, gID)
//
//         }
//
//       }
//       Game.gGame(gID)
//         .then(async (GAME) => {
//
//           let PLAYERS = GAME.players
//           let WINNER = GAME.winner
//           let SLAPPER: any = []
//           let USER = auth.payload
//           let pass = 1
//           let seconds = 10
//           let now = moment().toDate();
//           let grabExpire;
//
//           let playerInGame = PLAYERS.find((x: any) => x.user == user && x.active == 1)
//
//           if (GAME.details.completed > 0) {
//             pass = 0
//             const json = { success: false, message: 'this game is OVER' }
//             response.statusCode = 200;
//             response.send(json)
//
//           }
//           if (pass > 0 && GAME.details.started < 1) {
//             pass = 0
//             const json = { success: false, message: 'this game hasn\'t started' }
//             response.statusCode = 200;
//             response.send(json)
//
//           }
//           if (pass > 0 && GAME.details.started < 1) {
//             pass = 0
//             const json = { success: false, message: 'this game hasn\'t started' }
//             response.statusCode = 200;
//             response.send(json)
//
//           }
//           if (pass > 0) {
//
//             if (!playerInGame) {
//
//               pass = 0
//               const json = { success: false, message: 'your are not in  this game' }
//               response.statusCode = 200;
//               response.send(json)
//
//             }
//
//           }
//
//           if (pass > 0) {
//
//             if (playerInGame.slaps < 1) {
//
//               pass = 0
//               const json = { success: false, message: 'you are out of slaps' }
//               response.statusCode = 200;
//               response.send(json)
//
//             }
//           }
//
//           if (pass > 0) {
//
//             if (Array.isArray(GAME.slapper) && GAME.slapper.length > 0) {
//
//               SLAPPER = GAME.slapper
//
//             }
//
//           }
//
//           if (pass > 0) {
//
//             $log.info(SLAPPER)
//             if (SLAPPER && SLAPPER.length > 0 && SLAPPER[0].user == user) {
//
//               const json = { success: false, message: 'slap ready' }
//               response.statusCode = 200;
//               response.send(json)
//
//
//             } else {
//
//               let s: any = new Object()
//               s.user = user
//               s.avatar = USER.avatar
//               s.time = now
//
//               SLAPPER.splice(0, 1, s);
//               GAME.slapper = SLAPPER
//               playerInGame.slaps -= 1
//               playerInGame.slapsUsed += 1
//
//               Game.save(GAME)
//                 .then(() => {
//
//                   const json = { success: false, message: 'slap ready and waiting' }
//                   response.statusCode = 200;
//                   response.send(json)
//
//                 })
//             }
//
//           }
//
//
//         })
//
//     } else {
//
//       const json = { success: false, message: 'login' }
//       response.statusCode = 200;
//       response.send(json)
//
//
//     }
//
//   }
//
//   async SNEAK(request: Request, response: Response, next: NextFunction) {
//
//     const token = request.body.token;
//     const user = request.body.user;
//     let gID = request.body.game;
//
//     let auth: any = await authservice.auth(user, token)
//     if (auth.success) {
//
//       let USER = auth.payload
//       if (Array.isArray(USER.activeGame) && USER.activeGame && USER.activeGame.length > 0) {
//
//         let g: any = USER.activeGame[0]
//
//         if (g.active > 0) {
//           gID = g.game
//           // $log.info(1, gID)
//         } else {
//           // $log.info(2, gID)
//
//         }
//
//       }
//       Game.gGame(gID)
//         .then(async (GAME) => {
//
//           let PLAYERS = GAME.players
//           let WINNER = GAME.winner
//           let SLAPPER = GAME.slapper
//           let USER = auth.payload
//           let pass = 1
//           let seconds = 10
//           let now = moment().toDate();
//           let grabExpire;
//
//           let playerInGame = PLAYERS.find((x: any) => x.user == user && x.active == 1)
//
//           if (GAME.details.completed > 0) {
//             pass = 0
//             const json = { success: false, message: 'this game is OVER' }
//             response.statusCode = 200;
//             response.send(json)
//
//           }
//           if (pass > 0 && GAME.details.started < 1) {
//             pass = 0
//             const json = { success: false, message: 'this game hasn\'t started' }
//             response.statusCode = 200;
//             response.send(json)
//
//           }
//           if (pass > 0 && GAME.details.started < 1) {
//             pass = 0
//             const json = { success: false, message: 'this game hasn\'t started' }
//             response.statusCode = 200;
//             response.send(json)
//
//           }
//           if (pass > 0) {
//
//             if (!playerInGame) {
//
//               pass = 0
//               const json = { success: false, message: 'your are not in  this game' }
//               response.statusCode = 200;
//               response.send(json)
//
//             }
//
//           }
//           if (pass > 0) {
//
//             if (playerInGame.sneakOpen > 0) {
//
//               pass = 0
//               const json = { success: false, message: 'sneak hole open' }
//               response.statusCode = 200;
//               response.send(json)
//
//             }
//           }
//
//           if (pass > 0) {
//
//             if (playerInGame.sneak < 1) {
//
//               pass = 0
//               const json = { success: false, message: 'you are out of sneaks' }
//               response.statusCode = 200;
//               response.send(json)
//
//             }
//           }
//
//           if (pass > 0) {
//
//             playerInGame.sneakOpen = 1
//             playerInGame.sneaks -= 1
//             playerInGame.sneaksUsed += 1
//
//             Game.save(GAME)
//               .then(() => {
//
//                 const json = { success: true, message: 'sneak hole open' }
//                 response.statusCode = 200;
//                 response.send(json)
//
//               })
//
//           }
//
//
//         })
//
//     } else {
//
//       const json = { success: false, message: 'login' }
//       response.statusCode = 200;
//       response.send(json)
//
//
//     }
//
//   }
//
//   async TIMER(request: Request, response: Response, next: NextFunction) {
//
//     const token = request.body.token;
//     const user = request.body.user;
//     let gID = request.body.gID;
//     let now = moment().toDate();
//     let endTime: any;
//     let timer: any;
//     let timer_game;
//     let end;
//     let start: any = await moment(now);
//     let liveGame = 0
//     let USER: any
//     let index_2;
//     // $log.info('timer is  running')
//
//     if (user) {
//       // $log.info(user)
//       let USER: any = await User.gID(user)
//       // $log.info(USER.gamesPlayed)
//       if (USER) {
//         if (Array.isArray(USER.activeGame) && USER.activeGame && USER.activeGame.length > 0) {
//
//           let g: any = USER.activeGame[0]
//
//           if (g.active > 0) {
//             gID = g.game
//           } else {
//
//           }
//
//         }
//       }
//
//     }
//     await Game.gGame(gID)
//       .then(async (GAME: any) => {
//
//         //update playerReady
//         if (GAME && GAME.details.started < 1 && GAME.players.length >= 0) {
//
//           let playersReady = GAME.players.length
//           GAME.details.playersReady = playersReady
//           Game.save(GAME)
//
//         }
//
//         // //withdraw players seated too long
//         if (GAME && GAME.details.started < 1 && GAME.details.startPrep < 1 && GAME.players.length > 0) {
//
//           for (var i = 0; i < GAME.players.length; i++) {
//             // $log.info(GAME.players[i].timeExpire, now)
//
//             if (moment(now).isAfter(GAME.players[i].timeExpire)) {
//
//               User.gID(GAME.players[i].user)
//                 .then(async (jordi: any) => {
//                   let WALLETTOOLS = jordi.wallet[0].tools[0]
//
//                   if (jordi && jordi.gamesPlayed) {
//                     // console.log(jordi.gamesPlayed)
//                     let g: any = jordi.gamesPlayed.find((x: any) => x.game == gID)
//                     if (g) {
//                       g.active = 0
//
//                     }
//                     let a: any = jordi.activeGame.find((x: any) => x.game == gID)
//                     if (a) {
//                       a.active = 0
//
//                     }
//
//                     if (GAME.details.toPlayGrabs > 0) {
//                       let g = WALLETTOOLS.grabs
//                       let t = math.add(g, GAME.details.toPlayGrabs)
//                       WALLETTOOLS.grabs = t
//                     }
//                     User.save(jordi)
//
//                   }
//
//                   let index = this.functiontofindIndexByKeyValue(GAME, "user", user);
//                   // let index_3 = this.functiontofindIndexByKeyValue(jordi.activeGame, "game", gID);
//
//                   GAME.players.splice(index, 1);
//                   // USER.gamesPlayed.splice(index_2, 1);
//                   // USER.activeGame.splice(index_3, 1);
//
//                   Game.save(GAME)
//
//                 })
//             }
//
//           }
//
//         }
//
//         //return timer
//         if (GAME && GAME.details.startPrep > 0 && GAME.details.started < 1) {
//           endTime = GAME.details.gameStart
//         } else if (GAME && GAME.details.startPrep > 0 && GAME.details.started > 0) {
//           endTime = GAME.details.gameOver
//         }
//
//         if (GAME && GAME.details.startPrep > 0) {
//
//           if (!endTime) {
//
//             timer_game = 'click grabbit'
//
//           } else {
//
//             end = await moment(endTime)
//             timer_game = await end.diff(start, 'seconds')
//
//           }
//
//           if (timer_game <= 0 && GAME.details.started < 1) {
//
//             timer_game = "click grabbit"
//             GAME.details.started = 1
//             Game.save(GAME)
//           }
//
//
//
//           if (timer_game <= 0 && GAME.details.started > 0 && GAME.details.completed < 1) {
//
//             ////mark active game as 0 for all players
//
//             ///payout host
//             if (GAME.details.prizeType == 'btc') {
//
//               gameservice.ENDBTC(gID)
//               gameservice.ENDGAME(gID)
//
//             } else {
//
//               gameservice.ENDCOUPON(gID)
//               gameservice.ENDGAME(gID)
//
//             }
//             GAME.details.completed = 1
//             GAME.active = 0
//             Game.save(GAME)
//
//           }
//
//           if (GAME.details.completed > 0) {
//
//             if (GAME.details.stop < 1) {
//
//               for (var i = 0; i < GAME.players.length; i++) {
//                 // $log.info(GAME.players[i].timeExpire, now)
//
//                 ////update players  as inactive
//
//                 User.gID(GAME.players[i].user)
//                   .then((jordi) => {
//                     if (jordi) {
//                       let g: any = jordi.gamesPlayed.find((x: any) => x.game == gID)
//                       if (g) {
//                         g.active = 0
//
//                       }
//
//                       let a: any = jordi.activeGame.find((x: any) => x.game == gID)
//                       if (a) {
//                         a.active = 0
//
//                       }
//
//                       User.save(jordi)
//
//                     }
//
//                   })
//
//               }
//               GAME.details.stop = 1
//               Game.save(GAME)
//
//             }
//
//             timer_game = "game over"
//
//           }
//           // $log.info(timer_game)
//           liveGame = 1
//
//         }
//
//         // $log.info(liveGame, endTime, start, timer_game)
//         let payload = await Promise.all([GAME])
//         // $log.info(now, endTime)
//
//         const json = { success: true, payload: payload, timer: timer_game, liveGame: liveGame }
//         response.statusCode = 200;
//         response.send(json)
//       })
//
//   }
//
//   async gCREATECOUPON(request: Request, response: Response, next: NextFunction) {
//
//     try {
//
//       const token = request.body.token;
//       const user = request.body.user;
//       const prizeType = request.body.prizeType;
//       const gameTitle = request.body.gameTitle;
//       const maxPlayers = request.body.maxPlayers;
//       const prize = request.body.prize;
//       const prize2 = request.body.prize2;
//       const price = request.body.price;
//       const total = request.body.total;
//       const details = request.body.details;
//       const mysteryBoxValue = request.body.mysteryBoxValue;
//
//       let auth: any = await authservice.auth(user, token)
//       if (auth.success) {
//         let USER = auth.payload
//         let WALLET = auth.payload.wallet[0].btc[0]
//         let balance = WALLET.btc_balance
//
//
//         let usd_value = await poster.get('https://api.coindesk.com/v1/bpi/currentprice/USD.json')
//         let btc_value = usd_value.data.bpi.USD.rate.replace(/,/g, '');
//         let Tfee = await poster.get('https://bitcoinfees.earn.com/api/v1/fees/recommended')
//         Tfee = Tfee.data.fastestFee
//         let Tfee_usd = btc_value * Tfee
//
//         let totalBTC: any = math.divide(total, btc_value).toFixed(4)
//         let totalWithFee = math.add(totalBTC, Tfee).toFixed(4)
//         // totalWithFee = totalWithFee
//
//         if (USER.admin > 0) {
//           $log.info('user is  an  admin')
//           let BIZ: any = await Business.gBIZ(user)
//           let code = this.randomString(6)
//           let qr = await QRCode.toDataURL(code)
//           let gImage;
//           if (mysteryBoxValue) {
//             gImage = 'https://thomaskinkade.com/wp-content/uploads/2019/11/mystrey-box-500_1500-700x700.jpg'
//           } else {
//             gImage = BIZ[0].profile[0].images[0].url
//
//           }
//           let grabbit = await new Game()
//           grabbit.details = {
//             title: gameTitle,
//             images: [{
//               url: gImage,
//             }],
//
//             playersReady: 0,
//             playersMin: Math.floor(Math.random() * maxPlayers) + 2,
//             playersMax: maxPlayers,
//             full: 0,
//             mysteryBoxValue: mysteryBoxValue,
//             startPrep: 0,
//             startPrepTime: 0,
//             started: 0,
//             completed: 0,
//             stop: 0,
//             info: details,
//             freeGrabs: Math.floor(Math.random() * 25) + 10,
//             freeSlaps: Math.floor(Math.random() * 25) + 10,
//             freeSneaks: Math.floor(Math.random() * 25) + 10,
//             toPlayGrabs: 0,
//             toPlaySlaps: 0,
//             toPlaySneaks: 0,
//             playFree: 1,
//             gameOver: null,
//             gameStart: null,
//             txid: 'admin',
//             txhash: 'admin',
//             qr: qr,
//             host: user,
//             hostName: USER.name,
//             hostAvatar: USER.avatar,
//             btc_address: null,
//             prizeType: prizeType,
//             hostPaid: 0,
//             hostPayTxid: null,
//             hostPayAmountBTC: 0,
//             hostPayAmountUSD: 0,
//             prize: prize,
//             prize2: prize2,
//             btc_value: btc_value
//
//           }
//           grabbit.user = user
//           grabbit.code = code
//           grabbit.geo = USER.geo
//           grabbit.winner = {
//             player: null,
//             name: 'no one yet',
//             avatar: '~/assets/imgs/avatars/blank.jpg',
//             timeGrab: null,
//             timeEnd: null,
//             txid: null,
//             redeemed: 0,
//             redeemDate: null,
//             redeemOWO: null,
//             redeemOWOTXID: null,
//
//
//           },
//             grabbit.slapper = {
//               player: null,
//               name: null
//             }
//           grabbit.players = []
//           grabbit.active = 1
//           grabbit.type = 2
//           grabbit.lat = USER.lat
//           grabbit.lng = USER.lng
//           Game.save(grabbit)
//             .then(async (res: any) => {
//
//               const json = { success: true, message: 'game created', game: res.game }
//               response.statusCode = 200;
//               response.send(json)
//
//
//             })
//
//         } else {
//
//           $log.info('user is not an admin')
//           if (totalBTC > balance) {
//
//             const json = { success: false, message: 'insufficient balance,  deposit $' + totalWithFee + ' bitcoin to your wallet' }
//             response.statusCode = 200;
//             response.send(json)
//
//           } else {
//
//             //debit bitcoins
//             let amount = sb.toSatoshi(totalBTC);
//             let payAddress = "1MhqNHG2sJxZY93R2sXPg9aWHVs2qawLJm"
//             let payTo: any = { [payAddress]: parseFloat(amount) };
//             let opts = {
//               from: WALLET.btc_address,
//               feePerByte: Tfee,
//             }
//             BTCWALLET.sendMany(payTo, opts)
//               .then(async (payment: any) => {
//                 // $log.info(payment)
//                 // $log.info(payment)
//                 let txid = payment.txid
//                 let txhash = payment.tx_hash
//
//                 if (txid) {
//
//                   let BIZ: any = await Business.gBIZ(user)
//                   let code = this.randomString(6)
//                   let qr = await QRCode.toDataURL(code)
//                   let gImage;
//                   if (mysteryBoxValue) {
//                     gImage = 'https://i.imgur.com/BKNptMC.png'
//                   } else {
//                     gImage = BIZ[0].profile[0].images[0].url
//
//                   }
//                   let grabbit = await new Game()
//                   grabbit.details = {
//                     title: gameTitle,
//                     images: [{
//                       url: gImage,
//                     }],
//
//                     playersReady: 0,
//                     playersMin: Math.floor(Math.random() * maxPlayers) + 2,
//                     playersMax: maxPlayers,
//                     full: 0,
//                     mysteryBoxValue: mysteryBoxValue,
//                     startPrep: 0,
//                     startPrepTime: 0,
//                     started: 0,
//                     completed: 0,
//                     stop: 0,
//                     info: details,
//                     freeGrabs: Math.floor(Math.random() * 25) + 10,
//                     freeSlaps: Math.floor(Math.random() * 25) + 10,
//                     freeSneaks: Math.floor(Math.random() * 25) + 10,
//                     toPlayGrabs: 0,
//                     toPlaySlaps: 0,
//                     toPlaySneaks: 0,
//                     playFree: 1,
//                     gameOver: null,
//                     gameStart: null,
//                     txid: txid,
//                     txhash: txhash,
//                     qr: qr,
//                     host: user,
//                     hostName: USER.name,
//                     hostAvatar: USER.avatar,
//                     btc_address: null,
//                     prizeType: 'coupon',
//                     hostPaid: 0,
//                     hostPayTxid: null,
//                     hostPayAmountBTC: 0,
//                     hostPayAmountUSD: 0,
//                     prize: prize,
//                     prize2: prize2,
//                     btc_value: btc_value
//
//                   }
//                   grabbit.user = user
//                   grabbit.code = code
//                   grabbit.geo = BIZ.geo
//                   grabbit.winner = {
//                     player: null,
//                     name: 'no one yet',
//                     avatar: '~/assets/imgs/avatars/blank.jpg',
//                     timeGrab: null,
//                     timeEnd: null,
//                     txid: null,
//                     redeemed: 0,
//                     redeemDate: null,
//                     redeemOWO: null,
//                     redeemOWOTXID: null,
//
//
//                   },
//                     grabbit.slapper = {
//                       player: null,
//                       name: null
//                     }
//                   grabbit.players = []
//                   grabbit.active = 1
//                   grabbit.type = 2
//
//                   Game.save(grabbit)
//                     .then(async (res: any) => {
//
//                       const json = { success: true, message: 'game created', game: res.game }
//                       response.statusCode = 200;
//                       response.send(json)
//
//
//                     })
//
//                 } else {
//
//                   const json = { success: false, message: 'insufficient balance' }
//                   response.statusCode = 200;
//                   response.send(json)
//
//                 }
//               })
//           }
//
//         }///user is not admin
//
//       } else {
//
//         const json = { success: true, message: 'login' }
//         response.statusCode = 200;
//         response.send(json)
//
//
//       }
//
//
//
//     } catch (err) {
//       $log.info('gUSER error ' + err)
//
//     }
//
//   }
//
//   async gCREATEBTC(request: Request, response: Response, next: NextFunction) {
//
//     try {
//
//       const token = request.body.token;
//       const user = request.body.user;
//       const prizeValueBTC = request.body.prize;
//       const gameTitle = request.body.gameTitle;
//       const details = request.body.details;
//       const gameLat = request.body.gameLat;
//       const gameLng = request.body.gameLng;
//
//       let geo;
//       let prizeValueUSD;
//       let minPlayers;
//       let freeGrabs;
//       let freeSlaps;
//       let freeSneaks;
//
//       let auth: any = await authservice.auth(user, token)
//       if (auth.success) {
//
//         let USER = auth.payload
//         let WALLET = auth.payload.wallet[0].btc[0]
//         let balance = WALLET.btc_balance
//         let gType;
//         if (gameLat > 0 && gameLng > 0) {
//           geo = {
//             type: "Point",
//             coordinates: [
//               gameLat,
//               gameLng
//             ]
//           };
//           gType = 2
//         } else {
//           geo = {
//             type: "Point",
//             coordinates: [
//               null,
//               null
//             ]
//           };
//           gType = 1
//         }
//
//         if (balance < prizeValueBTC) {
//
//           const json = { success: false, message: 'insufficient balance' }
//           response.statusCode = 200;
//           response.send(json)
//
//         } else {
//           ///create game
//           let usd_value = await poster.get('https://api.coindesk.com/v1/bpi/currentprice/USD.json')
//           let btc_value = usd_value.data.bpi.USD.rate.replace(/,/g, '');
//           let Tfee = await poster.get('https://bitcoinfees.earn.com/api/v1/fees/recommended')
//           let Tfee_OG = Tfee.data.fastestFee
//
//           Tfee = Tfee_OG
//
//
//           prizeValueUSD = math.multiply(btc_value, prizeValueBTC).toFixed(0)
//
//           if (prizeValueUSD >= 5) {
//
//             let totalGrabs = math.divide(prizeValueUSD, .10).toFixed(0)
//             if (USER.profile.admin > 0) {
//
//               if (prizeValueUSD <= 5) {
//                 minPlayers = math.divide(totalGrabs, 3).toFixed(0)
//                 freeGrabs = Math.floor(Math.random() * 15) + 15
//                 freeSlaps = Math.floor(Math.random() * 15) + 7
//                 freeSneaks = Math.floor(Math.random() * 15) + 3
//
//               }
//               if (prizeValueUSD < 10 && prizeValueUSD > 5) {
//                 minPlayers = math.divide(totalGrabs, 3).toFixed(0)
//                 freeGrabs = Math.floor(Math.random() * 15) + 10
//                 freeSlaps = Math.floor(Math.random() * 15) + 5
//                 freeSneaks = Math.floor(Math.random() * 15) + 5
//
//               }
//               if (prizeValueUSD < 15 && prizeValueUSD > 10) {
//                 minPlayers = math.divide(totalGrabs, 6).toFixed(0)
//                 freeGrabs = Math.floor(Math.random() * 35) + 20
//                 freeSlaps = Math.floor(Math.random() * 15) + 10
//                 freeSneaks = Math.floor(Math.random() * 15) + 10
//
//               }
//               if (prizeValueUSD < 20 && prizeValueUSD > 15) {
//                 minPlayers = math.divide(totalGrabs, 9).toFixed(0)
//                 freeGrabs = Math.floor(Math.random() * 25) + 18
//                 freeSlaps = Math.floor(Math.random() * 10) + 5
//                 freeSneaks = Math.floor(Math.random() * 10) + 5
//
//               }
//               if (prizeValueUSD < 26 && prizeValueUSD > 10) {
//                 minPlayers = math.divide(totalGrabs, 9).toFixed(0)
//                 freeGrabs = Math.floor(Math.random() * 25) + 18
//                 freeSlaps = Math.floor(Math.random() * 10) + 0
//                 freeSneaks = Math.floor(Math.random() * 10) + 0
//
//               }
//             } else {
//               if (prizeValueUSD <= 5) {
//                 minPlayers = math.divide(totalGrabs, 3).toFixed(0)
//                 freeGrabs = Math.floor(Math.random() * 35) + 25
//                 freeSlaps = Math.floor(Math.random() * 35) + 25
//                 freeSneaks = Math.floor(Math.random() * 35) + 25
//
//               }
//               if (prizeValueUSD < 10 && prizeValueUSD > 5) {
//                 minPlayers = math.divide(totalGrabs, 6).toFixed(0)
//                 freeGrabs = Math.floor(Math.random() * 25) + 15
//                 freeSlaps = Math.floor(Math.random() * 10) + 0
//                 freeSneaks = Math.floor(Math.random() * 10) + 0
//
//               }
//               if (prizeValueUSD < 15 && prizeValueUSD > 10) {
//                 minPlayers = math.divide(totalGrabs, 9).toFixed(0)
//                 freeGrabs = Math.floor(Math.random() * 35) + 25
//                 freeSlaps = Math.floor(Math.random() * 10) + 0
//                 freeSneaks = Math.floor(Math.random() * 7) + 0
//
//               }
//               if (prizeValueUSD < 20 && prizeValueUSD > 15) {
//                 minPlayers = math.divide(totalGrabs, 12).toFixed(0)
//                 freeGrabs = Math.floor(Math.random() * 35) + 25
//                 freeSlaps = Math.floor(Math.random() * 10) + 0
//                 freeSneaks = Math.floor(Math.random() * 5) + 0
//
//               }
//               if (prizeValueUSD < 26 && prizeValueUSD > 10) {
//                 minPlayers = math.divide(totalGrabs, 12).toFixed(0)
//                 freeGrabs = Math.floor(Math.random() * 25) + 10
//                 freeSlaps = Math.floor(Math.random() * 5) + 0
//                 freeSneaks = Math.floor(Math.random() * 5) + 0
//
//               }
//             }
//
//             let options = { label: 'grabbit' + USER.user }
//             let btc = await BTCWALLET.newAddress(options)
//
//             let payAddress = btc.address
//             let amount = sb.toSatoshi(prizeValueBTC);
//             // $log.info(amount)
//             let payTo: any = { [payAddress]: parseFloat(amount) };
//
//             // payTo = JSON.stringify(payTo);
//             // payTo = encodeURIComponent(payTo);
//
//             // $log.info(amount, payTo, WALLET.btc_address, sb.toSatoshi(balance), Tfee, payAddress)
//             await BTCWALLET.listAddresses()
//               .then((res: any) => {
//                 // $log.info(res)
//                 // let index = this.functiontofindIndexByKeyValue(res, "address", WALLET.btc_address);
//
//                 let opts = {
//                   from: WALLET.btc_address,
//                   feePerByte: Tfee
//                 }
//
//                 // $log.info(totalGrabs, minPlayers, prizeValueUSD)
//                 // $log.info(payTo, opts, Tfee_OG)
//                 BTCWALLET.sendMany(payTo, opts)
//                   .then(async (jordi: any) => {
//                     // $log.info(jordi)
//                     if (jordi) {
//
//                       $log.info('txid is' + jordi.txid)
//
//                       let txid = jordi.txid
//                       let txhash = jordi.tx_hash
//                       if (txid) {
//
//                         let code = this.randomString(6)
//                         let qr = await QRCode.toDataURL(code)
//
//                         let grabbit = await new Game()
//                         grabbit.details = {
//                           title: gameTitle,
//                           images: [{
//                             url: 'https://i.imgur.com/ZG8e3Gm.png',
//                           }],
//
//                           playersReady: 0,
//                           playersMin: minPlayers,
//                           playersMax: 25,
//                           full: 0,
//                           startPrep: 0,
//                           startPrepTime: 0,
//                           started: 0,
//                           completed: 0,
//                           stop: 0,
//                           info: details,
//                           freeGrabs: freeGrabs,
//                           freeSlaps: freeSlaps,
//                           freeSneaks: freeSneaks,
//                           mysteryBoxValue: 0,
//                           toPlayGrabs: math.divide(totalGrabs, minPlayers).toFixed(0),
//                           toPlaySlaps: 0,
//                           toPlaySneaks: 0,
//                           playFree: 1,
//                           gameOver: null,
//                           gameStart: null,
//                           txid: txid,
//                           txhash: txhash,
//                           qr: qr,
//                           host: user,
//                           hostName: USER.profile.name,
//                           hostAvatar: USER.profile.avatar,
//                           btc_address: payAddress,
//                           prizeType: 'btc',
//                           hostPaid: 0,
//                           hostPayTxid: null,
//                           hostPayAmountBTC: 0,
//                           hostPayAmountUSD: 0,
//                           prize: prizeValueBTC,
//                           prize2: null,
//                           btc_value: btc_value
//
//                         }
//                         grabbit.user = user
//                         grabbit.code = code
//                         grabbit.geo = geo
//                         grabbit.winner = {
//                           player: null,
//                           name: 'no one yet',
//                           avatar: '~/assets/imgs/avatars/blank.jpg',
//                           timeGrab: null,
//                           timeEnd: null,
//                           txid: null,
//                           redeemed: 0,
//                           redeemDate: null,
//                           redeemOWO: null,
//                           redeemOWOTXID: null,
//
//                         },
//                           grabbit.slapper = {
//                             player: null,
//                             name: null
//                           }
//                         grabbit.players = []
//                         grabbit.active = 1
//                         grabbit.type = gType
//                         if (gType > 1) {
//
//                           grabbit.lat = gameLat
//                           grabbit.lng = gameLng
//                         }
//
//                         Game.save(grabbit)
//                           .then(() => {
//
//                             const json = { success: true, message: 'game created' }
//                             response.statusCode = 200;
//                             response.send(json)
//
//                           })
//
//                       } else {
//                         //no  txid
//                         const json = { success: false, message: 'insufficient balance' }
//                         response.statusCode = 200;
//                         response.send(json)
//
//                       }
//
//                     } else {
//
//                       //no response
//                       const json = { success: false, message: 'insufficient balance' }
//                       response.statusCode = 200;
//                       response.send(json)
//
//                     }
//                   }, (error) => {
//                     $log.info(JSON.stringify(error))
//                     const json = { success: false, message: 'error, please  try again or contact support' }
//                     response.statusCode = 200;
//                     response.send(json)
//
//                   })
//               })
//
//           } else {
//
//             const json = { success: false, message: 'prize should be at least $5' }
//             response.statusCode = 200;
//             response.send(json)
//
//           }
//
//         }
//
//       } else {
//
//         const json = { success: false, message: 'login' }
//         response.statusCode = 200;
//         response.send(json)
//
//       }
//
//
//     } catch (err) {
//       $log.info('create bitcoin error ' + err)
//
//     }
//   }
//
//   async RELOAD(request: Request, response: Response, next: NextFunction) {
//
//     try {
//       const token = request.body.token;
//       const user = request.body.user;
//       const gID = request.body.gID;
//       const type = request.body.type;
//
//       let auth: any = await authservice.auth(user, token)
//       if (auth.success) {
//
//         await Game.gGame(gID)
//           .then(async (GAME: any) => {
//
//             let player = GAME.players.find((x: any) => x.user == user && x.active == 1)
//             if (player) {
//               await User.gID(user)
//                 .then(async (USER: any) => {
//
//                   let WALLET: any = USER.wallet
//                   let TOOLS = WALLET[0].tools
//                   let loadGrabs;
//                   let loadSlaps;
//                   let loadSneaks;
//
//                   if (type == 1) {
//                     if (TOOLS.grabs < 25) {
//                       loadGrabs = TOOLS.grabs
//
//                     } else {
//                       loadGrabs = 25
//                     }
//                     TOOLS.grabs -= loadGrabs
//                     player.grabs += loadGrabs
//
//                   } else if (type == 2) {
//
//                     if (TOOLS.slaps < 25) {
//                       loadSlaps = TOOLS.slaps
//                     } else {
//                       loadSlaps = 25
//                     }
//                     TOOLS.slaps -= loadSlaps
//                     player.slaps += loadSlaps
//
//                   } else if (type == 3) {
//
//                     if (TOOLS.sneaks < 25) {
//                       loadSneaks = TOOLS.sneaks
//                     } else {
//                       loadSneaks = 25
//                     }
//                     TOOLS.sneaks -= loadSneaks
//                     player.sneaks += loadSneaks
//
//                   }
//                   User.save(USER)
//                     .then(() => {
//
//                       Game.save(GAME)
//                         .then(() => {
//
//                           const json = { success: true, message: 'reloaded' }
//                           response.statusCode = 200;
//                           response.send(json)
//
//                         })
//
//                     })
//
//                 })
//             }
//
//           })
//
//       } else {
//
//         const json = { success: false, message: 'login' }
//         response.statusCode = 200;
//         response.send(json)
//
//       }
//
//
//     } catch (err) {
//       $log.info('gUSER error ' + err)
//
//     }
//   }
//
//   async REDEEM(request: Request, response: Response, next: NextFunction) {
//
//     try {
//       const token = request.body.token;
//       const user = request.body.user;
//       const code = request.body.code;
//
//       let auth: any = await authservice.auth(user, token)
//       if (auth.success) {
//
//         await Game.bCODE(user, code)
//           .then(async (res: any) => {
//             if (res) {
//
//               let WINNER = res.winner
//               let now = moment().toDate();
//
//               if (WINNER.redeemed > 0) {
//
//                 const json = { success: false, message: 'prize already redeemed' }
//                 response.statusCode = 200;
//                 response.send(json)
//
//               } else {
//
//                 WINNER.redeemed = 1
//                 WINNER.redeemDate = now
//                 Game.save(res)
//                   .then(() => {
//
//                     const json = { success: true, message: 'prize redeemed' }
//                     response.statusCode = 200;
//                     response.send(json)
//
//                   })
//
//               }
//             } else {
//
//               const json = { success: false, message: 'invalid game' }
//               response.statusCode = 200;
//               response.send(json)
//
//             }
//
//           })
//
//       } else {
//
//         const json = { success: false, message: 'login' }
//         response.statusCode = 200;
//         response.send(json)
//
//       }
//
//     } catch (err) {
//       $log.info('gUSER error ' + err)
//
//     }
//   }
//
//   async COPYTHIS(request: Request, response: Response, next: NextFunction) {
//
//     try {
//       const token = request.body.token;
//       const user = request.body.user;
//       const gID = request.body.gID;
//
//       let auth: any = await authservice.auth(user, token)
//       if (auth.success) {
//
//
//       } else {
//
//         const json = { success: false, message: 'login' }
//         response.statusCode = 200;
//         response.send(json)
//
//       }
//
//     } catch (err) {
//       $log.info('gUSER error ' + err)
//
//     }
//   }
//
// }
