import Link from 'next/link'
import React from 'react'
import Layout from '../src/layouts/Layout'

function payment() {
  return (
    <Layout>
      <div className='d-flex justify-content-center' style={{margin:'9rem'}}>
          <Link href='/booking-success'><button className='main-btn'>Success</button></Link>
          <Link href='/booking-failure'><button className='danger-btn'>Failure</button></Link>
      </div>
    </Layout>
  )
}

export default payment