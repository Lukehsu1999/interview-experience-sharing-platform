const { db } = require('@vercel/postgres');

async function getUserEmails(client) {
    try {
      // Get the pending meets
      const result = await client.sql`
        SELECT 
            email
        FROM 
            users;
      `;
      // Extract emails and join them into a single string separated by commas
      const emailsString = result.rows.map(row => row.email).join(', ');
      console.log("user emails: ", emailsString);
      return emailsString; // If you need to use this string outside the function
    } catch (error) {
      console.error('Error getting user emails:', error);
      throw error;
    }
  }

async function main() {
  const client = await db.connect();
  await getUserEmails(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to get emails:',
    err,
  );
});
