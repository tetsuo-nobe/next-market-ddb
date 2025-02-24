"use server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION
  //endpoint: `https://s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com`,
});

export async function uploadFile(base64, fileName) {
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      Key: `${process.env.NEXT_PUBLIC_S3_PATH}/${fileName}`,
      Body: Buffer.from(base64.split(",")[1], "base64")
    });
    await s3Client.send(command).then(() => {
        console.log("File uploaded successfully");
    }).catch((error) => {
      console.error("Error uploading file:", error);
      throw error;
    });
    return;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}