module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "instaclone-backend",
      url: "http://ba9d-39-118-200-159.ngrok.io/graphql",
    },
  },
};
