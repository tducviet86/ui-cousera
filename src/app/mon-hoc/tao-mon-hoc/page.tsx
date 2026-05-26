"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import CreateSubjectForm, {
  CreateSubjectStep1Data,
} from "@/components/Subject/create/CreateSubjectForm";

import CreateSubjectSidebar from "@/components/Subject/create/CreateSubjectSidebar";

import {
  CreateDetailSubject,
  CreateSubjectStep2Data,
} from "@/components/Subject/create/CreateDetailSubject";

type DraftData = Partial<CreateSubjectStep1Data & CreateSubjectStep2Data>;

export default function CreateSubjectPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<DraftData>({});

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
      return;
    }

    router.push("/mon-hoc");
  };

  return (
    <main className="h-screen overflow-hidden bg-cyan-50 p-4">

      <div className="grid h-[calc(100vh-64px)] grid-cols-[260px_1fr] gap-4 overflow-hidden">
        <CreateSubjectSidebar currentStep={step} onBack={handleBack} />

        {step === 1 && (
          <CreateSubjectForm
            defaultValues={draft}
            onNext={(step1Data) => {
              setDraft((prev) => ({
                ...prev,
                ...step1Data,
              }));

              setStep(2);
            }}
          />
        )}

        {step === 2 && (
          <CreateDetailSubject
            defaultValues={draft}
            onBack={handleBack}
            onNext={(step2Data) => {
              setDraft((prev) => ({
                ...prev,
                ...step2Data,
              }));

              setStep(3);
            }}
          />
        )}

        {step === 3 && (
          <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm">
            <h1 className="text-lg font-bold text-slate-800">
              Phí môn học
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Thiết lập học phí cho môn học.
            </p>

            <div className="mt-auto flex justify-end gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="rounded-xl border border-slate-200 px-6 py-2 text-sm font-semibold text-slate-500"
              >
                Quay lại
              </button>

              <button
                type="button"
                onClick={() => setStep(4)}
                className="rounded-xl bg-violet-600 px-6 py-2 text-sm font-semibold text-white"
              >
                Tiếp tục →
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm">
            <h1 className="text-lg font-bold text-slate-800">
              Điểm chuyên cần
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Quy định chuyên cần cho môn học.
            </p>

            <pre className="mt-4 max-h-125 overflow-auto rounded-xl bg-slate-50 p-4 text-xs text-slate-600">
              {JSON.stringify(draft, null, 2)}
            </pre>

            <div className="mt-auto flex justify-end gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="rounded-xl border border-slate-200 px-6 py-2 text-sm font-semibold text-slate-500"
              >
                Quay lại
              </button>

              <button
                type="button"
                onClick={() => {
                  console.log("SUBMIT FINAL DATA:", draft);
                }}
                className="rounded-xl bg-violet-600 px-6 py-2 text-sm font-semibold text-white"
              >
                Tạo môn học
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}