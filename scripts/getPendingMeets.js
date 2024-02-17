/* Run this way
    npm run resetPwd -- {user email} {new password}
*/
const { db } = require('@vercel/postgres');

async function getPendingMeetsEmailList(client) {
  try {
    // Get the pending meets
    const pendingmeets = await client.query(
      "SELECT * FROM meets WHERE meet_status='pending';"
    );
    // Write emails informing the seeker_name
    console.log("Pending meets: ", pendingmeets.rows)
  } catch (error) {
    console.error('Error getting pending meets:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  await getPendingMeetsEmailList(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to get pending meets:',
    err,
  );
});
