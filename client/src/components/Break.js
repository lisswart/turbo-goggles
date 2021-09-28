import moment from 'moment';

function Break({ breakLength }) {

  const breakLengthInMinutes = moment.duration(breakLength, 's').minutes();

  return (
    <div>
      <p id="break-label">Break</p>
      <p id="break-length">{breakLengthInMinutes} minutes</p>
    </div>
  );
}

export default Break;
