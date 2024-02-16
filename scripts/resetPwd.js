/* Run this way
    npm run resetPwd -- {user email} {new password}
*/
const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');

async function resetPwdByEmail(client, email, newpwd) {
  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newpwd, 10);

    // Update the user's password in the database
    const updateResult = await client.query(
      'UPDATE users SET password = $1 WHERE email = $2 RETURNING *', // Use RETURNING * to get the updated row
      [hashedPassword, email]
    );

    // Check if the update was successful
    if (updateResult.rowCount === 0) {
      // No user found with the given email, or no update was made
      console.log('No user found with the given email or no update was necessary.');
      return null;
    }

    console.log('Password update successful for:', updateResult.rows[0]);
    return updateResult.rows[0]; // Return the updated user row
  } catch (error) {
    console.error('Error resetting user password by email:', error);
    throw error;
  }
}


const email = process.argv[2];
const newpwd = process.argv[3];
async function main() {
  const client = await db.connect();
  await resetPwdByEmail(client, email, newpwd);
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to reset Password:',
    err,
  );
});
