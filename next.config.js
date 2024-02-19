module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/signin",
        destination: "https://timzon000.appspot.com/signin?to=hub",
      },
      {
        source: "/api/templates",
        destination: "https://timzon000.appspot.com/user/designtemplates",
      },
    ];
  },
};
