const Message = ({messageType, messageText}) => {

    let style = {color:'green'};
    if (messageType === 'error') {
      style = {color:'red'};
    }
  
    return (
      <div style={style}>
        {messageText}
      </div>
    )
}

export default Message;