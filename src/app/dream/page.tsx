"use client";
import React, { useState } from "react";
import { UploadDropzone } from "@bytescale/upload-widget-react";
import { UrlBuilder } from "@bytescale/sdk";
import { UploadWidgetConfig } from "@bytescale/upload-widget";
import { roomType, themeType } from "@/utils/dropdowntypes";
import Header from "@/components/Header";
import ResizablePanel from "@/components/ResizablePanel";


const options: UploadWidgetConfig = {
  apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY : "free",
  maxFileCount: 1,
  mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
  editor: { images: { crop: false } },
  styles: {
    colors: {
      primary: "#2563EB", // Primary buttons & links
      error: "#d23f4d", // Error messages
      shade100: "#fff", // Standard text
      shade200: "#fffe", // Secondary button text
      shade300: "#fffd", // Secondary button text (hover)
      shade400: "#fffc", // Welcome text
      shade500: "#fff9", // Modal close button
      shade600: "#fff7", // Border
      shade700: "#fff2", // Progress indicator background
      shade800: "#fff1", // File item background
      shade900: "#ffff", // Various (draggable crop buttons, etc.)
    },
  },
};



export default function DreamPage() {
  const [originalPhoto, setOriginalPhoto] = useState<String | null>(null);
  const [restoredImage, setRestoredImage] = useState<String | null>(null);
  const [restoredLoaded, setRestoredLoaded] = useState<boolean>(false);
  const [sideBySide, setSideBySide] = useState<boolean>(false);
  const [photoName, setPhotoName] = useState<String | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [theme, setTheme] = useState<themeType>("Modern");
  const [room, setRoom] = useState<roomType>("Living Room");
  const [error, setError] = useState<string | null>(null);


  const uploadDropZone = () => {
    <UploadDropzone options={options}
      onUpdate={({ uploadedFiles }) => {
        if (uploadedFiles.length !== 0) {
          const image = uploadedFiles[0];
          const imageName = image.originalFile.originalFileName;
          const imageUrl = UrlBuilder.url({
            accountId: image.accountId,
            filePath: image.filePath,
            options: {
              transformation: "preset",
              transformationPreset: "thumbnail"
            }
          });
          setPhotoName(imageName);
          setOriginalPhoto(imageUrl);
          generatePhoto(imageUrl);
      }
      }}
      width="670px"
      height="250px"
    ></UploadDropzone>;
  };

  async function generatePhoto(fileUrl : String) {
    await new Promise((resolve) => { setTimeout(resolve, 200) });
    setLoading(true);
    const res = await fetch("/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl: fileUrl, theme, room }),
    });
    let newPhoto = await res.json();
    if (res.status != 200) {
      setError(newPhoto);
    } else {
      setRestoredImage(newPhoto[1]);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }
  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4 sm:mb-0 mb-8">
        <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-100 sm:text-6xl mb-5">
          Generate your <span className="text-blue-600">dream</span> room
        </h1>
        <ResizablePanel children={undefined}>
          
        </ResizablePanel>
      </main>
    </div>
  );
}
