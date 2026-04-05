export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin";
  avatar: string;
  enrolledCourses: string[];
  completedCourses: string[];
  joinDate: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorImage: string;
  thumbnail: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  enrolled: number;
  rating: number;
  modules: Module[];
  featured?: boolean;
}

export interface Module {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  type: "video" | "audio" | "pdf" | "text";
  duration: number;
  completed?: boolean;
  content?: string;
}

export interface Quiz {
  id: string;
  title: string;
  courseId: string;
  questions: Question[];
  passingScore: number;
  timeLimit?: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Assignment {
  id: string;
  title: string;
  courseId: string;
  description: string;
  dueDate: string;
  submitted?: boolean;
  grade?: number;
  feedback?: string;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseName: string;
  userId: string;
  issueDate: string;
  verificationCode: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  course?: string;
}

export interface MediaItem {
  id: string;
  title: string;
  type: "sermon" | "video" | "teaching";
  thumbnail: string;
  duration: string;
  date: string;
  speaker: string;
}

export const currentUser: User = {
  id: "usr_1",
  name: "Sarah Mitchell",
  email: "sarah.mitchell@email.com",
  role: "student",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  enrolledCourses: ["course_1", "course_2"],
  completedCourses: ["course_3"],
  joinDate: "2024-01-15",
};

export const adminUser: User = {
  id: "usr_admin",
  name: "Admin User",
  email: "admin@ibi.edu",
  role: "admin",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
  enrolledCourses: [],
  completedCourses: [],
  joinDate: "2023-06-01",
};

export const courses: Course[] = [
  {
    id: "course_1",
    title: "Foundations of Intimacy with God",
    description: "Explore the deep principles of developing a personal, intimate relationship with our Heavenly Father. Learn how to cultivate spiritual intimacy through prayer, meditation, andScripture study.",
    instructor: "Apostle James Richardson",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&h=500&fit=crop",
    duration: "12 weeks",
    level: "Beginner",
    category: "Spiritual Formation",
    enrolled: 1247,
    rating: 4.9,
    featured: true,
    modules: [
      {
        id: "mod_1",
        title: "Understanding Divine Intimacy",
        order: 1,
        lessons: [
          { id: "les_1", title: "Introduction to Spiritual Intimacy", type: "video", duration: 25, completed: true },
          { id: "les_2", title: "The Heart of the Father", type: "video", duration: 32, completed: true },
          { id: "les_3", title: "Barriers to Intimacy", type: "pdf", duration: 15, completed: false },
        ],
      },
      {
        id: "mod_2",
        title: "Practices of Intimacy",
        order: 2,
        lessons: [
          { id: "les_4", title: "Prayer as Conversation", type: "video", duration: 28, completed: false },
          { id: "les_5", title: "Meditation on Scripture", type: "audio", duration: 20, completed: false },
          { id: "les_6", title: "Journaling Your Journey", type: "text", duration: 10, completed: false },
        ],
      },
    ],
  },
  {
    id: "course_2",
    title: "The Prophetic Anointing",
    description: "Discover your prophetic calling and learn how to develop and operate in the gift of prophecy. This course covers biblical foundations, practical exercises, and spiritual discernment.",
    instructor: "Prophetess Maria Thompson",
    instructorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&h=500&fit=crop",
    duration: "8 weeks",
    level: "Intermediate",
    category: "Spiritual Gifts",
    enrolled: 892,
    rating: 4.8,
    featured: true,
    modules: [
      {
        id: "mod_3",
        title: "Biblical Foundations",
        order: 1,
        lessons: [
          { id: "les_7", title: "The Nature of Prophecy", type: "video", duration: 35, completed: true },
          { id: "les_8", title: "Old Testament Prophets", type: "video", duration: 40, completed: true },
        ],
      },
    ],
  },
  {
    id: "course_3",
    title: "Kingdom Economics",
    description: "Understand God's financial principles and how to steward resources for kingdom impact. Learn about tithing, giving, investment, and supernatural provision.",
    instructor: "Bishop David Chen",
    instructorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=500&fit=crop",
    duration: "6 weeks",
    level: "Beginner",
    category: "Practical Theology",
    enrolled: 654,
    rating: 4.7,
    featured: false,
    modules: [
      {
        id: "mod_4",
        title: "Biblical Money Principles",
        order: 1,
        lessons: [
          { id: "les_9", title: "The Law of Firstfruits", type: "video", duration: 30, completed: true },
        ],
      },
    ],
  },
  {
    id: "course_4",
    title: "Worship as Lifestyle",
    description: "Move beyond Sunday morning worship into a life of continuous adoration and thanksgiving. Explore the throne room of God and discover worship as your daily dwelling place.",
    instructor: "Worship Leader Grace Williams",
    instructorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&h=500&fit=crop",
    duration: "10 weeks",
    level: "Intermediate",
    category: "Worship",
    enrolled: 1089,
    rating: 4.9,
    featured: true,
    modules: [],
  },
  {
    id: "course_5",
    title: "Healing Ministry Training",
    description: "Equip yourself to minister healing in Jesus' name. This comprehensive course covers divine healing theology, methodology, and practical application.",
    instructor: "Dr. Rebecca Johnson",
    instructorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&h=500&fit=crop",
    duration: "14 weeks",
    level: "Advanced",
    category: "Ministry Training",
    enrolled: 567,
    rating: 4.8,
    featured: false,
    modules: [],
  },
  {
    id: "course_6",
    title: "Leadership in the Kingdom",
    description: "Develop servant leadership skills grounded in kingdom principles. Learn to lead with humility, vision, and spiritual authority.",
    instructor: "Apostle James Richardson",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=500&fit=crop",
    duration: "8 weeks",
    level: "Intermediate",
    category: "Leadership",
    enrolled: 743,
    rating: 4.6,
    featured: false,
    modules: [],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "test_1",
    name: "Michael Okonkwo",
    role: "Senior Pastor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    quote: "IBI transformed my understanding of intimacy with God. The prophetic courses helped me rediscover the voice of the Holy Spirit in my life.",
    course: "The Prophetic Anointing",
  },
  {
    id: "test_2",
    name: "Grace Nakamura",
    role: "Worship Leader",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
    quote: "The worship program at IBI went beyond music—it became a lifestyle. I now understand that every moment can be an act of worship.",
    course: "Worship as Lifestyle",
  },
  {
    id: "test_3",
    name: "David Mbeki",
    role: "Church Planter",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    quote: "Kingdom Economics revolutionized how I handle resources. God has provided miraculously since I applied these principles.",
    course: "Kingdom Economics",
  },
  {
    id: "test_4",
    name: "Rachel Martinez",
    role: "Bible Teacher",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    quote: "The depth of teaching at IBI is unmatched. Every course feels like drinking from a deep well of revelation.",
    course: "Foundations of Intimacy with God",
  },
];

export const mediaItems: MediaItem[] = [
  {
    id: "med_1",
    title: "Walking in Divine Favor",
    type: "sermon",
    thumbnail: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&h=250&fit=crop",
    duration: "45:30",
    date: "2024-03-15",
    speaker: "Apostle James Richardson",
  },
  {
    id: "med_2",
    title: "The Power of Prevailing Prayer",
    type: "sermon",
    thumbnail: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&h=250&fit=crop",
    duration: "52:15",
    date: "2024-03-08",
    speaker: "Prophetess Maria Thompson",
  },
  {
    id: "med_3",
    title: "Understanding the Holy Spirit",
    type: "teaching",
    thumbnail: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&h=250&fit=crop",
    duration: "1:15:00",
    date: "2024-02-28",
    speaker: "Dr. Rebecca Johnson",
  },
  {
    id: "med_4",
    title: "Prophetic Activation Workshop",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=400&h=250&fit=crop",
    duration: "2:30:00",
    date: "2024-02-20",
    speaker: "Prophetess Maria Thompson",
  },
  {
    id: "med_5",
    title: "Breaking Generational Chains",
    type: "sermon",
    thumbnail: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&h=250&fit=crop",
    duration: "48:45",
    date: "2024-02-14",
    speaker: "Bishop David Chen",
  },
  {
    id: "med_6",
    title: "Intimacy Through Worship",
    type: "teaching",
    thumbnail: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=400&h=250&fit=crop",
    duration: "58:20",
    date: "2024-02-07",
    speaker: "Worship Leader Grace Williams",
  },
];

export const studentStats = {
  totalStudents: 4582,
  activeStudents: 3421,
  newThisMonth: 156,
  completionRate: 87,
  averageRating: 4.8,
};

export const revenueData = [
  { month: "Jan", revenue: 12500 },
  { month: "Feb", revenue: 15800 },
  { month: "Mar", revenue: 18200 },
  { month: "Apr", revenue: 14600 },
  { month: "May", revenue: 19400 },
  { month: "Jun", revenue: 22100 },
];

export const enrollmentData = [
  { month: "Jan", enrollments: 245 },
  { month: "Feb", enrollments: 312 },
  { month: "Mar", enrollments: 289 },
  { month: "Apr", enrollments: 356 },
  { month: "May", enrollments: 398 },
  { month: "Jun", enrollments: 421 },
];

export const students: User[] = [
  { ...currentUser, id: "usr_2", name: "John Peterson", email: "john.p@email.com", joinDate: "2024-02-01" },
  { id: "usr_3", name: "Emily Watson", email: "emily.w@email.com", role: "student", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop", enrolledCourses: ["course_1"], completedCourses: [], joinDate: "2024-01-20" },
  { id: "usr_4", name: "Robert Kim", email: "robert.k@email.com", role: "student", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop", enrolledCourses: ["course_2", "course_4"], completedCourses: ["course_1"], joinDate: "2023-11-15" },
  { id: "usr_5", name: "Lisa Anderson", email: "lisa.a@email.com", role: "student", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop", enrolledCourses: ["course_3"], completedCourses: ["course_2", "course_5"], joinDate: "2023-09-01" },
];
