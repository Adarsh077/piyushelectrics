/* https://stackoverflow.com/questions/22134726/get-ist-time-in-javascript */

module.exports = (date) => {
  const currentTime = new Date(date) || new Date();

  const currentOffset = currentTime.getTimezoneOffset();

  const ISTOffset = 330; // IST offset UTC +5:30

  const ISTTime = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000
  );

  // ISTTime now represents the time in IST coordinates

  const dateIST = ISTTime.getDate();
  const monthIST = ISTTime.getMonth() + 1;
  const yearIST = ISTTime.getFullYear();
  const hoursIST = `0${ISTTime.getHours()}`.slice(-2);
  const minutesIST = `0${ISTTime.getMinutes()}`.slice(-2);
  const secondsIST = `0${ISTTime.getSeconds()}`.slice(-2);

  return `${dateIST}/${monthIST}/${yearIST} ${hoursIST}:${minutesIST}:${secondsIST}`;
};
