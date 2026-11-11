import express from 'express';
import { initialCareers, initialCourses } from '../seedData.js';

const router = express.Router();

// AI Career Counselor endpoint
router.post('/counselor', async (req, res) => {
  try {
    const { message, history, context } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    const q = message.toLowerCase().trim();

    // Check if an external AI API key is configured (e.g., GEMINI_API_KEY)
    if (process.env.GEMINI_API_KEY) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [
                    {
                      text: `You are an expert, encouraging Academic & Career Counselor for the Career Guidance Application.
Provide clear, structured, encouraging guidance to students on courses, qualifications, career roadmaps, entrance exams (like JEE, NEET, UPSC, CA, CUET), skills, and future opportunities.
User question: "${message}"`
                    }
                  ]
                }
              ]
            })
          }
        );
        const data = await response.json();
        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (aiText) {
          return res.json({ success: true, reply: aiText, source: 'gemini' });
        }
      } catch (geminiErr) {
        console.warn('Gemini API call failed, falling back to built-in knowledge counselor:', geminiErr.message);
      }
    }

    // Built-in intelligent AI Counselor Knowledge Engine
    let reply = '';

    if (q.includes('software') || q.includes('coding') || q.includes('developer') || q.includes('computer science') || q.includes('bca') || q.includes('b.tech')) {
      reply = `**Career Pathway: Software Development & Computer Science** 💻

Here is a recommended roadmap:
1. **Academic Stream**: Take Physics, Chemistry & Mathematics (PCM) in 10+2.
2. **Degrees**: Pursue a **B.Tech in CSE / IT** or a **BCA (Bachelor of Computer Applications)** followed by an MCA.
3. **Core Programming Skills**:
   - Master **JavaScript / TypeScript** & **Python**.
   - Build responsive web apps using **React** and **Node.js**.
   - Learn relational database modeling with **PostgreSQL (Neon)**.
4. **Key Milestones**:
   - Master Data Structures & Algorithms (LeetCode / CodeChef).
   - Maintain an active GitHub profile with at least 3 production-grade full-stack projects.
   - Target summer internships during your 3rd year.
5. **Top Recruiters**: Google, Microsoft, Infosys, TCS, Swiggy, Zomato, Razorpay.
*Starting salary typically ranges from ₹5.5 LPA to ₹15+ LPA!*`;
    } else if (q.includes('ai') || q.includes('machine learning') || q.includes('artificial intelligence') || q.includes('data science')) {
      reply = `**Career Pathway: Artificial Intelligence & Machine Learning** 🤖

To excel in AI / Data Science:
1. **Mathematical Foundation**: Build a strong foundation in Linear Algebra, Multivariable Calculus, and Probability & Statistics.
2. **Core Tools**:
   - **Python** (NumPy, Pandas, Scikit-learn, PyTorch).
   - SQL querying and Vector Databases for Retrieval Augmented Generation (RAG).
3. **Recommended Courses**:
   - B.Tech in Artificial Intelligence / Data Science or B.Sc in Statistics/Mathematics.
   - Specialized certifications in Deep Learning & LLMs.
4. **Career Progression**:
   - Start as a **Junior Data Analyst / ML Intern**.
   - Grow into an **AI Engineer**, **MLOps Architect**, or **AI Research Scientist**.
*Average starting salaries range from ₹7 LPA to ₹18+ LPA!*`;
    } else if (q.includes('doctor') || q.includes('medical') || q.includes('neet') || q.includes('mbbs') || q.includes('healthcare')) {
      reply = `**Career Pathway: Medicine & Healthcare (MBBS / MD)** 🩺

1. **High School Requirement**: 10+2 with Physics, Chemistry, and Biology (PCB).
2. **Entrance Exam**: Clear **NEET-UG** with a competitive percentile for government medical colleges.
3. **Course Duration**: 5.5 years (4.5 years academic coursework + 1 year mandatory rotational hospital internship).
4. **Specialization**: Clear **NEET-PG** to pursue MD (Doctor of Medicine) or MS (Master of Surgery) in Cardiology, Pediatrics, Neurology, or Orthopedics.
5. **Key Institutions**: AIIMS New Delhi, CMC Vellore, Gauhati Medical College, Assam Medical College.
*Medicine is a noble, highly respected, and evergreen vocation with lifelong societal impact!*`;
    } else if (q.includes('upsc') || q.includes('ias') || q.includes('ips') || q.includes('civil service') || q.includes('government')) {
      reply = `**Career Pathway: Indian Administrative & Civil Services (IAS / IPS)** 🏛️

1. **Eligibility**: Graduation in any discipline from a recognized university (minimum 21 years old).
2. **Examination Stages (UPSC CSE)**:
   - **Prelims**: GS Paper I + CSAT (Qualifying).
   - **Mains**: 9 written papers (Essay, GS 1-4, Optional Subject Papers 1 & 2).
   - **Personality Test (Interview)**: Conducted at Dholpur House, New Delhi.
3. **Preparation Strategy**:
   - Master NCERT textbooks (Class 6-12) for History, Geography, Polity & Economics.
   - Read 'The Hindu' or 'The Indian Express' daily for current affairs.
   - Practice daily answer-writing with structured headings and diagrams.
4. **Career Impact**: Direct administrative leadership over districts, shaping socio-economic policies, public health, and education infrastructure!`;
    } else if (q.includes('ca') || q.includes('chartered accountant') || q.includes('finance') || q.includes('banking') || q.includes('commerce')) {
      reply = `**Career Pathway: Chartered Accountancy (ICAI)** 📊

1. **Registration**: Can register after Class 10/12 with the Institute of Chartered Accountants of India (ICAI).
2. **Three-Tier Process**:
   - **CA Foundation**: 4 foundational papers covering Accounting, Law, and Quantitative Aptitude.
   - **CA Intermediate**: 8 advanced papers + mandatory Information Technology & Soft Skills training.
   - **Articleship**: 2 years of rigorous practical training under a practicing CA firm.
   - **CA Final**: Advanced financial reporting, strategic financial management, and corporate tax laws.
3. **Career Options**: Statutory Auditor, Tax Advisory, Forensic Accounting, CFO, or independent consulting firm.
*CA is among the most prestigious financial qualifications worldwide!*`;
    } else if (q.includes('design') || q.includes('ui') || q.includes('ux') || q.includes('graphic') || q.includes('creative')) {
      reply = `**Career Pathway: UI/UX & Digital Product Design** 🎨

1. **Educational Foundation**: Bachelor of Design (B.Des), Fine Arts, or self-taught with a design portfolio.
2. **Core Design Stack**:
   - Master **Figma** (auto-layout, components, interactive prototypes).
   - Study UX Laws (Fitts's Law, Hick's Law), Color Theory, and Typography.
3. **Building Your Portfolio**:
   - Showcase 2 to 3 detailed case studies solving real user friction points.
   - Document user research, empathy maps, wireframes, and final high-fidelity UI.
4. **Target Roles**: UI/UX Designer, Visual Brand Designer, Design Systems Architect.
*Designers who understand user psychology and modern product mechanics are in high global demand!*`;
    } else if (q.includes('after 10th') || q.includes('class 10') || q.includes('stream selection')) {
      reply = `**Stream Selection Guidance After Class 10th** 🧭

Choosing your stream depends on your natural strengths and long-term career aspirations:
1. **Science (PCM)**: Best for Engineering, Software Development, Architecture, Defense (NDA), and Aviation.
2. **Science (PCB)**: Best for Medicine (MBBS, BDS), Pharmacy, Biotechnology, Nursing, and Agriculture.
3. **Commerce (with/without Math)**: Best for Chartered Accountancy (CA), Investment Banking, Corporate Management (BBA/MBA), and FinTech.
4. **Arts / Humanities**: Best for Civil Services (UPSC), Law (CLAT), Journalism & Mass Media, Psychology, Teaching, and Design.

Take our **Career Assessment Quiz** on this platform to discover which domain matches your cognitive traits!`;
    } else {
      reply = `**Career Guidance Advisory** 🌟

Thank you for your question! To give you the most tailored recommendation:
- **Explore Categories**: Browse our 10 curated categories (Information Technology, Engineering, Medical, Civil Services, Finance, Design, Science, and more).
- **Take the Career Assessment**: Complete our 8-question aptitude quiz to receive your personalized fit score and top matched career options.
- **Check Course Pathways**: Discover eligibility criteria, top colleges, and entrance exams for Bachelor degrees and professional certifications.

What specific subject or field would you like to explore deeper? You can ask me about **Software Engineering**, **Medicine/NEET**, **Civil Services/UPSC**, **Chartered Accountancy**, or **UI/UX Design**!`;
    }

    return res.json({ success: true, reply, source: 'knowledge_engine' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

