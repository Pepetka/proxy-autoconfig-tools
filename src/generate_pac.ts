import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const rulesFilePath = join(__dirname, "../rules.txt");
const pacFilePath = join(__dirname, "../output/proxy.pac");
const pacTemplatePath = join(__dirname, "../templates/pac.template");

export const generatePac = async () => {
  try {
    const data = await readFile(rulesFilePath, "utf-8");
    const domains = data
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((domain) => (domain.startsWith("*.") ? domain : `*.${domain}`));

    const pacTemplate = await readFile(pacTemplatePath, "utf-8");
    const pacContent = pacTemplate.replace(
      "{{DOMAINS}}",
      domains.map((d) => `"${d}"`).join(",\n    "),
    );

    await writeFile(pacFilePath, pacContent, "utf-8");
    console.log("PAC-файл успешно создан: proxy.pac");
  } catch (error) {
    console.error("Ошибка при генерации PAC-файла:", error);
    process.exit(1);
  }
};
