const fs = require("node:fs");
const { program } = require("commander");

program
  .requiredOption('-i, --input <type>', 'input file path')
  .option('-o, --output <type>', 'output file path')
  .option('-d, --display', 'display result in console');

program.parse(process.argv);

const options = program.opts();

// Перевірка на наявність обовʼязкового параметра
if (!options.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

// Перевірка на наявність вхідного файлу
if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}

const data = fs.readFileSync(options.input, 'utf8');
const jsonData = JSON.parse(data);

const newData = jsonData
  .filter(item => item.parent === "BS3_BanksLiab")
  .map(item => `${item.txten}: ${item.value}`);

const result = newData.join('\n');

// Виводимо результат у консоль, якщо задано -d
if (options.display) {
  console.log(result);
}

// Записуємо результат у файл, якщо задано -o
if (options.output) {
  fs.writeFileSync(options.output, result, 'utf8');
  console.log(`Data has been written to ${options.output}`);
}
