import React from 'react';
import './App.css';
import { FaEnvelope, FaPhone, FaLinkedin, FaDownload, FaCode, FaServer, FaDatabase, FaCloud, FaBriefcase, FaGraduationCap, FaTrophy } from 'react-icons/fa';

function App() {
  const downloadResume = async () => {
    const backendUrl = '/resume/Gautham_Madhu_Resume (1).pdf';
    const fallbackUrl = '/Gautham_Madhu_Resume (1).pdf'; // from public folder

    try {
      // Try the backend URL first
      const response = await fetch(backendUrl, { method: 'HEAD' });
      if (response.ok) {
        window.open(backendUrl, '_blank');
      } else {
        // Fallback to public folder
        window.open(fallbackUrl, '_blank');
      }
    } catch (error) {
      // If backend is not available, use fallback
      window.open(fallbackUrl, '_blank');
    }
  };

  return (
    <div className="App">
      {/* Header Section */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="header-text">
              <h1 className="name">Gautham Madhu</h1>
              <p className="title">Senior Software Engineer</p>
              <p className="tagline">Full-Stack Development | React | Node.js | Python | Cloud Technologies | AWS</p>
            </div>
            <button className="download-btn" onClick={downloadResume}>
              <FaDownload /> Download Resume
            </button>
          </div>
          <div className="contact-info">
            <a href="mailto:gauthamchiral@gmail.com" className="contact-item">
              <FaEnvelope /> gauthamchiral@gmail.com
            </a>
            <a href="tel:+918281419893" className="contact-item">
              <FaPhone /> +91 8281419893
            </a>
            <a href="https://linkedin.com/in/gautham_madhu" target="_blank" rel="noopener noreferrer" className="contact-item">
              <FaLinkedin /> @gautham_madhu
            </a>
          </div>
        </div>
      </header>

      {/* Professional Summary */}
      <section className="section summary-section">
        <div className="container">
          <h2 className="section-title">Professional Summary</h2>
          <p className="summary-text">
            Results-driven Software Engineer with <strong>6.1+ years</strong> of expertise in full-stack development,
            specializing in React, Node.js, Python, and cloud technologies. Proven track record of delivering
            high-impact solutions for global enterprises in banking, finance, and e-commerce sectors. Expert in
            building scalable applications, optimizing system performance, and leading cross-functional teams to
            exceed project objectives. Currently pursuing M.Tech in AI/ML to stay at the forefront of emerging technologies.
          </p>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="section skills-section">
        <div className="container">
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <div className="skill-icon"><FaCode /></div>
              <h3>Languages</h3>
              <p>JavaScript/TypeScript (Expert), Python (Good), SQL (Good), Java</p>
            </div>
            <div className="skill-category">
              <div className="skill-icon"><FaCode /></div>
              <h3>Frontend</h3>
              <p>React & Redux (Expert), Angular, Next.js</p>
            </div>
            <div className="skill-category">
              <div className="skill-icon"><FaServer /></div>
              <h3>Backend</h3>
              <p>Node.js & Express (Good), Django (Good), REST & GraphQL APIs</p>
            </div>
            <div className="skill-category">
              <div className="skill-icon"><FaDatabase /></div>
              <h3>Databases</h3>
              <p>PostgreSQL, MongoDB, Oracle DB, InfluxDB</p>
            </div>
            <div className="skill-category">
              <div className="skill-icon"><FaCloud /></div>
              <h3>Cloud & DevOps</h3>
              <p>AWS (EC2, S3, Lambda), Docker & Kubernetes, CI/CD Pipelines</p>
            </div>
            <div className="skill-category">
              <div className="skill-icon"><FaCode /></div>
              <h3>Tools</h3>
              <p>Git & GitHub, JIRA & Confluence, Grafana & Prometheus</p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <section className="section experience-section">
        <div className="container">
          <h2 className="section-title"><FaBriefcase /> Professional Experience</h2>

          <div className="experience-item">
            <div className="experience-header">
              <div>
                <h3>Senior Software Engineer</h3>
                <p className="company">Triassic Solutions Pvt Ltd</p>
              </div>
              <p className="duration">July 2023 – Present</p>
            </div>
            <div className="project">
              <h4>Clinch – AI-Driven Sales Platform</h4>
              <p>
                Led full-stack development using Node.js and React.js. Architected and deployed an enterprise
                sales application with seamless third-party integrations including Salesforce, LinkedIn, Outlook,
                and Gmail. Implemented AI-driven email automation and intelligent sales workflows that increased
                team productivity by streamlining prospect engagement and follow-up processes.
              </p>
            </div>
            <div className="project">
              <h4>e-Boost – EV Charging Management System</h4>
              <p>
                Developed comprehensive full-stack solution with React.js, Retool, and Django for end-to-end EV
                infrastructure management. Built real-time monitoring dashboards with MQTT-based actuation for
                charging stations, solar panels, and backup generators. Implemented data visualization for power
                metrics, fuel levels, and energy output, enabling operators to optimize resource allocation and
                reduce downtime.
              </p>
            </div>
          </div>

          <div className="experience-item">
            <div className="experience-header">
              <div>
                <h3>Technology Analyst</h3>
                <p className="company">Infosys Limited</p>
              </div>
              <p className="duration">November 2019 – July 2023</p>
            </div>
            <div className="project">
              <h4>HSBC Global Trade & Receivable Finance (GTRF)</h4>
              <p>
                Developed comprehensive UI for loan booking and verification workflows, enhancing operational
                efficiency for global trade finance operations. Collaborated with cross-functional teams to
                implement secure, compliant financial transaction processing, serving clients across multiple regions.
              </p>
            </div>
            <div className="project">
              <h4>HSBC G3 Application Suite</h4>
              <p>
                Built intuitive UI for automated internal deployment tool leveraging Ansible and DBAi, streamlining
                deployment processes and reducing manual intervention. Enhanced CI/CD workflows that significantly
                decreased deployment time and improved release reliability.
              </p>
            </div>
            <div className="project">
              <h4>HSBC CDSS – Confluence Data Scan Solution</h4>
              <p>
                Created sophisticated UI for automated data issue detection, flagging, and user assignment workflows
                on Confluence. Improved data quality management by enabling teams to quickly identify, track, and
                resolve data inconsistencies across enterprise documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="section achievements-section">
        <div className="container">
          <h2 className="section-title"><FaTrophy /> Key Achievements</h2>
          <ul className="achievements-list">
            <li>
              Successfully delivered enterprise-grade applications for HSBC, one of the world's largest banking
              institutions, ensuring compliance with stringent financial regulations and security standards.
            </li>
            <li>
              Architected and implemented real-time IoT monitoring solutions processing data from multiple sources
              including EV chargers, solar panels, and generators using MQTT protocol.
            </li>
            <li>
              Integrated multiple third-party APIs (Salesforce, LinkedIn, Gmail, Outlook) into unified platforms,
              enhancing business workflow automation and user productivity.
            </li>
            <li>
              Mentored junior developers and conducted code reviews to maintain high code quality standards and
              promote best practices across development teams.
            </li>
          </ul>
        </div>
      </section>

      {/* Education */}
      <section className="section education-section">
        <div className="container">
          <h2 className="section-title"><FaGraduationCap /> Education</h2>
          <div className="education-grid">
            <div className="education-item">
              <h3>Master of Technology (M.Tech) – AI/ML</h3>
              <p className="institution">BITS Pilani (WILP)</p>
              <p className="status">Currently Pursuing</p>
            </div>
            <div className="education-item">
              <h3>Bachelor of Technology (B.Tech)</h3>
              <p className="institution">APJ Abdul Kalam Technological University, Kerala</p>
              <p className="details">Electrical and Electronics Engineering | 2015 – 2019 | CGPA: 7.43</p>
            </div>
            <div className="education-item">
              <h3>Higher Secondary Education</h3>
              <p className="institution">St. Peters Senior Secondary School, Kerala</p>
              <p className="details">89.6% (CBSE)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 Gautham Madhu. All rights reserved.</p>
          <p>Location: Chiral(H), Kadayiruppu PO, Ernakulam, Kerala 682311</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
