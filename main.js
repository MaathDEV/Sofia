const Discord = require("discord.js");
const fs = require('fs');
const bot = new Discord.Client();

var funcs    = require("./src/Funcs.js");
var settings = require("./src/Settings.js");
var json = JSON.parse(fs.readFileSync("./src/texts/pt-br.json", 'utf8'));

bot.on('message', message => {
  if(message.content.startsWith('<@!339105666935554068> começar') || message.content.startsWith('<@!339105666935554068> comecar') || message.content.startsWith('<@!339105666935554068> start')){
    funcs.text(message, "Hey <@!"+message.author.id+">", json.replys.TEST);
  }

  if(funcs.getreply(message, json.replys.TEST) != false){
    funcs.addOption(message, message.author.id, funcs.getreply(message, json.replys.TEST));
  }


  /*if(message.content.startsWith('!s')){
    var args = event.content.split(" ").slice(1);

  }*/
});

bot.login(settings.token);
