import fs from "fs";

export const deleteFile = async (filePath: string): Promise<void> => {
  const fileExists = await fs.promises.stat(filePath);
  if (fileExists) {
    await fs.promises.unlink(filePath);
  }
};
