const venom = require("venom-bot");
const banco = require("./database/banco");
const stages = require("./stages");

function SendMSG(){
  client.sendText(message.from, element);
}

venom.create().then((client) => start(client));
function start(client) {
  client.onMessage((message) => {
    console.log(message)
    let resp = stages.step[getStage(message.from)].obj.execute(
      message.from,
      message.body,
      message.sender.pushname,
      SendMSG
    );
    for (let index = 0; index < resp.length; index++) {
      const element = resp[index];
      client.sendText(message.from, element);
    }
  });
}

function getStage(user) {
  if (banco.db[user]) {
    //Se existir esse numero no banco de dados
    return banco.db[user].stage;
  } else {
    //Se for a primeira vez que entra e contato
    banco.db[user] = {
      stage: 0,
      itens: [],
    };
    return banco.db[user].stage;
  }
}