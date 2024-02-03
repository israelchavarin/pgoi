import app from "./app.js";
import { sequelize } from "./database/database.js";

import "./models/Opportunity.js";
import "./models/User.js";
import "./models/UserAccess.js";
import "./models/UserBalance.js";
import "./models/Order.js";

async function main() {
  try {
    await sequelize.sync();

    const port = 3000;
    app.listen(port);
    console.log(`Server listening on port: ${port}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
