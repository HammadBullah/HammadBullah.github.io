import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 }
};

export default function App() {
  return (
    <div className="bg-black text-white">

      {/* HERO */}
      <section className="h-screen flex items-center justify-center text-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold">
            Hammad Safi
          </h1>
          <p className="mt-4 text-gray-400 text-lg">
            Flutter Developer · AI Engineer
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <a href="#projects" className="px-6 py-2 bg-white text-black rounded-full">
              Projects
            </a>
            <a href="#contact" className="px-6 py-2 border border-gray-500 rounded-full">
              Contact
            </a>
          </div>
        </motion.div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-20 px-6 md:px-20">
        <h2 className="text-3xl font-bold mb-10">Projects</h2>

        <div className="grid md:grid-cols-3 gap-8">

          {[
            {
              title: "Drowning Detection System",
              desc: "CNN-based real-time detection using video frames."
            },
            {
              title: "Resume Builder App",
              desc: "Flutter app generating PDF resumes with templates."
            },
            {
              title: "Voice SOS App",
              desc: "Voice-activated emergency system."
            }
          ].map((project, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 border border-gray-800 rounded-2xl bg-white/5 backdrop-blur-lg"
            >
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-gray-400 mt-2">{project.desc}</p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* SKILLS */}
      <section className="py-20 px-6 md:px-20">
        <h2 className="text-3xl font-bold mb-6">Skills</h2>

        <div className="flex flex-wrap gap-4">
          {["Flutter", "Dart", "Python", "TensorFlow", "Firebase", "C++"].map(skill => (
            <span className="px-4 py-2 border border-gray-700 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 text-center">
        <h2 className="text-3xl font-bold">Contact</h2>
        <p className="text-gray-400 mt-4">hammadsafi@example.com</p>
      </section>

    </div>
  );
}