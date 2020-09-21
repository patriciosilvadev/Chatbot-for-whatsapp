const banco = require('./database/banco')
const stages = require('./stages')
const venonbt = require('venom-bot');

// let resp = stages.step[getStage("5522998868691@c.us")].obj.execute()
//     for (let index = 0; index < Array(resp).length; index++) {
//       const element = Array(resp)[index];
//       console.log(element)
//     }


 venonbt.create().then((client) => start(client));
 function start(client) {
   client.onMessage((message) => {
     let resp = stages.step[getStage(message.from)].obj.execute(message.from, message.body)
     for (let index = 0; index < resp.length; index++) {
       const element = resp[index];
       client.sendText(message.from,element)
    }
   });
 }

function getStage(user){
  return banco.db[user].stage;
}
