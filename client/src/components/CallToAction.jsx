import { Button } from "flowbite-react";

export default function CallToAction() {
    return (
        <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center sm:text-left">
            <div className="flex-1 flex flex-col justify-center p-3">
                <h2 className="text-2xl">
                    Want to learn more about C?
                </h2>
                <p className="text-gray-500 my-2">Checkout these resources with 100 C Projects</p>
                <Button color='blue' className="self-start rounded-tl-xl rounded-bl-none">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        Learn More
                    </a>
                </Button>
            </div>
            <div className="p-3 flex-1 flex justify-center">
                <img 
                    src="https://educrm.bitvaults.in/upload/2/Blogs/00000035_binw2xw2tozha.png"  
                    alt="C Programming Resources"
                    className="max-w-full h-auto rounded-lg"
                />
            </div>
        </div>
    );
}
