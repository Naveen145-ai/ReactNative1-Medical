import AsyncStorage from "@react-native-async-storage/async-storage"

export const setLocalStorage=async(Key,value)=>{
    await AsyncStorage.setItem(Key,JSON.stringify(value));
}


export const getLocalStorage = async (key) => {
    const result = await AsyncStorage.getItem(key); // ✅ await added
    return result ? JSON.parse(result) : null; // ✅ handles null result safely
};


export const RemoveLocalStorage=async()=>{
    await AsyncStorage.clear();
}