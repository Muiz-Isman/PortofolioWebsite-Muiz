import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Database, 
  Code2, 
  ArrowUpRight, 
  Mail, 
  Github, 
  Linkedin, 
  ChevronDown,
  Terminal,
  FileSpreadsheet,
  Layout,
  Mic,
  Briefcase,
  Download // Added import
} from 'lucide-react';

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

// --- COMPONENTS ---

// 1. Project Card (Interactive State)
const ProjectCard = ({ project, isActive, onHover }) => (
  <motion.div 
    variants={itemFadeIn}
    onMouseEnter={() => onHover(project.id)} // Trigger pindah aktif saat di-hover
    className={`
      relative rounded-2xl p-6 flex flex-col justify-between h-full transition-all duration-300 cursor-default
      ${isActive 
        ? "bg-[#F3EAE0] border border-[#212842] shadow-[6px_6px_0px_0px_#212842] scale-[1.02]" // STYLE AKTIF (Pop out)
        : "bg-[#F3EAE0]/50 border border-[#212842]/20 shadow-none scale-100 opacity-80 hover:opacity-100" // STYLE PASIF (Flat)
      }
    `}
  >
    <div>
      <div className="flex justify-between items-start mb-4">
        {/* Icon: Gelap jika aktif, Pudar jika tidak */}
        <div className={`
          p-3 rounded-xl border transition-colors duration-300
          ${isActive 
            ? "bg-[#212842] text-[#F3EAE0] border-[#212842]" 
            : "bg-[#212842]/5 text-[#212842]/60 border-[#212842]/10"
          }
        `}>
          {project.icon}
        </div>
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#212842]/60 hover:text-[#212842] transition-colors"
        >
          <ArrowUpRight size={20} />
        </a>
      </div>
      
      <h3 className={`text-xl font-bold text-[#212842] mb-2 transition-all ${isActive ? "underline decoration-2 underline-offset-4" : ""}`}>
        {project.title}
      </h3>
      <p className="text-[#212842]/80 text-sm leading-relaxed mb-4 font-medium">
        {project.description}
      </p>
    </div>
    
    <div>
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.map((tag, i) => (
          // Tags: Filled jika aktif, Outline jika tidak
          <span key={i} className={`
            px-3 py-1 rounded-full text-xs font-bold transition-colors duration-300 border
            ${isActive 
              ? "bg-[#212842] text-[#F3EAE0] border-[#212842]" 
              : "bg-transparent text-[#212842]/60 border-[#212842]/20"
            }
          `}>
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-[#212842]/10 flex justify-between items-center">
        <span className="text-xs font-bold text-[#212842] tracking-wider uppercase">Focus</span>
        <span className="text-sm font-semibold text-[#212842]/80">{project.focus}</span>
      </div>
    </div>
  </motion.div>
);

// 2. Experience Row
const ExperienceRow = ({ role, org, period, desc }) => (
  <motion.div variants={itemFadeIn} className="relative pl-8 pb-10 border-l-2 border-[#212842]/20 last:pb-0 last:border-none">
    <div className="absolute -left-[6.5px] top-2 w-3 h-3 rounded-full bg-[#212842] ring-4 ring-[#F3EAE0]"></div>
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
      <h3 className="text-lg font-bold text-[#212842]">{role}</h3>
      <span className="text-xs font-mono text-[#F3EAE0] bg-[#212842] px-2 py-1 rounded font-bold">{period}</span>
    </div>
    <div className="text-sm font-bold text-[#212842]/80 mb-2">{org}</div>
    <p className="text-[#212842]/80 text-sm leading-relaxed max-w-2xl font-medium">
      {desc}
    </p>
  </motion.div>
);

// 3. Skill Badge (Interactive State)
const SkillBadge = ({ icon: Icon, name, index, isActive, onHover }) => (
  <motion.div 
    variants={itemFadeIn}
    onMouseEnter={() => onHover(index)} // Trigger pindah aktif
    className={`
      flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-300 cursor-default
      ${isActive 
        ? "bg-[#F3EAE0] border-[#212842] shadow-[4px_4px_0px_0px_#212842] -translate-y-1" // ACTIVE
        : "bg-[#F3EAE0]/50 border-[#212842]/10 text-[#212842]/60" // INACTIVE
      }
    `}
  >
    <Icon size={18} className={`transition-colors ${isActive ? "text-[#212842]" : "text-[#212842]/50"}`} />
    <span className={`text-sm font-bold ${isActive ? "text-[#212842]" : "text-[#212842]/70"}`}>{name}</span>
  </motion.div>
);

// --- MAIN APP COMPONENT ---

const App = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [scrolled, setScrolled] = useState(false);
  
  // STATE BARU: Melacak item mana yang aktif
  // Default: Project ID 1 dan Skill Index 0 (Python)
  const [activeProjectId, setActiveProjectId] = useState(1);
  const [activeSkillIndex, setActiveSkillIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- DATA ---
  const projects = [
    {
      id: 1,
      title: "Pizza Delivery Efficiency Analysis",
      category: "Data Analysis",
      description: "End-to-end analysis for a pizza restaurant case study. Performed data cleaning with Pandas, conducted EDA to identify purchasing patterns, and created visualizations to support business decision-making.",
      tags: ["Python", "Excel", "EDA", "Visualization"],
      focus: "Business Insights",
      icon: <BarChart3 size={24} />,
      link: "https://github.com/Muiz-Isman/Pizza-Delivery-Efficiency-Analysis.git" 
    },
    {
      id: 2,
      title: "Community Management System",
      category: "Web Dev",
      description: "Full-stack development for a church community internal project. Designed user-friendly UI/UX and integrated a database system for managing attendance data efficienty.",
      tags: ["UI/UX", "Frontend", "Database"],
      focus: "System Integration",
      icon: <Layout size={24} />,
      link: "https://github.com/Muiz-Isman/Growchildren-Management-System.git"
    },
    {
      id: 3,
      title: "Event Management System",
      category: "Web Dev",
      description: "Built a web-based platform for organizational activity management. Integrated registration systems with a database to store event information securely.",
      tags: ["PHP", "MySQL", "Web Programming"],
      focus: "Event Management",
      icon: <Code2 size={24} />,
      link: "https://github.com/Muiz-Isman/WebProg_Lec.git"
    },
    {
      id: 4,
      title: "Ultimagz Digital System",
      category: "Web Dev",
      description: "Managing and developing digital systems as Head of IT. Ensuring website content updates and maintenance using WordPress to keep appearance relevant.",
      tags: ["WordPress", "IT Management", "Leadership"],
      focus: "Digital Operations",
      icon: <Terminal size={24} />,
      link: "https://ultimagz.com/"
    }
  ];

  const skills = [
    { icon: Code2, name: "Python (Pandas, Matplotlib)" },
    { icon: Database, name: "SQL (JOIN, Aggregation)" },
    { icon: FileSpreadsheet, name: "Excel (Pivot, Lookup)" },
    { icon: Layout, name: "Figma (UI/UX)" },
    { icon: Terminal, name: "Web (PHP, React, Laravel)" },
    { icon: Mic, name: "Public Speaking" }
  ];

  const experiences = [
    {
      role: "Head of IT Department",
      org: "Ultimagz",
      period: "Nov 2024 - Present",
      desc: "Leading the IT division, coordinating the team in managing digital systems, and maintaining the organization's website to ensure optimal performance and up-to-date content."
    },
    {
      role: "Moderator",
      org: "KAMI UMN (Alumni Sharing Session)",
      period: "Sep 2025 - Oct 2025",
      desc: "Coordinated session flow, managed speaker transitions, and ensuring clear, structured communication for a professional online discussion environment."
    },
    {
      role: "Event Coordinator & MC",
      org: "Career Preparation 2025",
      period: "Jul 2025 - Sep 2025",
      desc: "Led the event division, coordinated with speakers and advisors, and served as Master of Ceremonies to ensure a smooth and engaging main event."
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  // Jika filter berubah, reset active project ke item pertama di filter tersebut
  useEffect(() => {
    if (filteredProjects.length > 0) {
      setActiveProjectId(filteredProjects[0].id);
    }
  }, [activeFilter]);

  const scrollAnimationProps = {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.2 },
    variants: staggerContainer
  };

  return (
    <div className="min-h-screen bg-[#F3EAE0] font-sans text-[#212842] selection:bg-[#212842] selection:text-[#F3EAE0] relative overflow-hidden">
      
      {/* Background Animation */}
      <motion.div 
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#212842]/5 rounded-full blur-3xl -z-10"
        animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#212842]/5 rounded-full blur-3xl -z-10"
        animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#F3EAE0]/90 backdrop-blur-md border-b border-[#212842]/10 py-4' : 'bg-transparent py-6'}`}
      >
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
         <a 
            href="#about"
            className="text-lg font-bold tracking-tighter flex items-center gap-2 hover:text-[#212842] transition-colors cursor-pointer"
          >
            <div className="w-3 h-3 bg-[#212842] rotate-45"></div>
            MU'IZ ISMAN
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-[#212842]/60">
            <a href="#about" className="hover:text-[#212842] transition-colors">About</a>
            <a href="#work" className="hover:text-[#212842] transition-colors">Projects</a>
            <a href="#experience" className="hover:text-[#212842] transition-colors">Experience</a>
            <a href="#contact" className="px-5 py-2 bg-[#212842] text-[#F3EAE0] rounded-lg hover:bg-[#212842]/90 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">Contact</a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <header id="about" className="pt-44 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div className="max-w-3xl" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#212842]/5 border border-[#212842]/20 mb-8">
              <span className="w-2 h-2 bg-[#212842] rounded-full"></span>
              <span className="text-xs font-bold text-[#212842] tracking-wide uppercase">Data Analyst & CS Student</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black tracking-tight text-[#212842] mb-8 leading-[1.1]">
              Translating Data into <br/>
              <span className="text-[#212842]/60">Clear Narratives.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-[#212842]/80 leading-relaxed max-w-2xl mb-10 font-medium">
              Hi, I'm <b>Muhammad Mu'iz Isman</b>. A 5th-semester Informatics student specializing in Data Analysis. 
              I combine technical skills in Python & SQL with strong communication abilities to bridge the gap between data and decision-making.
            </motion.p>
            
            {/* --- TOMBOL DIGANTI DI SINI --- */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <a href="#work" className="px-8 py-4 bg-[#212842] text-[#F3EAE0] rounded-xl font-bold hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(33,40,66,0.3)] transition-all flex items-center gap-2 group">
                View Projects
                <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
              </a>
              
              <a 
                href= "cv.pdf" // Pastikan file cv.pdf ada di folder public
                download="Muiz_Isman_CV.pdf"
                className="px-8 py-4 bg-transparent border-2 border-[#212842] text-[#212842] rounded-xl font-bold hover:bg-[#212842] hover:text-[#F3EAE0] transition-all flex items-center gap-2"
              >
                Download CV
                <Download size={20} />
              </a>
            </motion.div>
            {/* ----------------------------- */}

          </motion.div>
        </div>
      </header>

      {/* Stats */}
      <section className="py-12 px-6 border-y border-[#212842]/10 bg-[#212842]/5">
        <motion.div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8" {...scrollAnimationProps}>
          {[
            { label: "Semester", value: "5th" },
            { label: "Focus", value: "Data Analysis" },
            { label: "Location", value: "Tangerang" }
          ].map((stat, idx) => (
            <motion.div key={idx} variants={itemFadeIn} className="flex flex-col">
              <span className="text-3xl font-black text-[#212842] tracking-tight">{stat.value}</span>
              <span className="text-xs text-[#212842]/60 font-bold uppercase tracking-wider mt-1">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Skills (With Default Active Logic) */}
      <section className="py-24 px-6">
        <motion.div className="max-w-5xl mx-auto" {...scrollAnimationProps}>
          <motion.div variants={fadeInUp} className="mb-10">
            <h2 className="text-xl font-bold text-[#212842]">Technical Proficiency</h2>
          </motion.div>
          <motion.div variants={staggerContainer} className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <SkillBadge 
                key={index} 
                {...skill} 
                index={index}
                isActive={activeSkillIndex === index}
                onHover={setActiveSkillIndex}
              />
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Projects (With Default Active Logic) */}
      <section id="work" className="py-24 px-6 bg-[#212842]/5">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeInUp}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-[#212842] tracking-tight mb-4">Featured Projects</h2>
              <p className="text-[#212842]/70 max-w-md font-medium">
                A selection of my work in data analysis, web development, and system management.
              </p>
            </div>
            
            <div className="flex bg-[#F3EAE0] p-1.5 rounded-xl border border-[#212842]/20">
              {['All', 'Data Analysis', 'Web Dev'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                    activeFilter === filter 
                      ? 'bg-[#212842] text-[#F3EAE0] shadow-md' 
                      : 'text-[#212842]/60 hover:text-[#212842] hover:bg-[#212842]/10'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div key={activeFilter} className="grid grid-cols-1 md:grid-cols-2 gap-8" {...scrollAnimationProps}>
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                isActive={activeProjectId === project.id}
                onHover={setActiveProjectId}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16">
            <motion.div 
              className="md:w-1/3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-black text-[#212842] mb-6">Leadership & <br/>Organization</h2>
              <p className="text-[#212842]/70 mb-8 font-medium">
                Beyond code and data, I actively contribute to organizations, refining my leadership and communication skills.
              </p>
              <div className="p-6 bg-[#212842] rounded-2xl text-[#F3EAE0] text-sm shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
                <Briefcase className="text-[#F3EAE0] mb-3" size={24} />
                "I believe effective data analysis requires not just technical skills, but the ability to communicate insights clearly."
              </div>
            </motion.div>
            
            <motion.div className="md:w-2/3" {...scrollAnimationProps}>
              {experiences.map((exp, idx) => (
                <ExperienceRow key={idx} {...exp} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-24 px-6 border-t border-[#212842]/10 bg-[#212842]">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-[#F3EAE0] mb-8">Ready to Contribute</motion.h2>
          <motion.p variants={fadeInUp} className="text-[#F3EAE0]/80 mb-12 text-lg max-w-xl mx-auto">
            Currently committed to deepening my data analysis skills and ready to contribute in a data-driven corporate environment.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
             <a href="mailto:muizisman511@gmail.com" className="flex items-center justify-center gap-2 px-8 py-4 bg-[#F3EAE0] text-[#212842] rounded-full font-bold hover:bg-white transition-all shadow-[0_0_20px_rgba(243,234,224,0.3)] hover:-translate-y-1">
               <Mail size={18} />
               muizisman511@gmail.com
             </a>
             <a href="https://www.linkedin.com/in/muiz-isman" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-[#F3EAE0]/30 text-[#F3EAE0] rounded-full font-bold hover:bg-[#F3EAE0] hover:text-[#212842] transition-all">
               <Linkedin size={18} />
               LinkedIn Profile
             </a>
             <a href="https://github.com/Muiz-Isman" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-[#F3EAE0]/30 text-[#F3EAE0] rounded-full font-bold hover:bg-[#F3EAE0] hover:text-[#212842] transition-all">
               <Github size={18} />
               GitHub
             </a>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="text-[#F3EAE0]/40 text-sm flex flex-col items-center gap-2">
            <p>© {new Date().getFullYear()} Muhammad Mu'iz Isman.</p>
            <p className="text-xs opacity-60">Tangerang, Indonesia • +62813 1754 9621</p>
          </motion.div>
        </motion.div>
      </footer>

    </div>
  );
};

export default App;