'use server';

import { number, z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { unstable_noStore as noStore } from 'next/cache';
const bcrypt = require('bcrypt');

const FormSchema = z.object({
  id: z.string(),
  creator_id: z.string(),
  creation_date: z.string(),
  company: z.string(),
  interview_status: z.enum([
    'Full Time',
    'Part Time',
    'Internship',
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
    'School Admission',
    'Research',
    'Work',
    'Technical Interview',
    'Behavioral Interview',
    'Case Interview',
    'Others',
  ]),
  title: z.string(),
  content: z.string(),
  likes: z.coerce.number(),
  views: z.coerce.number(),
  meet_able: z.string().transform((val) => val === "true"),
  meet_charge: z.coerce.number(),
  available_time: z.string(),
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
    meet_able,
    meet_charge,
    available_time,
  } = CreatePost.parse({
    creator_id: formData.get('creator_id'),
    company: formData.get('company'),
    title: formData.get('title'),
    interview_status: formData.get('interview_status'),
    interview_type: formData.get('interview_type'),
    content: formData.get('content'),
    meet_able: formData.get('meet_able'),
    meet_charge: formData.get('meet_charge'),
    available_time: formData.get('available_time'),
  });
  const creation_date = new Date().toISOString().split('T')[0];
  const likes = 0;
  const views = 0;
  console.log(
    'createPost: ',
    creator_id,
    ' type of creator_id',
    typeof creator_id,
  );
  console.log(
    'meet_able: ',
    meet_able,
    ' meet_charge: ',
    meet_charge,
    ' available_time: ',
    available_time,
  );

  await sql`
    INSERT INTO sharingposts (creator_id, creation_date, company, interview_status, interview_type, title, content, likes, views, meet_able, meet_charge, available_time)
    VALUES (${creator_id}, ${creation_date}, ${company}, ${interview_status}, ${interview_type}, ${title}, ${content}, ${likes}, ${views}, ${meet_able}, ${meet_charge}, ${available_time})
  `;
  // set viewstatus to unlimited
  const setStatusLimited = await sql`UPDATE viewstatus SET status = 'unlimited' WHERE user_id = ${creator_id}`;

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
      console.log('Name already exists');
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
      console.log('Email already exist');
      throw new Error('Email already exists');
    }
    // can insert now if no duplicate name/email
    const insertionRes = await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
      ON CONFLICT (id) DO NOTHING
      RETURNING id;
    `;
    const insertedUserId = insertionRes.rows[0].id;
    console.log('Inserted user ID:', insertedUserId); 

    // insert init points
    const creation_time = new Date().toISOString();
    const initPoint = await sql`
    INSERT INTO pointrecords (user_id, points, action, timestamp)
    VALUES (${insertedUserId}, 10, ${"init"}, ${creation_time})
    ON CONFLICT (id) DO NOTHING;
  `;

    // insert init viewstatus
    const initViewStatus = await sql`
    INSERT INTO viewstatus (user_id, status)
    VALUES (${insertedUserId}, ${"new"})
    ON CONFLICT (id) DO NOTHING;
  `;

    console.log(`Insert users`);
    return 'Success! User created, please login';
  } catch (error: any) {
    if (error instanceof Error) {
      console.error('Username or email already exists');
      return error.message;
    } else {
      console.error('Insert into Database error');
      return 'Database Insertion error';
    }
  }
}
export async function resetPassword(
  userId: string,
  newPassword:string,
){
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatePassword = await sql`
      UPDATE users
      SET password = ${hashedPassword}
      WHERE id = ${userId};
    `;
    console.log(`Update password`);
    return 'Success! Password updated';
  } catch (error: any) {
    console.error('Update password error');
    return 'Update password error';
  }

}

export async function addLike(
  post_id: string,
  creator_id: string,
  liker_id: string,
) {
  try {
    console.log(post_id, liker_id);
    const likeCnt = await sql`
      SELECT COUNT(*) AS CNT
      FROM likes
      WHERE post_id = ${post_id} AND liker_id = ${liker_id};
      -- WHERE post_id = '8185decf-19fe-414f-92ec-14ea012c9ea0' AND liker_id = '410544b2-4001-4271-9855-fec4b6a6442a';
    `;
    console.log(likeCnt);
    const likeCntNum: number = likeCnt.rows[0].cnt as number;
    console.log(likeCntNum);
    if (likeCntNum >= 1) {
      console.log('Already liked');
      throw new Error('Already liked');
    }
    if (likeCntNum == 0) {
      const insertLike = await sql`
        INSERT INTO likes (post_id, creator_id, liker_id)
        VALUES (${post_id}, ${creator_id}, ${liker_id});
      `;
      console.log(`Insert likes`);
      const creation_time = new Date().toISOString();
      const addLikePoints = await sql`
      INSERT INTO pointrecords (user_id, points, action, timestamp)
      VALUES (${creator_id}, 5, ${"Like Point"}, ${creation_time})
      ON CONFLICT (id) DO NOTHING;
    `;
      return 'Success! Like added';
    }
  } catch (error: any) {
    if (error instanceof Error) {
      console.error('Already liked');
      return error.message;
    } else {
      console.error('Insert into Database error');
      return 'Database Insertion error';
    }
  }
}
export async function addView(
  post_id: string,
  creator_id: string,
  viewer_id: string,
) {
  noStore();
  try {
    const viewCnt = await sql`
      SELECT COUNT(*) AS CNT
      FROM views
      WHERE post_id = ${post_id} AND viewer_id = ${viewer_id};
    `;
    const viewCntNum: number = viewCnt.rows[0].cnt as number;
    console.log(viewCntNum);
    if (viewCntNum >= 1) {
      console.log('Already viewed');
      throw new Error('Already viewed');
    }
    if (viewCntNum == 0) {
      const insertView = await sql`
        INSERT INTO views (post_id, creator_id, viewer_id)
        VALUES (${post_id}, ${creator_id}, ${viewer_id});
      `;
      console.log(`Insert views`);
      const creation_time = new Date().toISOString();
      const addLikePoints = await sql`
      INSERT INTO pointrecords (user_id, points, action, timestamp)
      VALUES (${creator_id}, 1, ${"View Point"}, ${creation_time})
      ON CONFLICT (id) DO NOTHING;
    `;
      return 'Success! View added';
    }
  } catch (error: any) {
    if (error instanceof Error) {
      console.error('Already viewed');
      return error.message;
    } else {
      console.error('Add View: Insert into Database error');
      return 'Add View: Database Insertion error';
    }
  }
}
// export async function addView(
//   post_id: string,
//   creator_id: string,
//   viewer_id: string,
// ) {
//   try {
//     const insertView = await sql`
//       INSERT INTO views (post_id, creator_id, viewer_id)
//       VALUES (${post_id}, ${creator_id}, ${viewer_id});
//     `;

//     console.log(`Insert views`);
//   } catch (error: any) {
//     // Check if the error is related to unique constraint violation
//     if (error.code === '23505') {
//       console.log('View already exists');
//       return 'View already exists'; // Handle the case where the view already exists
//     }
//     console.log('view already exists');

//     console.error('Database Insertion View error:', error);
//     return 'Database Insertion View error';
//   }
// }
// export async function addView(post_id:string, creator_id:string, viewer_id:string) {
//   const result = await sql`
//     WITH inserted AS (
//       INSERT INTO views (post_id, creator_id, viewer_id)
//       VALUES (${post_id}, ${creator_id}, ${viewer_id})
//       ON CONFLICT (post_id, viewer_id) DO NOTHING
//       RETURNING *
//     )
//     SELECT * FROM inserted;
//   `;

//   // Check the result
//   if (result.rows.length === 0) {
//     console.log('View already exists');
//     return; // Indicates a conflict occurred
//   } else {
//     console.log('Insert successful');
//     return; // Return the inserted row
//   }
// }

export async function addMeet(
  post_id: string,
  seeker_id: string,
  seeker_name: string,
  seeker_email: string,
  sharer_id: string,
  sharer_name: string,
  sharer_email: string,
  charge: number,
  additional_fee: number,
  meet_status: string,
  payment_status: string
) {
  try {
    const received_date = new Date().toISOString().split('T')[0];
    const insertMeet = await sql`
      INSERT INTO meets (post_id, seeker_id, seeker_name, seeker_email, sharer_id, sharer_name, sharer_email, charge, additional_fee, meet_status, payment_status, received_date)
      VALUES (${post_id}, ${seeker_id}, ${seeker_name}, ${seeker_email}, ${sharer_id}, ${sharer_name}, ${sharer_email}, ${charge}, ${additional_fee}, ${meet_status}, ${payment_status}, ${received_date});
    `;

    console.log(`Insert meets`);
    return 'Success! Meet added';
  } catch (error: any) {
    // Check if the error is related to unique constraint violation
    if (error.code === '23505') {
      console.log('Meet already exists');
      return 'Meet already exists'; // Handle the case where the view already exists
    }
    console.log('Database insert');

    console.error('Database Insertion Meet error:', error);
    return 'Database Insertion Meet error';
  }
}

export async function createComment(
  post_id: string,
  creator_id: string,
  content: string,
) {
  try {
    const timestamp = new Date().toISOString();
    const insertComment = await sql`
      INSERT INTO comments (post_id, creator_id, timestamp, content)
      VALUES (${post_id}, ${creator_id}, ${timestamp}, ${content});
    `;

    console.log(`Insert comments`);
    revalidatePath(`/posts/${post_id}/view`);
    redirect(`/posts/${post_id}/view`);
    return 'Success! Comment added';
  } catch (error: any) {
    console.error('Database Insertion Comment error:', error);
    return 'Database Insertion Comment error';
  }
}