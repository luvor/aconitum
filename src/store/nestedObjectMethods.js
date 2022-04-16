import Vue from "vue";

export function deleteProp(obj, props) {
  const prop = props.shift();
  if (!obj[prop]) {
    console.log("АХТУНГ");
    return;
  }
  if (!props.length) {
    Vue.delete(obj, prop);
    return;
  }
  deleteProp(obj[prop], props);
}
export function setProp(obj, props, value) {
  const prop = props.shift();
  if (!obj[prop]) {
    Vue.set(obj, prop, {});
  }
  if (!props.length) {
    // console.log(obj[prop]);
    if (value && typeof value === "object" && !Array.isArray(value)) {
      obj[prop] = { ...obj[prop], ...value };
    } else {
      obj[prop] = value;
    }
    return;
  }
  setProp(obj[prop], props, value);
}
export function getProp(obj, props) {
  const prop = props.shift();
  if (!obj[prop] || !props.length) {
    return obj[prop];
  }
  return getProp(obj[prop], props);
}

export default getProp;
