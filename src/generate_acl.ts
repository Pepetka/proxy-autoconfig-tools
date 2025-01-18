import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const rulesFilePath = join(__dirname, "../rules.txt");
const aclFilePath = join(__dirname, "../output/proxy.acl");
const aclTemplatePath = join(__dirname, "../templates/acl.template");

export const generateAcl = async () => {
  try {
    const data = await readFile(rulesFilePath, "utf-8");
    const domains = data
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((domain) => `(?:^|\.)${domain}$`.replace(/\./g, "\\."));

    const aclTemplate = await readFile(aclTemplatePath, "utf-8");
    const aclContent = aclTemplate.replace(
      "{{DOMAINS}}",
      domains.map((d) => `${d}`).join(",\n"),
    );

    await writeFile(aclFilePath, aclContent, "utf-8");
    console.log("ACL-файл успешно создан: proxy.acl");
  } catch (error) {
    console.error("Ошибка при генерации ACL-файла:", error);
    process.exit(1);
  }
};
