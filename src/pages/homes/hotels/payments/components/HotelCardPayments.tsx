import React, { useState } from "react";
import { Link } from "react-router-dom";
import Timeline from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'

interface Hotel {
  id: number;
  name: string;
  address: string;
  description: string;
  user: {
    name: string;
  };
}

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCardPayments: React.FC<HotelCardProps> = ({ hotel }) => {
  return (
    <div className="rounded-lg bg-pink-100 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{hotel.name}</h2>
        <p className="text-gray-700 mb-1">{hotel.description}</p>
        <p className="text-gray-700 mb-2">{hotel.address}</p>
      </div>
      {/* Insert timeline here */}
      <div className="p-6">
        <Timeline
          groups={[
            { id: 1, title: 'group 1' },
            { id: 2, title: 'group 2' }
          ]}
          items={[
            { id: 1, group: 1, title: 'item 1', start_time: moment(), end_time: moment().add(1, 'hour') },
            { id: 2, group: 2, title: 'item 2', start_time: moment().add(-0.5, 'hour'), end_time: moment().add(0.5, 'hour') }
          ]}
        />
      </div>
    </div>
  );
};

export default HotelCardPayments;
