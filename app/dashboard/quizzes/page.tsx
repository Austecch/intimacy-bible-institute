"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  FileQuestion, 
  Clock, 
  CheckCircle2,
  XCircle,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { Card, ProgressBar } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Elements";
import Button from "@/components/ui/Button";

function AnimatedSection({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const quizzes = [
  {
    id: 1,
    title: "Foundations Quiz - Module 1",
    course: "Foundations of Intimacy with God",
    questions: 15,
    duration: 30,
    passingScore: 70,
    status: "not_started",
    attempts: 0,
  },
  {
    id: 2,
    title: "Prophetic Foundations Assessment",
    course: "The Prophetic Anointing",
    questions: 20,
    duration: 45,
    passingScore: 75,
    status: "in_progress",
    attempts: 1,
    bestScore: 65,
  },
  {
    id: 3,
    title: "Kingdom Economics Mid-Term",
    course: "Kingdom Economics",
    questions: 25,
    duration: 60,
    passingScore: 70,
    status: "completed",
    attempts: 2,
    bestScore: 88,
  },
];

export default function QuizzesPage() {
  const [activeQuiz, setActiveQuiz] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const sampleQuestions = [
    {
      id: 1,
      text: "What is the primary purpose of intimacy with God according to the course material?",
      options: [
        "To gain knowledge about God",
        "To experience His presence and transform our lives",
        "To fulfill religious obligations",
        "To achieve personal success",
      ],
    },
    {
      id: 2,
      text: "Which of the following is NOT a barrier to intimacy with God?",
      options: [
        "Unforgiveness",
        "Regular prayer",
        "Busyness",
        "Unconfessed sin",
      ],
    },
    {
      id: 3,
      text: "According to James 4:8, what happens when we draw near to God?",
      options: [
        "He becomes distant",
        "He draws near to us",
        "We must work harder",
        "We receive wealth",
      ],
    },
  ];

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const startQuiz = (quizId: number) => {
    setActiveQuiz(quizId);
    setCurrentQuestion(0);
    setAnswers([]);
    setQuizComplete(false);
  };

  const exitQuiz = () => {
    setActiveQuiz(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setQuizComplete(false);
  };

  if (activeQuiz) {
    const quiz = quizzes.find(q => q.id === activeQuiz);
    const question = sampleQuestions[currentQuestion];

    if (quizComplete) {
      const score = Math.round((answers.filter((a, i) => a === [0, 1, 1][i]).length / sampleQuestions.length) * 100);
      const passed = score >= (quiz?.passingScore || 70);

      return (
        <div className="max-w-2xl mx-auto">
          <Card className="text-center py-12">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              passed ? "bg-emerald-100" : "bg-red-100"
            }`}>
              {passed ? (
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              ) : (
                <XCircle className="w-10 h-10 text-red-600" />
              )}
            </div>
            <h2 className="text-2xl font-semibold text-stone-900 mb-2">
              {passed ? "Congratulations!" : "Keep Trying!"}
            </h2>
            <p className="text-stone-500 mb-6">
              {passed 
                ? "You passed the quiz and can proceed to the next module."
                : `You need ${quiz?.passingScore}% to pass. Review the material and try again.`}
            </p>
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-stone-50 rounded-xl mb-8">
              <div>
                <p className="text-3xl font-bold text-stone-900">{score}%</p>
                <p className="text-sm text-stone-500">Your Score</p>
              </div>
              <div className="w-px h-10 bg-stone-200" />
              <div>
                <p className="text-3xl font-bold text-stone-900">{quiz?.passingScore}%</p>
                <p className="text-sm text-stone-500">Required</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Button variant="secondary" onClick={exitQuiz}>
                Back to Quizzes
              </Button>
              {!passed && (
                <Button onClick={() => startQuiz(activeQuiz)}>
                  Try Again
                </Button>
              )}
            </div>
          </Card>
        </div>
      );
    }

    return (
      <div className="max-w-3xl mx-auto">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-stone-900">{quiz?.title}</h2>
              <p className="text-sm text-stone-500">{quiz?.course}</p>
            </div>
            <button
              onClick={exitQuiz}
              className="text-sm text-stone-500 hover:text-stone-700"
            >
              Exit Quiz
            </button>
          </div>

          <ProgressBar 
            value={(currentQuestion + 1) / sampleQuestions.length * 100} 
            showLabel 
          />

          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <Badge>Question {currentQuestion + 1} of {sampleQuestions.length}</Badge>
              <span className="flex items-center gap-1 text-sm text-stone-500">
                <Clock className="w-4 h-4" />
                {quiz?.duration} min
              </span>
            </div>

            <h3 className="text-lg font-medium text-stone-900 mb-6">
              {question.text}
            </h3>

            <div className="space-y-3">
              {question.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                    answers[currentQuestion] === i
                      ? "border-violet-600 bg-violet-50"
                      : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-medium ${
                    answers[currentQuestion] === i
                      ? "bg-violet-600 text-white"
                      : "bg-stone-100 text-stone-600"
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="flex-1">{option}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="px-4 py-2 text-stone-600 hover:text-stone-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <Button onClick={handleNext} icon={ChevronRight} iconPosition="right">
              {currentQuestion === sampleQuestions.length - 1 ? "Submit" : "Next"}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <AnimatedSection>
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Quizzes & Assessments</h1>
          <p className="text-stone-500">Test your knowledge and track your progress</p>
        </div>
      </AnimatedSection>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AnimatedSection delay={0.1}>
          <Card className="text-center">
            <p className="text-3xl font-bold text-stone-900">{quizzes.length}</p>
            <p className="text-sm text-stone-500">Total Quizzes</p>
          </Card>
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <Card className="text-center">
            <p className="text-3xl font-bold text-emerald-600">
              {quizzes.filter(q => q.status === "completed").length}
            </p>
            <p className="text-sm text-stone-500">Completed</p>
          </Card>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <Card className="text-center">
            <p className="text-3xl font-bold text-amber-600">
              {quizzes.filter(q => q.status === "in_progress").length}
            </p>
            <p className="text-sm text-stone-500">In Progress</p>
          </Card>
        </AnimatedSection>
        <AnimatedSection delay={0.25}>
          <Card className="text-center">
            <p className="text-3xl font-bold text-stone-900">85%</p>
            <p className="text-sm text-stone-500">Avg Score</p>
          </Card>
        </AnimatedSection>
      </div>

      {/* Quiz List */}
      <AnimatedSection delay={0.3}>
        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} hover className="cursor-pointer" onClick={() => startQuiz(quiz.id)}>
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  quiz.status === "completed" ? "bg-emerald-100 text-emerald-600" :
                  quiz.status === "in_progress" ? "bg-amber-100 text-amber-600" :
                  "bg-violet-100 text-violet-600"
                }`}>
                  <FileQuestion className="w-7 h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-stone-900">{quiz.title}</h3>
                  <p className="text-sm text-stone-500">{quiz.course}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-stone-500">
                    <span className="flex items-center gap-1">
                      <FileQuestion className="w-4 h-4" />
                      {quiz.questions} questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {quiz.duration} min
                    </span>
                    <span>Pass: {quiz.passingScore}%</span>
                  </div>
                </div>
                <div className="text-right">
                  {quiz.status === "completed" ? (
                    <>
                      <Badge variant="success">{quiz.bestScore}%</Badge>
                      <p className="text-xs text-stone-400 mt-1">Best Score</p>
                    </>
                  ) : quiz.status === "in_progress" ? (
                    <>
                      <Badge variant="warning">In Progress</Badge>
                      <p className="text-xs text-stone-400 mt-1">{quiz.attempts} attempt(s)</p>
                    </>
                  ) : (
                    <>
                      <Badge>Not Started</Badge>
                      <p className="text-xs text-stone-400 mt-1">0 attempts</p>
                    </>
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-stone-400" />
              </div>
            </Card>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
