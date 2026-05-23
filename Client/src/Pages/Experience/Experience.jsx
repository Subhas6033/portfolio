import React, { useState, useEffect } from "react";
import { GraduationCap, Briefcase } from "lucide-react";
import { Timeline } from "../../Components/index";
import { KEYFRAMES } from "../../Components/ui/animations";

export default function ExperiencePage() {
  const [experienceData, setExperienceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/experiences`,
        );
        if (!response.ok) throw new Error("Failed to fetch experiences");
        const data = await response.json();
        setExperienceData(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, []);
  return (
    <>
      <style>{KEYFRAMES}</style>
      <div className="min-h-screen bg-zinc-950 pt-28 pb-24 px-6 overflow-hidden relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(163,230,53,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(163,230,53,0.03) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(163,230,53,0.07) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(163,230,53,0.05) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="anim-fadeUp mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-5 h-5 bg-lime-400/10 border border-lime-400/30 rounded flex items-center justify-center"
                style={{ animation: "pulseGlow 2.5s ease-in-out infinite" }}
              >
                <div className="w-2 h-2 bg-lime-400 rounded-sm" />
              </div>
              <span className="text-lime-400 text-xs font-bold uppercase tracking-widest">
                Journey
              </span>
            </div>
            <h1
              className="font-black text-white tracking-tighter leading-none mb-4"
              style={{ fontSize: "clamp(40px, 7vw, 80px)" }}
            >
              My <span className="shimmer-text">Experience</span>
            </h1>
            <p className="text-zinc-500 text-base max-w-lg leading-relaxed">
              A timeline of my professional journey and academic background.
            </p>
          </div>

          {/* Experience Timeline */}
          <div className="mb-20">
            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
              Work Experience
            </h2>
            <Timeline
              data={experienceData}
              icon={Briefcase}
              subtitleKey="company"
              linkLabel="View Certificate"
              linkKey="fileUrl"
            />
          </div>
        </div>
      </div>
    </>
  );
}
