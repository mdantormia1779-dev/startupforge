// "use client";
// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { motion } from "framer-motion";
// import { Mail } from "lucide-react";
// import Image from "next/image";
// import ApplyCard from "@/app/Components/ApplyCard/ApplyCard";

// const API = process.env.NEXT_PUBLIC_API_URL;

// const StartupDetailsPage = () => {
//   const params = useParams();
//   const id = params?.id;

//   const [startup, setStartup] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch single startup
//   useEffect(() => {
//     if (!id) return;

//     const fetchStartup = async () => {
//       try {
//         const res = await fetch(`${API}/startups/${id}`);
//         const data = await res.json();
//         setStartup(data);
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStartup();
//   }, [id]);

//   // ⏳ Loading
//   if (loading) {
//     return <div className="p-10 text-center">Loading...</div>;
//   }

//   // ❌ Not found
//   if (!startup) {
//     return <div className="p-10 text-center">Startup not found</div>;
//   }

//   return (
//     <div className="min-h-screen bg-background text-foreground p-6 md:p-12">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-5xl mx-auto"
//       >
//         {/* Header */}
//         <div className="bg-card p-8 rounded-3xl border flex flex-col md:flex-row gap-6">
//           <div className="relative w-32 h-32">
//             <Image
//               src={startup.logoUrl}
//               alt={startup.name}
//               fill
//               className="rounded-2xl object-cover"
//             />
//           </div>

//           <div>
//             <h1 className="text-4xl font-bold">{startup.name}</h1>
//             <p className="text-muted-foreground mt-2">
//               Leading the {startup.industry} space.
//             </p>

//             <div className="flex gap-4 mt-4 text-sm">
//               <span className="bg-secondary px-3 py-1 rounded-full">
//                 {startup.fundingStage}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Description + Email */}
//         <div className="mt-8 grid md:grid-cols-3 gap-8">
//           <div className="md:col-span-2">
//             <h2 className="text-2xl font-bold mb-4">About the Company</h2>
//             <p className="text-muted-foreground text-lg">
//               {startup.description}
//             </p>
//           </div>

//           <div className="bg-card p-6 rounded-3xl border h-fit">
//             <h3 className="font-bold mb-4">Founder Reach</h3>
//             <a
//               href={`mailto:${startup.email}`}
//               className="flex items-center gap-2 text-primary"
//             >
//               <Mail size={18} /> {startup.email}
//             </a>
//           </div>
//         </div>

//         {/* Opportunities (future ready) */}
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold mb-6">Open Positions</h2>

//           {startup.opportunities?.length > 0 ? (
//             <div className="grid md:grid-cols-2 gap-6">
//               {startup.opportunities.map((opp) => (
//                 <motion.div key={opp._id} whileHover={{ y: -5 }}>
//                   <ApplyCard job={opp} />
//                 </motion.div>
//               ))}
//             </div>
//           ) : (
//             <div className="bg-card p-8 rounded-2xl border text-center">
//               <p className="text-muted-foreground">
//                 No open positions available.
//               </p>
//             </div>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default StartupDetailsPage;


"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Image from "next/image";
import ApplyCard from "@/app/Components/ApplyCard/ApplyCard";
import OpenPosition from "@/app/Components/OpenPosition/OpenPosition";

const API = process.env.NEXT_PUBLIC_API_URL;

const StartupDetailsPage = () => {
  const params = useParams();
  const id = params?.id;

  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchStartup = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API}/startups/${id}`);
        const data = await res.json();

        setStartup(data);
      } catch (err) {
        console.log(err);
        setStartup(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStartup();
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!startup) {
    return <div className="p-10 text-center">Startup not found</div>;
  }


  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="bg-card p-8 rounded-3xl border flex flex-col md:flex-row gap-6">
          
          <div className="relative w-32 h-32">
            {startup.logoUrl && (
              <Image
                src={startup.logoUrl}
                alt={startup.name || "startup"}
                fill
                className="rounded-2xl object-cover"
              />
            )}
          </div>

          <div>
            <h1 className="text-4xl font-bold">{startup.name}</h1>

            <p className="text-muted-foreground mt-2">
              Leading the {startup.industry} space.
            </p>

            <div className="flex gap-4 mt-4 text-sm">
              <span className="bg-secondary px-3 py-1 rounded-full">
                {startup.fundingStage}
              </span>
            </div>
          </div>
        </div>

        {/* Description + Email */}
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">About the Company</h2>
            <p className="text-muted-foreground text-lg">
              {startup.description}
            </p>
          </div>

          <div className="bg-card p-6 rounded-3xl border h-fit">
            <h3 className="font-bold mb-4">Founder Reach</h3>
            <a
              href={`mailto:${startup.email}`}
              className="flex items-center gap-2 text-primary"
            >
              <Mail size={18} /> {startup.email}
            </a>
          </div>
        </div>

        {/* Opportunities */}
        <div className="mt-12">
          <OpenPosition ownerId={startup.ownerId}></OpenPosition>
        </div>
      </motion.div>
    </div>
  );
};

export default StartupDetailsPage;