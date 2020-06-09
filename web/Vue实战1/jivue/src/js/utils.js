function isObject(value) {
  console.log(typeof value);
  if (typeof value  ==  "object") {
    if (value === null || Array.isArray(value)) {
      return false;
    } else {
      return true;
    }
  }
  return false;
  //console.log("good this is jifukui console")
}
export { isObject };
