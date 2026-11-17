// Интерфейс панели. Сети нет: общается только со своей главной частью
// через window.kodaPlugin.
const bridge = window.kodaPlugin;
const $ = (id) => document.getElementById(id);

async function refresh() {
  const state = await bridge.call("state");
  $("stats").textContent = `Агент вызвал инструмент ${state.calls} раз`;
}

async function main() {
  const info = await bridge.info();
  document.documentElement.dataset.theme = info.theme;
  bridge.subscribe((event, data) => {
    if (event === "theme") document.documentElement.dataset.theme = data;
    if (event === "called") void refresh();
  });
  $("insert").addEventListener("click", () => void bridge.call("insert", { text: $("text").value }));
  await refresh();
}

void main();
