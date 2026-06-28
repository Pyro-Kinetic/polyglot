import type {ReactNode} from "react";
import {motion} from "motion/react";

function LanguageMotionDiv({children}: { children: ReactNode }) {
    return (
        <motion.div
            drag
            dragDirectionLock
            dragConstraints={{top: 0, right: 0, bottom: 0, left: 0}}
            dragTransition={{bounceStiffness: 1000, bounceDamping: 15}}
            dragElastic={0.2}
            whileDrag={{cursor: "grabbing"}}
            className={"motion-parent"}
        >
            {children}
        </motion.div>
    )
}

export default LanguageMotionDiv;