import ManageUsers from '@/components/admin/users/ManageUsers'
import React from 'react'

const page = () => {
  return (
    <div className="col-span-3 md:container">
      <ManageUsers blogs={undefined} features={undefined} propertytypes={undefined}/>
    </div>
  )
}

export default page