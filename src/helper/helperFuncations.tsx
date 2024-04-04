import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getItemValue(key: string): Promise<any> {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error getting user token:", error);
    return null;
  }
}
export function removeItem(key: string): Promise<void> {
  return AsyncStorage.removeItem(key);
}

export function clearAsyncStorage(): Promise<void> {
  return AsyncStorage.clear();
}

export function setItemValue(key: string, data: any): Promise<void> {
  const jsonData = JSON.stringify(data);
  return AsyncStorage.setItem(key, jsonData);
}