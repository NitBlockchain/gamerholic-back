import { createConnection, getConnectionManager, getConnection, getRepository } from "typeorm";
import * as mjml2html from 'mjml'
import { $log } from "ts-log-debug";

var api_key = 'key-c501ea798cce2894023feb6e72eadd10';
var domain = 'mg.gamerholic.com';
var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });


class EmailService {

  async basic(email: any, subject: any, recipient: any, message: any) {

    let options = {
      beautify: false
    }

    let html = mjml2html('<mjml>' +
      '<mj-body>' +
      '<mj-section>' +
      '<mj-column>' +
      '<mj-image width="162px" src="https://i.imgur.com/sqqQeZa.png"></mj-image>' +
      '</mj-column>' +
      '</mj-section>' +
      '<mj-section background-color="#f3f3f3">' +
      '<mj-column>' +
      '<mj-image width="170px" src="https://i.imgur.com/kxpyqNN.png"></mj-image>' +
      '</mj-column>' +
      '<mj-column>' +
      '<mj-text font-weight="bold" align="justify" font-size="24px" color="#000" font-family="helvetica">' + subject + '</mj-text>' +
      '<mj-text align="justify" font-size="15px" color="#000" font-family="helvetica">hello ' + recipient + '<br><br>' + message + '</mj-text>' +
      '<mj-button align="left" background-color="#8ccaca" border-radius="40px" font-family="helvetica" font-size="12px"><a href="https://play.google.com/store/apps/details?id=grabbit.cheap">GO PLAY</a></mj-button>' +
      '</mj-column>' +
      '</mj-section>' +
      '<mj-section>' +
      '<mj-column>' +

      '<mj-text font-weight="bold" align="center" font-size="16px" color="#000" font-family="helvetica">Win Local Coupons</mj-text>' +
      '<mj-text align="justify" font-size="13px" color="#000" font-family="helvetica">Win coupons and other great prizes from local businesses</mj-text>' +

      '</mj-column>' +
      '<mj-column>' +

      '<mj-text font-weight="bold" align="center" font-size="16px" color="#000" font-family="helvetica">Bitcoin Auctions</mj-text>' +
      '<mj-text align="justify" font-size="13px" color="#000" font-family="helvetica">Win bitcoin and other crypto prizes playing against global players</mj-text>' +

      '</mj-column>' +
      '<mj-column>' +

      '<mj-text font-weight="bold" align="center" font-size="16px" color="#000" font-family="helvetica">Sell Bitcoin</mj-text>' +
      '<mj-text align="justify" font-size="13px" color="#000" font-family="helvetica">Create your own bitcoin auction, and make a profit.</mj-text>' +

      '</mj-column>' +
      '</mj-section>' +
      '</mj-body>' +
      '</mjml>')

    // console.log(html)
    let d = {
      from: 'Gamerholic <cs@gamerholic.com>',
      to: email,
      subject: subject,
      html: html.html,
    };

    mailgun.messages().send(d, function(error, body) {
      if (error) {
        $log.info(error)
        return false;
      } else {
        return true;
      }
    });

  }

}

export { EmailService };
