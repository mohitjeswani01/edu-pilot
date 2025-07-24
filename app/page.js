import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from 'next/link';
import Image from 'next/image';
import { Rocket, PlayCircle, Sparkles, PenSquare, HandCoins, ArrowRight, Milestone, Twitter, Instagram, Linkedin } from 'lucide-react';
export default function Home() {
  return (
    <div className="bg-white text-gray-800 antialiased font-sans">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            <Rocket /> Edu-Pilot
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#howitworks" className="text-gray-600 hover:text-blue-600 transition-colors">How It Works</a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Testimonials</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/workspace" className="hidden sm:block">
              <Button>Go to Dashboard</Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <main>
        <section className="bg-white py-20 md:py-28">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column: Text Content & CTAs */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                Launch Your Online Course in <span className="text-blue-600">Minutes 🚀</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-600">
                Transform your expertise into engaging online courses with AI assistance. Create, publish, and monetize your knowledge effortlessly.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <Link href="/workspace">
                  <Button size="lg" className="text-lg px-6 py-6 shadow-lg transform transition hover:scale-105 flex items-center gap-2">
                    <Rocket size={20} /> Start Creating
                  </Button>
                </Link>
                <a href="/workspace/explore">
                  <Button size="lg" variant="outline" className="text-lg px-6 py-6 shadow-lg transform transition hover:scale-105 flex items-center gap-2">
                    <PlayCircle size={20} /> Explore Courses
                  </Button>
                </a>
              </div>
              {/* Social Proof Section - Updated with your images */}
              <div className="mt-10 flex justify-center md:justify-start items-center space-x-6">
                <div className="flex -space-x-2 overflow-hidden">
                  <Image className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="/avatar1.jpg" alt="User 1" width={40} height={40} />
                  <Image className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="/avatar2.jpg" alt="User 2" width={40} height={40} />
                  <Image className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="/avatar3.jpg" alt="User 3" width={40} height={40} />
                </div>
                <div>
                  <div className="flex items-center">
                    {/* Star Icons */}
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">50+ educators trust us</p>
                </div>
              </div>
            </div>
            {/* Right Column: Image */}
            <div>
              <Image
                src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop"
                alt="A professional creating an online course on a laptop"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Everything You Need to Succeed</h2>
              <p className="text-lg text-gray-500 mt-4">Powerful tools for both creators and learners.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="text-center p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 text-blue-600 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6"><Sparkles size={32} /></div>
                <h3 className="text-xl font-semibold mb-3">AI Content Generation</h3>
                <p className="text-gray-500">Describe your course, and let our AI generate structured chapters, topics, and content to get you started instantly.</p>
              </div>
              <div className="text-center p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-shadow">
                <div className="bg-green-100 text-green-600 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6"><PenSquare size={32} /></div>
                <h3 className="text-xl font-semibold mb-3">Intuitive Course Builder</h3>
                <p className="text-gray-500">An easy-to-use editor lets you customize and refine your course content with full control and flexibility.</p>
              </div>
              <div className="text-center p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-shadow">
                <div className="bg-purple-100 text-purple-600 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6"><HandCoins size={32} /></div>
                <h3 className="text-xl font-semibold mb-3">Interactive Learning</h3>
                <p className="text-gray-500">Engage your students with rich content, including video embeds, quizzes, and practical exercises.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section - Upgraded Version */}
        <section id="howitworks" className="py-20 md:py-28 bg-slate-50 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Create Your Course in 3 Simple Steps</h2>
              <p className="text-lg text-gray-500 mt-4 max-w-3xl mx-auto">From idea to published course in minutes, not months. Our AI-powered platform makes course creation effortless.</p>
            </div>

            <div className="relative">
              {/* The connecting line for desktop view */}
              <div className="hidden md:block absolute top-12 left-0 w-full border-t-2 border-dashed border-gray-300"></div>

              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-y-16 md:gap-x-12">
                {/* Step 1 */}
                <div className="text-center relative px-4">
                  <div className="relative z-10 flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                    <span className="text-4xl font-extrabold text-white">1</span>
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-100 rounded-full opacity-50 -z-0"></div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-800">Define Your Course</h3>
                  <p className="text-gray-500">Give your course a compelling title and description. Tell us what you want to teach and who your target audience is.</p>
                </div>

                {/* Step 2 */}
                <div className="text-center relative px-4">
                  <div className="relative z-10 flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                    <span className="text-4xl font-extrabold text-white">2</span>
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -top-8 -right-0 w-16 h-16 bg-indigo-100 rounded-full opacity-50 -z-0"></div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-800">Generate with AI</h3>
                  <p className="text-gray-500">Our AI analyzes your input and automatically creates chapters, learning objectives, and content structure for your course.</p>
                </div>

                {/* Step 3 */}
                <div className="text-center relative px-4">
                  <div className="relative z-10 flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
                    <span className="text-4xl font-extrabold text-white">3</span>
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -bottom-4 -left-2 w-10 h-10 bg-purple-100 rounded-full opacity-50 -z-0"></div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-800">Publish & Share</h3>
                  <p className="text-gray-500">Review, customize, and publish your course. Start earning from your expertise and building your teaching community.</p>
                </div>
              </div>
            </div>

            {/* Final CTA Button for the section */}
            <div className="text-center mt-20">
              <Link href="/workspace">
                <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-cyan-400 text-white text-lg px-8 py-6 shadow-lg transform transition hover:scale-105">
                  Start Building Your Course
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section - Upgraded Version */}
        <section id="testimonials" className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Loved by Educators Worldwide</h2>
              <p className="text-lg text-gray-500 mt-4 max-w-3xl mx-auto">
                Join thousands of successful course creators who've built thriving education businesses with Edu-Pilot.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial Card 1 */}
              <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">
                  "Edu-Pilot transformed how I create courses. What used to take weeks now takes hours. The AI suggestions are incredibly helpful and my students love the interactive content."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg mr-4">
                    VA
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Vijay Adwani</p>
                    <p className="text-sm text-gray-500">Business Expert</p>
                  </div>
                </div>
              </div>

              {/* Testimonial Card 2 */}
              <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">
                  "I finally grasped concepts that were tough for me before. lastly to say (Great courses, great community. The best way to learn a new skill online. Highly recommended!)" </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-lg mr-4">
                    MJ
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Mohit Jeswani</p>
                    <p className="text-sm text-gray-500">Web Developer</p>
                  </div>
                </div>
              </div>

              {/* Testimonial Card 3 */}
              <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">
                  "As someone who's not tech-savvy, I was amazed at how easy it was to create professional courses. The AI does the heavy lifting, I just add my expertise."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-lg mr-4">
                    AJ
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Anjali Jeswani</p>
                    <p className="text-sm text-gray-500">Student's Instructor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section - Updated Version */}
        <section className="bg-gradient-to-r from-cyan-500 to-blue-500">
          <div className="container mx-auto px-6 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Share Your Passion?</h2>
            <p className="text-lg text-blue-100 mt-4 max-w-2xl mx-auto">
              Join thousands of educators who've already transformed their expertise into thriving online courses. Start your journey today.
            </p>
            <div className="mt-8">
              <Link href="/workspace">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 shadow-lg transform transition hover:scale-105">
                  Sign Up for Free
                </Button>
              </Link>
              <p className="text-sm text-blue-200 mt-4">No credit card required. Cancel anytime.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Updated Version with Social Links */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Column 1: Logo & Description */}
            <div className="lg:col-span-4">
              <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2">
                <Rocket /> Edu-Pilot
              </Link>
              <p className="mt-4 text-sm max-w-xs">
                Empowering educators to share knowledge and learners to grow skills through AI-powered course creation.
              </p>
            </div>

            {/* Column 2, 3, 4: Links */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Product</h3>
                <ul className="mt-4 space-y-3">
                  <li><a href="#features" className="text-sm hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="text-sm hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="text-sm hover:text-white transition-colors">Templates</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-3">
                  <li><a href="#" className="text-sm hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="text-sm hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="text-sm hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-3">
                  <li><a href="#" className="text-sm hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="text-sm hover:text-white transition-colors">Community</a></li>
                  <li><a href="#" className="text-sm hover:text-white transition-colors">Status</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-3">
                  <li><a href="#" className="text-sm hover:text-white transition-colors">Privacy</a></li>
                  <li><a href="#" className="text-sm hover:text-white transition-colors">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 py-6">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm">
              <p>&copy; {new Date().getFullYear()} Edu-Pilot. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                {/* Twitter Link */}
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Twitter /></a>

                {/* Instagram Link - Updated */}
                <a href="https://www.instagram.com/mohit_jeswani1" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Instagram /></a>

                {/* LinkedIn Link - Update with your profile URL */}
                <a href="https://www.linkedin.com/in/mohit-jeswani-a06838309" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin /></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}