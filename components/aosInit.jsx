import Aos from "aos";
import '@/../aos/dist/aos.css';

export const initializeAos = () => {
    Aos.init({
        duration: 1000,
    });

    return () => {
        Aos.refresh();
    };
};
