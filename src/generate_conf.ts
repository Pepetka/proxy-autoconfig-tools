import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const rulesFilePath = join(__dirname, "../rules.txt");
const confFilePath = join(__dirname, "../output/proxy.conf");

export const generateConf = async () => {
  try {
    const data = await readFile(rulesFilePath, "utf-8");
    const domains = data
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((domain) => `DOMAIN-SUFFIX,${domain},PROXY`);

    const confContent = domains.map((d) => `${d}`).join("\n");

    await writeFile(confFilePath, confContent, "utf-8");
    console.log("CONF-файл успешно создан: proxy.conf");
  } catch (error) {
    console.error("Ошибка при генерации CONF-файла:", error);
    process.exit(1);
  }
};
