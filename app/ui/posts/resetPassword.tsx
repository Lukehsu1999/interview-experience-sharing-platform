'use client';
import React, { useState, FormEvent } from 'react';
import {resetPassword} from '@/app/lib/actions';

export default function ResetPassword({
    userId
}:{
    userId: string;
}){
  const [password, setPassword] = useState<string>('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log('Password to reset:', password);
    resetPassword(userId, password);
    // Here, you would typically call an API to handle the password reset
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 mt-2">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="peer flex-grow max-w-sm rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          />
          <button type="submit" className="py-2 px-4 bg-miumee-color-400 text-white rounded-md">Reset</button>
        </div>
      </form>
    </div>
  );
};

