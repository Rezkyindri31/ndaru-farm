import { useState } from "react";

function useStep() {
    const [stepAktif, setStepAktif] = useState(0);

    const handleSelanjutnya = () => setStepAktif((cur) => cur + 1);
    const handleSebelumnya = () => setStepAktif((cur) => cur - 1);

    return {
        stepAktif,
        handleSelanjutnya,
        handleSebelumnya,
    };
}

export default useStep;
