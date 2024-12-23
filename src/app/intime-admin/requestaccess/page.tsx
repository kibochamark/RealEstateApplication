import { getAccess } from '@/actions/Access';
import ManageUsersAccess from '@/components/admin/userAccess/ManageUsersAccess'
import React from 'react'

const page = async() => {
  const accessdata = await getAccess() ?? [];
  return (
    <div className="col-span-3 md:container">
        <ManageUsersAccess accessdata={accessdata} features={undefined} propertytypes={undefined}/>
    </div>
  )
}

export default page