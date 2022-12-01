import { useEffect, useState } from "react"

const useBuyer = (email) => {
    const [isBuyer, setIsBuyer] = useState(false);
    const [isBuyerLoading, setIsBuyerLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5001/buyers/${email}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setIsBuyer(data);
                    setIsBuyerLoading(false);
                })
        }
    }, [email])
    return [isBuyer, isBuyerLoading]
}

export default useBuyer;