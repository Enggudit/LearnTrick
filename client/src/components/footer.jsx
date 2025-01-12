import React from "react";
import 'remixicon/fonts/remixicon.css'


function footer(){
    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);
    
        formData.append("access_key", "f27b9385-ace4-491a-9a84-9b559d776827");
    
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
    
        const data = await response.json();
    
        if (data.success) {
          setResult("Respond Submitted Successfully");
          event.target.reset();
        } else {
          console.log("Error", data);
          setResult(data.message);
        }
      };

    return(
        <footer id="footer" className="w-screen h-screen bg-black overflow-hidden">
            <div className="footer-upper flex justify-between h-[57.5%]">
                <div className="w-[20vw] rounded-md text-[2vw] text-white pl-[2vw] h-[50vh]">
                    <div className="flex">
                        <i className="ri-corner-down-right-line"></i>
                        <h1>Home</h1>
                    </div>
                    <div className="flex">
                        <i className="ri-corner-down-right-line"></i>
                        <h1>About</h1>
                    </div>
                    
                    <div className="flex">
                        <i className="ri-corner-down-right-line"></i>
                        <h1>Section's</h1>
                    </div>
                    <div className="flex">
                        <i className="ri-corner-down-right-line"></i>
                        <h1>MeetUp</h1>
                    </div>
                    
                </div>
                <div className="footer-mid w-[50vw] rounded-md h-[55vh] text-white text-[2vw] pl-5 pt-5">
                    <form onSubmit={onSubmit}>
                        <input type="hidden" name="access_key" value="f27b9385-ace4-491a-9a84-9b559d776827" />
                        <h1>For FeedBack</h1>
                        <label className="pl-5" htmlFor="">Name: </label>
                        <input className="text-black bg-white-500 rounded-xl h-[5vh] text-[1vw] w-[20vw] pl-2" type="text" name="name" required placeholder="name"></input>
                        <br />
                        <label className="pl-10" htmlFor="">Email: </label>
                        <input className="text-black bg-white-500 rounded-xl h-[5vh] text-[1vw] w-[20vw] pl-2" placeholder="Email" type="email" name="email" required/>
                        <br />
                        <label className="pl-20" htmlFor="text">Feedback: </label>
                        <textarea className="text-black ml-[7vw] text-[1vw] w-[35vw] h-[20vh] rounded-xl pl-2" name="message" placeholder="FeedBack" rows="4" cols="40" required></textarea>
                        <br />
                        <button className="border-4 border-white rounded-xl px-5">Submit</button>
                    </form>
                    <span>{result}</span>
                </div>
                <div className="w-[20vw] rounded-md h-[50vh] text-white text-[2vw] flex flex-col">
                    <i className="ri-arrow-right-s-line"><a href="">Instagram</a></i>
                    <i className="ri-arrow-right-s-line"><a href="">Github</a></i>
                    <i className="ri-arrow-right-s-line"><a href="">LinkedIn</a></i>
                    <i className="ri-arrow-right-s-line"><a href="">Discord</a></i>
                </div>
            </div>
            <div className="company-name border-b-2 flex justify-center gap-4 mt-10">
                    <div className="adds flex flex-col">
                        <h1 className="text-white flex justify-center text-[2.2vw] font-[girassol-regular]">Developer- Trick Solutions</h1>
                        <h2 className="text-white flex justify-center text-[1.25vw] font-[cinzel-decorative-bold]">A Fully Tech-enthusiast development brand</h2>
                    </div>
                    <img className="w-[5vw]" src="./images/companylogo.png" />
                </div>
            <div className="text-white text-[16vw] flex justify-center relative top-2">
                <h1 className="learn relative ">LearnTrick</h1>
            </div>
        </footer>
    )
}

export default footer;