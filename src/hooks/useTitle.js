const { useEffect } = require("react")

const useTitle = title => {
    useEffect(() => {
        document.title = `${title} - Raw Bike`
    }, [title])
}
export default useTitle;