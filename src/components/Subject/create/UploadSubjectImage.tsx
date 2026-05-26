"use client";

import { uploadSubjectImageApi } from "@/services/upload.service";
import { ImageIcon, Plus } from "lucide-react";
import { useRef, useState } from "react";

type UploadSubjectImageProps = {
  onUploaded: (imageId: string) => void;
};

export default function UploadSubjectImage({
  onUploaded,
}: UploadSubjectImageProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChooseFile = () => {
    inputRef.current?.click();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setLoading(true);
      setPreview(URL.createObjectURL(file));

      const result = await uploadSubjectImageApi(file);

      const imageId = result?.data?.[0]?._id || result?.[0]?._id || result?._id;

      if (imageId) {
        onUploaded(imageId);
      }
    } catch (error) {
      console.log("Upload image error:", error);
      alert("Upload ảnh thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={handleChooseFile}
      className="mb-4 cursor-pointer rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/40 p-3 transition hover:bg-emerald-50 sm:p-4"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleUpload}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex h-24 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-emerald-300 to-emerald-500 text-white sm:h-20 sm:w-20 lg:h-24 lg:w-24">
          {preview ? (
            <img
              src={preview}
              alt="Subject preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <ImageIcon size={34} />
          )}

          <button
            type="button"
            className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white shadow"
          >
            <Plus size={14} />
          </button>
        </div>

        <div className="min-w-0">
          <p className="text-base font-semibold text-slate-700 sm:text-lg">
            {loading ? "Đang upload..." : "Hình ảnh đại diện"}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Chọn ảnh đại diện cho môn học
          </p>
        </div>
      </div>
    </div>
  );
}