// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type SharingPost = {
  id: string;
  creator_id: string;
  creation_date: string;
  company: string;
  interview_status: 'Phone interview' | 'Online Assessment' | 'First Round' | 'Second Round' | 'Third Round' | 'Final Round' | 'Rejected' | 'Offered' | 'Others';
  interview_type: 'Technical Interview' | 'Behavioral Interview' | 'Case Interview' | 'Others';
  title: string;
  content: string;
  likes: number; // outdated
  views: number; // outdated
  meet_able: boolean;
  meet_charge: number;
  available_time: string;
};

export type PostsTable = {
  id: string;
  creator_id: string;
  creation_date: string;
  company: string;
  interview_status: 'Phone interview' | 'Online Assessment' | 'First Round' | 'Second Round' | 'Third Round' | 'Final Round' | 'Rejected' | 'Offered' | 'Others';
  interview_type: 'Technical Interview' | 'Behavioral Interview' | 'Case Interview' | 'Others';
  title: string;
  content: string;
  likes: number; // outdated
  views: number; // outdated
  name: string;
  email: string;
};

export type Like = {
  id: string;
  post_id: string;
  liker_id: string;
  creator_id: string;
}

export type View = {
  id: string;
  post_id: string;
  viewer_id: string;
  creator_id: string;
}

// From Invoices Project
export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
