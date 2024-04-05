import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
  PostsTable,
  Comment
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';


export async function fetchRevenue() {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore();
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchUnlimitedViewStatus(id: string) {
  return true;
  noStore(); // Assuming this is a function call relevant to your setup.
  try {
    const result = await sql`
    SELECT status FROM viewstatus WHERE user_id = ${id};
    `;
    if (result.rows.length > 0) {
      // Assuming there's only one entry per user_id due to the UNIQUE constraint.
      const status = result.rows[0].status;
      if (status=='new'){
        const setStatusLimited = await sql`UPDATE viewstatus SET status = 'limited' WHERE user_id = ${id}`;
        return true;
      }
      else if(status=='limited'){
        return false;
      }
      else{
        // unlimited
        return true;
      }
      // Return the status of the given user_id.
    } else {
      console.log('No status found for the given user_id. Return default true');
      return true; // Return null if no status is found.
    }
  } catch (error) {
    console.error('Database Error @ fetchUnlimitedViewStatus:', error);
    // It might be better to throw the error to let the caller handle it,
    // but since you want to return true in case of an error:
    return true;
  }
}


export async function fetchCardData(id: string) {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    //const totalPostsPromise = sql`SELECT COUNT(*) FROM invoices`;
    const totalLikesPromise = sql`SELECT COUNT(*) FROM likes WHERE creator_id=${id}`;
    const totalViewsPromise = sql`SELECT COUNT(*) FROM views WHERE creator_id=${id}`;
    const totalPointsPromise = sql`SELECT SUM(points) AS total_points FROM pointrecords WHERE user_id =${id}`;
    // const invoiceStatusPromise = sql`SELECT
    //      SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
    //      SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
    //      FROM invoices`;

    const data = await Promise.all([
      totalLikesPromise,
      totalViewsPromise,
      totalPointsPromise,
    ]);

    const numberOfLikes = Number(data[0].rows[0].count ?? '0');
    const numberOfViews = Number(data[1].rows[0].count ?? '0');
    const totalpoints = Number(data[2].rows[0].total_points ?? '0');
    // const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    // const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfLikes,
      numberOfViews,
      totalpoints,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchPlatformStats(){
  noStore();
  try {
    const totalPosts = await sql`SELECT COUNT(*) FROM sharingposts`;
    const totalUsers = await sql`SELECT COUNT(*) FROM users`;
    //const totalLikes = await sql`SELECT COUNT(*) FROM likes`;
    const totalViews = await sql`SELECT COUNT(*) FROM views`;
    const totalMeets = await sql`SELECT COUNT(*) FROM meets`;
      //const totalPoints = await sql`SELECT SUM(points) AS total_points FROM pointrecords`;

    const numberOfPosts= Number(totalPosts.rows[0].count);
    const numberOfUsers= Number(totalUsers.rows[0].count);
    const numberOfViews= Number(totalViews.rows[0].count);
    const numberOfMeets = Number(totalMeets.rows[0].count);

    return {
      numberOfPosts,
      numberOfUsers,
      numberOfViews,
      numberOfMeets,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch platform stats.');
  }

}

// const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

const ITEMS_PER_PAGE = 12;
export async function fetchFilteredPosts(
  query: string,
  currentPage: number,
  sortMethod: string,
  ) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  console.log(query);

  const sortMethodMap = {
    hot: 'ORDER BY views DESC, likes DESC, creation_date DESC',
    new: 'ORDER BY creation_date DESC, views DESC, likes DESC',
  }

  const orderByClause = sortMethodMap[sortMethod] || sortMethodMap['new'];

  try {
    // const posts = await sql<PostsTable>`
    // SELECT
    //   sharingposts.id,
    //   sharingposts.creator_id,
    //   sharingposts.creation_date,
    //   sharingposts.company,
    //   sharingposts.interview_status,
    //   sharingposts.interview_type,
    //   sharingposts.title,
    //   sharingposts.content,
    //   users.name,
    //   users.email,
    //   (SELECT COUNT(*) FROM likes WHERE likes.post_id = sharingposts.id) AS likes,
    //   (SELECT COUNT(*) FROM views WHERE views.post_id = sharingposts.id) AS views
    // FROM sharingposts
    // JOIN users ON sharingposts.creator_id = users.id
    // WHERE
    //   sharingposts.creation_date::text ILIKE ${`%${query}%`} OR
    //   sharingposts.company ILIKE ${`%${query}%`} OR
    //   sharingposts.interview_status ILIKE ${`%${query}%`} OR
    //   sharingposts.interview_type ILIKE ${`%${query}%`} OR
    //   sharingposts.title ILIKE ${`%${query}%`} OR
    //   sharingposts.content ILIKE ${`%${query}%`} OR
    //   users.name ILIKE ${`%${query}%`} OR
    //   users.email ILIKE ${`%${query}%`}
    // ORDER BY (views+likes) DESC
    // LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    // `;
    const whereClauses = [
      'sharingposts.creation_date::text ILIKE $1' ,
      'sharingposts.company ILIKE $1',
      'sharingposts.interview_status ILIKE $1',
      'sharingposts.interview_type ILIKE $1',
      'sharingposts.title ILIKE $1',
      'sharingposts.content ILIKE $1',
      'users.name ILIKE $1',
      'users.email ILIKE $1',
    ];
    const whereClause = whereClauses.join(' OR ');

    const sqlQuery = sql`
    WITH PostsWithCounts AS (
      SELECT
          sharingposts.id,
          sharingposts.creator_id,
          sharingposts.creation_date,
          sharingposts.company,
          sharingposts.interview_status,
          sharingposts.interview_type,
          sharingposts.title,
          sharingposts.content,
          users.name,
          users.email,
          (SELECT COUNT(*) FROM likes WHERE likes.post_id = sharingposts.id) AS likes,
          (SELECT COUNT(*) FROM views WHERE views.post_id = sharingposts.id) AS views
      FROM sharingposts
      JOIN users ON sharingposts.creator_id = users.id
      WHERE ${whereClause}
    )
    SELECT *
    FROM PostsWithCounts
    ORDER BY ${orderByClause}
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
  `;
  const posts = await sql<PostsTable>` 
      ${sqlQuery}
    `([`%${query}%`, ITEMS_PER_PAGE, offset]);

    return posts.rows;
    // `;
    // // for each posts, get the total number of likes and views
    // // for (let i = 0; i < posts.rows.length; i++) {
    // //   const postId = posts.rows[i].id;
    // //   const likes = await sql`
    //     SELECT COUNT(*) FROM likes WHERE post_id = ${postId}
    //   `;
    //   const views = await sql`
    //     SELECT COUNT(*) FROM views WHERE post_id = ${postId}
    //   `;
    //   posts.rows[i].likes = likes.rows[0].count;
    //   posts.rows[i].views = views.rows[0].count;
    // }
    
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch posts.');
  }
}

export async function fetchUserPosts(queryId: string) {
  noStore();
  console.log(queryId);
  try {
    const posts = await sql<PostsTable>`
      SELECT
        sharingposts.id,
        sharingposts.creator_id,
        sharingposts.creation_date,
        sharingposts.company,
        sharingposts.interview_status,
        sharingposts.interview_type,
        sharingposts.title,
        sharingposts.content,
        sharingposts.likes,
        sharingposts.views,
        users.name,
        users.email
      FROM sharingposts
      JOIN users ON sharingposts.creator_id = users.id
      WHERE
        sharingposts.creator_id = ${queryId}
      ORDER BY sharingposts.creation_date DESC
    `;
    // for each posts, get the total number of likes and views
    for (let i = 0; i < posts.rows.length; i++) {
      const postId = posts.rows[i].id;
      const likes = await sql`
        SELECT COUNT(*) FROM likes WHERE post_id = ${postId}
      `;
      const views = await sql`
        SELECT COUNT(*) FROM views WHERE post_id = ${postId}
      `;
      posts.rows[i].likes = likes.rows[0].count;
      posts.rows[i].views = views.rows[0].count;
    }
    return posts.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch posts.');
  }
}

export async function fetchPostsPages(query: string) {
  noStore();
  try {
    const count = await sql`
      SELECT
        COUNT(*)
      FROM sharingposts
      JOIN users ON sharingposts.creator_id = users.id
      WHERE
        sharingposts.creation_date::text ILIKE ${`%${query}%`} OR
        sharingposts.company ILIKE ${`%${query}%`} OR
        sharingposts.interview_status ILIKE ${`%${query}%`} OR
        sharingposts.interview_type ILIKE ${`%${query}%`} OR
        sharingposts.title ILIKE ${`%${query}%`} OR
        sharingposts.content ILIKE ${`%${query}%`} OR
        users.name ILIKE ${`%${query}%`} OR
        users.email ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the total number of posts.');
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchPostById(id: string) {
  noStore();
  try {
    const data = await sql<PostsTable>`
    SELECT
      sharingposts.id,
      sharingposts.creator_id,
      sharingposts.creation_date,
      sharingposts.company,
      sharingposts.interview_status,
      sharingposts.interview_type,
      sharingposts.title,
      sharingposts.content,
      sharingposts.likes,
      sharingposts.views,
      sharingposts.meet_able,
      sharingposts.meet_charge,
      sharingposts.available_time,
      users.name,
      users.email
    FROM sharingposts
    JOIN users ON sharingposts.creator_id = users.id
    WHERE sharingposts.id = ${id};
    `;
    const likes = await sql`
      SELECT COUNT(*) FROM likes WHERE post_id = ${id}
    `;
    const views = await sql`
      SELECT COUNT(*) FROM views WHERE post_id = ${id}
    `;
    const post = data.rows.map((post) => ({
      ...post,
      likes: likes.rows[0].count,
      views: views.rows[0].count,
    }));

    return post[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch post by Id.');
  }
}

export async function fetchCommentsByPostId(id: string) {
  noStore();
  try {
    const data = await sql`
    SELECT
      comments.id,
      comments.post_id,
      comments.creator_id,
      comments.timestamp,
      comments.content
    FROM comments
    WHERE comments.post_id = ${id};
    `;
    return data.rows as Comment[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch comments by postId.');
  }
}

export async function fetchCustomers() {
  noStore();
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  noStore();
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  noStore();
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchUserIdByNameEmail(name: string, email: string) {
  noStore();
  try {
    const user = await sql`SELECT id FROM users WHERE name=${name} AND email=${email}`;
    return String(user.rows[0].id);
  } catch (error) {
    console.error('Failed to fetch user id by name and email:', error);
    throw new Error('Failed to fetch user id.');
  }
}

export async function fetchLikeStatus(postId: string, likerId: string) {
  noStore();
  try {
    const likeStatus = await sql`SELECT COUNT(*) AS CNT FROM likes WHERE post_id=${postId} AND liker_id=${likerId}`;
    //console.log("likeStatus: ", likeStatus);
    return likeStatus.rows[0].cnt;
  } catch (error) {
    console.error('Failed to fetch like status:', error);
    throw new Error('Failed to fetch like status.');
  }
}

export async function fetchMeetStatus(postId: string, seekerId: string) {
  noStore();
  try {
    //console.log(postId, seekerId);
    const meetStatus = await sql`SELECT COUNT(*) AS CNT FROM meets WHERE post_id=${postId} AND seeker_id=${seekerId}`;
    //console.log("meetStatus fetchMeetStatus: ",meetStatus.rows[0].cnt);
    return meetStatus.rows[0].cnt;
  } catch (error) {
    console.error('Failed to fetch meet status:', error);
    throw new Error('Failed to fetch meet status.');
  }
}