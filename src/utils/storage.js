export function setStorage(key, value) {
  if(!key || !value) return;
  let data = typeof value == 'object' ? JSON.stringify(value) : value;
  localStorage.setItem(key, data);
}

export function getStorage(key) {
  if(!key) return;
  let data = localStorage.getItem(key);
  try {
    return JSON.parse(data);
  }catch(e) {
    return data;
  }
}

export function removeStorage(key) {
  if(!key) return;
  localStorage.removeItem(key);
}

export function clearAllStprage() {
  localStorage.clear();
}

let UID_KEY = 'cxjMusic_Uid';
export function setUid(uid) {
  setStorage(UID_KEY, uid);
  return uid;
}

export function getUid() {
  return Number(getStorage(UID_KEY));
}

