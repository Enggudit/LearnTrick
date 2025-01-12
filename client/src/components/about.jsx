import React from "react";
import LocomotiveScroll from "locomotive-scroll";
import { Link } from "react-router-dom";

function About(){
    const locomotiveScroll = new LocomotiveScroll();
    
    return(
        <>
            <div id="about" className="w-full p-4 bg-zinc-500/10 rounded-xl" data-scroll data-scroll-speed="0.1">
                <h1 className="text-[3vw] text-white mb-5 ml-5">Test-Serie'S</h1>
                <div className="flex flex-wrap flex-shrink-0 justify-evenly gap-5 text-[2.5vw]">
                    <Link to="/Aptitude/topic/question">
                        <div className="elem line1 border-4 flex justify-around border-black left w-[45vw] py-2 rounded-lg bg-blue-950 h-[35vh]">
                            <div className=" text-white ">
                                <h1>AptiTude</h1>
                            </div>
                            <img className="rounded-xl w-[40%] h-[90%]" src="./images/apti.png" alt="" />
                        </div>
                    </Link>
                    <Link to="/Verbal">
                        <div className="elem border-4 flex justify-around border-black left w-[45vw] py-2 rounded-lg bg-black-950 h-[35vh]">
                            <div className=" text-white ">
                                <h1>Verbal</h1>
                            </div>
                            <img className="rounded-xl w-[40%] h-[90%]" src="./images/verval.png" alt="" />
                        </div>
                    </Link>
                    <Link to="/coding">
                        <div className="elem border-4 flex justify-around border-black left w-[45vw] py-2 rounded-lg bg-black-950 h-[35vh]">
                            <div className=" text-white ">
                                <h1>Coder's</h1>
                            </div>
                            <img className="rounded-xl w-[40%] h-[90%]" src="./images/coding.jpg" alt="" />
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default About;
