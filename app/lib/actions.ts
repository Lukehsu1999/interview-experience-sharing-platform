'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
const bcrypt = require('bcrypt');

const FormSchema = z.object({
  id: z.string(),
  creator_id: z.string(),
  creation_date: z.string(),
  company: z.string(),
  interview_status: z.enum([
    'Phone interview',
    'Online Assessment',
    'First Round',
    'Second Round',
    'Third Round',
    'Final Round',
    'Rejected',
    'Offered',
    'Others',
  ]),
  interview_type: z.enum([
    'Technical Interview',
    'Behavioral Interview',
    'Case Interview',
    'Others',
  ]),
  title: z.string(),
  content: z.string(),
  likes: z.coerce.number(),
  views: z.coerce.number(),
});

const CreatePost = FormSchema.omit({
  id: true,
  creation_date: true,
  likes: true,
  views: true,
});

export async function createPost(formData: FormData) {
  const {
    creator_id,
    company,
    title,
    interview_status,
    interview_type,
    content,
  } = CreatePost.parse({
    creator_id: formData.get('creator_id'),
    company: formData.get('company'),
    title: formData.get('title'),
    interview_status: formData.get('interview_status'),
    interview_type: formData.get('interview_type'),
    content: formData.get('content'),
  });
  const creation_date = new Date().toISOString().split('T')[0];
  const likes = 0;
  const views = 0;

  await sql`
    INSERT INTO sharingposts (creator_id, creation_date, company, interview_status, interview_type, title, content, likes, views)
    VALUES (${creator_id}, ${creation_date}, ${company}, ${interview_status}, ${interview_type}, ${title}, ${content}, ${likes}, ${views})
  `;

  revalidatePath('/posts');
  redirect('/posts');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function createUser(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log(formData);
    const { name, email, password } = {
      name: String(formData.get('name')),
      email: String(formData.get('email')),
      password: String(formData.get('password')),
    };
    //check if name and email already exist in database
    const hashedPassword = await bcrypt.hash(password, 10);
    // check name duplicate
    const searchNameDuplicate = await sql`
      SELECT COUNT(*)
      FROM users
      WHERE users.name = ${name};
    `;
    const nameDupCnt = searchNameDuplicate.rows[0].count;
    if (nameDupCnt >= 1) {
      console.log("Name already exists");
      throw new Error('Name already exists');
    }
    // check email
    const searchEmailDuplicate = await sql`
      SELECT COUNT(*)
      FROM users
      WHERE users.email = ${email};
    `;
    const emailDupCnt = searchEmailDuplicate.rows[0].count;
    if (emailDupCnt >= 1) {
      console.log("Email already exist")
      throw new Error('Email already exists');
    }
  } catch (error: any) {
    if (error instanceof Error) {
      console.error('Username or email already exists');
      return error.message;
    } else {
      console.error('An unknown error occurred');
      return 'An unknown error occurred';
    }
  }
}
