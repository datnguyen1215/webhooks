import "./aliases";
import settings from "./settings";
import db from "./db";

(async () => {
  console.log(`Settings: ${JSON.stringify(settings)}`);

  const result = await db.query("SELECT CURRENT_DATE");
  console.log(result.rows);

  db.pool.end();
})();
