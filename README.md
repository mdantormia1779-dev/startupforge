StartupForge Frontend
এটি StartupForge প্ল্যাটফর্মের ফ্রন্টএন্ড অংশ, যা মূলত একটি স্টার্টআপ এবং অপরচুনিটি ম্যানেজমেন্ট ড্যাশবোর্ড। এই প্ল্যাটফর্মে ফাউণ্ডাররা তাদের স্টার্টআপ এবং জব অপরচুনিটি ম্যানেজ করতে পারেন এবং ব্যবহারকারীরা বিভিন্ন সুযোগের জন্য আবেদন করতে পারেন।

🚀 মূল বৈশিষ্ট্য (Key Features)
Authentication: নিরাপদ লগইন এবং সেশন ম্যানেজমেন্ট।

Dashboard: ফাউণ্ডারদের জন্য আলাদা ড্যাশবোর্ড, যেখানে তারা স্টার্টআপ এবং আবেদনের আপডেট দেখতে পাবেন।

Opportunities Management: নতুন সুযোগ পোস্ট করা এবং আবেদনের স্ট্যাটাস (Accepted/Rejected) পরিবর্তন করার সুবিধা।

Payment Integration: প্রিমিয়াম প্ল্যানের জন্য স্ট্রাইপ চেকআউট সুবিধা।

Responsive UI: সব ডিভাইসে ব্যবহারের উপযোগী আধুনিক ডিজাইন।

🛠 ব্যবহৃত প্রযুক্তি (Tech Stack)
Framework: Next.js (App Router)

Styling: Tailwind CSS

Authentication: (আপনার Auth Client-এর নাম, যেমন: BetterAuth/NextAuth)

State Management: React Hooks (useState, useEffect)

API Handling: Fetch API

Icons/UI Components: (আপনার ব্যবহৃত লাইব্রেরি থাকলে এখানে লিখুন, যেমন: Lucide React)

⚙️ সেটআপ গাইড (How to Setup)
১. প্রজেক্টটি ক্লোন করুন:

Bash
git clone <your-repository-url>
cd <your-folder-name>
২. ডিপেন্ডেন্সি ইন্সটল করুন:

Bash
npm install
৩. .env.local ফাইল তৈরি করুন এবং নিচের ভেরিয়েবলগুলো কনফিগার করুন:

Code snippet
NEXT_PUBLIC_API_URL=your_backend_server_url
NEXT_PUBLIC_URL=your_frontend_url
# অন্যান্য প্রয়োজনীয় এনভায়রনমেন্ট ভেরিয়েবল
৪. ডেভেলপমেন্ট মোডে রান করুন:

Bash
npm run dev
📂 প্রজেক্ট স্ট্রাকচার (Project Structure)
app/: নেক্সট জেএস অ্যাপ রাউটার এবং পেজ কম্পোনেন্ট।

components/: পুনরায় ব্যবহারযোগ্য UI কম্পোনেন্ট (যেমন: ApplicationCard, StatBox)।

lib/: অথেন্টিকেশন এবং অন্যান্য কনফিগারেশন।

public/: স্ট্যাটিক ফাইল এবং ইমেজ।
