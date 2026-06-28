import { useState } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

let faqs = [
    {
        question: "What is the purpose of this app?",
        answer: "This app provides weather information, a to-do list feature, and other useful functionalities."
    },
    {
        question: "How do I use the to-do list?",
        answer: "You can add tasks to your to-do list, edit them, and mark them as completed. Your tasks will be saved in your browser's local storage."
    },
    {
        question: "Is my data safe?",
        answer: "Yes, your data is stored locally in your browser and is not shared with any third parties."
    },
    {
        question: "Can I access this app on my mobile device?",
        answer: "Yes, the app is responsive and can be accessed on both desktop and mobile devices."
    },
    {
        question: "How often is the weather data updated?",
        answer: "The weather data is updated in real-time to provide you with the most current weather information for your location."
    }
]

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(null);
    return (
        <>
            <div className="min-h-screen flex items-center justify-center p-6 bg-slate-900">
                <div className="w-full max-w-xl rounded-2xl p-6 card-3d">
                    <h1 className="text-2xl font-bold neon">Faq</h1>
                        <div className="main-div mt-4">
                            {faqs.map((obj, index) => (
                                <div key={index}>

                                    <h2 onClick={() => setOpenIndex(openIndex === index ? null : index)} className="faq-heading font-bold text-white bg-blue-950 p-2.5 mb-3 cursor-pointer relative">
                                        {obj.question} <span className="absolute right-5">{openIndex === index ? <FaAngleUp /> : <FaAngleDown />}</span>
                                    </h2>

                                    {openIndex === index && (
                                        <p className="text-white mb-3 p-2.5">{obj.answer}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


        </>
    )
}
