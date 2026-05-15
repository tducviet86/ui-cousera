"use client";

import { useState } from "react";
import CreateSubjectForm, {
  CreateSubjectStep1Data,
} from "@/components/Subject/create/CreateSubjectForm";
import CreateSubjectSidebar from "@/components/Subject/create/CreateSubjectSidebar";
import { CreateDetailSubject } from "@/components/Subject/create/CreateDetailSubject";

export default function CreateSubjectPage() {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<Partial<CreateSubjectStep1Data>>({});

  return (
    <div className="grid h-full grid-cols-[260px_1fr] gap-4 overflow-hidden">
      <CreateSubjectSidebar currentStep={step}
        onBack={() => {
          if (step > 1) {
            setStep(step - 1);
          }
        }} />

      {step === 1 && (
        <CreateSubjectForm
          defaultValues={draft}
          onNext={(step1Data) => {
            setDraft(step1Data);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <CreateDetailSubject/>
      )}
    </div>
  );
}