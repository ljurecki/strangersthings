import React from 'react';

const Profile = ({ user }) => {
  const messages = user.messages;
  const userID = user._id;
  // console.log(user)
  return (
    <div>
      <div>
        <h1 className="pageTtl">Personal Profile</h1>
        <hr className="hr" />
        <h1 className="profileLabels">Inbox:</h1>
        {
          messages && messages.map(message => {
            const fromUserID = message.fromUser._id;
            const { username } = message.fromUser;
            const { title } = message.post;

            if (userID !== fromUserID) {
              return (
                <div className="messages" key={message._id}>
                  <p><b>From:</b> {username}</p>
                  <p><b>Posting Title:</b> {title}</p>
                  <p><b>Message:</b> {message.content}</p>
                </div>

              )
            }

          })
        }
      </div>
      <div>
        <h1 className="profileLabels">Sent Messages:</h1>
        {
          messages && messages.map(message => {
            const fromUserID = message.fromUser._id;
            const { title } = message.post;

            if (userID === fromUserID) {
              return (
                <div className="messages" key={message._id}>
                  <p><b>Posting Title:</b> {title}</p>
                  <p><b>Message:</b> {message.content}</p>
                </div>

              )
            }

          })

        }</div>
    </div>
  )
}

export default Profile;