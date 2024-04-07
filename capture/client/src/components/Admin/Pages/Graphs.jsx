import React from "react";
import Pi from "./Pi";
import Linec from "./Linec";
import ScrollAnimation from "react-animate-on-scroll";


function Graphs() {
  
  return (
    <div className="graphs-section d-felx">
      <ScrollAnimation animateIn="zoomIn">

        <Pi />      
        </ScrollAnimation>
      <ScrollAnimation animateIn="zoomIn">

        <Linec />
        </ScrollAnimation>
    </div>  
  );
}

export default Graphs;
