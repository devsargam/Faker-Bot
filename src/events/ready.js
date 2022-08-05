module.exports = {
  name: "ready",
  handler: async (client) => {
    console.log(`Logged in as ${client.user.tag}!`);
  },
};
