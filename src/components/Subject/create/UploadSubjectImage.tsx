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

      console.log("Upload result:", result);

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
      className="mb-2 cursor-pointer rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/40 p-2"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleUpload}
      />

      <div className="flex items-center gap-3">
        <div className="relative flex h-25 w-25 items-center justify-center overflow-hidden rounded-xl bg-linear-to-br from-emerald-300 to-emerald-500 text-white">
          {preview ? (
            <img src={preview} className="h-full w-full object-cover" />
          ) : (
            <ImageIcon size={36} />
          )}

          <button
            type="button"
            className="absolute -bottom-2 -left-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white"
          >
            <Plus size={12} />
          </button>
        </div>

        <div>
          <p className="text-2xl font-semibold text-slate-700">
            {loading ? "Đang upload..." : "Hình ảnh đại diện"}
          </p>
          <p className="mt-1 text-[18px] text-slate-500">Tối thiểu 5Mb</p>
        </div>
      </div>
    </div>
  );
}