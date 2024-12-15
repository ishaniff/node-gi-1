const LanguageDetect = require("languagedetect");
const lngDetector = new LanguageDetect();
const chalk = require("chalk");

function languageAnalyzer(str) {
  return lngDetector.detect(str, 1);
}

console.log(
  chalk.blue.inverse(
    `most likely the language is ${languageAnalyzer(
      "greetings to all our programmers"
    )}`
  )
);
console.log(
  chalk.red.inverse(
    `most likely the language is ${languageAnalyzer("hola como estas")}`
  )
);
// https://www.npmjs.com/package/languagedetect
console.log(
  chalk.green.inverse(
    `most likely the language is ${languageAnalyzer("es macht gut")}`
  )
);
console.log(
  chalk.white.inverse(
    `most likely the language is ${languageAnalyzer("dobra prace")}`
  )
);
