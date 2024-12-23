import { getUserDataByCompanyId } from '@/actions/Users'
import ManageUsers from '@/components/admin/users/ManageUsers'
// import { getServerSession } from "next-auth/next";
import React from 'react'

interface PageProps {
  params: { id: number };
}
const page = async ({ params }: PageProps) => {
  
  const UserData = await getUserDataByCompanyId(1) ?? [];
  console.log(UserData , "UserData")
  return (
    <div className="col-span-3 md:container">
      <ManageUsers UserData={UserData} features={undefined} propertytypes={undefined}/>
    </div>
  )
}

export default page