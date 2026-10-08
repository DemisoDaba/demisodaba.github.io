"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

function getYouTubeEmbedUrl(url: string | null) {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtube.com")) {
      const videoId = parsed.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      if (parsed.pathname.startsWith("/embed/")) {
        return url;
      }
    }

    if (parsed.hostname === "youtu.be") {
      const videoId = parsed.pathname.slice(1);

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    return null;
  } catch {
    return null;
  }
}

export default function TeachingPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeaching();
  }, []);

  async function loadTeaching() {
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

    const loadedCourses = coursesResult.data || [];
    const loadedChapters = chaptersResult.data || [];
    const loadedLessons = lessonsResult.data || [];

    setCourses(loadedCourses);
    setChapters(loadedChapters);
    setLessons(loadedLessons);

    if (loadedCourses.length > 0) {
      const firstCourse = loadedCourses[0];

      setSelectedCourse(firstCourse.id);

      const firstChapter = loadedChapters.find(
        (chapter) => chapter.course_id === firstCourse.id
      );

      if (firstChapter) {
        setSelectedChapter(firstChapter.id);

        const firstLesson = loadedLessons.find(
          (lesson) => lesson.chapter_id === firstChapter.id
        );

        if (firstLesson) {
          setSelectedLesson(firstLesson.id);
        }
      }
    }

    setLoading(false);
  }

  const selectedCourseData = courses.find(
    (course) => course.id === selectedCourse
  );

  const selectedChapters = useMemo(() => {
    return chapters.filter(
      (chapter) => chapter.course_id === selectedCourse
    );
  }, [chapters, selectedCourse]);

  const selectedChapterData = chapters.find(
    (chapter) => chapter.id === selectedChapter
  );

  const selectedLessons = useMemo(() => {
    return lessons.filter(
      (lesson) => lesson.chapter_id === selectedChapter
    );
  }, [lessons, selectedChapter]);

  const selectedLessonData = lessons.find(
    (lesson) => lesson.id === selectedLesson
  );

  function handleCourseChange(courseId: string) {
    setSelectedCourse(courseId);

    const courseChapters = chapters.filter(
      (chapter) => chapter.course_id === courseId
    );

    if (courseChapters.length > 0) {
      const firstChapter = courseChapters[0];

      setSelectedChapter(firstChapter.id);

      const chapterLessons = lessons.filter(
        (lesson) => lesson.chapter_id === firstChapter.id
      );

      if (chapterLessons.length > 0) {
        setSelectedLesson(chapterLessons[0].id);
      } else {
        setSelectedLesson(null);
      }
    } else {
      setSelectedChapter(null);
      setSelectedLesson(null);
    }
  }

  function handleChapterChange(chapterId: string) {
    setSelectedChapter(chapterId);

    const chapterLessons = lessons.filter(
      (lesson) => lesson.chapter_id === chapterId
    );

    if (chapterLessons.length > 0) {
      setSelectedLesson(chapterLessons[0].id);
    } else {
      setSelectedLesson(null);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fafafc] via-white to-[#f7f7f9] text-slate-900 dark:from-[#09090b] dark:via-[#0c0c10] dark:to-[#09090b] dark:text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-200/40 via-pink-200/30 to-indigo-200/40 blur-[120px] dark:from-purple-900/30 dark:via-pink-900/20 dark:to-indigo-900/30" />

        <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-10 lg:px-10 lg:pt-14">
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <div className="max-w-5xl">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-12 bg-gradient-to-r from-purple-600 to-pink-500" />

                <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-purple-600 dark:text-purple-400">
                  Teaching & Academic Instruction
                </span>
              </div>

              <h1 className="text-3xl font-bold leading-[1] tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                <span className="underline decoration-purple-500/60 decoration-[2px] underline-offset-[8px]">
                  Teaching
                </span>{" "}
                <span>&</span>{" "}
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 bg-clip-text text-transparent underline decoration-purple-500/60 decoration-[2px] underline-offset-[8px]">
                  Academic Courses
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400 sm:text-lg sm:leading-8">
                Courses, chapters, and lesson resources in hydrology,
                hydropower engineering, watershed management, water resources,
                and related engineering disciplines.
              </p>
            </div>

            {!loading && courses.length > 0 && (
              <div className="flex flex-row items-center gap-8 md:gap-10">
                <div className="text-right">
                  <div className="text-5xl font-semibold tracking-tight tabular-nums">
                    {String(courses.length).padStart(2, "0")}
                  </div>

                  <div className="mt-1 text-[10px] uppercase tracking-[0.28em] text-slate-400">
                    Courses
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        {/* LOADING */}
        {loading ? (
          <div className="grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)]">
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-900"
                />
              ))}
            </div>

            <div className="h-[600px] animate-pulse rounded-[32px] bg-slate-100 dark:bg-slate-900" />
          </div>
        ) : courses.length === 0 ? (
          /* EMPTY STATE */
          <div className="rounded-[32px] border border-slate-200 bg-white p-20 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 text-2xl dark:from-purple-950 dark:to-slate-800">
              📚
            </div>

            <h3 className="text-xl font-semibold">
              No courses available yet
            </h3>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Teaching courses and learning resources will appear here once approved.
            </p>
          </div>
        ) : (
          /* MAIN LAYOUT */
          <div className="grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)]">
            {/* LEFT COURSE LIST */}
            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <div className="mb-5 flex items-center justify-between px-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
                  Courses
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  {courses.length}
                </span>
              </div>

              <div className="max-h-[70vh] space-y-3 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
                {courses.map((course, index) => {
                  const active = selectedCourse === course.id;

                  return (
                    <button
                      key={course.id}
                      type="button"
                      onClick={() => handleCourseChange(course.id)}
                      className={`group relative flex w-full gap-4 overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${
                        active
                          ? "border-purple-200 bg-gradient-to-r from-purple-50/80 via-white to-white shadow-[0_8px_30px_-12px_rgba(139,92,246,0.35)] dark:border-purple-800/60 dark:from-purple-950/40 dark:via-slate-900 dark:to-slate-900"
                          : "border-slate-200/80 bg-white/80 hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700 dark:hover:bg-slate-900"
                      }`}
                    >
                      <span
                        className={`absolute bottom-0 left-0 top-0 w-[3px] transition-all duration-300 ${
                          active
                            ? "bg-gradient-to-b from-purple-500 via-pink-500 to-indigo-500"
                            : "bg-transparent"
                        }`}
                      />

                      <div
                        className={`w-7 shrink-0 pt-1 text-[10px] font-bold tabular-nums transition-colors ${
                          active
                            ? "text-purple-600 dark:text-purple-400"
                            : "text-slate-300 group-hover:text-slate-400 dark:text-slate-600"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="min-w-0 flex-1">
                        <span
                          className={`text-[10px] font-medium uppercase tracking-wider ${
                            active
                              ? "text-purple-600 dark:text-purple-400"
                              : "text-slate-400"
                          }`}
                        >
                          Course
                        </span>

                        <h3
                          className={`mt-1.5 text-[14px] font-semibold leading-6 transition-colors ${
                            active
                              ? "text-purple-700 dark:text-purple-300"
                              : "text-slate-800 group-hover:text-slate-900 dark:text-slate-200 dark:group-hover:text-white"
                          }`}
                        >
                          {course.title}
                        </h3>

                        {course.description && (
                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">
                            {course.description}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* RIGHT CONTENT */}
            {selectedCourseData && (
              <article className="overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_30px_90px_-40px_rgba(76,29,149,0.35)] dark:border-slate-800 dark:bg-slate-900">
                {/* TOP ACCENT */}
                <div className="h-1 w-full bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500" />

                <div className="p-6 sm:p-10 lg:p-12">
                  {/* COURSE */}
                  <div className="mb-5 flex flex-wrap items-center gap-3">
                    <span className="inline-flex rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-md shadow-purple-500/20">
                      Course
                    </span>

                    <span className="text-sm text-slate-400">
                      {selectedChapters.length}{" "}
                      {selectedChapters.length === 1
                        ? "chapter"
                        : "chapters"}
                    </span>
                  </div>

                  <h2 className="max-w-4xl text-3xl font-bold leading-[1.15] tracking-[-0.03em] sm:text-4xl">
                    {selectedCourseData.title}
                  </h2>

                  {selectedCourseData.description && (
                    <div className="mt-6 max-w-4xl whitespace-pre-line text-justify text-[15px] leading-[1.85] text-slate-600 dark:text-slate-400">
                      {selectedCourseData.description}
                    </div>
                  )}

                  {/* NAVIGATION */}
                  <div className="my-10 grid gap-5 md:grid-cols-2">
                    {/* CHAPTER DROPDOWN */}
                    <div>
                      <label
                        htmlFor="chapter-select"
                        className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400"
                      >
                        Select Chapter
                      </label>

                      <select
                        id="chapter-select"
                        value={selectedChapter || ""}
                        onChange={(e) =>
                          handleChapterChange(e.target.value)
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                      >
                        {selectedChapters.length === 0 ? (
                          <option value="">
                            No chapters available
                          </option>
                        ) : (
                          selectedChapters.map((chapter, index) => (
                            <option
                              key={chapter.id}
                              value={chapter.id}
                            >
                              Chapter {index + 1}: {chapter.title}
                            </option>
                          ))
                        )}
                      </select>
                    </div>

                    {/* LESSON DROPDOWN */}
                    <div>
                      <label
                        htmlFor="lesson-select"
                        className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400"
                      >
                        Select Lesson
                      </label>

                      <select
                        id="lesson-select"
                        value={selectedLesson || ""}
                        onChange={(e) =>
                          setSelectedLesson(e.target.value)
                        }
                        disabled={selectedLessons.length === 0}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                      >
                        {selectedLessons.length === 0 ? (
                          <option value="">
                            No lessons available
                          </option>
                        ) : (
                          selectedLessons.map((lesson, index) => (
                            <option
                              key={lesson.id}
                              value={lesson.id}
                            >
                              Lesson {index + 1}: {lesson.title}
                            </option>
                          ))
                        )}
                      </select>
                    </div>
                  </div>

                  {/* CHAPTER INFORMATION */}
                  {selectedChapterData && (
                    <div className="mb-8 rounded-2xl border border-purple-100 bg-purple-50/50 p-6 dark:border-purple-900/50 dark:bg-purple-950/20">
                      <div className="mb-2 flex items-center gap-3">
                        <span className="h-px w-8 bg-gradient-to-r from-purple-500 to-pink-500" />

                        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-purple-600 dark:text-purple-400">
                          Chapter
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold">
                        {selectedChapterData.title}
                      </h3>

                      {selectedChapterData.description && (
                        <p className="mt-3 whitespace-pre-line text-justify leading-7 text-slate-600 dark:text-slate-400">
                          {selectedChapterData.description}
                        </p>
                      )}
                    </div>
                  )}

                  {/* SELECTED LESSON */}
                  {selectedLessonData ? (
                    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-950/60">

                      {/* VIDEO FIRST */}
                      {(() => {
                        const embedUrl = getYouTubeEmbedUrl(
                          selectedLessonData.youtube_url
                        );

                        if (embedUrl) {
                          return (
                            <div className="border-b border-slate-200 bg-black dark:border-slate-800">
                              <div className="aspect-video">
                                <iframe
                                  src={embedUrl}
                                  title={selectedLessonData.title}
                                  className="h-full w-full"
                                  loading="lazy"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  allowFullScreen
                                />
                              </div>
                            </div>
                          );
                        }

                        if (selectedLessonData.youtube_url) {
                          return (
                            <div className="border-b border-slate-200 p-6 dark:border-slate-800">
                              <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800 dark:border-yellow-900 dark:bg-yellow-950/30 dark:text-yellow-300">
                                The YouTube URL could not be embedded.
                                Please check the video URL.
                              </div>
                            </div>
                          );
                        }

                        return (
                          <div className="border-b border-slate-200 p-8 text-center dark:border-slate-800">
                            <p className="text-sm text-slate-400">
                              No YouTube video has been added for this lesson
                              yet.
                            </p>
                          </div>
                        );
                      })()}

                      {/* LESSON INFORMATION */}
                      <div className="p-6 sm:p-8">
                        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400">
                          Selected Lesson
                        </div>

                        <h3 className="text-2xl font-bold leading-tight">
                          {selectedLessonData.title}
                        </h3>

                        {/* OBJECTIVE */}
                        {selectedLessonData.objective && (
                          <div className="mt-7">
                            <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                              Objective
                            </div>

                            <p className="whitespace-pre-line text-justify text-sm leading-7 text-slate-600 dark:text-slate-400">
                              {selectedLessonData.objective}
                            </p>
                          </div>
                        )}
                      </div>
                    </article>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-700">
                      <p className="text-sm text-slate-400">
                        Select a lesson to view its video and information.
                      </p>
                    </div>
                  )}
                </div>
              </article>
            )}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}