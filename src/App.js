import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PatientLogin from './components/patient/Login';
import PatientRegister from './components/patient/Register';
import PatientDashboard from './components/patient/dashboard/Dashboard';
import DoctorLogin from './components/doctor/Login';
import DoctorRegister from './components/doctor/Register';
import DoctorDashboard from './components/doctor/dashboard/Dashboard';
import HospitalLogin from './components/Hospital/Hospital_login';
import React, { useEffect,useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


function App() {
    
    const [role, setRole] = useState('');

    // Define handleRoleChange
    const handleRoleChange = (e) => {
      setRole(e.target.value);
    };
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger); 

    const canvas = document.querySelector("#canvas");
    const context = canvas.getContext("2d");

    const frames = {
        currentIndex: 0,
        maxIndex: 364
    };

    const images = [];
    let imagesLoaded = 0;

    function preloadImages() {
        for (let i = 1; i <= frames.maxIndex; i++) {
            const imageUrl = `./images22/frame_${i.toString().padStart(4, "0")}.jpeg`;
            const img = new Image();
            img.src = imageUrl;
            //eslint-disable-next-line
            img.onload = function() {
                images.push(img);
                imagesLoaded++;
                if (imagesLoaded === frames.maxIndex) {
                    console.log("All images loaded");
                    loadImages(frames.currentIndex);
                    startAnimation();
                    ScrollTrigger.refresh(); 
                }
            };
        }
    }

    function loadImages(index) {
        if (index >= 0 && index < frames.maxIndex) {
            const img = images[index];
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const scaleX = canvas.width / img.width;
            const scaleY = canvas.height / img.height;
            const scale = Math.max(scaleX, scaleY);
            const newWidth = img.width * scale;
            const newHeight = img.height * scale;
            const offsetX = (canvas.width - newWidth) / 2;
            const offsetY = (canvas.height - newHeight) / 2;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.imageSmoothingEnabled = true;
            context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
            frames.currentIndex = index;
        }
    }

    function startAnimation() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".parent",
                start: "top top",
                scrub: 2, // Adjust for smoother scrolling
                end: "+=300%", // Extend animation to 3 pages
                pin: true
            }
        });
    
        tl.to(frames, {
            currentIndex: frames.maxIndex,
            onUpdate: function() {
                loadImages(Math.floor(frames.currentIndex));
            }
        });
    }
    

    const handleResize = () => {
        loadImages(Math.floor(frames.currentIndex));
        ScrollTrigger.refresh(); 
    };

    window.addEventListener("resize", handleResize);

    preloadImages(); 

    return () => {
        window.removeEventListener("resize", handleResize);
    };
}, []);

return (
    <div className="App min-h-screen">
       <div>
        <select onChange={handleRoleChange} value={role}>
          <option value="">Select Role</option>
          <option value="patient">Patient</option>
          <option value="hospital">Hospital</option>
        </select>
      </div> 
      <canvas id="canvas" />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* Patient Options  */}
          <Route path="/patient/login" element={<PatientLogin />} />
          <Route path="/patient/register" element={<PatientRegister />} />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />

          {/* Doctor Options  */}
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/doctor/register" element={<DoctorRegister />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />

          <Route path="/Hospital/Hospital_login" element={<HospitalLogin login onLoginSuccess={() => handleRoleChange('Hospital')} />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;