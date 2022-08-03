const path = require("path");
const fs = require("fs");

const getEvents = () => {
  const eventsPath = path.join(__dirname, "../events");
  const eventsFileName = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));
  const events = eventsFileName.map((file) =>
    require(path.join(eventsPath, file))
  );
  return events;
};

module.exports = getEvents;
