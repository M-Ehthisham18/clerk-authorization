import React from 'react'
import { useUser } from '@clerk/clerk-react'
const Container = () => {
  const {user } = useUser();
  if(user) {
    console.log(user);
    
  }
  return (
    <div className='w-full min-h-screen flex flex-col gap-4 items-center justify-center'>
      
      {user ? (
        <>
        <img src={user.imageUrl} className='rounded-full'/>
        <div className='text-3xl text-focus font-bold'>
          {user.fullName}
        </div>
        </>
        
      ) : (
        <div className='text-3xl text-accent font-bold'>
          Log in to access
        </div>
      )}
      <h1 className='text-4xl font-extrabold '>WELCOM TO CLERK AUTHORIZATION</h1>
    </div>
  )
}

export default Container