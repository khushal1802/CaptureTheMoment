import React from 'react'
import { Circles } from 'react-loader-spinner'

function Loader() {
  return (
    <>
    {
        <Circles
        height="80"
        width="80"
        color="#f52225"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperclassName=""
        visible={true}
        />
    }
    </>
  )
}

export default Loader