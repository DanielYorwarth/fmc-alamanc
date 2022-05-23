const getThisDate = (dates, curDat) => dates.find((x) => {
  return (
    curDat.getDay() === new Date(x.start).getDay() &&
    curDat.getMonth() === new Date(x.start).getMonth() &&
    curDat.getDate() === new Date(x.start).getDate()
  );
})

export { getThisDate }