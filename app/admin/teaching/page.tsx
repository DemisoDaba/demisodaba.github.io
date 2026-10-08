"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Course = {
  id: string;
  title: string;
  description: string | null;
  sort_order: number;
};

type Chapter = {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  sort_order: number;
};

type Lesson = {
  id: string;
  chapter_id: string;
  title: string;
  objective: string | null;
  youtube_url: string | null;
  sort_order: number;
};

export default function TeachingAdminPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  const [loading, setLoading] = useState(true);

  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

  const [editingCourse, setEditingCourse] = useState<string | null>(null);
  const [editingChapter, setEditingChapter] = useState<string | null>(null);
  const [editingLesson, setEditingLesson] = useState<string | null>(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterDescription, setChapterDescription] = useState("");

  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonObjective, setLessonObjective] = useState("");
  const [lessonYoutubeUrl, setLessonYoutubeUrl] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    const [coursesResult, chaptersResult, lessonsResult] =
      await Promise.all([
        supabase
          .from("courses")
          .select("id, title, description, sort_order")
          .order("sort_order", { ascending: true }),

        supabase
          .from("chapters")
          .select("id, course_id, title, description, sort_order")
          .order("sort_order", { ascending: true }),

        supabase
          .from("lessons")
          .select(
            "id, chapter_id, title, objective, youtube_url, sort_order"
          )
          .order("sort_order", { ascending: true }),
      ]);

    if (coursesResult.error) {
      console.error("Error loading courses:", coursesResult.error);
    }

    if (chaptersResult.error) {
      console.error("Error loading chapters:", chaptersResult.error);
    }

    if (lessonsResult.error) {
      console.error("Error loading lessons:", lessonsResult.error);
    }

    setCourses(coursesResult.data || []);
    setChapters(chaptersResult.data || []);
    setLessons(lessonsResult.data || []);

    setLoading(false);
  }

  function resetCourseForm() {
    setEditingCourse(null);
    setCourseTitle("");
    setCourseDescription("");
  }

  function resetChapterForm() {
    setEditingChapter(null);
    setChapterTitle("");
    setChapterDescription("");
  }

  function resetLessonForm() {
    setEditingLesson(null);
    setLessonTitle("");
    setLessonObjective("");
    setLessonYoutubeUrl("");
  }

  async function saveCourse(e: React.FormEvent) {
    e.preventDefault();

    if (!courseTitle.trim()) {
      alert("Course title is required.");
      return;
    }

    const payload = {
      title: courseTitle.trim(),
      description: courseDescription.trim() || null,
    };

    if (editingCourse) {
      const { error } = await supabase
        .from("courses")
        .update(payload)
        .eq("id", editingCourse);

      if (error) {
        console.error(error);
        alert("Failed to update course.");
        return;
      }
    } else {
      const { error } = await supabase
        .from("courses")
        .insert(payload);

      if (error) {
        console.error(error);
        alert("Failed to add course.");
        return;
      }
    }

    resetCourseForm();
    await loadData();
  }

  async function deleteCourse(id: string) {
    if (
      !window.confirm(
        "Delete this course and all chapters and lessons inside it?"
      )
    ) {
      return;
    }

    const { error } = await supabase
      .from("courses")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Failed to delete course.");
      return;
    }

    if (selectedCourse === id) {
      setSelectedCourse(null);
      setSelectedChapter(null);
    }

    await loadData();
  }

  async function saveChapter(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedCourse) {
      alert("Select a course first.");
      return;
    }

    if (!chapterTitle.trim()) {
      alert("Chapter title is required.");
      return;
    }

    const payload = {
      course_id: selectedCourse,
      title: chapterTitle.trim(),
      description: chapterDescription.trim() || null,
    };

    if (editingChapter) {
      const { error } = await supabase
        .from("chapters")
        .update(payload)
        .eq("id", editingChapter);

      if (error) {
        console.error(error);
        alert("Failed to update chapter.");
        return;
      }
    } else {
      const { error } = await supabase
        .from("chapters")
        .insert(payload);

      if (error) {
        console.error(error);
        alert("Failed to add chapter.");
        return;
      }
    }

    resetChapterForm();
    await loadData();
  }

  async function deleteChapter(id: string) {
    if (
      !window.confirm(
        "Delete this chapter and all lessons inside it?"
      )
    ) {
      return;
    }

    const { error } = await supabase
      .from("chapters")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Failed to delete chapter.");
      return;
    }

    if (selectedChapter === id) {
      setSelectedChapter(null);
    }

    await loadData();
  }

  async function saveLesson(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedChapter) {
      alert("Select a chapter first.");
      return;
    }

    if (!lessonTitle.trim()) {
      alert("Lesson title is required.");
      return;
    }

    const payload = {
      chapter_id: selectedChapter,
      title: lessonTitle.trim(),
      objective: lessonObjective.trim() || null,
      youtube_url: lessonYoutubeUrl.trim() || null,
    };

    if (editingLesson) {
      const { error } = await supabase
        .from("lessons")
        .update(payload)
        .eq("id", editingLesson);

      if (error) {
        console.error(error);
        alert("Failed to update lesson.");
        return;
      }
    } else {
      const { error } = await supabase
        .from("lessons")
        .insert(payload);

      if (error) {
        console.error(error);
        alert("Failed to add lesson.");
        return;
      }
    }

    resetLessonForm();
    await loadData();
  }

  async function deleteLesson(id: string) {
    if (!window.confirm("Delete this lesson?")) {
      return;
    }

    const { error } = await supabase
      .from("lessons")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Failed to delete lesson.");
      return;
    }

    await loadData();
  }

  function editCourse(course: Course) {
    setEditingCourse(course.id);
    setCourseTitle(course.title);
    setCourseDescription(course.description || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function editChapter(chapter: Chapter) {
    setEditingChapter(chapter.id);
    setChapterTitle(chapter.title);
    setChapterDescription(chapter.description || "");
  }

  function editLesson(lesson: Lesson) {
    setEditingLesson(lesson.id);
    setLessonTitle(lesson.title);
    setLessonObjective(lesson.objective || "");
    setLessonYoutubeUrl(lesson.youtube_url || "");
  }

  const visibleChapters = chapters.filter(
    (chapter) => chapter.course_id === selectedCourse
  );

  const visibleLessons = lessons.filter(
    (lesson) => lesson.chapter_id === selectedChapter
  );

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-10">
          <div className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-purple-600 dark:text-purple-400">
            Administration
          </div>

          <h1 className="text-3xl font-bold">
            Teaching / Courses
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage courses, chapters, lessons, objectives, and YouTube videos.
          </p>
        </div>

        {/* ADD / EDIT COURSE */}
        <section className="mb-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {editingCourse ? "Edit Course" : "Add Course"}
            </h2>

            {editingCourse && (
              <button
                type="button"
                onClick={resetCourseForm}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm dark:border-slate-700"
              >
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={saveCourse} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Course Title *
              </label>

              <input
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="e.g. Hydropower Engineering"
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Course Description
              </label>

              <textarea
                rows={4}
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                placeholder="Describe the course..."
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-7 dark:border-slate-700 dark:bg-slate-950"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700"
            >
              {editingCourse ? "Update Course" : "Add Course"}
            </button>
          </form>
        </section>

        {/* COURSES */}
        <section>
          <h2 className="mb-5 text-xl font-semibold">
            Courses
          </h2>

          {loading ? (
            <div className="rounded-2xl bg-white p-10 text-center dark:bg-slate-900">
              Loading...
            </div>
          ) : courses.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
              No courses yet.
            </div>
          ) : (
            <div className="space-y-5">
              {courses.map((course) => {
                const isCourseOpen = selectedCourse === course.id;

                return (
                  <div
                    key={course.id}
                    className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    {/* COURSE */}
                    <div className="flex items-center justify-between gap-4 p-6">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCourse(
                            isCourseOpen ? null : course.id
                          );
                          setSelectedChapter(null);
                          resetChapterForm();
                          resetLessonForm();
                        }}
                        className="flex-1 text-left"
                      >
                        <div className="text-xs font-bold uppercase tracking-[0.2em] text-purple-600">
                          Course
                        </div>

                        <h3 className="mt-1 text-2xl font-bold">
                          {course.title}
                        </h3>

                        {course.description && (
                          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            {course.description}
                          </p>
                        )}

                        <p className="mt-3 text-xs text-slate-400">
                          {isCourseOpen
                            ? "Click to collapse"
                            : "Click to open"}
                        </p>
                      </button>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => editCourse(course)}
                          className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold dark:bg-slate-800"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteCourse(course.id)}
                          className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 dark:bg-red-950/30 dark:text-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* CHAPTER AREA */}
                    {isCourseOpen && (
                      <div className="border-t border-slate-200 p-6 dark:border-slate-800">

                        {/* ADD CHAPTER */}
                        <div className="mb-7 rounded-2xl bg-slate-50 p-6 dark:bg-slate-950">
                          <h4 className="text-lg font-semibold">
                            {editingChapter
                              ? "Edit Chapter"
                              : "Add Chapter"}
                          </h4>

                          <form
                            onSubmit={saveChapter}
                            className="mt-4 space-y-4"
                          >
                            <input
                              value={chapterTitle}
                              onChange={(e) =>
                                setChapterTitle(e.target.value)
                              }
                              placeholder="e.g. Chapter 1: Introduction"
                              required
                              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900"
                            />

                            <textarea
                              rows={3}
                              value={chapterDescription}
                              onChange={(e) =>
                                setChapterDescription(e.target.value)
                              }
                              placeholder="Chapter description (optional)"
                              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900"
                            />

                            <div className="flex gap-2">
                              <button
                                type="submit"
                                className="rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white"
                              >
                                {editingChapter
                                  ? "Update Chapter"
                                  : "Add Chapter"}
                              </button>

                              {editingChapter && (
                                <button
                                  type="button"
                                  onClick={resetChapterForm}
                                  className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm dark:border-slate-700"
                                >
                                  Cancel
                                </button>
                              )}
                            </div>
                          </form>
                        </div>

                        {/* CHAPTERS */}
                        <div className="space-y-5">
                          {visibleChapters.map((chapter, index) => {
                            const isChapterOpen =
                              selectedChapter === chapter.id;

                            return (
                              <div
                                key={chapter.id}
                                className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800"
                              >
                                {/* CHAPTER HEADER */}
                                <div className="flex items-center justify-between gap-4 p-5">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedChapter(
                                        isChapterOpen
                                          ? null
                                          : chapter.id
                                      );
                                      resetLessonForm();
                                    }}
                                    className="flex-1 text-left"
                                  >
                                    <div className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                                      Chapter {index + 1}
                                    </div>

                                    <h5 className="mt-1 text-lg font-bold">
                                      {chapter.title}
                                    </h5>

                                    {chapter.description && (
                                      <p className="mt-1 text-sm text-slate-500">
                                        {chapter.description}
                                      </p>
                                    )}
                                  </button>

                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        editChapter(chapter)
                                      }
                                      className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold dark:bg-slate-800"
                                    >
                                      Edit
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        deleteChapter(chapter.id)
                                      }
                                      className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 dark:bg-red-950/30 dark:text-red-400"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>

                                {/* LESSONS */}
                                {isChapterOpen && (
                                  <div className="border-t border-slate-200 p-5 dark:border-slate-800">

                                    {/* ADD LESSON */}
                                    <div className="mb-6 rounded-2xl bg-slate-50 p-5 dark:bg-slate-950">
                                      <h6 className="font-semibold">
                                        {editingLesson
                                          ? "Edit Lesson"
                                          : "Add Lesson"}
                                      </h6>

                                      <form
                                        onSubmit={saveLesson}
                                        className="mt-4 space-y-4"
                                      >
                                        <div>
                                          <label className="mb-2 block text-sm font-semibold">
                                            Lesson Title *
                                          </label>

                                          <input
                                            value={lessonTitle}
                                            onChange={(e) =>
                                              setLessonTitle(
                                                e.target.value
                                              )
                                            }
                                            placeholder="e.g. Introduction to Hydropower"
                                            required
                                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900"
                                          />
                                        </div>

                                        <div>
                                          <label className="mb-2 block text-sm font-semibold">
                                            Lesson Objective / Description
                                          </label>

                                          <textarea
                                            rows={6}
                                            value={lessonObjective}
                                            onChange={(e) =>
                                              setLessonObjective(
                                                e.target.value
                                              )
                                            }
                                            placeholder="What should students learn from this lesson?"
                                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-7 dark:border-slate-700 dark:bg-slate-900"
                                          />
                                        </div>

                                        <div>
                                          <label className="mb-2 block text-sm font-semibold">
                                            YouTube URL
                                          </label>

                                          <input
                                            type="url"
                                            value={lessonYoutubeUrl}
                                            onChange={(e) =>
                                              setLessonYoutubeUrl(
                                                e.target.value
                                              )
                                            }
                                            placeholder="https://www.youtube.com/watch?v=..."
                                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900"
                                          />

                                          <p className="mt-2 text-xs text-slate-400">
                                            Paste the YouTube video URL for
                                            this lesson.
                                          </p>
                                        </div>

                                        <div className="flex gap-2">
                                          <button
                                            type="submit"
                                            className="rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white"
                                          >
                                            {editingLesson
                                              ? "Update Lesson"
                                              : "Add Lesson"}
                                          </button>

                                          {editingLesson && (
                                            <button
                                              type="button"
                                              onClick={resetLessonForm}
                                              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm dark:border-slate-700"
                                            >
                                              Cancel
                                            </button>
                                          )}
                                        </div>
                                      </form>
                                    </div>

                                    {/* LESSON LIST */}
                                    <div className="space-y-3">
                                      {visibleLessons.map(
                                        (lesson, lessonIndex) => (
                                          <div
                                            key={lesson.id}
                                            className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
                                          >
                                            <div className="flex items-start justify-between gap-4">
                                              <div className="min-w-0">
                                                <div className="text-xs font-bold uppercase tracking-[0.15em] text-purple-600 dark:text-purple-400">
                                                  Lesson{" "}
                                                  {lessonIndex + 1}
                                                </div>

                                                <h6 className="mt-1 text-lg font-semibold">
                                                  {lesson.title}
                                                </h6>

                                                {lesson.objective && (
                                                  <div className="mt-3 whitespace-pre-line text-justify text-sm leading-7 text-slate-600 dark:text-slate-400">
                                                    {lesson.objective}
                                                  </div>
                                                )}

                                                {lesson.youtube_url && (
                                                  <div className="mt-4 break-all rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                                                    YouTube:{" "}
                                                    {lesson.youtube_url}
                                                  </div>
                                                )}
                                              </div>

                                              <div className="flex shrink-0 gap-2">
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    editLesson(
                                                      lesson
                                                    )
                                                  }
                                                  className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold dark:bg-slate-800"
                                                >
                                                  Edit
                                                </button>

                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    deleteLesson(
                                                      lesson.id
                                                    )
                                                  }
                                                  className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 dark:bg-red-950/30 dark:text-red-400"
                                                >
                                                  Delete
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )}

                                      {visibleLessons.length === 0 && (
                                        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-400 dark:border-slate-700">
                                          No lessons yet. Add the first
                                          lesson above.
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}

                          {visibleChapters.length === 0 && (
                            <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-400 dark:border-slate-700">
                              No chapters yet. Add the first chapter above.
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}