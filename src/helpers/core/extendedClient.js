require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");

const getCommands = require("../getCommands");
const getEvents = require("../getEvents");

class ExtendedClient extends Client {
  constructor() {
    super({
      intents: [GatewayIntentBits.Guilds],
    });
    this.commands = new Collection();
    this._loadCommands();
    this._loadEvents();
  }

  _loadEvents() {
    for (const event of getEvents()) {
      this.on(event.name, event.handler);
    }
  }

  _loadCommands() {
    for (const command of getCommands()) {
      this.commands.set(command.data.name, command);
    }
  }
}

module.exports = ExtendedClient;
