import { getUserDataByCompanyId } from '@/actions/Users'
import { auth } from '@/auth';
import ManageUsers from '@/components/admin/users/ManageUsers'
// import { getServerSession } from "next-auth/next";
import React from 'react'

interface PageProps {
  params: { id: number };
}
const page = async ({ params }: PageProps) => {

  const session= await auth()
  console.log(session?.user);
  
  
  const UserData = await getUserDataByCompanyId(session?.user.companyId as number) ?? [];
  console.log(UserData , "UserData")
  return (
    <div className="col-span-3 md:container">
      <ManageUsers UserData={UserData} features={undefined} propertytypes={undefined}/>
    </div>
  )
}

export default page