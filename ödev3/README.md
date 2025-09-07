"migration:generate": "typeorm migration:generate -d ./db/data-source.js -o --esm",
"migration:run": "typeorm migration:run -d ./db/data-source.js",
"migration:revert": "typeorm migration:revert -d ./db/data-source.js",
"migration:show": "typeorm migration:show -d ./db/data-source.js"