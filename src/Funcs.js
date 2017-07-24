const fs = require('fs');

module.exports = {
  text: function(event, text, options){
    var opts = "";
    for (i = 0; i < options.length; i++) {
      opts += `[${i}] ${options[i]}\n`;
    }
    event.channel.send(text + "\n ```css\n" + opts + "```\n\n Use `!s <opção>` para selecionar");
    var json = JSON.parse(fs.readFileSync("./src/db.json", 'utf8'));
    if(json[event.author.id] == undefined){
      json[event.author.id] = {"options": []};
      var data = JSON.stringify(json);
      fs.writeFileSync("./src/db.json", data);
    }
  },

  getreply: function(event, replys){
    if(event.content.startsWith('!s')){
      var args = event.content.split(" ").slice(1);
      for(i = 0; i < replys.length; i++){
        if(args[1] == i){
          event.reply(i + " - " + args);
          return args;
        } else {
          event.reply(":warning: Por favor, coloque uma opção valida");
          return false;
        }
      }
    } else {
      return false;
    }
  },

  addOption: function(event, id, index){
    var json = JSON.parse(fs.readFileSync("./src/db.json", 'utf8'));
    json[id].options.push(index);
    var data = JSON.stringify(json);
    fs.writeFileSync("./src/db.json", data);
  }
};
