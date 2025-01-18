import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const rulesFilePath = join(__dirname, "../rules.txt");
const gfwFilePath = join(__dirname, "../output/gfw.txt");

export const generateGfw = async () => {
  try {
    const data = await readFile(rulesFilePath, "utf-8");
    const domains = data
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((domain) => `||${domain.trim()}`);

    const gfwRaw = domains.join("\n");
    const gfwContent = Buffer.from(gfwRaw, "utf8").toString("base64");

    await writeFile(gfwFilePath, gfwContent, "utf-8");
    console.log("GFW-файл успешно создан: gfw.txt");
  } catch (error) {
    console.error("Ошибка при генерации GFW-файла:", error);
    process.exit(1);
  }
};
