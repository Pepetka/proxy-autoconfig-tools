import fs from "fs/promises";
import { join } from "path";

const rulesFilePath = join(__dirname, "rules.txt");

const readRules = async () => {
  try {
    const data = await fs.readFile(rulesFilePath, "utf8");
    return data.split("\n").filter((line) => line.trim() !== "");
  } catch {
    return [];
  }
};

const writeRules = async (rules: string[]) => {
  const sortedRules = Array.from(new Set(rules)).sort();
  await fs.writeFile(rulesFilePath, sortedRules.join("\n"), "utf8");
};

const addDomains = async (domains: string[]) => {
  const rules = await readRules();
  const updatedRules = [...rules, ...domains];
  await writeRules(updatedRules);
  console.log("Added domains:", domains.join(", "));
};

const removeDomains = async (domains: string[]) => {
  const rules = await readRules();
  const updatedRules = rules.filter((rule) => !domains.includes(rule));
  await writeRules(updatedRules);
  console.log("Deleted domains:", domains.join(", "));
};

const manageRules = async () => {
  const args = process.argv.slice(2);
  const command = args[0];
  const domains = args.slice(1);

  if (!["add", "remove"].includes(command)) {
    console.error("Allowed commands: add или remove");
    return;
  }

  if (domains.length === 0) {
    console.error("Indicate the domains");
    return;
  }

  if (command === "add") {
    await addDomains(domains);
  } else if (command === "remove") {
    await removeDomains(domains);
  }
};

manageRules();
