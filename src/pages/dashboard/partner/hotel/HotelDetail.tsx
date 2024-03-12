import React from 'react'
import { useParams } from 'react-router-dom'

const HotelDetail = () => {
  const {hotel_id} = useParams();

  return (
    <div>HotelDetail {hotel_id}</div>
  )
}

export default HotelDetail