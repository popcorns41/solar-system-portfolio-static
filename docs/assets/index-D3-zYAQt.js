(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function i(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(n){if(n.ep)return;n.ep=!0;const a=i(n);fetch(n.href,a)}})();const L="modulepreload",P=function(e){return"/"+e},b={},k=function(t,i,r){let n=Promise.resolve();if(i&&i.length>0){let s=function(o){return Promise.all(o.map(p=>Promise.resolve(p).then(c=>({status:"fulfilled",value:c}),c=>({status:"rejected",reason:c}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),d=l?.nonce||l?.getAttribute("nonce");n=s(i.map(o=>{if(o=P(o),o in b)return;b[o]=!0;const p=o.endsWith(".css"),c=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${c}`))return;const m=document.createElement("link");if(m.rel=p?"stylesheet":L,p||(m.as="script"),m.crossOrigin="",m.href=o,d&&m.setAttribute("nonce",d),document.head.appendChild(m),p)return new Promise((S,_)=>{m.addEventListener("load",S),m.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${o}`)))})}))}function a(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return n.then(s=>{for(const l of s||[])l.status==="rejected"&&a(l.reason);return t().catch(a)})},E={camera:{x:-175,y:115,z:5,fov:45},radius:697/40*1.7,elevation:45};function I(e){const{camera:t,radius:i,elevation:r}=E,n=Math.hypot(t.x,t.y,t.z),a=Math.hypot(t.x,t.z),s=r*a/n,l=n-r*t.y/n,d=l*l-i*i,o=e/(2*Math.tan(t.fov*Math.PI/360)),p=i*Math.sqrt(s*s+d),c=o*(s*l+p)/d,m=o*(s*l-p)/d;return{top:e/2-c,width:2*o*i/Math.sqrt(d),height:c-m}}function R(e){const t=()=>{const r=I(e.getBoundingClientRect().height);for(const[n,a]of Object.entries(r))e.style.setProperty(`--sun-${n}`,`${a}px`)};t();const i=new ResizeObserver(t);i.observe(e),window.addEventListener("portfolioEntered",()=>i.disconnect(),{once:!0})}const f=[{title:"Contact me",subtitles:[""],paragraphs:["The Sun is the star at the center of our solar system.","It provides the light and heat necessary for life on Earth."],imageURLs:["",""],imageKeys:["",""],imageDescription:["",""],videos:[]},{title:"Experience",subtitles:["Step Programme Overview","Salex LTD","",""],paragraphs:["The Step Programme (<a href='https://www.iomdfenterprise.im/enterprise-support/all-schemes/step-programme/' target='_blank'>Listed here</a>) is an eight-week paid summer placement run by the Isle of Man Department for Enterprise for university students, typically in their second or penultimate year. Students work on project-based tasks with local host companies, gaining professional experience and earning a Living Wage. The programme concludes with a report and presentation to a judging panel, with awards for the best projects. I was placed at Salex LTD in Castletown, Isle of Man, and received the award for best presentation (see Image 2).","Salex LTD (<a href='https://www.salexltd.com/' target='_blank'>listed here</a>)  handles West African commodity trading across regions from Tanzania to Zimbabwe. The organisation and its sister companies previously relied on a legacy process involving Excel spreadsheets and phone calls to track logistics, a system that was error-prone and inefficient. To modernise operations, a web application called FUATA was developed as a centralised platform for managing all shipments handled by Salex LTD.","During my 2023 summer internship, my contributions included: Leading user training sessions to onboard staff onto the new system. Designing wireframes for key modules based on user and stakeholder needs, and engineering automated file workflows using Microsoft Power Automate.","This experience marked my first exposure to software maintenance, including attending developer meetings, engaging with ticket-based workflows, and aligning my deliverables with developer sprint cycles."],imageURLs:["./info_images/stepProgramme.jpeg","./info_images/SalexLTD.jpeg"],imageKeys:["stepProgramme","salexLTD"],imageDescription:["Photo of all members of Step Programme 2023","Award ceremony - receiving the best presentation award"],videos:[{key:"Video 1",type:"iframe",url:"https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2F3FMradio%2Fvideos%2F746133027320019%2F&show_text=false&width=476&t=0",description:"2023 STEP programme interview with me"}]},{title:"I am blank",subtitles:[],paragraphs:["Hi if you're seeing this, I appreciate you reading the documentation :)","Have a great day, love <3"],imageURLs:[""],imageKeys:[""],imageDescription:["",""],videos:[]},{title:"Robotics",subtitles:["Overview","Reflection"],paragraphs:["Working with the University of Edinburgh's maker space and a strong team of peers, we built a robot that plays pool on a half-scale table. The semester-long project combined several engineering disciplines. We divided the robot's systems into key modules: electrical, robotic, computer vision and camera (see Image 2), structural support, and a mobile web app for user input. In a typical use case, the web app shows a real-time view of the pool balls and prompts the user to take a shot. The robot, which we called Pool Pal, then attempts to replicate that shot. At the end of the project, our robot could successfully pot pool balls at an impressive accuracy (see Video 1). I was responsible for designing, testing, and assembling the robotic system, which consisted of two main components: the gantry and the striking mechanism.","Our design was well-received by the judges: out of 16 teams, we won the <b>Best Technical Skills Project award</b> and placed <b>second overall</b> at a university-hosted competition. Teamwork was critical to our success. With members collaborating across multiple systems, clear and consistent communication was essential. One example was calibrating the gantry system's sensors, which helped manage the loss of timing belt tension over time. Solving this problem required close collaboration between the electrical lead and me, as we combined our efforts to tackle the issue effectively."],imageURLs:["./info_images/poolpallRobot.jpeg","./info_images/cv_model.jpeg","./info_images/poolPalApp.png"],imageKeys:["ppRobot","cvModel","poolPalApp"],imageDescription:["Pool Pal in idle position","OpenCV Model utilised in tracking and determining cue ball position","Pool Pal web application UI'"],videos:[{key:"poolpalShot",type:"youtube",url:"https://youtube.com/shorts/DzKbvQ7KY5g?si=_X_gQl-VDSMWCPVM",description:"Pool Pal in operation"}]},{title:"Extracurricular",subtitles:["Basketball","Hospitality"],paragraphs:["Outside of tech, I'm both a player and coach with the Edinburgh University Basketball Club. Coaching has strengthened my leadership, communication, and strategic planning. Skills that translate directly to computer science, especially when working in teams, adapting under pressure, and staying disciplined through intensive training and competition.","Alongside my studies, I've worked part-time at Ka Pao Edinburgh for three years, training in both front-of-house and bartending. The role sharpened my ability to multitask, communicate clearly, and stay calm under pressure. These skills carry directly into computer science, from team collaboration to debugging under tight deadlines."],imageURLs:["./info_images/floorGeneral.jpeg","./info_images/kaPaoTeam.jpeg"],imageKeys:["floorGeneral",".kpTeam"],imageDescription:["Basketball scrimmage at Pleasance Gym, Edinburgh","Photo of the team at Ka Pao Edinburgh"],videos:[]},{title:"Childhood",subtitles:["Robotic competitions","Introduction to programming"],paragraphs:["Between 2015 and 2018, I took part in regional robotics competitions across Thailand, including the World Robotics Olympiad (<a href='https://wro-association.org/' target='_blank'>WRO</a>), which brings together students to solve LEGO Mindstorm challenges. The prompts ranged from building home appliance robots to tackling unpredictable terrain, pushing us to think creatively under pressure. These early years introduced me to the world of robotics: programming sensors, engineering moving parts, and the basics of robotic localisation. Our team won several regional prizes, and while we didn’t quite reach the international stage, the experience sparked a lasting passion for building and problem-solving.","During my early robotics training, I began with block-based programming environments like LEGO Mindstorms NXT-G, which helped me grasp fundamental logic and control flow. As I took on more complex challenges, I transitioned to writing JavaScript scripts to directly control robot behaviour. A shift that gave me greater flexibility and precision. Learning JavaScript through robotics sparked my curiosity in applying it beyond physical machines, making the leap to web development feel natural. The language that once powered my robots soon became the tool I used to build interactive websites and creative digital experiences."],imageURLs:["./info_images/childhoodRobot.jpeg","./info_images/robotAssemblyChildhood.jpg"],imageKeys:["cRobot",".rAssemblyChildhood"],imageDescription:["Home appliance robot for WRO competition","Assembly of Robot with peers"],videos:[]},{title:"About me",subtitles:["Who am I?","What is this website?"],paragraphs:["Hello, my name is Oliver! I am a fourth-year student of BEng Computer Science at the University of Edinburgh. With over eight years of experience in IT, both personally and academically, I'm eager to apply my skills in a real-world environment, learn from experienced engineers, and contribute to impactful projects. I'm a fast learner, naturally collaborative, and focused on delivering value wherever I can. My main interests lie in robotics and software systems design and development, areas where I've earned recognition and awards (see Image 1 and Image 2).","This personal portfolio website was a personal project to reimagine site navigation through a fully interactive 3D solar system. Each planet acts as a portal to different sections of the portfolio. Built with Vite and Three.js, the project aims to showcase my web development skills, combined with a new area of technology for me in 3D modelling to create a visually engaging and unconventional user experience. The project showcases proficiency in JavaScript, modular design, event-driven interactions, and creative UI/UX thinking. I invite you to explore the GitHub repository for this project:<a href='https://github.com/popcorns41/solar-system-portfolio'target='_blank' rel='noopener noreferrer'>here</a>to browse this project's inspiration and current development stage."],imageURLs:["./info_images/stepHandShake.jpg","./info_images/poolPalGroup.jpg"],imageKeys:["stepHandShake","ppGroup"],imageDescription:["Award ceremony for internship programme (further details see<a href='#panel-1'>here</a>)","Group photo during robotics fair (further details see <a href='#panel-3'>here</a>)"],videos:[]}],T={"./info_images/SalexLTD.jpeg":{width:632,height:625,variants:[{url:"./info_images/optimised/SalexLTD-480.webp",width:480},{url:"./info_images/optimised/SalexLTD-632.webp",width:632}]},"./info_images/childhoodRobot.jpeg":{width:1170,height:866,variants:[{url:"./info_images/optimised/childhoodRobot-480.webp",width:480},{url:"./info_images/optimised/childhoodRobot-960.webp",width:960},{url:"./info_images/optimised/childhoodRobot-1170.webp",width:1170}]},"./info_images/cv_model.jpeg":{width:1529,height:1664,variants:[{url:"./info_images/optimised/cv_model-480.webp",width:480},{url:"./info_images/optimised/cv_model-960.webp",width:960},{url:"./info_images/optimised/cv_model-1440.webp",width:1440}]},"./info_images/floorGeneral.jpeg":{width:1280,height:853,variants:[{url:"./info_images/optimised/floorGeneral-480.webp",width:480},{url:"./info_images/optimised/floorGeneral-960.webp",width:960},{url:"./info_images/optimised/floorGeneral-1280.webp",width:1280}]},"./info_images/kaPaoTeam.jpeg":{width:1600,height:1200,variants:[{url:"./info_images/optimised/kaPaoTeam-480.webp",width:480},{url:"./info_images/optimised/kaPaoTeam-960.webp",width:960},{url:"./info_images/optimised/kaPaoTeam-1440.webp",width:1440}]},"./info_images/poolPalApp.png":{width:2856,height:1488,variants:[{url:"./info_images/optimised/poolPalApp-480.webp",width:480},{url:"./info_images/optimised/poolPalApp-960.webp",width:960},{url:"./info_images/optimised/poolPalApp-1440.webp",width:1440}]},"./info_images/poolPalGroup.jpg":{width:1200,height:1200,variants:[{url:"./info_images/optimised/poolPalGroup-480.webp",width:480},{url:"./info_images/optimised/poolPalGroup-960.webp",width:960},{url:"./info_images/optimised/poolPalGroup-1200.webp",width:1200}]},"./info_images/poolpallRobot.jpeg":{width:4032,height:3024,variants:[{url:"./info_images/optimised/poolpallRobot-480.webp",width:480},{url:"./info_images/optimised/poolpallRobot-960.webp",width:960},{url:"./info_images/optimised/poolpallRobot-1440.webp",width:1440}]},"./info_images/robotAssemblyChildhood.jpg":{width:960,height:720,variants:[{url:"./info_images/optimised/robotAssemblyChildhood-480.webp",width:480},{url:"./info_images/optimised/robotAssemblyChildhood-960.webp",width:960}]},"./info_images/stepHandShake.jpg":{width:687,height:584,variants:[{url:"./info_images/optimised/stepHandShake-480.webp",width:480},{url:"./info_images/optimised/stepHandShake-687.webp",width:687}]},"./info_images/stepProgramme.jpeg":{width:800,height:800,variants:[{url:"./info_images/optimised/stepProgramme-480.webp",width:480},{url:"./info_images/optimised/stepProgramme-800.webp",width:800}]}},w={download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',robot:'<rect x="4" y="7" width="16" height="14" rx="3"/><path d="M12 3v4M1 12h3m16 0h3M8 16h8"/><circle cx="8" cy="11" r="1"/><circle cx="16" cy="11" r="1"/>',signal:'<path d="m8 21 4-10 4 10M8 6a6 6 0 0 0 0 9m8-9a6 6 0 0 1 0 9M5 3a10 10 0 0 0 0 15M19 3a10 10 0 0 1 0 15"/>',linkedin:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7m0-10v.1M11 17v-7m0 3a3 3 0 0 1 6 0v4"/>',github:'<path d="M9 19c-4 1-4-2-6-2m12 5v-4c0-1-.3-1.6-.8-2 3-.3 6-1.5 6-6 0-1.3-.5-2.5-1.3-3.4.2-1 .1-2.3-.3-3.4-1.4 0-3 .8-4 1.5a13 13 0 0 0-6 0C7.6 4 6 3.2 4.6 3.2c-.4 1.1-.5 2.4-.3 3.4C3.5 7.5 3 8.7 3 10c0 4.5 3 5.7 6 6-.5.4-.8 1-.8 2v4"/>'};function u(e){return`<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${w[e]||w.robot}</svg>`}function D(e){const t=()=>{if(document.getElementById("skill-icon-styles"))return;const r=document.createElement("link");r.id="skill-icon-styles",r.rel="stylesheet",r.href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/devicon.min.css",document.head.appendChild(r)};if(!("IntersectionObserver"in window))return t();const i=new IntersectionObserver(([r])=>{r.isIntersecting&&(t(),i.disconnect())},{rootMargin:"200px 0px"});i.observe(e)}const M=[{name:"Python/MicroPython",icon:"devicon-python-plain"},{name:"Java",icon:"devicon-java-plain"},{name:"JavaScript",icon:"devicon-javascript-plain"},{name:"C++",icon:"devicon-cplusplus-plain"},{name:"PHP",icon:"devicon-php-plain"},{name:"SQL",icon:"devicon-mysql-plain"}],C=[{name:"Git",icon:"devicon-git-plain"},{name:"VS Code",icon:"devicon-vscode-plain"},{name:"IntelliJ",icon:"devicon-intellij-plain"},{name:"ROS",icon:"devicon-ros-original"},{name:"Spring Boot",icon:"devicon-spring-original"},{name:"Docker",icon:"devicon-docker-plain"}],j=[{name:"Kinematics",icon:"fa-solid fa-robot"},{name:"LiDAR",icon:"fa-solid fa-broadcast-tower"},{name:"TurtleBots",icon:"devicon-ros-original"},{name:"Arduino",icon:"devicon-arduino-plain"}];function A(e,t=!1){const i=e.querySelector("#contactForm"),r=i?.querySelector(".infoButton");!i||!r||i.dataset.bound!=="true"&&(i.dataset.bound="true",i.addEventListener("submit",async n=>{if(n.preventDefault(),r.disabled=!0,r.textContent="Sending...",!t){y("✅ Fake Message sent! I will get back to you soon."),r.textContent="Sent 🚀",setTimeout(()=>{i.reset(),r.disabled=!1,r.textContent="Send Message"},3e3);return}try{const{default:a}=await k(async()=>{const{default:s}=await import("./index-CSgyHkap.js");return{default:s}},[]);a.init("ACoKUgfKR7FJkFXTT"),await a.sendForm("service_3dr8znx","template_wpa42ci",i),y("✅ Message sent! I will get back to you soon."),i.reset()}catch(a){console.error("FAILED...",a),alert("Message failed to send. Please try again later.")}finally{r.disabled=!1,r.textContent="Send Message"}}))}function y(e){const t=document.getElementById("toast");t.textContent=e,t.classList.add("show"),setTimeout(()=>t.classList.remove("show"),4e3)}function $(e,t){t.style.overflowY="auto",t.innerHTML=`
    <h1>${e.title}</h1>
    <hr style="border: none; border-top: 1px solid #ccc; margin-top: 1rem;" />
    ${e.paragraphs.map((i,r)=>`
      <h3 style="padding: 1rem 0 0.5rem 0;">${e.subtitles[r]}</h3>
      <p>${i}</p>
    `).join("")}
  `}function B(e){try{const t=new URL(e);if(t.hostname.includes("youtube.com")&&t.pathname.startsWith("/shorts/")){const i=t.pathname.split("/shorts/")[1].split(/[?/]/)[0];return i?`https://www.youtube.com/embed/${i}`:e}if(t.hostname.includes("youtube.com")){const i=t.searchParams.get("v");if(i)return`https://www.youtube.com/embed/${i}`}if(t.hostname==="youtu.be"){const i=t.pathname.slice(1).split(/[?/]/)[0];return i?`https://www.youtube.com/embed/${i}`:e}}catch{}return e}function O(e){try{const t=new URL(e);return t.hostname.includes("youtube.com")||t.hostname==="youtu.be"}catch{return!1}}function H(e,t){t.style.overflowY="auto",t.innerHTML="";const i=e.imageURLs||[],r=e.videos||[];i.forEach((n,a)=>{const s=document.createElement("div");s.id=`${e.title.replace(/\s+/g,"-").toLowerCase()}-image${a+1}`,s.style.marginBottom="1.5rem";const l=new Image;l.loading="lazy",l.decoding="async";const d=T[n];d?(l.width=d.width,l.height=d.height,l.srcset=d.variants.map(m=>`${m.url} ${m.width}w`).join(", "),l.sizes="(max-width: 740px) calc(100vw - 80px), (max-width: 900px) 650px, (max-width: 1440px) 45vw, 660px",l.src=d.variants[0].url):l.src=n,l.alt=`${e.title} Image ${a+1}`,l.style.width="100%",l.style.borderRadius="10px",s.appendChild(l);const o=document.createElement("p");o.style.margin="2rem 0",o.style.fontSize="0.9rem",o.innerHTML=`Image ${a+1}: ${e.imageDescription?.[a]||""}`,s.appendChild(o);const p=a<i.length-1,c=r.length>0;(p||c)&&v(s),t.appendChild(s)}),r.forEach((n,a)=>{const s=document.createElement("div");s.id=`${e.title.replace(/\s+/g,"-").toLowerCase()}-video${a+1}`,s.style.marginBottom="1.5rem";const l=n.url||"",d=n.type==="youtube"||O(l);let o;if(d){const c=B(l);o=document.createElement("iframe"),o.src=`${c}?rel=0&modestbranding=1`,o.width="100%",o.style.border="none",o.style.overflow="hidden",o.style.borderRadius="10px",o.loading="lazy",o.setAttribute("referrerpolicy","strict-origin-when-cross-origin"),o.setAttribute("allowfullscreen","true"),o.setAttribute("allow","autoplay; encrypted-media; picture-in-picture")}else if(n.type==="iframe")o=document.createElement("iframe"),o.src=l,o.width="100%",o.style.border="none",o.style.overflow="hidden",o.style.borderRadius="10px",o.loading="lazy",o.setAttribute("scrolling","no"),o.setAttribute("frameborder","0"),o.setAttribute("allowfullscreen","true"),o.setAttribute("referrerpolicy","strict-origin-when-cross-origin"),o.setAttribute("allow","autoplay; encrypted-media; picture-in-picture");else{o=document.createElement("video"),o.controls=!0,o.preload="metadata",n.poster&&(o.poster=n.poster),o.style.width="100%",o.style.borderRadius="10px";const c=document.createElement("source");c.src=l,c.type=n.mimeType||"video/mp4",o.appendChild(c)}o.classList.add("media-video"),d&&l.includes("/shorts/")?o.classList.add("media-video--portrait"):n.type==="iframe"&&o.classList.add("media-video--social"),o.tagName==="IFRAME"&&(o.title=n.description||`${e.title} video ${a+1}`),s.appendChild(o);const p=document.createElement("p");if(p.style.margin="0.5rem 0",p.style.fontSize="0.9rem",p.innerHTML=`Video ${a+1}: ${n.description||""}`,s.appendChild(p),d||n.type==="iframe"){const c=document.createElement("a");c.href=l,c.target="_blank",c.rel="noopener noreferrer",c.textContent="Open video in a new tab",c.style.display="inline-block",c.style.marginBottom="0.75rem",s.appendChild(c)}a<r.length-1&&v(s),t.appendChild(s)})}function F(e){e.style.overflowY="auto",e.innerHTML=`
    <h1>Contact Me</h1>
    <hr style="border: none; border-top: 1px solid #ccc; margin-top: 1rem; padding-bottom: 2rem" />
    <div class="contact-icons" style="display: flex; justify-content: center; gap: 3rem; margin-bottom: 2rem;">
      <div style="text-align: center;">
        <a href="https://www.linkedin.com/in/oliver-hill-7143b3110/" id="linkedin-icon" aria-label="LinkedIn" class="contact-icon" target="_blank" rel="noopener noreferrer" style="color: white;">
          <span style="font-size: 2.5rem;">${u("linkedin")}</span>
        </a>
      </div>
      <div style="text-align: center;">
        <a href="https://github.com/popcorns41" id="github-icon" aria-label="GitHub" class="contact-icon" target="_blank" rel="noopener noreferrer" style="color: white;">
          <span style="font-size: 2.5rem;">${u("github")}</span>
        </a>
      </div>
    </div>

    <hr style="border: none; border-top: 1px solid #ccc; margin: 2rem 0;" />

    <form id="contactForm" name="contact_form" style="display: flex; flex-direction: column; gap: 1rem;" method="post" action="#">
  <input 
    type="text" 
    name="user_name" 
    placeholder="Your Name" 
    required
    style="padding: 0.75rem; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem;" 
  />
  
  <input 
    type="email" 
    name="user_email" 
    placeholder="Your Email" 
    required
    style="padding: 0.75rem; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem;" 
  />
  
  <textarea 
    name="message" 
    placeholder="Your Message" 
    rows="5" 
    required
    style="padding: 0.75rem; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem; resize: vertical;">
  </textarea>
  
  <button class="infoButton" type="submit">
    Send Message
  </button>
</form>
  `,A(e,!0)}function U(e){D(e),e.style.overflowY="auto",e.innerHTML=`
    <h1>Skill Sets</h1>
    <hr style="border: none; border-top: 1px solid #ccc; margin: 1rem 0;" />
    <h3 style="padding: 0.5rem 0 1rem 0;">Programming Languages</h3>
    <ul style="list-style: none; padding: 0;">
      ${M.map(t=>`
          <li style="display: flex; align-items: center; margin-bottom: 1rem;">
            <i aria-hidden="true" class="skill-icon ${t.icon}" style="font-size: 2rem; color: white; margin-right: 1rem;"></i>
            <span style="font-size: 1.1rem;">${t.name}</span>
          </li>`).join("")}
    </ul>
    <h3 style="padding: 0.5rem 0 1rem 0;">Development Platforms</h3>
    <ul style="list-style: none; padding: 0;">
      ${C.map(t=>`
            <li style="display: flex; align-items: center; margin-bottom: 1rem;">
              <i aria-hidden="true" class="skill-icon ${t.icon}" style="font-size: 2rem; color: white; margin-right: 1rem;"></i>
              <span style="font-size: 1.1rem;">${t.name}</span>
            </li>
          `).join("")}
    </ul>
    <h3 style="padding: 0.5rem 0 1rem 0;">General Robotics</h3>
    <ul style="list-style: none; padding: 0;">
      ${j.map(t=>`
            <li style="display: flex; align-items: center; margin-bottom: 1rem;">
              <span class="skill-icon" style="font-size: 2rem; margin-right: 1rem;">${t.icon.startsWith("fa-")?u(t.name==="LiDAR"?"signal":"robot"):`<i aria-hidden="true" class="${t.icon}"></i>`}</span>
              <span style="font-size: 1.1rem;">${t.name}</span>
            </li>
          `).join("")}
    </ul>
  `}function z(e){x(e,{url:"./pdfs/ohResume.pdf",heading:"PDF Resume",title:"Oliver Hill Resume",filename:"oliverHillResume.pdf"})}function x(e,{url:t,heading:i,title:r,filename:n,onDemand:a=!1}){const s=`${t}#view=Fit`;e.classList.add("pdf-box"),e.style.overflowY="hidden",e.innerHTML=`
    <div class="top-bar">

      <h2>${i}</h2>

      <div class="tooltip-container">

        <button
          class="downloadPDF download-button"
          type="button"
          aria-label="Download ${i}"
        >
          ${u("download")}
        </button>

        <div class="tooltip">
          Download PDF
        </div>

      </div>
    </div>

    <hr
      style="
        border: none;
        border-top: 1px solid #ccc;
        margin: 1rem 0;
      "
    />

    <div class="pdf-placeholder">
      <p>Read the document here, or open it in a new tab.</p>
      <button class="infoButton pdf-preview-button" type="button">Load PDF preview</button>
    </div>
    <iframe
      class="resumeFrame"
      data-src="${s}"
      width="100%"
      height="100%"
      style="border: none;"
      title="${r}"
    >
    </iframe>
    <a class="pdf-open-link" href="${t}" target="_blank" rel="noopener noreferrer">Open PDF in a new tab</a>
  `;const l=e.querySelector(".resumeFrame"),d=e.querySelector(".downloadPDF"),o=()=>{l.src||(l.src=l.dataset.src,e.classList.add("pdf-loaded"),e.querySelector(".pdf-preview-button").setAttribute("aria-expanded","true"))},p=e.querySelector(".pdf-preview-button");p.setAttribute("aria-expanded","false"),p.addEventListener("click",o,{once:!0}),!a&&!window.matchMedia("(max-width: 900px)").matches&&G(e,o),d&&d.addEventListener("click",()=>q(s,n))}function q(e,t){const i=e.split("#")[0],r=document.createElement("a");r.href=i,r.download=t,document.body.appendChild(r),r.click(),r.remove()}function v(e){const t=document.createElement("hr");t.style.border="none",t.style.borderTop="1px solid #ccc",t.style.margin="0.5rem 0",e.appendChild(t)}function G(e,t){if(!("IntersectionObserver"in window))return t();const i=new IntersectionObserver(([r])=>{r.isIntersecting&&(t(),i.disconnect())},{rootMargin:"200px 0px"});i.observe(e)}function K(){const e=document.createElement("section");return e.id="dissertation",e.className="info-panel dissertation-panel",e.setAttribute("aria-labelledby","dissertation-heading"),e.innerHTML=`
    <div class="infoSection">
      <div class="info-box infoBoxLeft dissertation-summary" tabindex="0" aria-label="Dissertation summary">
        <h1 id="dissertation-heading">Dissertation</h1>
        <hr />
        <p class="dissertation-meta">University of Edinburgh · BEng Computer Science · 2026</p>
        <h2 class="dissertation-title">Motion Smoothing for Assistive Leader-Follower Robotic Arms</h2>
        <div class="dissertation-grade">
          <strong>79%</strong>
          <span>Overall project mark</span>
        </div>

        <h3>Abstract</h3>
        <p>I developed a low-cost, dual-arm teleoperation platform to investigate how robotic systems can suppress involuntary tremor while preserving intentional movement. Built with ROS2 and modified Interbotix PincherX manipulators, the system combines custom 3D-printed controllers, synthetic tremor injection and modular low-pass and Kalman filters. I evaluated both approaches using tremor-band attenuation, command latency and a 14-participant user study. The findings show that stronger suppression alone does not guarantee better control: balancing tremor reduction with responsiveness is essential to usable assistive teleoperation.</p>

        <h3>Key technical stack</h3>
        <ul class="dissertation-stack" aria-label="Technical stack">
          <li>ROS2 Humble</li><li>Raspberry Pi 4</li><li>Interbotix PincherX-100</li>
          <li>Dynamixel actuators</li><li>RViz</li><li>rosbag</li>
          <li>Tkinter</li><li>Kalman &amp; low-pass filtering</li><li>3D-printed controllers</li>
        </ul>

        <h3>Headline results</h3>
        <ul class="dissertation-results">
          <li><strong>Over 40 dB tremor attenuation</strong> with low-pass filtering, with approximately 0.73 s median command delay.</li>
          <li><strong>Approximately 19 dB attenuation at just 0.06 s delay</strong> with the Kalman filter, preserving much faster response.</li>
          <li><strong>14-participant user study:</strong> more participants ranked Kalman filtering as the most stable condition, despite its lower attenuation.</li>
        </ul>
        <p class="dissertation-note">Attenuation and delay are median results under synthetic tremor in the 6–10 Hz band. See Chapter 4 for the evaluation and limitations.</p>
      </div>
      <div class="info-box infoBoxRight"></div>
    </div>
  `,x(e.querySelector(".infoBoxRight"),{url:"./pdfs/oliverHillDissertation.pdf",heading:"PDF Dissertation",title:"Oliver Hill Dissertation: Motion Smoothing for Assistive Leader-Follower Robotic Arms",filename:"oliverHillDissertation.pdf",onDemand:!0}),e}function W(){const e=document.querySelector("#info");if(!e)return;e.innerHTML="";const t=document.createDocumentFragment();for(let i=f.length-1;i>=0;i--){const r=f[i],n=document.createElement("div");n.className="info-panel",n.id=`panel-${i}`,n.innerHTML=`
      <div class="infoSection">
        <div class="info-box infoBoxLeft" id="infoBoxLeft-${i}"></div>
        <div class="info-box infoBoxRight" id="infoBoxRight-${i}"></div>
      </div>
    `,t.appendChild(n),i===f.length-1&&t.appendChild(K());const a=n.querySelector(`#infoBoxLeft-${i}`);a.tabIndex=0;const s=n.querySelector(`#infoBoxRight-${i}`);i===0?(F(a),s.style.display="none"):i===2?(U(a),z(s)):($(r,a),H(r,s))}e.appendChild(t)}function N(e=!1){W();const t=document.getElementById("intro"),i=document.getElementById("enterSystem"),r=a=>{window.dispatchEvent(new Event("portfolioEntered")),t?.remove(),a.scrollIntoView({behavior:"instant",block:"start"});const s=a.querySelector("h1");s&&(s.tabIndex=-1,s.focus({preventScroll:!0}))},n=()=>{let a;try{a=decodeURIComponent(window.location.hash.slice(1))}catch{return!1}const s=document.getElementById(a);return s?.classList.contains("info-panel")?(r(s),!0):!1};return window.addEventListener("hashchange",n),document.getElementById("loadingScreen")?.remove(),n()?null:(i?.addEventListener("click",()=>{const a=document.querySelector("#info .info-panel");a&&r(a)},{once:!0}),e&&(document.getElementById("intro-content").hidden=!0,document.getElementById("threeCanvas").style.pointerEvents="auto"),t)}const g=new URLSearchParams(window.location.search).has("dev"),h=N(g);h&&!g&&R(h);const V=window.matchMedia("(prefers-reduced-motion: reduce)"),Y=window.matchMedia("(max-width: 900px)");if(h&&(g||!V.matches&&!Y.matches&&!navigator.connection?.saveData)){const e=async()=>{if(h.isConnected){if(document.hidden){document.addEventListener("visibilitychange",e,{once:!0});return}try{const{initSolarSystem:t}=await k(async()=>{const{initSolarSystem:i}=await import("./solarSystemMain-Dl7uKhCS.js");return{initSolarSystem:i}},[]);h.isConnected&&t(g)}catch(t){console.warn("Using the static intro:",t)}}};"requestIdleCallback"in window?window.requestIdleCallback(e,{timeout:1500}):window.setTimeout(e,100)}export{E as S};
//# sourceMappingURL=index-D3-zYAQt.js.map
