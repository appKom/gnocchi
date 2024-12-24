export const fileToBase64 = (file: File): Promise<string> => {
  console.log(file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result as string);
      } else {
        reject(new Error("Failed to read file"));
      }
    };

    reader.onerror = () => {
      reject(new Error("File reading error"));
    };

    reader.readAsDataURL(file);
  });
};
