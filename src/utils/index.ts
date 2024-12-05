import { getGeocode, getLatLng } from "use-places-autocomplete";

export async function getLatLong(description: string) {
  const [result, ...res] = await getGeocode({ address: description });
  return getLatLng(result);
}

export function saveToLocalStore(key:string, value:Record<string, any>) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getFromLocalStore(key:string) {
  
  const res = localStorage.getItem(key)
  if (res) {
    console.log(`${key} from store`);
    return JSON.parse(res)
  }
  else{
    return res
  }
}