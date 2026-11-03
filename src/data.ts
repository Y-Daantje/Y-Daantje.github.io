export const profile = {
  name: 'Yannick Daantje',
  role: 'Web Developer & Designer',
  tagline: 'I build beautiful, functional websites with a focus on responsive, user-friendly interfaces.',
  about:
    "Hello! I'm the creator of all these projects. I specialize in front-end development with a focus on creating responsive and user-friendly interfaces. My goal is to build websites that not only look great but also provide an excellent user experience.",
  location: 'Rotterdam, The Netherlands',
  email: 'Daantjeyannick@gmail.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com/Y-Daantje' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yannick-daantje-613397222/' },
    { label: 'X', href: 'https://x.com/DaantjeYannick' },
  ],
};

export type Project = {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    title: 'Dashboard',
    description: 'A comprehensive dashboard to view and manage all your information in one place for you and your clients.',
    image: '/img/dashboard.png',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'File System Tree',
    description: 'A file system tree view to manage and organize your files efficiently.',
    image: '/img/filesystemtree.png',
    tags: ['C#'],
    href: 'https://github.com/Y-Daantje/FileSystemTree-C',
  },
];

export const skills = [
  { name: 'HTML / CSS / Bootstrap 5', level: 75 },
  { name: 'Symfony', level: 70 },
  { name: 'JavaScript', level: 65 },
  { name: 'PHP', level: 65 },
  { name: 'AI', level: 50 },
  { name: 'Chart.js', level: 35 },
  { name: 'Swift', level: 30 },
  { name: 'Java', level: 20 },
  { name: 'React Native', level: 15 },
];

export const tools = ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Bootstrap', 'Symfony', 'PHP', 'Swift', 'Git', 'GitHub', 'AI'];

export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const;
