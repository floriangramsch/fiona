<script setup lang="ts">
import {
  useAddExamMutation,
  useDeleteExamMutation,
  useGetExams,
  useUpdateExamMutation,
} from "~/app/composables/uxeExams";
import Dialog from "../dialogs/Dialog.vue";
import { type TExam } from "~/app/utils/types";
import Input from "../ui/Input.vue";

const form = ref<{
  title?: string;
  start?: string;
  end?: string;
}>({
  title: undefined,
  start: undefined,
  end: undefined,
});
const { data: exams } = useGetExams();
const addMutation = useAddExamMutation();
const addExam = () => {
  if (form.value.title && form.value.start && form.value.end) {
    addMutation.mutate(
      {
        title: form.value.title,
        start: form.value.start,
        end: form.value.start,
      },
      {
        onSuccess: () => {
          form.value = {
            title: undefined,
            start: undefined,
            end: undefined,
          };
          dialogRef.value.close()
        },
      },
    );
  }
};

const deleteMutation = useDeleteExamMutation();
const deleteExam = (id: number) => {
  deleteMutation.mutate(id);
};

const updateMutation = useUpdateExamMutation();
const updateExam = () => {
  if (
    selectedExam.value?.id &&
    form.value.title &&
    form.value.start &&
    form.value.end
  ) {
    updateMutation.mutate({
      id: selectedExam.value?.id,
      title: form.value.title,
      start: form.value.start,
      end: form.value.start,
    });
  }
};

const selectedExam = ref<TExam>();
const selectExam = (e: TExam) => {
  if (e.id === selectedExam.value?.id) {
    selectedExam.value = undefined;
    form.value = {
      title: undefined,
      start: undefined,
      end: undefined,
    };
  } else {
    selectedExam.value = e;
    form.value = {
      title: e.title,
      start: new Date(e.start).toISOString().slice(0, 16),
      end: new Date(e.end).toISOString().slice(0, 16),
    };
  }
};

const dialogRef = ref();

const showTime = (start: string, end: string) => {
  const s = new Date(start);
  const e = new Date(end);
  const year = s.getUTCFullYear();
  const month = (s.getMonth() + 1).toString().padStart(2, "0");
  const day = s.getDate().toString().padStart(2, "0");
  const hours = s.getHours().toString().padStart(2, "0");
  const minutes = s.getMinutes().toString().padStart(2, "0");

  const ehours = e.getHours().toString().padStart(2, "0");
  const eminutes = e.getMinutes().toString().padStart(2, "0");

  // return `${day}.${month} ${hours}:${minutes}-${ehours}:${eminutes} Uhr`;
  return `${day}.${month}`;
};

const restTime = (time: string) => {
  const today = new Date();
  const examDate = new Date(time);
  const diffTime = examDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays} ${diffDays === 1 ? "day" : "days"}`;
};

const selectedExamTime = ref<TExam>();
const selectToShowTime = (exam: TExam) => {
  if (selectedExamTime.value?.id === exam.id) {
    selectedExamTime.value = undefined;
  } else {
    selectedExamTime.value = exam;
  }
};
const showHoursMinutes = (start: string, end: string) => {
  const s = new Date(start);
  const hours = s.getHours().toString().padStart(2, "0");
  const minutes = s.getMinutes().toString().padStart(2, "0");

  const e = new Date(end);
  const ehours = e.getHours().toString().padStart(2, "0");
  const eminutes = e.getMinutes().toString().padStart(2, "0");
  return `<i class="fa fa-arrow-right" /> ${hours}:${minutes}-${ehours}:${eminutes} Uhr`;
};
</script>

<template>
  <div class="rounded border border-fiona-text bg-fiona-fg p-1 sm:bg-fiona-bg">
    <div
      v-for="exam in exams"
      @click.stop="selectToShowTime(exam)"
      class="flex flex-col gap-1"
    >
      <div class="flex gap-1">
        {{ showTime(exam.start, exam.end) }} - {{ exam.title }}
        <div class="opacity-50">({{ restTime(exam.start) }})</div>
      </div>
      <div
        v-if="selectedExamTime?.id === exam.id"
        class="text-xs opacity-50"
        v-html="showHoursMinutes(exam.start, exam.end)"
      />
    </div>
    <button
      class="rounded bg-fiona-fg p-1 opacity-40 shadow"
      @click="dialogRef.open"
    >
      Edit Exams
    </button>

    <Dialog ref="dialogRef">
      <div class="flex h-4/5 w-4/5 flex-col justify-center gap-1">
        <div class="mb-2 border-2 border-dotted p-1">
          <div
            v-for="exam in exams"
            class="flex items-center gap-2"
            :class="{ 'rounded bg-fiona-fg p-1': exam.id === selectedExam?.id }"
            @click.stop="selectExam(exam)"
          >
            {{ exam.title }}
            <i class="fa-solid fa-close" @click="deleteExam(exam.id)" />
          </div>
        </div>

        <Input v-model="form.title" />
        <div class="flex flex-col gap-1 sm:flex-row">
          <Input class="w-full" v-model="form.start" type="datetime-local" />
          <Input class="w-full" v-model="form.end" type="datetime-local" />
        </div>
        <button
          class="rounded bg-fiona-special p-1 shadow"
          @click.stop="selectedExam ? updateExam() : addExam()"
        >
          {{ selectedExam ? "Update Exam" : "New Exam" }}
        </button>
      </div>
    </Dialog>
  </div>
</template>
