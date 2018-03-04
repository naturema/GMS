module.exports = {
  async login(ctx) {
    console.log(ctx.request.body);
    const data = JSON.parse(ctx.request.body);
    const { userName, password, type } = data;
    ctx.body = {
      status: "ok",
      type,
      currentAuthority: userName
    };
  }
};
