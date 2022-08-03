const ExtendedClient = require("./helpers/core/extendedClient");

const FakerBot = new ExtendedClient();
FakerBot.login(process.env.BOT_TOKEN);
