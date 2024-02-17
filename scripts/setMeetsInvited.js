/* Run this way
    npm run resetPwd -- {user email} {new password}
*/
const { db } = require('@vercel/postgres');

async function setPendingMeetsInvited(client) {
  try {
    // Get the pending meets    
    const updatedmeets = await client.query(
      "UPDATE meets SET meet_status = 'invited' WHERE meet_status = 'pending';"
    );
    // Write emails informing the seeker_name
    console.log("Updated meets:", updatedmeets.rows);
  } catch (error) {
    console.error('Error setting pending meets to invited:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  await setPendingMeetsInvited(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to set pending meets invited:',
    err,
  );
});
