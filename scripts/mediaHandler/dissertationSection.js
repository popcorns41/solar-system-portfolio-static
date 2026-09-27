import { responsiveParagraph } from './responsiveCopy.js';
import { pdfDocumentSection } from './mediaDisplayHandler.js';

export function createDissertationSection() {
  const panel = document.createElement('section');
  panel.id = 'dissertation';
  panel.className = 'info-panel dissertation-panel';
  panel.setAttribute('aria-labelledby', 'dissertation-heading');
  panel.innerHTML = `
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
        ${responsiveParagraph("I developed a low-cost, dual-arm teleoperation platform to investigate how robotic systems can suppress involuntary tremor while preserving intentional movement. Built with ROS2 and modified Interbotix PincherX manipulators, the system combines custom 3D-printed controllers, synthetic tremor injection and modular low-pass and Kalman filters. I evaluated both approaches using tremor-band attenuation, command latency and a 14-participant user study. The findings show that stronger suppression alone does not guarantee better control: balancing tremor reduction with responsiveness is essential to usable assistive teleoperation.", "I built a dual-arm robotic platform to study tremor suppression using ROS2, custom controllers and low-pass and Kalman filters. Testing, including a 14-person user study, showed that responsive control matters as much as tremor reduction.")}

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
  `;
  pdfDocumentSection(panel.querySelector('.infoBoxRight'), {
    url: './pdfs/oliverHillDissertation.pdf',
    heading: 'PDF Dissertation',
    title: 'Oliver Hill Dissertation: Motion Smoothing for Assistive Leader-Follower Robotic Arms',
    filename: 'oliverHillDissertation.pdf',
    onDemand: true,
  });
  return panel;
}
