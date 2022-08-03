module.exports = {
  name: "ready",
  handler: async (client) => {
    console.clear();
    console.log(`Logged in as ${client.user.tag}!`);
  },
};
