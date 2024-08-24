import React, { useContext, useState } from 'react'
import { ShopContect } from '../context/ShopContect'

const Collection = () => {

  const {products} = useContext(ShopContect);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

    {/* filter options */}
    <div className='min-w-60'>
      <p className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS</p>
      {/* category filer */}
      <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}></div>
    </div>

    </div>
  )
}

export default Collection