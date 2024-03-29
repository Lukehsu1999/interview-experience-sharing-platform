/* Run this way
    npm run resetPwd -- {user email} {new password}
*/
const { db } = require('@vercel/postgres');

async function getPendingMeetsEmailList(client) {
  try {
    // Get the pending meets
    const pendingmeets = await client.query(
      "SELECT meets.*, sharingposts.title, sharingposts.available_time FROM meets JOIN sharingposts ON meets.post_id = sharingposts.id WHERE meets.meet_status = 'pending';"
    );
    // Write emails informing the seeker_name
    console.log("Pending meets: ", pendingmeets.rows, " Remember to setMeetsInvited!");
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
