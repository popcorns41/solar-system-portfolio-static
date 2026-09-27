export const dissertation = {
  "id": "dissertation",
  "type": "dissertation",
  "title": "Dissertation",
  "meta": "University of Edinburgh · BEng Computer Science · 2026",
  "projectTitle": "Motion Smoothing for Assistive Leader-Follower Robotic Arms",
  "grade": "79%",
  "gradeLabel": "Overall project mark",
  "abstract": {
    "heading": "Abstract",
    "desktop": "I developed a low-cost, dual-arm teleoperation platform to investigate how robotic systems can suppress involuntary tremor while preserving intentional movement. Built with ROS2 and modified Interbotix PincherX manipulators, the system combines custom 3D-printed controllers, synthetic tremor injection and modular low-pass and Kalman filters. I evaluated both approaches using tremor-band attenuation, command latency and a 14-participant user study. The findings show that stronger suppression alone does not guarantee better control: balancing tremor reduction with responsiveness is essential to usable assistive teleoperation.",
    "mobile": "I built a dual-arm robotic platform to study tremor suppression using ROS2, custom controllers and low-pass and Kalman filters. Testing, including a 14-person user study, showed that responsive control matters as much as tremor reduction."
  },
  "stackHeading": "Key technical stack",
  "stack": [
    "ROS2 Humble",
    "Raspberry Pi 4",
    "Interbotix PincherX-100",
    "Dynamixel actuators",
    "RViz",
    "rosbag",
    "Tkinter",
    "Kalman &amp; low-pass filtering",
    "3D-printed controllers"
  ],
  "resultsHeading": "Headline results",
  "results": [
    "<strong>Over 40 dB tremor attenuation</strong> with low-pass filtering, with approximately 0.73 s median command delay.",
    "<strong>Approximately 19 dB attenuation at just 0.06 s delay</strong> with the Kalman filter, preserving much faster response.",
    "<strong>14-participant user study:</strong> more participants ranked Kalman filtering as the most stable condition, despite its lower attenuation."
  ],
  "note": "Attenuation and delay are median results under synthetic tremor in the 6–10 Hz band. See Chapter 4 for the evaluation and limitations.",
  "document": {
    "url": "./pdfs/oliverHillDissertation.pdf",
    "heading": "PDF Dissertation",
    "title": "Oliver Hill Dissertation: Motion Smoothing for Assistive Leader-Follower Robotic Arms",
    "filename": "oliverHillDissertation.pdf",
    "onDemand": true
  }
};
