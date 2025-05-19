import { useState } from "react";
import "./Stepper.css";
const Stepper = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [steps, setSteps] = useState([
        {
            "no": 1,
            "name": "step 1",
            "description": "Description",
            "status": "defalut"
        }, {
            "no": 2,
            "name": "step 2",
            "description": "Description",
            "status": "defalut"
        }, {
            "no": 3,
            "name": "step 3",
            "description": "Description",
            "status": "defalut"
        }
    ]);

    const btnHandler = (btn, currentIndex) => {

        setSteps((prev) => prev.map((item, index) => {
            let nextClass = "defalut";
            let prevClass = "defalut";
            if (btn == "next") { nextClass = "active"; prevClass = "complete"; }
            if (btn == "skip") { nextClass = "active"; prevClass = "skip"; }
            if (btn == "error") { nextClass = "active"; prevClass = "error"; }
            if (btn == "back") {
                nextClass = "defalut";
                prevClass = "active";
                if (index == currentIndex) {
                    return { ...item, status: nextClass };
                } else if (index == currentIndex - 1) {
                    setCurrentStep(currentIndex - 1);
                    return { ...item, status: prevClass };

                } else {
                    return { ...item };
                }
            } else {
                if (index == currentIndex + 1) {
                    setCurrentStep(currentIndex + 1);
                    return { ...item, status: nextClass };
                } else if (index == currentIndex) {
                    return { ...item, status: prevClass };
                } else {
                    return { ...item };
                }
            }
        }))

    }


    return (
        <div className="steps-container">
            <ul className="stpes-list">
                {
                    steps.map((item, index) => {
                        console.log(item);
                        return (
                            <li key={index} className={`step ${item.status}`}>
                                <span className="number">{item.no}</span>
                                <div className="step-content">
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            <div className="btn-group">
                <button className="complete" onClick={() => btnHandler("back", currentStep)}>Back</button>
                <button className="skip" onClick={() => btnHandler("skip", currentStep)}>Skip</button>
                <button className="error" onClick={() => btnHandler("error", currentStep)}>Error</button>
                <button className="active" onClick={() => btnHandler("next", currentStep)}>Next</button>
            </div>
        </div>
    );
}
export default Stepper;