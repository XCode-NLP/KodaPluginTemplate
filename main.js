// Главная часть плагина. Работает в песочнице QuickJS внутри Koda:
// нет require, Node и своей сети. Всё доступно только через `ctx`.

/** @param {import("@kodadev/desktop-plugin-sdk").PluginContext} ctx */
async function activate(ctx) {
  ctx.log.info("plugin started", ctx.env.version);

  // Инструмент агента. Имя совпадает с contributes.agentTools в koda-plugin.json.
  ctx.tools.register("echo", async (args) => {
    const calls = ((await ctx.storage.get("calls")) || 0) + 1;
    await ctx.storage.set("calls", calls);
    await ctx.ui.post("called", { calls });
    return { content: String(args.text ?? "") };
  });

  // Запросы от панели (ui/app.js).
  ctx.ui.handle("state", async () => ({ calls: (await ctx.storage.get("calls")) || 0 }));
  ctx.ui.handle("insert", async ({ text }) => {
    await ctx.chat.insertIntoComposer(String(text ?? ""));
    return null;
  });
}

module.exports = { activate };
