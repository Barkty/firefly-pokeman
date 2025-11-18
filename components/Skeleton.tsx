"use client";
import { Card, Skeleton } from "@heroui/react";
import { motion } from "framer-motion";

interface PokemonSkeletonProps {
  isLoaded?: boolean;
}

export function PokemonSkeleton({ isLoaded = false }: PokemonSkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Card className="w-[250px] h-[300px] space-y-5 p-4" radius="lg">
        <Skeleton 
          isLoaded={isLoaded}
          className="rounded-lg h-24 bg-gray-200"
        >
          <div className="h-24 rounded-lg bg-gray-300" />
        </Skeleton>
        
        <div className="space-y-3">
          <Skeleton 
            isLoaded={isLoaded}
            className="w-3/5 rounded-lg h-4 bg-gray-200"
          >
            <div className="h-4 w-3/5 rounded-lg bg-gray-300" />
          </Skeleton>
          <Skeleton 
            isLoaded={isLoaded}
            className="w-4/5 rounded-lg h-3 bg-gray-200"
          >
            <div className="h-3 w-4/5 rounded-lg bg-gray-300" />
          </Skeleton>
          <Skeleton 
            isLoaded={isLoaded}
            className="w-2/5 rounded-lg h-3 bg-gray-200"
          >
            <div className="h-3 w-2/5 rounded-lg bg-gray-300" />
          </Skeleton>
        </div>
      </Card>
    </motion.div>
  );
}





// "use client";

// import { Card, Skeleton } from "@heroui/react";
// import { motion } from "framer-motion";

// export function PokemonSkeleton() {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 12 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.25, ease: "easeOut" }}
//     >
//       <Card className="w-[250px] h-[300px] space-y-5 p-4" radius="lg">
//         <Skeleton className="h-24 rounded-lg" />

//         <div className="space-y-3">
//           <Skeleton className="h-3 w-3/5 rounded-lg" />
//           <Skeleton className="h-3 w-4/5 rounded-lg" />
//           <Skeleton className="h-3 w-2/5 rounded-lg" />
//         </div>
//       </Card>
//     </motion.div>
//   );
// }
