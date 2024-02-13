const { db } = require('@vercel/postgres');
const {
  users,
  sharingposts,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    /* might need to add this: ALTER TABLE users
ADD CONSTRAINT unique_name_email_constraint UNIQUE (name, email);
*/
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedSharingPosts(client) {
  console.log("entering seedSharingPosts");
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS sharingposts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    creator_id UUID NOT NULL,
    creation_date DATE NOT NULL,
    company VARCHAR(255),
    interview_status VARCHAR(255),
    interview_type VARCHAR(255),
    title VARCHAR(255),
    content TEXT,
    likes INT,
    views INT,
    meet_able BOOLEAN,
    meet_charge INT,
    available_time VARCHAR(255)
  );
`;

    console.log(`Created "sharingposts" table`);

    // Insert data into the "invoices" table
    const insertedSharingposts = await Promise.all(
      sharingposts.map(
        (post) => client.sql`
        INSERT INTO sharingposts (creator_id, creation_date, company, interview_status, interview_type, title, content, likes, views, meet_able, meet_charge, available_time)
        VALUES (${post.creator_id}, ${post.creation_date}, ${post.company}, ${post.interview_status}, ${post.interview_type}, ${post.title}, ${post.content}, ${post.likes}, ${post.views}, ${post.meet_able}, ${post.meet_charge}, ${post.available_time})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedSharingposts.length} posts`);

    return {
      createTable,
      sharingposts: insertedSharingposts,
    };
  } catch (error) {
    console.error('Error seeding sharingposts:', error);
    throw error;
  }
}

async function seedLikes(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS likes (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        post_id UUID NOT NULL,
        liker_id UUID NOT NULL,
        creator_id UUID NOT NULL
      );
    `;

    console.log(`Created "likes" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding likes:', error);
    throw error;
  }
}

async function seedViews(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS views (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        post_id UUID NOT NULL,
        viewer_id UUID NOT NULL,
        creator_id UUID NOT NULL,
        CONSTRAINT unique_post_viewer_pair UNIQUE (post_id, viewer_id)
      );
    `;

    console.log(`Created "views" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding views:', error);
    throw error;
  }
}

async function seedMeets(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS meets (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        post_id UUID NOT NULL,
        seeker_id UUID NOT NULL,
        seeker_name VARCHAR(255) NOT NULL,
        seeker_email TEXT NOT NULL,
        sharer_id UUID NOT NULL,
        sharer_name VARCHAR(255) NOT NULL,
        sharer_email TEXT NOT NULL,
        charge INT,
        additional_fee INT,
        meet_status VARCHAR(255),
        payment_status VARCHAR(255),
        received_date DATE NOT NULL,
        CONSTRAINT unique_post_seeker_sharer_pair UNIQUE (post_id, seeker_id, sharer_id)
      );
    `;

    console.log(`Created "meets" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding meets:', error);
    throw error;
  }
}

async function seedPointRecords(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS pointrecords (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        point INT NOT NULL,
        action VARCHAR(255) NOT NULL,
        timestamp DATE NOT NULL
      );
    `;

    console.log(`Created "pointrecords" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding pointrecords:', error);
    throw error;
  }
}


async function main() {
  const client = await db.connect();
  
  // await seedUsers(client);
  // await seedSharingPosts(client);
  // await seedLikes(client);
  // await seedViews(client);
  // await seedMeets(client);
  await seedPointRecords(client);


  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
