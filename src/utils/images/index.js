export async function convertToBase64(file) {
    return await new Promise((res,rej)=> {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onerror = (e)=> rej("Base64 ERROR: " + e);
        reader.onload = ()=> res(reader.result)}
    )}
export const filterOnlyImages = file => {return file.type.startsWith('image/')}
export const IMAGE_FILE_PICKER_ERROR_MESSAGE = "הקובץ שבחרת אינו תמונה. אנא בחר קובץ אחר"
