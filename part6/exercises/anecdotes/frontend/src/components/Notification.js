
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'


const Notification = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notifications[0]}
    </div>
  )
}

export default Notification