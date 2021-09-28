import moment from 'moment';

function Session({ sessionLength }) {

  const sessionLengthInMinutes = moment.duration(sessionLength, 's').minutes();

  return (
    <div>
      <p id="session-label">Session</p>
      <p id="session-length">
        {sessionLengthInMinutes} minutes
      </p>
    </div>
  );  
}

export default Session;
