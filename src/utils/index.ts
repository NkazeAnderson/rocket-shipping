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

 export function stripOutAppwriteMetaData<T extends Record<string, any> >(data:T) {
    //@ts-ignore
    data.$collectionId && delete data.$collectionId;
    //@ts-ignore
    data.$createdAt && delete data.$createdAt;
    //@ts-ignore
    data.$databaseId && delete data.$databaseId;
    //@ts-ignore
    data.$permissions && delete data.$permissions;
    //@ts-ignore
    data.$updatedAt && delete data.$updatedAt;
    //@ts-ignore
    data.$id && delete data.$id;

    const keys = Object.keys(data)
    for(let key in keys) {
      if (key.startsWith("$")) {
        delete data[key]
      }
    }
    return data
}