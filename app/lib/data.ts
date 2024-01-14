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

export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
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

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredPosts(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  console.log(query);
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
        sharingposts.creation_date::text ILIKE ${`%${query}%`} OR
        sharingposts.company ILIKE ${`%${query}%`} OR
        sharingposts.interview_status ILIKE ${`%${query}%`} OR
        sharingposts.interview_type ILIKE ${`%${query}%`} OR
        sharingposts.title ILIKE ${`%${query}%`} OR
        sharingposts.content ILIKE ${`%${query}%`} OR
        users.name ILIKE ${`%${query}%`} OR
        users.email ILIKE ${`%${query}%`}
      ORDER BY sharingposts.creation_date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
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
      users.name,
      users.email
    FROM sharingposts
    JOIN users ON sharingposts.creator_id = users.id
    WHERE sharingposts.id = ${id};
    `;

    const post = data.rows.map((post) => ({
      ...post,
    }));

    return post[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch post by Id.');
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