const { db } = require('@vercel/postgres');

async function getUserPointRanking(client) {
  try {
    // Get the pending meets
    const ranking = await client.sql`
    SELECT 
        pr.user_id, 
        u.name, 
        u.email, 
        SUM(pr.points) AS total_points
    FROM 
        pointrecords pr
    JOIN 
        users u ON pr.user_id = u.id
    GROUP BY 
        pr.user_id, u.name, u.email
    ORDER BY 
        total_points DESC;
    `;
    // Write emails informing the seeker_name
    console.log("Ranking meets: ", ranking.rows);
  } catch (error) {
    console.error('Error ranking users by points:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  await getUserPointRanking(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to rank users:',
    err,
  );
});
