const { exec } = require('child_process');

const migrationName = process.env.npm_config_name;
if (!migrationName) {
  console.error("Error: Please provide a migration name using --name argument, e.g., npm run migration:generate --name=addColumnNotes");
  process.exit(1);
}

const command = `npx typeorm-ts-node-commonjs migration:generate src/database/migrations/${migrationName} -d ./src/config/typeorm.ts`;
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(stdout);
});
