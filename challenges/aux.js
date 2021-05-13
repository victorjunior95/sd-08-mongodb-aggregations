const fs = require("fs");

for (let i = 1; i <= 14; i += 1) {
  fs.writeFileSync(`desafio${i}.js`, "");
}
