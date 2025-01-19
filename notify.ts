import { execSync } from "child_process";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const sendTelegramMessage = async (message: string) => {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const body = {
    chat_id: TELEGRAM_CHAT_ID,
    text: message,
    parse_mode: "Markdown",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Ошибка Telegram API: ${response.statusText}`);
    }
    console.log("Сообщение отправлено:", message);
  } catch (error) {
    console.error("Ошибка отправки в Telegram:", error);
  }
};

const compareChanges = async () => {
  try {
    const diff = execSync("git diff HEAD^ HEAD -- rules.txt").toString();

    const added: string[] = [];
    const removed: string[] = [];

    diff.split("\n").forEach((line) => {
      if (line.startsWith("+") && !line.startsWith("+++")) {
        added.push(line.slice(1).trim());
      } else if (line.startsWith("-") && !line.startsWith("---")) {
        removed.push(line.slice(1).trim());
      }
    });

    let message = "";
    if (added.length > 0) {
      message += `*Добавлены домены:*\n${added.map((d) => `- \`${d}\``).join("\n")}\n`;
    }
    if (removed.length > 0) {
      message += `*Удалены домены:*\n${removed.map((d) => `- \`${d}\``).join("\n")}`;
    }

    if (message) {
      await sendTelegramMessage(message);
    } else {
      console.log("Изменений в rules.txt нет.");
    }
  } catch (error) {
    console.error("Ошибка сравнения изменений:", error);
  }
};

compareChanges();
