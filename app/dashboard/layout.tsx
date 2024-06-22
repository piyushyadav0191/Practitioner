import React from 'react'
import Header from './_components/Header'

type Props = {
    children: React.ReactNode
}

const DashboardLayout = ({children} : Props) => {
  return (
    <div>
      <Header />
      <div className='mx-5 md:mx-20 lg:mx-20'>
        {children}

      </div>
    </div>
  )
}

export default DashboardLayout